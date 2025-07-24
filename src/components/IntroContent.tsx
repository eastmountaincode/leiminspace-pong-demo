import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import {
  playerStatesAtom,
  playerNamesAtom,
  setPlayer1ReadyAtom,
  setPlayer2ReadyAtom,
  bothPlayersReadyAtom,
  startGameAtom
} from '../store/appStateAtoms';

const startButtonStyles = {
  padding: '0',
  border: 'none',
  background: 'transparent',
  color: 'white',
  fontFamily: "Bit9x9",
  cursor: 'pointer',
};

export default function IntroContent() {
  const [playerStates] = useAtom(playerStatesAtom);
  const [playerNames] = useAtom(playerNamesAtom);
  const [, setPlayer1Ready] = useAtom(setPlayer1ReadyAtom);
  const [, setPlayer2Ready] = useAtom(setPlayer2ReadyAtom);
  const [bothPlayersReady] = useAtom(bothPlayersReadyAtom);
  const [, startGame] = useAtom(startGameAtom);
  
  const [showStarting, setShowStarting] = useState(false);

  // Handle transition: both ready -> starting screen -> playing
  useEffect(() => {
    if (bothPlayersReady) {
      console.log('Both players ready - showing starting screen');
      setShowStarting(true);
      
      // After 2000ms, transition to playing
      const timer = setTimeout(() => {
        console.log('Transitioning to playing mode');
        startGame();
        setShowStarting(false);
      }, 2000);
      
      return () => {
        console.log('Cleaning up timer');
        clearTimeout(timer);
      };
    }
  }, [bothPlayersReady, startGame]);

  // Reset starting state when players are reset
  useEffect(() => {
    if (!playerStates.player1Ready && !playerStates.player2Ready) {
      setShowStarting(false);
    }
  }, [playerStates.player1Ready, playerStates.player2Ready]);

  const handlePlayer1Start = () => {
    setPlayer1Ready(true);
  };

  const handlePlayer2Start = () => {
    setPlayer2Ready(true);
  };

  // Render left side content
  const renderLeftContent = () => {
    if (showStarting) {
      return <h2 className="text-2xl">GAME</h2>;
    }

    return (
      <>
        <h2 className="text-2xl">{playerNames.player1}</h2>
        <div>
          {!playerStates.player1Ready ? (
            <button
              onClick={handlePlayer1Start}
              className="text-2xl"
              style={startButtonStyles}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.background = 'white';
                target.style.color = 'black';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.background = 'transparent';
                target.style.color = 'white';
              }}
            >
              START
            </button>
          ) : !playerStates.player2Ready ? (
            <div className="text-2xl">
              WAITING FOR<br />{playerNames.player2}
            </div>
          ) : (
            <div className="text-2xl">
              READY
            </div>
          )}
        </div>
      </>
    );
  };

  // Render right side content
  const renderRightContent = () => {
    if (showStarting) {
      return <h2 className="text-2xl">STARTING</h2>;
    }

    return (
      <>
        <h2 className="text-2xl">{playerNames.player2}</h2>
        <div>
          {!playerStates.player2Ready ? (
            <button
              onClick={handlePlayer2Start}
              className="text-2xl"
              style={startButtonStyles}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.background = 'white';
                target.style.color = 'black';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.background = 'transparent';
                target.style.color = 'white';
              }}
            >
              START
            </button>
          ) : !playerStates.player1Ready ? (
            <div className="text-2xl">
              WAITING FOR<br />{playerNames.player1}
            </div>
          ) : (
            <div className="text-2xl">
              READY
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {/* Left Side */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <div className="text-center">
          {renderLeftContent()}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <div className="text-center">
          {renderRightContent()}
        </div>
      </div>
    </>
  );
} 