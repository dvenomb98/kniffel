import { PossibleValue } from "@/types/game/types";
import React, { FC } from "react";

interface ScoreListProps {
	title: string;
	value: PossibleValue;
	handleAddScore: () => void
}

const ScoreList: FC<ScoreListProps> = ({ title, value, handleAddScore }) => {

	return (
		<li 
		onClick={handleAddScore}
		className="flex items-center gap-2 justify-between border-b border-secondary py-1">
			<span className="text-h4 font-bold">{title}</span>
			<span className="text-h4">{value}</span>
		</li>
	);
};

export default ScoreList;
