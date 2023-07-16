import { useGameContext } from "@/context/game/GameContext";
import {
	BottomLayerKeys,
	Layer,
	Player,
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
	currentPlayer: Player;
}

const ScoreList: FC<ScoreListProps> = ({ title, value, object_key, layer, currentPlayer }) => {
	const { gameValues, dispatch } = useGameContext();

	if(!gameValues) return null

	
	const { possibleScores, rollsLeft } = gameValues;
	const isCancelled = value === "canceled";

	const addScore = useMemo(
		() => canAddScore(object_key, possibleScores, layer, currentPlayer),
		[possibleScores, currentPlayer]
	);

	const correctLayerScoreValue = useMemo(() => {
		return layer === "upper_layer"
			? possibleScores.upper_layer[object_key as UpperLayerKeys]
			: possibleScores.bottom_layer[object_key as BottomLayerKeys];
	}, [possibleScores, currentPlayer, layer]);

	const canCancelScore = !addScore && !correctLayerScoreValue && !rollsLeft && !value;

	const handleAddScore = () => {
		dispatch({
			type: ActionTypes.SET_SCORE,
			payload: {
				scoreType: object_key,
				scoreValue: correctLayerScoreValue,
				layer,
				shouldCancel: canCancelScore,
			},
		});
	};

	return (
		<li
			role="button"
			onClick={addScore || canCancelScore ? handleAddScore : undefined}
			className={classNames(
				"flex items-center gap-2 justify-between border p-2 transition-all ease-in-out bg-neutral-dark rounded-md ",
				addScore
					? "text-primary-gold-light opacity-100 border-primary-gold-light border-solid hover:border-primary-gold"
					: canCancelScore
					? "border-primary-error-light hover:border-primary-error"
					: "border-secondary border-dashed opacity-70",

				(canCancelScore || addScore) && "cursor-pointer"
			)}
		>
			<span className="flex items-center gap-2">
				{title}
				{!!correctLayerScoreValue && addScore && (
					<span className="text-secondary-light">{`+ (${correctLayerScoreValue})`}</span>
				)}
			</span>
			<span className={classNames(isCancelled && "text-primary-error")}>
				{isCancelled ? "X" : value}
			</span>
		</li>
	);
};

export default ScoreList;
