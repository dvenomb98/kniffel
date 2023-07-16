// possible results 1-6

import { GameState, GameType, Player, PlayerTurn } from "@/types/game/types";
import { nanoid } from "nanoid";

export const initialScore = {
	upper_layer: {
		one_er: 0,
		two_er: 0,
		three_er: 0,
		for_er: 0,
		five_er: 0,
		six_er: 0,
	},
	bottom_layer: {
		dreier_pasch: 0,
		vierer_pasch: 0,
		kleine: 0,
		grobe: 0,
		full_house: 0,
		kniffel: 0,
		chance: 0,
	},
};

export const initialDice = Array.from({ length: 5 }, () => ({
	value: 0,
	isHeld: false,
	id: nanoid(),
}));

export const initialPlayerOneStats: Player = {
	name: "danielbilek98@seznam.cz",
	order: PlayerTurn.PLAYER_ONE,
	stats: initialScore,
	final_score: 0,
	bonus_score: 0
};

export const initialPlayerTwoStats: Player = {
	name: "petrjmeno@seznam.cz",
	order: PlayerTurn.PLAYER_TWO,
	stats: initialScore,
	final_score: 0,
	bonus_score: 0
};

export const initialGameValues: GameType = {
	boardValues: initialDice,
	player_one: initialPlayerOneStats,
	player_two: initialPlayerTwoStats,
	playerTurn: PlayerTurn.PLAYER_ONE,
	rollsLeft: 3,
	possibleScores: initialScore,
	gameState: GameState.IN_PROGRESS,
	round: 1,
	winner: undefined
};
