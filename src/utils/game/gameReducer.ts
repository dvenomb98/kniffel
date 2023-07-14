import { BottomLayerKeys, GameType, Layer, PlayerTurn, PossibleValue, UpperLayerKeys } from "@/types/game/types";
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
	| { type: ActionTypes.SWITCH_PLAYER }
	| { type: ActionTypes.HOLD_DIE; payload: string } // id of the die
	| {
			type: ActionTypes.SET_SCORE;
			payload: {
				scoreType: UpperLayerKeys | BottomLayerKeys
				scoreValue: PossibleValue;
				layer: Layer
			};
	  };

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
		case ActionTypes.SET_SCORE:
			const { scoreType, scoreValue, layer } = action.payload;
			const { player_one, player_two, playerTurn } = state;

			const defaultResetState = {
				...state,
				boardValues: initialDice,
				playerTurn: playerTurn === PlayerTurn.PLAYER_ONE ? PlayerTurn.PLAYER_TWO : PlayerTurn.PLAYER_ONE,
				rollsLeft: 3, // resetting rolls left and possible scores after scoring
				possibleScores: initialScore, // resetting dice state
			};

			// we determine which player to update the score for based on the current playerTurn
			const playerToUpdate = playerTurn === PlayerTurn.PLAYER_ONE ? player_one : player_two;

			// we need to check whether scoreType belongs to upper_layer or bottom_layer
			let updatedLayer 

			if (layer === "upper_layer") {
				updatedLayer = {
					...playerToUpdate.stats.upper_layer,
					[scoreType as keyof typeof playerToUpdate.stats.upper_layer]: scoreValue,
				}

				return {
					...defaultResetState,
					player_one:
						playerTurn === PlayerTurn.PLAYER_ONE
							? { ...player_one, stats: { ...player_one.stats, upper_layer: updatedLayer} }
							: player_one,
					player_two:
						playerTurn === PlayerTurn.PLAYER_TWO
							? { ...player_two, stats: { ...player_one.stats, upper_layer: updatedLayer} }
							: player_two,
				};
			}

			return state

	

		default:
			return state;
	}
};
