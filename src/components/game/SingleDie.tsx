import { useGameContext } from "@/context/game/GameContext";
import { Die } from "@/types/game/types";
import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";

interface SingleDieProps {
	die: Die;
	holdDie: () => void;
}

const SingleDie: FC<SingleDieProps> = ({ die, holdDie }) => {
	const { gameValues } = useGameContext();
	const [animate, setAnimate] = useState<boolean>(false);
	const { value, isHeld } = die;

	const shouldChangeBorder = isHeld || !gameValues.rollsLeft;

	useEffect(() => {
		if (isHeld || gameValues.rollsLeft === 3 || !gameValues.rollsLeft) return;
		setAnimate(true);
		const timer = setTimeout(() => setAnimate(false), 100); // Reset after 0.1s
		return () => clearTimeout(timer); // Clear timer on unmount or value change
	}, [value, isHeld, gameValues.rollsLeft]);

	return (
		<div
			onClick={holdDie}
			className={classNames(
				"w-32 aspect-square border-2 rounded-md flex items-center justify-center bg-secondary-dark",
				shouldChangeBorder ? "border-primary-gold-light" : "border-neutral-dark"
			)}
		>
			<p
				className={classNames(
					"text-h2 transition transform duration-100 ease-in-out",
					animate && "scale-150"
				)}
			>
				{!value ? "?" : value}
			</p>
		</div>
	);
};

export default SingleDie;
