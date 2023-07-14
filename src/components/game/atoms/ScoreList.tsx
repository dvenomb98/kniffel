import { useGameContext } from "@/context/game/GameContext";
import { Layer, PossibleValue, UpperLayerKeys } from "@/types/game/types";
import { ActionTypes } from "@/utils/game/gameReducer";
import { canAddScore } from "@/utils/game/gameUtils";
import classNames from "classnames";
import React, { FC, useMemo } from "react";

interface ScoreListProps {
	title: string
	value: PossibleValue;
	object_key: UpperLayerKeys
	layer: Layer
	
}

const ScoreList: FC<ScoreListProps> = ({ title, value, object_key, layer }) => {

	const {gameValues, dispatch } = useGameContext()
	const {possibleScores} = gameValues

	const addScore = useMemo(() => canAddScore(object_key, possibleScores), [possibleScores])
	

	
	const handleAddScore = () => {
		if(!canAddScore) return
		dispatch({
			type: ActionTypes.SET_SCORE,
			payload: { scoreType: object_key, scoreValue: possibleScores.upper_layer[object_key], layer }
		});
	}

	return (
		<li 
		onClick={handleAddScore}
		className={classNames("flex items-center gap-2 justify-between border-b border-secondary py-1", addScore && "text-primary-gold")}>
			<span className="text-h4 font-bold">{title}</span>
			<span className="text-h4">{value}</span>
		</li>
	);
};

export default ScoreList;
