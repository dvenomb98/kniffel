import React, { FC, useReducer} from "react";
import GameLayout from "./layouts/GameLayout";
import Board from "./Board";
import { PlayerTurn } from "@/types/game/types";
import { Button } from "@mui/material";
import { initialDice, initialPlayerOneStats, initialPlayerTwoStats, initialScore } from "@/config/game/config";
import StatsBar from "./gameStats/StatsBar";
import { ActionTypes, gameReducer } from "@/utils/game/gameReducer";

const Game: FC = () => {
	const [gameValues, dispatch] = useReducer(gameReducer, {
		boardValues: initialDice,
		player_one: initialPlayerOneStats,
		player_two: initialPlayerTwoStats,
		playerTurn: PlayerTurn.PLAYER_ONE,
        rollsLeft: 3,
        possibleScores: initialScore
	});

	const playerOnTurn =
		gameValues.playerTurn === PlayerTurn.PLAYER_ONE ? gameValues.player_one : gameValues.player_two;

	return (
		<div className="flex justify-between gap-5">
			{/* GAME BOARD */}
			<GameLayout>
				<Button
					onClick={() => dispatch({ type: ActionTypes.ROLL_DICE })}
					variant="outlined"
					size="large"
                    disabled={!gameValues.rollsLeft}
				>
					Roll dices
				</Button>
				<Board
                rollsLeft={gameValues.rollsLeft}
					boardValues={gameValues.boardValues}
					dispatch={dispatch}
					playerTurn={gameValues.playerTurn}
					switchPlayerTurn={() => dispatch({ type: ActionTypes.SWITCH_PLAYER })}
				/>
			</GameLayout>
			{/* GAME STATISTICS */}
			<StatsBar playerOnTurn={playerOnTurn} possibleScores={gameValues.possibleScores} dispatch={dispatch} />
		</div>
	);
};

export default Game;
