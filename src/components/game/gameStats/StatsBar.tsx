import React, { FC } from "react";
import { useGameContext } from "@/context/game/GameContext";
import UpperLayerScore from "./UpperLayerScore";
import BottomLayerScore from "./BottomLayerScore";

const StatsBar: FC = () => {
	const { currentPlayer } = useGameContext();

	return (
		<div className="flex flex-col gap-2 basis-1/4  p-8 border border-dashed justify-between border-secondary rounded-md">
			<p className="font-light">
				Current turn: <span className="text-primary-gold">{currentPlayer.name}</span>
				<span className="text-primary-gray mx-2">{`(${currentPlayer.order})`}</span>
			</p>

			<div className="flex flex-col gap-4">
				<UpperLayerScore />
				<BottomLayerScore />
			</div>
		</div>
	);
};

export default StatsBar;
