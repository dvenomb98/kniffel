import { useGameContext } from "@/context/game/GameContext";
import {
	BottomLayerKeys,
	Layer,
	PossibleValue,
	ScoreKeys,
	UpperLayerKeys,
} from "@/types/game/types";
import { ActionTypes } from "@/utils/game/gameReducer";
import { canAddScore } from "@/utils/game/gameUtils";
import classNames from "classnames";
import React, { FC, useMemo } from "react";

interface ScoreListProps {
	title: string;
	value: PossibleValue;
	object_key: ScoreKeys;
	layer: Layer;
}

const ScoreList: FC<ScoreListProps> = ({ title, value, object_key, layer }) => {
	const { gameValues, dispatch, currentPlayer } = useGameContext();
	const { possibleScores } = gameValues;

	const addScore = useMemo(
		() => canAddScore(object_key, possibleScores, layer, currentPlayer),
		[possibleScores, currentPlayer]
	);

	const correctLayerScoreValue = useMemo(() => {
		return layer === "upper_layer"
			? possibleScores.upper_layer[object_key as UpperLayerKeys]
			: possibleScores.bottom_layer[object_key as BottomLayerKeys];
	}, [possibleScores, currentPlayer, layer]);

	const handleAddScore = () => {
		if (!addScore) return;

		dispatch({
			type: ActionTypes.SET_SCORE,
			payload: { scoreType: object_key, scoreValue: correctLayerScoreValue, layer },
		});
	};

	return (
		<li
			role="button"
			onClick={addScore ? handleAddScore : undefined}
			className={classNames(
				"flex items-center gap-2 justify-between border p-2 transition-all ease-in-out bg-neutral-dark rounded-md ",
				addScore
					? "text-primary-gold-light opacity-100 border-primary-gold-light border-solid hover:border-primary-gold  cursor-pointer"
					: "border-secondary border-dashed opacity-70"
			)}
		>
			<span className="flex items-center gap-2">
				{title}
				{!!correctLayerScoreValue && addScore && (
					<span className="text-secondary-light">{`+ (${correctLayerScoreValue})`}</span>
				)}
			</span>
			<span className="">{value}</span>
		</li>
	);
};

export default ScoreList;
