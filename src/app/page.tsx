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

// Mobile detection component
function MobileMessage() {
  return (
    <div className="w-full h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center px-6">
        <div className="text-2xl mt-8 leading-relaxed">
          PLEASE USE THIS<br />
          ON DESKTOP FOR<br />
          BEST EXPERIENCE
        </div>
      </div>
    </div>
  );
}

// Desktop content wrapper
function DesktopContent() {
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

export default function PongGame() {
  return (
    <>
      {/* Show mobile message on small screens */}
      <div className="block md:hidden">
        <MobileMessage />
      </div>
      
      {/* Show desktop content on medium screens and up */}
      <div className="hidden md:block">
        <DesktopContent />
      </div>
    </>
  );
}
