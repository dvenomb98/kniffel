import React, {  FC } from 'react'
import BottomLayer from './BottomLayer'
import { useGameContext } from '@/context/game/GameContext'
import UpperLayerScore from './UpperLayerScore'



const StatsBar: FC = () => {

  const {currentPlayer} = useGameContext()
  return (
    <div className='flex flex-col gap-2 basis-1/4'>
      <p>Current turn: {currentPlayer.name}
      <span className='text-primary-gray mx-2'>{`(${currentPlayer.order})`}</span>
      </p>

    <div className='flex flex-col gap-4'>
        <UpperLayerScore  />
        {/* <BottomLayer stats={playerOnTurn.stats.bottom_layer} dispatch={dispatch} /> */}
    </div>
    </div>
  )
}

export default StatsBar