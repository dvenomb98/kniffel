import React, { FC } from 'react';
import ScoreList from '../atoms/ScoreList';
import ScoreLayout from '../layouts/ScoreLayout';
import { Player } from '@/types/game/types';

interface UpperLayerScoreProps {
  currentPlayer: Player;
}

const UpperLayerScore: FC<UpperLayerScoreProps> = ({ currentPlayer }) => {
  const { aces, twos, threes, fours, fives, sixes } = currentPlayer.stats.upper_layer;

  return (
    <ScoreLayout>
      <ScoreList
        title="Aces"
        value={aces}
        object_key="aces"
        layer="upper_layer"
        currentPlayer={currentPlayer}
      />
      <ScoreList
        title="Twos"
        value={twos}
        object_key="twos"
        layer="upper_layer"
        currentPlayer={currentPlayer}
      />
      <ScoreList
        title="Threes"
        value={threes}
        object_key="threes"
        layer="upper_layer"
        currentPlayer={currentPlayer}
      />
      <ScoreList
        title="Fours"
        value={fours}
        object_key="fours"
        layer="upper_layer"
        currentPlayer={currentPlayer}
      />
      <ScoreList
        title="Fives"
        value={fives}
        object_key="fives"
        layer="upper_layer"
        currentPlayer={currentPlayer}
      />
      <ScoreList
        title="Sixes"
        value={sixes}
        object_key="sixes"
        layer="upper_layer"
        currentPlayer={currentPlayer}
      />
    </ScoreLayout>
  );
};

export default UpperLayerScore;
