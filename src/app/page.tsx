'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { 
  gameStateAtom, 
  playerStatesAtom, 
  bothPlayersReadyAtom,
  resetPlayersAtom,
  startGameAtom
} from '../store/appStateAtoms';
import GameBoard from '../components/GameBoard';
import IntroContent from '../components/IntroContent';

export default function PongGame() {
  const [gameState] = useAtom(gameStateAtom);
  const [playerStates] = useAtom(playerStatesAtom);
  const [bothPlayersReady] = useAtom(bothPlayersReadyAtom);
  const [, resetPlayers] = useAtom(resetPlayersAtom);
  const [, startGame] = useAtom(startGameAtom);

  // Auto-transition to playing state when both players are ready
  useEffect(() => {
    if (bothPlayersReady && gameState === 'intro') {
      // Small delay for better UX
      const timer = setTimeout(() => {
        startGame();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [bothPlayersReady, gameState, startGame]);

  const resetGame = () => {
    resetPlayers();
  };

  // Show the game when playing
  if (gameState === 'playing') {
    const leftContent = <h2 className="text-2xl">GAME</h2>;
    const rightContent = <h2 className="text-2xl">STARTING</h2>;

    return (
      <GameBoard 
        leftContent={leftContent}
        rightContent={rightContent}
        showResetButton={true}
        onReset={resetGame}
      />
    );
  }

  // Intro screen
  return (
    <GameBoard 
      leftContent={<IntroContent player="leimin" />}
      rightContent={<IntroContent player="space" />}
      showResetButton={playerStates.player1Ready || playerStates.player2Ready}
      onReset={resetGame}
    />
  );
}
