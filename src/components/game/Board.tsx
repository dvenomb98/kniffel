import { Die, PlayerTurn } from "@/types/game/types";
import React, { Dispatch, FC} from "react";
import BoardLayout from "./layouts/BoardLayout";
import SingleDie from "./SingleDie";
import { Action, ActionTypes } from "@/utils/game/gameReducer";


interface BoardProps {
	playerTurn: PlayerTurn;
	switchPlayerTurn: () => void;
	boardValues: Die[];
	dispatch: Dispatch<Action>
    rollsLeft: number
}

const Board: FC<BoardProps> = ({ playerTurn, switchPlayerTurn, dispatch, boardValues, rollsLeft }) => {

    const holdDie = (id: string) => {
        dispatch({ type: ActionTypes.HOLD_DIE, payload: id });
    };


	return (
		<BoardLayout>
			{boardValues.map((value) => (
				<SingleDie rollsLeft={rollsLeft} key={value.id} die={value} holdDie={() => holdDie(value.id)} />
			))}
		</BoardLayout>
	);
};

export default Board;
