import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { GameState, GameType } from "@/types/game/types";
import { GameProvider } from "@/context/game/GameContext";
import Game from "@/components/game/Game";
import PageLayout from "@/components/layouts/PageLayout";
import { nanoid } from "nanoid";

const GamePage = () => {
	const router = useRouter();
	const { gameId } = router.query;
	const [playerId, setPlayerId] = useState<string | null>(null);
	const [game, setGame] = useState<GameType | null>(null);


    console.log(game)

	useEffect(() => {
		const playerId_localed = localStorage.getItem("playerId");

		if (!playerId_localed) {
			const newID = nanoid();
			localStorage.setItem("playerId", newID);
			setPlayerId(newID);
		}

		setPlayerId(playerId_localed);
	}, [playerId]);

	useEffect(() => {
		if (!gameId || !playerId) return; // gameId might be undefined for a moment
		const sessionRef = doc(db, "sessions", gameId as string);

		const unsub = onSnapshot(sessionRef, (doc) => {
			if (!doc.exists()) console.log("Session does not exists!");

			let sessionData = doc.data() as GameType;
			const { player_one, player_two, gameState } = sessionData;

			// Checking for both players
			if (!player_one.id) {
				sessionData.player_one.id = playerId;
			} else if (!!player_one.id && !player_two.id && player_one.id !== playerId) {
				sessionData.player_two.id = playerId;
			}

			// Logic for starting game
			if (player_one.id && player_two.id && gameState === GameState.NOT_STARTED)
				sessionData.gameState = GameState.IN_PROGRESS;

			setGame(sessionData);
		});

		return () => unsub();
	}, [gameId, playerId]);

	return (
		<PageLayout>
			<>
				{game && 
					<GameProvider session_values={game} game_id={gameId as string}>
						<Game />
					</GameProvider>
}
				
			</>
		</PageLayout>
	);
};

export default GamePage;
