import React, { FC } from "react";
import ScoreLayout from "../layouts/ScoreLayout";
import ScoreList from "../atoms/ScoreList";
import { useGameContext } from "@/context/game/GameContext";



const layerType = "bottom_layer"

const BottomLayerScore: FC = () => {
	const { currentPlayer } = useGameContext();
	const { dreier_pasch, vierer_pasch, kleine, grobe, full_house, kniffel, chance } = currentPlayer.stats.bottom_layer;

	return (
		<ScoreLayout>
			<ScoreList title="Dreier Pasch" value={dreier_pasch} layer={layerType} object_key="dreier_pasch" />
			<ScoreList title="Vierer Pasch" value={vierer_pasch} layer={layerType} object_key="vierer_pasch"  />
			<ScoreList title="Kleine Strabe" value={kleine} layer={layerType} object_key="kleine" />
			<ScoreList title="Grobe Strabe" value={grobe} layer={layerType} object_key="grobe"  />
			<ScoreList title="Full house" value={full_house}layer={layerType} object_key="full_house"  />
			<ScoreList title="Kniffel" value={kniffel}layer={layerType} object_key="kniffel"  />
			<ScoreList title="Chance" value={chance}layer={layerType} object_key="chance" />
		</ScoreLayout>
	);
};

export default BottomLayerScore;
