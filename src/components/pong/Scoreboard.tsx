import { Text } from '@react-three/drei';

interface ScoreboardProps {
  leftScore: number;
  rightScore: number;
  fontSize?: number;
  color?: string;
}

export default function Scoreboard({ 
  leftScore, 
  rightScore, 
  fontSize = 1.5,
  color = "#ffffff"
}: ScoreboardProps) {
  return (
    <>
      {/* Left player score - positioned left of center */}
      <Text
        position={[-1.3, 3.0, 0]}
        fontSize={fontSize}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/bit9x9.ttf"
      >
        {leftScore}
      </Text>
      
      {/* Right player score - positioned right of center */}
      <Text
        position={[1.3, 3.0, 0]}
        fontSize={fontSize}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/bit9x9.ttf"
      >
        {rightScore}
      </Text>
    </>
  );
} 