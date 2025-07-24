import { ReactNode } from 'react';

interface GameBoardProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  showResetButton?: boolean;
  onReset?: () => void;
}

const startButtonStyles = {
  padding: '0',
  border: 'none',
  background: 'transparent',
  color: 'white',
  fontFamily: "Bit9x9",
  cursor: 'pointer',
};

export default function GameBoard({ 
  leftContent, 
  rightContent, 
  showResetButton = false, 
  onReset 
}: GameBoardProps) {
  return (
    <div className="w-full h-screen bg-black text-white flex">
      {/* Left Side */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center custom-dashed-border">
        <div className="text-center">
          {leftContent}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <div className="text-center">
          {rightContent}
        </div>
      </div>

      {/* Reset button */}
      {showResetButton && onReset && (
        <div className="absolute top-6 right-6">
          <button
            onClick={onReset}
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
            RESET
          </button>
        </div>
      )}
    </div>
  );
} 