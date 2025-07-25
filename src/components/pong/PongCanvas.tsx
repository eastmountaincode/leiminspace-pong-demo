import { Canvas, useThree } from '@react-three/fiber';
import { useState, useRef } from 'react';
import Paddle from './Paddle';
import PaddleControls from './PaddleControls';
import Scoreboard from './Scoreboard';
import { Mesh } from 'three';
import Ball from './Ball';
import BallPhysics from './BallPhysics';


// Component inside Canvas that can access viewport info
function GameElements({
    leftPaddlePosition,
    rightPaddlePosition,
    leftScore,
    rightScore,
    setLeftScore,
    setRightScore
}: {
    leftPaddlePosition: { x: number; y: number };
    rightPaddlePosition: { x: number; y: number };
    leftScore: number;
    rightScore: number;
    setLeftScore: React.Dispatch<React.SetStateAction<number>>;
    setRightScore: React.Dispatch<React.SetStateAction<number>>;
}) {
    const { viewport } = useThree();

    // Calculate responsive paddle positions as percentage from edges
    const leftPaddleDistance = viewport.width * 0.035; // 15% from left edge
    const rightPaddleDistance = viewport.width * 0.027; // 15% from right edge

    const responsiveLeftX = -viewport.width / 2 + leftPaddleDistance;
    const responsiveRightX = viewport.width / 2 - rightPaddleDistance;


    const leftHitRef = useRef<Mesh>(null);
    const rightHitRef = useRef<Mesh>(null);
    const ballRef = useRef<Mesh>(null);

    return (
        <>
            {/* Ambient light to make textures visible */}
            <ambientLight intensity={1} />

            {/* Scoreboard */}
            <Scoreboard
                leftScore={leftScore}
                rightScore={rightScore}
            />

            {/* Ball */}
            <Ball ref={ballRef} />

            {/* Ball Physics */}
            <BallPhysics
                ballRef={ballRef}
                leftRef={leftHitRef}
                rightRef={rightHitRef}
                onScore={(side) => {
                    if (side === 'left') setLeftScore(s => s + 1);
                    if (side === 'right') setRightScore(s => s + 1);
                }}
            />

            {/* Left paddle (Leimin) - 462x153 -> rotated to 153x462 */}
            <Paddle
                ref={leftHitRef}
                position={[responsiveLeftX, leftPaddlePosition.y, 0]}
                imageSrc="/images/leimin_paddle.png"
                width={153}
                height={462}
                hitBoxWidth={90}
                hitBoxHeight={430}
                hitBoxOffsetX={0.1}
                hitBoxOffsetY={0}
                showHitBox={false}
            />

            {/* Right paddle (Space) - 409x135 -> rotated to 135x409 */}
            <Paddle
                ref={rightHitRef}
                position={[responsiveRightX, rightPaddlePosition.y, 0]}
                imageSrc="/images/space_paddle.png"
                width={135}
                height={409}
                hitBoxWidth={85}
                hitBoxHeight={350}
                hitBoxOffsetX={-0.09}
                hitBoxOffsetY={-0.1}
                showHitBox={false}
            />
        </>
    );
}

export default function PongCanvas() {
    const [leftPaddlePosition, setLeftPaddlePosition] = useState({ x: 0, y: 0 });
    const [rightPaddlePosition, setRightPaddlePosition] = useState({ x: 0, y: 0 });
    const [leftScore, setLeftScore] = useState(0);
    const [rightScore, setRightScore] = useState(0);

    // Simple, fixed bounds for both paddles
    const leftPaddleBoundsY = { min: -2.6, max: 2.5 };
    const rightPaddleBoundsY = { min: -2.68, max: 2.8 };

    return (
        <div className="w-full h-full relative">
            {/* Paddle Controls Component */}
            <PaddleControls
                onLeftPaddleMove={setLeftPaddlePosition}
                onRightPaddleMove={setRightPaddlePosition}
                paddleSpeed={0.08}
                leftPaddleBoundsY={leftPaddleBoundsY}
                rightPaddleBoundsY={rightPaddleBoundsY}
                leftPaddleBoundsX={{ min: -4, max: -0.1 }}
                rightPaddleBoundsX={{ min: 0.1, max: 4 }}
            />



            <Canvas
                camera={{
                    position: [0, 0, 5],
                    fov: 75,
                    near: 0.1,
                    far: 1000
                }}
                style={{ background: 'transparent' }}
            >
                <GameElements
                    leftPaddlePosition={leftPaddlePosition}
                    rightPaddlePosition={rightPaddlePosition}
                    leftScore={leftScore}
                    rightScore={rightScore}
                    setLeftScore={setLeftScore}
                    setRightScore={setRightScore}
                />
            </Canvas>
        </div>
    );
} 