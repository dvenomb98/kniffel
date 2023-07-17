import React, { FC } from "react";
import Container from "../layouts/Container";

const Navbar: FC = () => {
	return (
		<nav className="p-10 bg-neutral-dark">
			<Container>
				<div className="flex items-center justify-center">
				<h1 className="font-light">Yahtzee</h1>
				</div>
				
			</Container>
		</nav>
	);
};

export default Navbar;
