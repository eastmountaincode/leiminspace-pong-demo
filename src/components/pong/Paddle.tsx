import { forwardRef, Ref } from 'react';
import { Mesh, ShaderMaterial } from 'three';
import { useTexture } from '@react-three/drei';

interface PaddleProps {
    position: [number, number, number];
    imageSrc: string;
    width: number;
    height: number;
    hitBoxWidth?: number;
    hitBoxHeight?: number;
    hitBoxOffsetX?: number;
    hitBoxOffsetY?: number;
    showHitBox?: boolean;
}

/**
 * The forwarded ref points to the GREEN hit‑box mesh,
 * not to the larger textured sprite.
 */
const Paddle = forwardRef(function Paddle(
    {
        position,
        imageSrc,
        width,
        height,
        hitBoxWidth = width * 0.8,
        hitBoxHeight = height * 0.9,
        hitBoxOffsetX = 0,
        hitBoxOffsetY = 0,
        showHitBox = true
    }: PaddleProps,
    ref: Ref<Mesh>      // 🔑 parent will receive this
) {
    const texture = useTexture(imageSrc);

    /* ---------- visual sprite (no ref here) ---------- */
    const spriteMat = new ShaderMaterial({
        uniforms: { map: { value: texture } },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D map;
            varying vec2 vUv;
            void main() {
                vec4 tex = texture2D(map, vUv);
                gl_FragColor = vec4(1.0 - tex.rgb, tex.a);
            }
        `,
        transparent: true
    });

    /* convert pixel dims → world units (image is rotated 90°) */
    const hitW = hitBoxHeight / 200;  // becomes width after rotation
    const hitH = hitBoxWidth  / 200;  // becomes height after rotation

    return (
        <group position={position}>
            {/* 1. Textured paddle image — purely visual */}
            <mesh rotation={[0, 0, Math.PI / 2]} material={spriteMat}>
                <planeGeometry args={[height / 200, width / 200]} />
            </mesh>

            {/* 2. Custom hit‑box — this gets the forwarded ref */}
            <mesh
                ref={ref}                          /* 🔑 forwarded here */
                rotation={[0, 0, Math.PI / 2]}
                position={[hitBoxOffsetX, hitBoxOffsetY, 0.005]}
                visible={showHitBox}               /* toggle outline */
            >
                <boxGeometry args={[hitW, hitH, 0.1]} />
                <meshBasicMaterial
                    color="#00ff00"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </group>
    );
});

export default Paddle;
