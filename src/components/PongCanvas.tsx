import { Canvas } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh, ShaderMaterial } from 'three';

interface PaddleProps {
  position: [number, number, number];
  imageSrc: string;
  width: number;
  height: number;
}

function Paddle({ position, imageSrc, width, height }: PaddleProps) {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(imageSrc);
  
  // Custom shader to invert black text to white
  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      map: { value: texture }
    },
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
        vec4 texColor = texture2D(map, vUv);
        // Invert the RGB values, keep alpha
        gl_FragColor = vec4(1.0 - texColor.rgb, texColor.a);
      }
    `,
    transparent: true
  });
  
  return (
    <mesh ref={meshRef} position={position} rotation={[0, 0, Math.PI / 2]} material={shaderMaterial}>
      {/* Create a plane geometry sized to match the rotated image */}
      <planeGeometry args={[height / 100, width / 100]} />
    
    </mesh>
  );
}

export default function PongCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ 
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient light to make textures visible */}
        <ambientLight intensity={1} />
        
        {/* Left paddle (Leimin) - 462x153 -> rotated to 153x462 */}
        <Paddle 
          position={[-4, 0, 0]} 
          imageSrc="/images/leimin_paddle.png"
          width={153}
          height={462}
        />
        
        {/* Right paddle (Space) - 409x135 -> rotated to 135x409 */}
        <Paddle 
          position={[4, 0, 0]} 
          imageSrc="/images/space_paddle.png"
          width={135}
          height={409}
        />
      </Canvas>
    </div>
  );
} 