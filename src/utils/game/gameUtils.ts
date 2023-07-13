import { Die } from "@/types/game/types";
import { nanoid } from "nanoid";

export const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
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
		gesamt: 0,
	};
	const bottom_layer = {
		dreier_pasch: 0,
		vierer_pasch: 0,
		kleine: 0,
		grobe: 0,
		full_house: 0,
		kniffel: 0,
		chance: 0,
		gesamt: 0,
	};

	return { upper_layer, bottom_layer };
};
