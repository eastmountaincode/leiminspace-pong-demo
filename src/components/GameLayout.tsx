import { ReactNode } from 'react';

interface GameLayoutProps {
  children: ReactNode;
  showResetButton?: boolean;
  onReset?: () => void;
  showAboutButton?: boolean;
  onAbout?: () => void;
}

const startButtonStyles = {
  padding: '0',
  border: 'none',
  background: 'transparent',
  color: 'white',
  fontFamily: "Bit9x9",
  cursor: 'pointer',
};

export default function GameLayout({ 
  children,
  showResetButton = false, 
  onReset,
  showAboutButton = true,
  onAbout
}: GameLayoutProps) {
  return (
    <div className="w-full h-screen bg-black text-white flex relative">
      {/* Persistent Dashed Center Line for all modes */}
      <div 
        className="absolute top-0 left-1/2 h-full pointer-events-none z-5 center-dashed-line" 
        style={{
          width: '3px',
          marginLeft: '-1.5px' // Center the 3px line
        }} 
      />
      
      {children}

      {/* About button - usually shown */}
      {showAboutButton && onAbout && (
        <div className="absolute top-6 left-6 z-10">
          <button
            onClick={onAbout}
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
            ABOUT
          </button>
        </div>
      )}

      {/* Reset button - conditionally shown */}
      {showResetButton && onReset && (
        <div className="absolute top-6 right-6 z-10">
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