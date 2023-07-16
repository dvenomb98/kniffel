import Game from "@/components/game/Game";
import PageLayout from "@/components/layouts/PageLayout";
import { GameProvider } from "@/context/game/GameContext";
import { createNewGame } from "@/utils/game/firebaseUtils";
import { Button } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
	const [sessionURL, setSessionURL] = useState<string | null>(null);

	const handleCreateGame = async () => {
		const sessionURL = await createNewGame(); // initialGameValues could come from your context

		if (!sessionURL) console.log("ERROR HAPPENED");

		setSessionURL(sessionURL);
	};

	return (
		<PageLayout>
			<Button onClick={handleCreateGame} variant="outlined">
				CREATE GAME
			</Button>
			{sessionURL && (
				<p>
					Share this link to start the game: <a href={sessionURL}>{sessionURL}</a>
				</p>
			)}
		</PageLayout>
	);
};

export default Home;
