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
import { add } from "husky";
import React, { FC, useMemo } from "react";

interface ScoreListProps {
	title: string;
	value: PossibleValue;
	object_key: ScoreKeys;
	layer: Layer;
	currentPlayer: Player;
}

const ScoreList: FC<ScoreListProps> = ({ title, value, object_key, layer, currentPlayer }) => {
	const { gameValues, dispatch, onMove } = useGameContext();

	if (!gameValues) return null;

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
		<button
			role="button"
			onClick={handleAddScore}
			disabled={!onMove || !!value}
			className={classNames(
				"flex items-center gap-2 justify-between border p-2 transition-all ease-in-out bg-neutral-dark rounded-md",
				addScore
					? "text-primary-gold-light opacity-100 border-primary-gold-light border-solid hover:border-primary-gold cursor-pointer"
					: canCancelScore
					? "border-primary-error-light hover:border-primary-error cursor-pointer"
					: "border-secondary border-dashed opacity-70",
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
		</button>
	);
};

export default ScoreList;
