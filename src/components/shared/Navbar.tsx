import React, { FC } from "react";
import Container from "../layouts/Container";

const Navbar: FC = () => {
	return (
		<nav className="p-10">
			<Container>
				<h1>Kniffel</h1>
			</Container>
		</nav>
	);
};

export default Navbar;
