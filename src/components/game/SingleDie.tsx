import { Die } from "@/types/game/types";
import classNames from "classnames";
import React, { FC } from "react";

interface SingleDieProps {
	die: Die;
	holdDie: () => void;
	rollsLeft: number
}

const SingleDie: FC<SingleDieProps> = ({ die, holdDie, rollsLeft }) => {
	const { value, isHeld } = die;

	const shouldChangeBorder = isHeld || !rollsLeft

	return (
		<div
			onClick={holdDie}
			className={classNames(
				"w-32 aspect-square border-2 rounded-md flex items-center justify-center bg-secondary-dark",
				shouldChangeBorder ?  "border-primary-gold" : "border-neutral-dark"
			)}
		>
			<p className="text-h2">{!value ? "?" : value}</p>
		</div>
	);
};

export default SingleDie;
