import React, {FC} from "react";
import BoardLayout from "./layouts/BoardLayout";
import SingleDie from "./SingleDie";
import { ActionTypes } from "@/utils/game/gameReducer";
import { useGameContext } from "@/context/game/GameContext";



const Board: FC = () => {

	const {gameValues, dispatch} = useGameContext()
	const {boardValues} = gameValues

    const holdDie = (id: string) => {
        dispatch({ type: ActionTypes.HOLD_DIE, payload: id });
    };

	return (
		<BoardLayout>
			{boardValues.map((value) => (
				<SingleDie key={value.id} die={value} holdDie={() => holdDie(value.id)} />
			))}
		</BoardLayout>
	);
};

export default Board;
