import Game from "@/components/game/Game";
import PageLayout from "@/components/layouts/PageLayout";
import { GameProvider } from "@/context/game/GameContext";
import { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<PageLayout>
			<GameProvider>
				<Game />
			</GameProvider>
		</PageLayout>
	);
};

export default Home;
