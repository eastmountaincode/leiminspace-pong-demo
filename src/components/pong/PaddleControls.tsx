import { useEffect, useState } from 'react';

interface PaddleControlsProps {
  onLeftPaddleMove: (position: { x: number; y: number }) => void;
  onRightPaddleMove: (position: { x: number; y: number }) => void;
  paddleSpeed?: number;
  leftPaddleBoundsY?: { min: number; max: number };
  rightPaddleBoundsY?: { min: number; max: number };
  leftPaddleBoundsX?: { min: number; max: number };
  rightPaddleBoundsX?: { min: number; max: number };
}

export default function PaddleControls({ 
  onLeftPaddleMove, 
  onRightPaddleMove, 
  paddleSpeed = 0.1,
  leftPaddleBoundsY = { min: -2, max: 2 },
  rightPaddleBoundsY = { min: -2, max: 2 },
  leftPaddleBoundsX = { min: -8, max: 0 },
  rightPaddleBoundsX = { min: 0, max: 8 }
}: PaddleControlsProps) {
  const [leftPaddleX, setLeftPaddleX] = useState(-6.15);
  const [leftPaddleY, setLeftPaddleY] = useState(0);
  const [rightPaddleX, setRightPaddleX] = useState(6.2);
  const [rightPaddleY, setRightPaddleY] = useState(0);
  const [keysPressed, setKeysPressed] = useState(new Set<string>());

  // Update paddle positions when they change
  useEffect(() => {
    onLeftPaddleMove({ x: leftPaddleX, y: leftPaddleY });
  }, [leftPaddleX, leftPaddleY, onLeftPaddleMove]);

  useEffect(() => {
    onRightPaddleMove({ x: rightPaddleX, y: rightPaddleY });
  }, [rightPaddleX, rightPaddleY, onRightPaddleMove]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeysPressed(prev => new Set(prev).add(event.key.toLowerCase()));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeysPressed(prev => {
        const newSet = new Set(prev);
        newSet.delete(event.key.toLowerCase());
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game loop for smooth movement
  useEffect(() => {
    const gameLoop = setInterval(() => {
      let leftDeltaY = 0;
      let leftDeltaX = 0;
      let rightDeltaY = 0;
      let rightDeltaX = 0;

      // Left paddle controls (WASD)
      if (keysPressed.has('w')) leftDeltaY += paddleSpeed;
      if (keysPressed.has('s')) leftDeltaY -= paddleSpeed;
      if (keysPressed.has('a')) leftDeltaX -= paddleSpeed;
      if (keysPressed.has('d')) leftDeltaX += paddleSpeed;

      // Right paddle controls (Arrow Keys)
      if (keysPressed.has('arrowup')) rightDeltaY += paddleSpeed;
      if (keysPressed.has('arrowdown')) rightDeltaY -= paddleSpeed;
      if (keysPressed.has('arrowleft')) rightDeltaX -= paddleSpeed;
      if (keysPressed.has('arrowright')) rightDeltaX += paddleSpeed;

      // Update positions with bounds checking
      if (leftDeltaY !== 0) {
        setLeftPaddleY(prev => Math.max(leftPaddleBoundsY.min, Math.min(leftPaddleBoundsY.max, prev + leftDeltaY)));
      }
      if (leftDeltaX !== 0) {
        setLeftPaddleX(prev => Math.max(leftPaddleBoundsX.min, Math.min(leftPaddleBoundsX.max, prev + leftDeltaX)));
      }

      if (rightDeltaY !== 0) {
        setRightPaddleY(prev => Math.max(rightPaddleBoundsY.min, Math.min(rightPaddleBoundsY.max, prev + rightDeltaY)));
      }
      if (rightDeltaX !== 0) {
        setRightPaddleX(prev => Math.max(rightPaddleBoundsX.min, Math.min(rightPaddleBoundsX.max, prev + rightDeltaX)));
      }
    }, 16); // ~60 FPS

    return () => clearInterval(gameLoop);
  }, [keysPressed, paddleSpeed, leftPaddleBoundsY, rightPaddleBoundsY, leftPaddleBoundsX, rightPaddleBoundsX]);

  // This component doesn't render anything visible, it just handles controls
  return null;
} 