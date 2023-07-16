import React, { FC, ReactNode } from 'react'

interface GameCreateLayoutProps {
    children: ReactNode
}

const GameCreateLayout: FC<GameCreateLayoutProps> = ({children}) => {
  return (
    <div className="w-full h-[800px] flex items-center justify-center border-dashed border border-secondary/50">
        {children}
    </div>
  )
}

export default GameCreateLayout