import React, { FC, ReactNode } from "react";

interface BoardLayoutProps {
	children: ReactNode;
}

const BoardLayout: FC<BoardLayoutProps> = ({ children }) => {
	return (
		<div className="flex items-center justify-center">
			<div className="grid grid-cols-3 grid-rows-2 w-fit gap-4">{children}</div>
		</div>
	);
};

export default BoardLayout;
