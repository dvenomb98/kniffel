import {
	initialGameValues,
	initialPlayerOneStats,
} from "@/config/game/config";
import {  GameState, GameType, Player, PlayerTurn } from "@/types/game/types";
import { Action, gameReducer } from "@/utils/game/gameReducer";
import React, { createContext, useReducer, useContext, ReactNode, useMemo } from "react";

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
	const [gameValues, dispatch] = useReducer(gameReducer, initialGameValues);

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
