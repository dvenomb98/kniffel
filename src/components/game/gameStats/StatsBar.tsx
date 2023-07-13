import { Player, PossibleScore } from '@/types/game/types'
import React, { Dispatch, FC } from 'react'
import UpperLayer from './UpperLayer'
import BottomLayer from './BottomLayer'
import { Action } from '@/utils/game/gameReducer'

interface StatsBarProps {
   playerOnTurn: Player
   dispatch: Dispatch<Action>
   possibleScores: PossibleScore
}

const StatsBar: FC<StatsBarProps> = ({playerOnTurn, dispatch, possibleScores}) => {
  return (
    <div className='flex flex-col gap-2 basis-1/4'>
      <p>Current turn: {playerOnTurn.name}
      <span className='text-primary-gray mx-2'>{`(${playerOnTurn.order})`}</span>
      </p>

    <div className='flex flex-col gap-4'>
        <UpperLayer stats={playerOnTurn.stats.upper_layer} dispatch={dispatch} possibleScores={possibleScores} />
        {/* <BottomLayer stats={playerOnTurn.stats.bottom_layer} dispatch={dispatch} /> */}
    </div>
    </div>
  )
}

export default StatsBar