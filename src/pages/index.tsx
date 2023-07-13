import Game from "@/components/game/Game";
import PageLayout from "@/components/layouts/PageLayout";
import { NextPage } from "next";







const Home: NextPage = () => {
	
	return  (
	<PageLayout>
		<Game />
	</PageLayout>
	)
};

export default Home;
