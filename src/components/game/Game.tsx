import React, { FC, ReactNode } from "react";
import GameLayout from "./layouts/GameLayout";
import Board from "./Board";
import { Button } from "@mui/material";
import StatsBar from "./gameStats/StatsBar";
import { ActionTypes } from "@/utils/game/gameReducer";
import { useGameContext } from "@/context/game/GameContext";

interface GameMainLayoutProps {
	children: ReactNode;
}

const GameMainLayout: FC<GameMainLayoutProps> = ({ children }) => (
	<div className="flex justify-between items-start gap-5 w-[1024px] overflow-x-auto  border-secondary/50 border p-10 bg-neutral-dark rounded-md">
		{children}
	</div>
);

const Game: FC = () => {
	const { gameValues, dispatch } = useGameContext();

	return (
		<GameMainLayout>
			{/* GAME BOARD */}
			<GameLayout>
				<Button
					onClick={() => dispatch({ type: ActionTypes.ROLL_DICE })}
					variant="outlined"
					color="primary"
					size="large"
					disabled={!gameValues.rollsLeft}
				>
					Roll dices
				</Button>
				<Board />
			</GameLayout>
			{/* GAME STATISTICS */}
			<StatsBar />
		</GameMainLayout>
	);
};

export default Game;
