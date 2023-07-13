import React, { FC } from "react";
import ScoreLayout from "../layouts/ScoreLayout";
import ScoreList from "../atoms/ScoreList";
import { BottomLayer } from "@/types/game/types";

interface BottomLayerProps {
	stats: BottomLayer;
	
}

const BottomLayer: FC<BottomLayerProps> = ({ stats }) => {
	const { dreier_pasch, vierer_pasch, kleine, grobe, full_house, kniffel, chance } = stats;

	return (
		<ScoreLayout>
			<ScoreList title="Dreier Pasch" value={dreier_pasch} />
			<ScoreList title="Vierer Pasch" value={vierer_pasch} />
			<ScoreList title="Kleine Strabe" value={kleine} />
			<ScoreList title="Grobe Strabe" value={grobe} />
			<ScoreList title="Full house" value={full_house} />
			<ScoreList title="Kniffel" value={kniffel} />
			<ScoreList title="Chance" value={chance} />
		</ScoreLayout>
	);
};

export default BottomLayer;
