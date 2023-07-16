import { initialGameValues, initialPlayerOneStats } from "@/config/game/config";
import { GameType, Player, PlayerTurn } from "@/types/game/types";
import { Action, ActionTypes, gameReducer } from "@/utils/game/gameReducer";
import { doc, setDoc } from "firebase/firestore";
import debounce from "lodash.debounce";
import React, {
	createContext,
	useReducer,
	useContext,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
} from "react";
import { db } from "../../../firebase";

interface GameProviderProps {
	children: ReactNode;
	session_values: GameType;
	game_id: string;
	player_id: string | null;
}

// Create the context
export const GameContext = createContext<{
	gameValues: GameType | null;
	dispatch: React.Dispatch<Action>;
	currentPlayer: Player;
	onMove: boolean;
}>({ gameValues: null, dispatch: () => {}, currentPlayer: initialPlayerOneStats, onMove: false });

// Create a provider wrapper component
export const GameProvider = ({
	children,
	session_values,
	game_id,
	player_id,
}: GameProviderProps) => {
	const [gameValues, dispatch] = useReducer(gameReducer, session_values);

	useEffect(() => {
		dispatch({ type: ActionTypes.UPDATE_SESSION_VALUES, payload: session_values });
	}, [session_values]);

	const debouncedUpdateFirestore = useCallback(
		debounce(async (gameId: string, gameValues: GameType) => {
			await setDoc(doc(db, "sessions", gameId as string), gameValues);
		}, 300),
		[] // dependencies array is empty so this function is only created once
	);

	useEffect(() => {
		if (game_id) {
			debouncedUpdateFirestore(game_id, gameValues);
		}
	}, [game_id, gameValues, debouncedUpdateFirestore]);

	const currentPlayer = useMemo(
		() =>
			gameValues.playerTurn === PlayerTurn.PLAYER_ONE
				? gameValues.player_one
				: gameValues.player_two,
		[gameValues.playerTurn]
	);

	const onMove = currentPlayer?.id === player_id;
	return (
		<GameContext.Provider value={{ gameValues, dispatch, currentPlayer, onMove }}>
			{children}
		</GameContext.Provider>
	);
};

export const useGameContext = () => {
	return useContext(GameContext);
};
