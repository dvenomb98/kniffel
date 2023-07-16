
import React, { FC } from "react";
import ScoreList from "../atoms/ScoreList";
import ScoreLayout from "../layouts/ScoreLayout";
import { Player } from "@/types/game/types";



interface UpperLayerScoreProps {
	currentPlayer: Player
}

const UpperLayerScore: FC<UpperLayerScoreProps> = ({currentPlayer}) => {
	
	const { one_er, two_er, three_er, for_er, five_er, six_er } = currentPlayer.stats.upper_layer;


	return (
		<ScoreLayout>
			<ScoreList title="1er" value={one_er} object_key="one_er" layer="upper_layer" currentPlayer={currentPlayer}   />
			<ScoreList title="2er" value={two_er} object_key="two_er" layer="upper_layer" currentPlayer={currentPlayer}    />
			<ScoreList title="3er" value={three_er}object_key="three_er" layer="upper_layer"currentPlayer={currentPlayer}   />
			<ScoreList title="4er" value={for_er} object_key="for_er" layer="upper_layer" currentPlayer={currentPlayer}   />
			<ScoreList title="5er" value={five_er} object_key="five_er" layer="upper_layer" currentPlayer={currentPlayer}   />
			<ScoreList title="6er" value={six_er} object_key="six_er" layer="upper_layer"currentPlayer={currentPlayer}   />
		</ScoreLayout>
	);
};

export default UpperLayerScore;
