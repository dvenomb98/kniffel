import { PossibleScore, UpperLayer } from '@/types/game/types'
import React, { Dispatch, FC } from 'react'
import ScoreList from '../atoms/ScoreList'
import ScoreLayout from '../layouts/ScoreLayout'
import { Action, ActionTypes } from '@/utils/game/gameReducer'

interface UpperLayerProps {
stats: UpperLayer
dispatch: Dispatch<Action>
possibleScores: PossibleScore
}

const UpperLayer: FC<UpperLayerProps> = ({stats, dispatch}) => {


const {one_er, two_er, three_er, for_er, five_er, six_er} = stats





  return (
    <ScoreLayout>
      <ScoreList title='1er' value={one_er} handleAddScore={() => {}} />
      <ScoreList title='2er' value={two_er} handleAddScore={() => {}} />
      <ScoreList title='3er' value={three_er} handleAddScore={() => {}} />
      <ScoreList title='4er' value={for_er} handleAddScore={() => {}} />
      <ScoreList title='5er' value={five_er} handleAddScore={() => {}} />
      <ScoreList title='6er' value={six_er} handleAddScore={() => {}} />
    </ScoreLayout>
  )
}

export default UpperLayer