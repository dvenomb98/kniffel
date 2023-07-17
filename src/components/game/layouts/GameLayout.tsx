import React, { FC, ReactNode } from 'react';

interface GameLayoutProps {
  children: ReactNode;
}

const GameLayout: FC<GameLayoutProps> = ({ children }) => {
  return <div className="flex flex-col items-center gap-10 basis-3/4">{children}</div>;
};

export default GameLayout;
