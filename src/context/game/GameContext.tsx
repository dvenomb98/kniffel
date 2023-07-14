import {
	initialDice,
	initialGameValues,
	initialPlayerOneStats,
	initialPlayerTwoStats,
	initialScore,
} from "@/config/game/config";
import { GameType, Player, PlayerTurn } from "@/types/game/types";
import { Action, gameReducer } from "@/utils/game/gameReducer";
import React, { createContext, useReducer, useContext, ReactNode } from "react";

interface GameProviderProps {
	children: ReactNode;
}

// Create the context
export const GameContext = createContext<{
	gameValues: GameType;
	dispatch: React.Dispatch<Action>;
	currentPlayer: Player;
}>({ gameValues: initialGameValues, dispatch: () => {}, currentPlayer: initialPlayerOneStats });

// Create a provider wrapper component
export const GameProvider = ({ children }: GameProviderProps) => {
	const [gameValues, dispatch] = useReducer(gameReducer, {
		boardValues: initialDice,
		player_one: initialPlayerOneStats,
		player_two: initialPlayerTwoStats,
		playerTurn: PlayerTurn.PLAYER_ONE,
		rollsLeft: 3,
		possibleScores: initialScore,
	});

	const currentPlayer =
		gameValues.playerTurn === PlayerTurn.PLAYER_ONE ? gameValues.player_one : gameValues.player_two;

	return (
		<GameContext.Provider value={{ gameValues, dispatch, currentPlayer }}>
			{children}
		</GameContext.Provider>
	);
};

export const useGameContext = () => {
	return useContext(GameContext);
};
