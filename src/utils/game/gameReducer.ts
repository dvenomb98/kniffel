import {
	BottomLayerKeys,
	GameState,
	GameType,
	Layer,
	PlayerTurn,
	PossibleValue,
	UpperLayerKeys,
} from "@/types/game/types";
import { calculatePossibleScores, generateNewDie } from "./gameUtils";
import { initialDice, initialScore } from "@/config/game/config";

// Define action types
export enum ActionTypes {
	ROLL_DICE = "ROLL_DICE",
	SWITCH_PLAYER = "SWITCH_PLAYER",
	HOLD_DIE = "HOLD_DIE",
	SET_SCORE = "SET_SCORE",
}

export type Action =
	| { type: ActionTypes.ROLL_DICE }
	| { type: ActionTypes.HOLD_DIE; payload: string } // id of the die
	| {
			type: ActionTypes.SET_SCORE;
			payload: {
				scoreType: UpperLayerKeys | BottomLayerKeys;
				scoreValue: PossibleValue;
				layer: Layer;
				shouldCancel: boolean;
			};
	  }
	

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
		case ActionTypes.HOLD_DIE:
			return {
				...state,
				boardValues: state.boardValues.map((die) =>
					die.id === action.payload && die.value ? { ...die, isHeld: !die.isHeld } : die
				),
			};
		case ActionTypes.SET_SCORE:
			const { scoreType, scoreValue, layer, shouldCancel } = action.payload;
			const { player_one, player_two, playerTurn, round } = state;

			const newRound = round + 1;
			const newGameState = newRound >= 27 ? GameState.FINISHED : GameState.IN_PROGRESS;

			const defaultResetState = {
				...state,
				boardValues: initialDice,
				playerTurn:
					playerTurn === PlayerTurn.PLAYER_ONE ? PlayerTurn.PLAYER_TWO : PlayerTurn.PLAYER_ONE,
				rollsLeft: 3,
				possibleScores: initialScore,
				round: newRound,
				gameState: newGameState
			};

			const playerToUpdate = playerTurn === PlayerTurn.PLAYER_ONE ? player_one : player_two;

			let updatedLayer;

			if (layer === "upper_layer") {
				updatedLayer = {
					...playerToUpdate.stats.upper_layer,
					[scoreType as keyof typeof playerToUpdate.stats.upper_layer]: shouldCancel
						? "canceled"
						: scoreValue,
				};

				return {
					...defaultResetState,
					player_one:
						playerTurn === PlayerTurn.PLAYER_ONE
							? { ...player_one, stats: { ...player_one.stats, upper_layer: updatedLayer } }
							: player_one,
					player_two:
						playerTurn === PlayerTurn.PLAYER_TWO
							? { ...player_two, stats: { ...player_one.stats, upper_layer: updatedLayer } }
							: player_two,
				};
			} else if (layer === "bottom_layer") {
				updatedLayer = {
					...playerToUpdate.stats.bottom_layer,
					[scoreType as keyof typeof playerToUpdate.stats.bottom_layer]: shouldCancel
						? "canceled"
						: scoreValue,
				};

				return {
					...defaultResetState,
					player_one:
						playerTurn === PlayerTurn.PLAYER_ONE
							? { ...player_one, stats: { ...player_one.stats, bottom_layer: updatedLayer } }
							: player_one,
					player_two:
						playerTurn === PlayerTurn.PLAYER_TWO
							? { ...player_two, stats: { ...player_one.stats, bottom_layer: updatedLayer } }
							: player_two,
				};
			}

			return state;

		
		default:
			return state;
	}
};
