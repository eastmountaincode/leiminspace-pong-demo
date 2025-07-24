'use client';

import { useAtom } from 'jotai';
import { 
  gameStateAtom, 
  playerStatesAtom, 
  resetPlayersAtom
} from '../store/appStateAtoms';
import GameLayout from '../components/GameLayout';
import IntroContent from '../components/IntroContent';
import PongCanvas from '../components/PongCanvas';

export default function PongGame() {
  const [gameState] = useAtom(gameStateAtom);
  const [playerStates] = useAtom(playerStatesAtom);
  const [, resetPlayers] = useAtom(resetPlayersAtom);

  const resetGame = () => {
    resetPlayers();
  };

  const showResetButton = playerStates.player1Ready || playerStates.player2Ready;

  return (
    <GameLayout showResetButton={showResetButton} onReset={resetGame}>
      {gameState === 'playing' ? (
        <PongCanvas />
      ) : (
        <IntroContent />
      )}
    </GameLayout>
  );
}
