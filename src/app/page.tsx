'use client';

import { useAtom } from 'jotai';
import { useState } from 'react';
import { 
  gameStateAtom, 
  playerStatesAtom, 
  resetPlayersAtom
} from '../store/appStateAtoms';
import GameLayout from '../components/GameLayout';
import IntroContent from '../components/IntroContent';
import PongCanvas from '../components/pong/PongCanvas';
import AboutModal from '../components/AboutModal';

export default function PongGame() {
  const [gameState] = useAtom(gameStateAtom);
  const [playerStates] = useAtom(playerStatesAtom);
  const [, resetPlayers] = useAtom(resetPlayersAtom);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const resetGame = () => {
    resetPlayers();
  };

  const showAbout = () => {
    setIsAboutModalOpen(true);
  };

  const closeAboutModal = () => {
    setIsAboutModalOpen(false);
  };

  const showResetButton = playerStates.player1Ready || playerStates.player2Ready;

  return (
    <>
      <GameLayout 
        showResetButton={showResetButton} 
        onReset={resetGame}
        showAboutButton={true}
        onAbout={showAbout}
      >
        {gameState === 'playing' ? (
          <PongCanvas />
        ) : (
          <IntroContent />
        )}
      </GameLayout>

      <AboutModal 
        isOpen={isAboutModalOpen} 
        onClose={closeAboutModal} 
      />
    </>
  );
}
