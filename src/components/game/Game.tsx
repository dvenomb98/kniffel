import React, { FC, ReactNode, useEffect } from "react";
import GameLayout from "./layouts/GameLayout";
import Board from "./Board";
import { Button, CircularProgress} from "@mui/material";
import StatsBar from "./gameStats/StatsBar";
import { ActionTypes } from "@/utils/game/gameReducer";
import { useGameContext } from "@/context/game/GameContext";
import { GameState } from "@/types/game/types";
import classNames from "classnames";
import GameCreateLayout from "./layouts/GameCreateLayout";

interface GameMainLayoutProps {
	children: ReactNode;
}

const GameMainLayout: FC<GameMainLayoutProps> = ({ children }) => {
	
	return (
		<div
			className={classNames(
				"flex justify-between items-start gap-5 w-[1024px] border-secondary/50 overflow-x-auto transform duration-500 ease-in-out  border p-10 bg-neutral-dark rounded-md"
			)}
		>
			{children}
		</div>
	);
};

const Game: FC = () => {
	const { gameValues, dispatch, currentPlayer, onMove } = useGameContext();

	if (!gameValues) return null

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
			<GameCreateLayout>
				<div className="flex flex-col gap-10 items-center justify-center w-full">
					<h4 className="flex animate-pulse">Waiting for other player...</h4>
					<CircularProgress color="primary" />
				</div>
			</GameCreateLayout>
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
							disabled={!gameValues.rollsLeft || !onMove}
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
