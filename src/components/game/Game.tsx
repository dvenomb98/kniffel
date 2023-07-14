import React, { FC } from "react";
import GameLayout from "./layouts/GameLayout";
import Board from "./Board";
import { Button } from "@mui/material";
import StatsBar from "./gameStats/StatsBar";
import { ActionTypes } from "@/utils/game/gameReducer";
import { useGameContext } from "@/context/game/GameContext";

const Game: FC = () => {
	const { gameValues, dispatch } = useGameContext();

	console.log(gameValues)

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
				<Board />
			</GameLayout>
			{/* GAME STATISTICS */}
			<StatsBar />
		</div>
	);
};

export default Game;
