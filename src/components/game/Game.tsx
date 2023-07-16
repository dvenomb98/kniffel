import React, { FC, ReactNode, useEffect } from "react";
import GameLayout from "./layouts/GameLayout";
import Board from "./Board";
import { Button } from "@mui/material";
import StatsBar from "./gameStats/StatsBar";
import { ActionTypes } from "@/utils/game/gameReducer";
import { useGameContext } from "@/context/game/GameContext";
import { GameState } from "@/types/game/types";

interface GameMainLayoutProps {
	children: ReactNode;
}

const GameMainLayout: FC<GameMainLayoutProps> = ({ children }) => (
	<div className="flex justify-between items-start gap-5 w-[1024px] overflow-x-auto  border-secondary/50 border p-10 bg-neutral-dark rounded-md">
		{children}
	</div>
);

const Game: FC = () => {
	const { gameValues, dispatch, currentPlayer } = useGameContext();

	if(!gameValues) return null
	
	const { gameState, rollsLeft } = gameValues;

	useEffect(() => {
		if (
			gameState === GameState.FINISHED &&
			!gameValues.player_one.final_score &&
			!gameValues.player_two.final_score
		) {
			dispatch({ type: ActionTypes.CALCULATE_SCORE });
		}
	}, [gameState]);

	if (gameState === GameState.NOT_STARTED) {
		return (
			<GameMainLayout>
				<div className="flex h-full w-full items-center justify-center">
					Waiting for other player...
				</div>
			</GameMainLayout>
		);
	} else if (gameState === GameState.IN_PROGRESS) {
		return (
			<GameMainLayout>
				{/* GAME BOARD */}
				<GameLayout>
					<div className="flex items-center justify-between w-full">
						<Button
							onClick={() => dispatch({ type: ActionTypes.ROLL_DICE })}
							variant="outlined"
							color="primary"
							size="large"
							disabled={!gameValues.rollsLeft}
						>
							Roll dices
						</Button>
						<p className="text-primary-gray">
							Rolls left: <span className="text-secondary-light">{rollsLeft}</span>
						</p>
					</div>
					<Board />
				</GameLayout>
				{/* GAME STATISTICS */}
				<StatsBar currentPlayer={currentPlayer} />
			</GameMainLayout>
		);
	} else if (gameState === GameState.FINISHED) {
		return (
			<GameMainLayout>
				<StatsBar currentPlayer={gameValues.player_one} />
				<StatsBar currentPlayer={gameValues.player_two} />
			</GameMainLayout>
		);
	}
};

export default Game;
