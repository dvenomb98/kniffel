import React, { FC, ReactNode, useMemo } from 'react';
import GameLayout from './layouts/GameLayout';
import Board from './Board';
import { Alert, Button, CircularProgress, LinearProgress } from '@mui/material';
import StatsBar from './gameStats/StatsBar';
import { ActionTypes } from '@/utils/game/gameReducer';
import { useGameContext } from '@/context/game/GameContext';
import { GameState } from '@/types/game/types';
import classNames from 'classnames';
import GameCreateLayout from './layouts/GameCreateLayout';
import useMobileWidth from '@/hooks/useMobile';
import { useRouter } from 'next/router';

interface GameMainLayoutProps {
  children: ReactNode;
}

const GameMainLayout: FC<GameMainLayoutProps> = ({ children }) => {
  const { onMove, gameValues, player_id, isDebouncing } = useGameContext();
  const { push } = useRouter();

  const asPlayer = useMemo(() => {
    if (gameValues?.player_one?.id === player_id) return gameValues?.player_one.name;
    else if (gameValues?.player_two?.id === player_id) return gameValues?.player_two.name;
    else return 'Spectator';
  }, [player_id, gameValues?.player_one?.id, gameValues?.player_two?.id]);

  if (!gameValues) return null;

  const { gameState } = gameValues;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p>
          Connected as <span className="text-primary-gold">{asPlayer}</span>
        </p>
        {gameState === GameState.FINISHED && (
          <Button onClick={() => push('/')} variant="outlined" sx={{ textTransform: 'initial' }}>
            Create a new game
          </Button>
        )}
      </div>
      <div className="h-2">
        {gameState === GameState.IN_PROGRESS && isDebouncing && (
          <LinearProgress color="secondary" />
        )}
      </div>
      <div
        className={classNames(
          'flex justify-between items-start gap-5 w-full  transform duration-500 ease-in-out mx-auto border p-10 bg-neutral-dark rounded-md',
          onMove
            ? gameState !== GameState.FINISHED && 'border-primary-gold'
            : 'border-secondary/50',
        )}
      >
        {children}
      </div>
    </div>
  );
};

const Game: FC = () => {
  const { gameValues, dispatch, currentPlayer, onMove, isDebouncing } = useGameContext();
  const { isMobile } = useMobileWidth();

  if (!gameValues) return null;

  const { gameState, rollsLeft, round } = gameValues;

  if (isMobile) {
    return (
      <GameCreateLayout>
        <Alert sx={{ m: 2, p: 4 }} severity="error">
          Sorry, I am to lazy to make it for mobile.{' '}
          <span className="font-bold">Please, switch for 1024px and more window screen size.</span>
        </Alert>
      </GameCreateLayout>
    );
  }

  if (gameState === GameState.NOT_STARTED) {
    return (
      <GameCreateLayout>
        <div className="flex flex-col gap-10 items-center justify-center w-full">
          <h4 className="flex animate-pulse">Waiting for other player...</h4>
          <CircularProgress color="primary" />
        </div>
      </GameCreateLayout>
    );
  } else if (gameState === GameState.IN_PROGRESS) {
    return (
      <GameMainLayout>
        {/* GAME BOARD */}
        <GameLayout>
          <div className="flex items-center justify-between w-full">
            <Button
              onClick={() => dispatch({ type: ActionTypes.ROLL_DICE })}
              variant="outlined"
              color="primary"
              size="large"
              disabled={!gameValues.rollsLeft || !onMove || isDebouncing}
            >
              Roll dices
            </Button>
            <p className="text-primary-gray">
              Rolls left: <span className="text-secondary-light">{rollsLeft}</span>
            </p>
            <p className="text-primary-gray">
              Round: <span className="text-secondary-light">{round}/26</span>
            </p>
          </div>
          <Board />
        </GameLayout>
        {/* GAME STATISTICS */}
        <StatsBar currentPlayer={currentPlayer} />
      </GameMainLayout>
    );
  } else if (gameState === GameState.FINISHED) {
    return (
      <GameMainLayout>
        <StatsBar currentPlayer={gameValues.player_one} />
        <StatsBar currentPlayer={gameValues.player_two} />
      </GameMainLayout>
    );
  }
};

export default Game;
