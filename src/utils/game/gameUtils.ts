import { BottomLayerKeys, Die, GameStats, Layer, Player, PossibleScore, ScoreKeys, UpperLayerKeys } from "@/types/game/types";
import { nanoid } from "nanoid";

const isUpperLayerKey = (key: ScoreKeys): key is UpperLayerKeys => {
	return ['one_er', 'two_er', 'three_er', 'for_er', 'five_er', 'six_er'].includes(key);
};

const isBottomLayerKey = (key: ScoreKeys): key is BottomLayerKeys => {
	return ['dreier_pasch', 'vierer_pasch', 'kleine', 'grobe', 'full_house', 'kniffel', 'chance'].includes(key);
};



export const hasAtLeastNOfAKind = (n: number, counts: { [key: number]: number }): boolean => {
	return Object.values(counts).some((count) => count >= n);
};

export const sumAllDice = (dice: Die[]): number => {
	return dice.reduce((sum, die) => sum + die.value, 0);
};

export const isSmallStraight = (counts: { [key: number]: number }): boolean => {
	const straights = [
		[1, 2, 3, 4],
		[2, 3, 4, 5],
		[3, 4, 5, 6],
	];
	return straights.some((straight) => straight.every((num) => counts[num] >= 1));
};

export const isLargeStraight = (counts: { [key: number]: number }): boolean => {
	const straights = [
		[1, 2, 3, 4, 5],
		[2, 3, 4, 5, 6],
	];
	return straights.some((straight) => straight.every((num) => counts[num] >= 1));
};

export const isFullHouse = (counts: { [key: number]: number }): boolean => {
	const values = Object.values(counts);
	return values.includes(2) && values.includes(3);
};

export const calculateChance = (dice: Die[]): number => {
	return sumAllDice(dice);
};

export const generateNewDie = () => {
	return {
		value: Math.ceil(Math.random() * 6),
		isHeld: false,
		id: nanoid(),
	};
};

export const generateDice = () => {
	const newDice = [];
	for (let i = 0; i < 5; i++) {
		newDice.push(generateNewDie());
	}
	return newDice;
};

export const countDice = (dice: Die[]): { [key: number]: number } => {
	const counts: { [key: number]: number } = {};

	for (let die of dice) {
		if (counts[die.value]) {
			counts[die.value]++;
		} else {
			counts[die.value] = 1;
		}
	}
	return counts;
};

export const canAddScore = (
	scoreType: ScoreKeys,
	possibleScores: PossibleScore,
	layer: Layer,
	currentPlayer: Player
) => {
	if (layer === "upper_layer" && isUpperLayerKey(scoreType)) {
		if (!!currentPlayer.stats.upper_layer[scoreType] ) {
			return false; // Score has already been assigned
		}
		return possibleScores.upper_layer[scoreType] > 0;
	}
	if (layer === "bottom_layer" && isBottomLayerKey(scoreType)) {
		if (!!currentPlayer.stats.bottom_layer[scoreType]) {
			return false; // Score has already been assigned
		}
		return possibleScores.bottom_layer[scoreType] > 0;
	}
	return false;

}

export const calculatePossibleScores = (dice: Die[]) => {
	const counts = countDice(dice);
	// const values = Object.keys(counts).map(Number);

	const upper_layer = {
		one_er: counts[1] * 1 || 0,
		two_er: counts[2] * 2 || 0,
		three_er: counts[3] * 3 || 0,
		for_er: counts[4] * 4 || 0,
		five_er: counts[5] * 5 || 0,
		six_er: counts[6] * 6 || 0,
	};
	const bottom_layer = {
		dreier_pasch: hasAtLeastNOfAKind(3, counts) ? sumAllDice(dice) : 0,
		vierer_pasch: hasAtLeastNOfAKind(4, counts) ? sumAllDice(dice) : 0,
		kleine: isSmallStraight(counts) ? 30 : 0,
		grobe: isLargeStraight(counts) ? 40 : 0,
		full_house: isFullHouse(counts) ? 25 : 0,
		kniffel: hasAtLeastNOfAKind(5, counts) ? 50 : 0,
		chance: sumAllDice(dice),
	};

	return { upper_layer, bottom_layer };
};

export const calculateFinalScore = (playerStats: GameStats) => {
	let totalScore = 0;
	
	for (const layer in playerStats) {
	  if (playerStats.hasOwnProperty(layer)) {
		const stats = playerStats[layer];
		for (const scoreType in stats) {
		  if (stats.hasOwnProperty(scoreType) && stats[scoreType] !== "canceled") {
			totalScore += stats[scoreType];
		  }
		}
	  }
	}
	return totalScore;

}
  