import React, { FC } from "react";
import ScoreLayout from "../layouts/ScoreLayout";
import ScoreList from "../atoms/ScoreList";
import { useGameContext } from "@/context/game/GameContext";
import { Player } from "@/types/game/types";



const layerType = "bottom_layer"

interface BottomLayerScoreProps {
	currentPlayer: Player
}

const BottomLayerScore: FC<BottomLayerScoreProps> = ({currentPlayer}) => {
	const { dreier_pasch, vierer_pasch, kleine, grobe, full_house, kniffel, chance } = currentPlayer.stats.bottom_layer;

	return (
		<ScoreLayout>
			<ScoreList title="Dreier Pasch" value={dreier_pasch} layer={layerType} object_key="dreier_pasch" currentPlayer={currentPlayer}  />
			<ScoreList title="Vierer Pasch" value={vierer_pasch} layer={layerType} object_key="vierer_pasch"currentPlayer={currentPlayer}  />
			<ScoreList title="Kleine Strabe" value={kleine} layer={layerType} object_key="kleine" currentPlayer={currentPlayer} />
			<ScoreList title="Grobe Strabe" value={grobe} layer={layerType} object_key="grobe" currentPlayer={currentPlayer}   />
			<ScoreList title="Full house" value={full_house}layer={layerType} object_key="full_house"currentPlayer={currentPlayer}   />
			<ScoreList title="Kniffel" value={kniffel}layer={layerType} object_key="kniffel"currentPlayer={currentPlayer}   />
			<ScoreList title="Chance" value={chance}layer={layerType} object_key="chance" currentPlayer={currentPlayer} />
		</ScoreLayout>
	);
};

export default BottomLayerScore;
