import React, { FC } from "react";
import UpperLayerScore from "./UpperLayerScore";
import BottomLayerScore from "./BottomLayerScore";
import { GameState, Player } from "@/types/game/types";
import { useGameContext } from "@/context/game/GameContext";
import classNames from "classnames";

interface StatsBarProps {
	currentPlayer: Player;
}

const StatsBar: FC<StatsBarProps> = ({ currentPlayer }) => {
	const { gameValues } = useGameContext();

	if(!gameValues) return null

	const isWinner = gameValues?.winner === currentPlayer.order;
	const gameEnded = gameValues.gameState === GameState.FINISHED;

	return (
		<div
			className={classNames(
				"flex flex-col gap-2 basis-1/4 p-8 border justify-between rounded-md",
				isWinner ? "border-primary-gold border-solid" : "border-secondary border-dashed"
			)}
		>
			<div className="font-light flex">
				<p className="flex gap-2">
					{currentPlayer.name}
					<span className="text-primary-gold">{`(${currentPlayer.order})`}</span>
				</p>
			</div>
			{!!gameEnded && !!currentPlayer.final_score && (
				<div>
					<p className="flex gap-2">
						Bonus score: <span className="text-primary-gold">{currentPlayer.bonus_score || 0}</span>
					</p>
					<p className="flex gap-2">
						Final score: <span className="text-primary-gold">{currentPlayer.final_score}</span>
					</p>
					<p className={classNames(isWinner ? "text-primary-gold" : "text-secondary")}>
						{isWinner ? "Winner" : "Looser"}
					</p>
				</div>
			)}

			<div className="flex flex-col gap-4">
				<UpperLayerScore currentPlayer={currentPlayer} />
				<BottomLayerScore currentPlayer={currentPlayer} />
			</div>
		</div>
	);
};

export default StatsBar;
