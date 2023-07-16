import Game from "@/components/game/Game";
import GameCreateLayout from "@/components/game/layouts/GameCreateLayout";
import PageLayout from "@/components/layouts/PageLayout";
import { GameProvider } from "@/context/game/GameContext";
import { createNewGame } from "@/utils/game/firebaseUtils";
import { Button } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
	const [sessionURL, setSessionURL] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const handleCreateGame = async () => {
		setLoading(true);
		const sessionURL = await createNewGame(); // initialGameValues could come from your context
		if (!sessionURL) console.log("ERROR HAPPENED");
		setSessionURL(sessionURL);

		setLoading(false);
	};

	return (
		<PageLayout>
			<GameCreateLayout>
				{sessionURL ? (
					<div className="flex flex-col w-full justify-center items-center gap-5">
						<p className="text-h3">Share this link to start the game:</p>
						<a href={sessionURL} className="text-primary-gold">
							{sessionURL}
						</a>
					</div>
				) : (
					<Button onClick={handleCreateGame} disabled={loading} variant="outlined" size="large">
						Create a game
					</Button>
				)}
			</GameCreateLayout>
		</PageLayout>
	);
};

export default Home;
