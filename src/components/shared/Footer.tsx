import React from "react";
import Container from "../layouts/Container";

const Footer = () => {
	return (
		<nav className="p-10 ">
			<Container>
				<div className="flex items-center justify-center">
					<h1 className="font-light">
						Created by {""}
						<a
							className="underline text-primary-gold"
							href="https://danielbilek.com"
							target="_blank"
						>
							Daniel Bílek
						</a>
					</h1>
				</div>
			</Container>
		</nav>
	);
};

export default Footer;
