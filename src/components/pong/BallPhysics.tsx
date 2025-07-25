import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, Box3, Vector3, Box3Helper } from 'three';

interface BallPhysicsProps {
    ballRef: React.RefObject<Mesh | null>;
    leftRef: React.RefObject<Mesh | null>;
    rightRef: React.RefObject<Mesh | null>;
    onScore: (side: 'left' | 'right') => void;
}

const SHOW_DEBUG_HELPERS = false;

export default function BallPhysics({
    ballRef,
    leftRef,
    rightRef,
    onScore
}: BallPhysicsProps) {
    const vel = useRef(new Vector3(0, 0, 0));        // start stationary
    const isPaused = useRef(true);                   // start paused
    const isInitialized = useRef(false);             // track first game start
    // temporary debug helpers
    const debugHelpers = useRef<{ ball?: Box3Helper; left?: Box3Helper; right?: Box3Helper }>({});
    const { viewport, scene } = useThree();
    const ballHalfSize = 0.12;                       // ball is 0.24×0.24, so radius = 0.12

    useFrame((_, dt) => {
        // 🔑 Update entire scene hierarchy first (parents before children)
        scene.updateMatrixWorld(true);

        const ball = ballRef.current;
        const left = leftRef.current;
        const right = rightRef.current;

        // Early return if refs aren't ready
        if (!ball || !left || !right) return;

        // debug visually
        if (SHOW_DEBUG_HELPERS) {
            if (!debugHelpers.current.ball) {
                debugHelpers.current.ball = new Box3Helper(new Box3(), 0xff0000);  // red ball box
                debugHelpers.current.left = new Box3Helper(new Box3(), 0x00ff00);  // green left box
                debugHelpers.current.right = new Box3Helper(new Box3(), 0x0000ff); // blue right box
                scene.add(debugHelpers.current.ball);
                scene.add(debugHelpers.current.left);
                scene.add(debugHelpers.current.right);
            }
        } else {
            // Remove debug helpers if they exist
            if (debugHelpers.current.ball) {
                scene.remove(debugHelpers.current.ball);
                scene.remove(debugHelpers.current.left!);
                scene.remove(debugHelpers.current.right!);
                debugHelpers.current = {}; // Reset the ref
            }
        }

        // Initialize game start after a delay (only once)
        if (!isInitialized.current) {
            isInitialized.current = true;
            setTimeout(() => {
                const dir = Math.random() < 0.5 ? -1 : 1;
                const randomY = (Math.random() * 2 - 1) * 1.5;
                //vel.current.set(1.0 * dir, randomY, 0); // temporary slower velocity for testing
                vel.current.set(4.20 * dir, randomY, 0);
                isPaused.current = false;
            }, 2000); // 2 second initial delay
            return;
        }

        // Don't move if paused
        if (isPaused.current) return;

        /* ---------- move ---------- */
        ball.position.addScaledVector(vel.current, dt);

        const w2 = viewport.width / 2;
        const h2 = viewport.height / 2;

        /* ---------- wall bounce ---------- */
        if (ball.position.y + ballHalfSize >= h2) {
            ball.position.y = h2 - ballHalfSize;
            vel.current.y = -Math.abs(vel.current.y);
        }
        if (ball.position.y - ballHalfSize <= -h2) {
            ball.position.y = -h2 + ballHalfSize;
            vel.current.y = Math.abs(vel.current.y);
        }

        /* ---------- paddle collisions ---------- */
        const ballBox = new Box3().setFromObject(ball);
        const leftBox = new Box3().setFromObject(left);
        const rightBox = new Box3().setFromObject(right);

        // Update each frame
        if (SHOW_DEBUG_HELPERS) {
            debugHelpers.current.ball!.box.copy(ballBox);
            debugHelpers.current.left!.box.copy(leftBox);
            debugHelpers.current.right!.box.copy(rightBox);
        }

        // Obtain accurate world position of paddles
        const leftWorldPos = new Vector3();
        const rightWorldPos = new Vector3();
        left.getWorldPosition(leftWorldPos);
        right.getWorldPosition(rightWorldPos);


        // Left paddle collision
        if (ballBox.intersectsBox(leftBox) && vel.current.x < 0) {
            ball.position.x = leftBox.max.x + ballHalfSize;
            vel.current.x = Math.abs(vel.current.x);
            // Add spin based on where ball hits paddle
            const hitOffset = ball.position.y - leftWorldPos.y;
            vel.current.y += hitOffset * 3; // Reduced from 5 for more realistic physics
        }

        // Right paddle collision
        if (ballBox.intersectsBox(rightBox) && vel.current.x > 0) {
            ball.position.x = rightBox.min.x - ballHalfSize;
            vel.current.x = -Math.abs(vel.current.x);
            // Add spin based on where ball hits paddle
            const hitOffset = ball.position.y - rightWorldPos.y;
            vel.current.y += hitOffset * 3;
        }

        /* ---------- goal check ---------- */
        if (ball.position.x - ballHalfSize > w2) {
            onScore('left');
            reset();
        }
        if (ball.position.x + ballHalfSize < -w2) {
            onScore('right');
            reset();
        }
    });

    /* reset ball to center with random direction */
    const reset = () => {
        const ball = ballRef.current;
        if (!ball) return; // Safety check

        // Reset position to center
        ball.position.set(0, 0, 0);

        // Pause the ball
        isPaused.current = true;
        vel.current.set(0, 0, 0); // Stop movement immediately

        // Resume after 1.5 seconds with random direction
        setTimeout(() => {
            const dir = Math.random() < 0.5 ? -1 : 1;
            const randomY = (Math.random() * 2 - 1) * 1.5; // Reduced random Y for better gameplay
            vel.current.set(4.20 * dir, randomY, 0);
            isPaused.current = false; // Resume movement
        }, 1500); // 1.5 second pause
    };


    return null; // This component handles logic only, renders nothing
} 