import { GameType, PlayerTurn } from "@/types/game/types";
import { calculatePossibleScores, generateNewDie } from "./gameUtils";

// Define action types
export enum ActionTypes {
	ROLL_DICE = "ROLL_DICE",
	SWITCH_PLAYER = "SWITCH_PLAYER",
	HOLD_DIE = "HOLD_DIE",
}

export type Action =
	| { type: ActionTypes.ROLL_DICE }
	| { type: ActionTypes.SWITCH_PLAYER }
	| { type: ActionTypes.HOLD_DIE; payload: string }; // id of the die

export const gameReducer = (state: GameType, action: Action) => {
	switch (action.type) {
		case ActionTypes.ROLL_DICE:
			if (!state.rollsLeft) {
				return state; // if no rolls left, do nothing
			}

			const newBoardValues = state.boardValues.map((die) => (die.isHeld ? die : generateNewDie()));
			const possibleScores = calculatePossibleScores(newBoardValues);

			return {
				...state,
				rollsLeft: state.rollsLeft - 1, // decrement rolls left
				boardValues: newBoardValues,
				possibleScores: possibleScores,
			};
		case ActionTypes.SWITCH_PLAYER:
			return {
				...state,
				rollsLeft: 3,
				playerTurn:
					state.playerTurn === PlayerTurn.PLAYER_ONE
						? PlayerTurn.PLAYER_TWO
						: PlayerTurn.PLAYER_ONE,
			};
		case ActionTypes.HOLD_DIE:
			return {
				...state,
				boardValues: state.boardValues.map((die) =>
					die.id === action.payload && die.value ? { ...die, isHeld: !die.isHeld } : die
				),
			};
		default:
			return state;
	}
};
