import { useAtom } from 'jotai';
import {
  playerStatesAtom,
  playerNamesAtom,
  setPlayer1ReadyAtom,
  setPlayer2ReadyAtom,
  resetPlayersAtom
} from '../store/appStateAtoms';

const startButtonStyles = {
  padding: '0',
  border: 'none',
  background: 'transparent',
  color: 'white',
  fontFamily: "Bit9x9",
  cursor: 'pointer',
};

interface IntroContentProps {
  player: 'leimin' | 'space';
}

export default function IntroContent({ player }: IntroContentProps) {
  const [playerStates] = useAtom(playerStatesAtom);
  const [playerNames] = useAtom(playerNamesAtom);
  const [, setPlayer1Ready] = useAtom(setPlayer1ReadyAtom);
  const [, setPlayer2Ready] = useAtom(setPlayer2ReadyAtom);

  const isPlayer1 = player === 'leimin';
  const playerName = isPlayer1 ? playerNames.player1 : playerNames.player2;
  const otherPlayerName = isPlayer1 ? playerNames.player2 : playerNames.player1;
  const isThisPlayerReady = isPlayer1 ? playerStates.player1Ready : playerStates.player2Ready;
  const isOtherPlayerReady = isPlayer1 ? playerStates.player2Ready : playerStates.player1Ready;

  const handleStart = () => {
    if (isPlayer1) {
      setPlayer1Ready(true);
    } else {
      setPlayer2Ready(true);
    }
  };

  return (
    <>
      <h2 className="text-2xl">{playerName}</h2>
      <div>
        {!isThisPlayerReady ? (
          <button
            onClick={handleStart}
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
        ) : !isOtherPlayerReady ? (
          <div className="text-2xl">
            WAITING FOR<br />{otherPlayerName}
          </div>
        ) : (
          <div className="text-2xl">
            READY
          </div>
        )}
      </div>
    </>
  );
} 