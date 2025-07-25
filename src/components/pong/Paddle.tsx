import { useTexture } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh, ShaderMaterial } from 'three';

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

export default function Paddle({ 
  position, 
  imageSrc, 
  width, 
  height, 
  hitBoxWidth = width * 0.8, 
  hitBoxHeight = height * 0.9,
  hitBoxOffsetX = 0,
  hitBoxOffsetY = 0,
  showHitBox = true 
}: PaddleProps) {
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
  
  // Calculate hit box dimensions after rotation (since paddle is rotated 90 degrees)
  const hitBoxDisplayWidth = hitBoxHeight / 200; // Height becomes width after rotation
  const hitBoxDisplayHeight = hitBoxWidth / 200; // Width becomes height after rotation
  
  return (
    <group position={position}>
      {/* Paddle mesh */}
      <mesh ref={meshRef} rotation={[0, 0, Math.PI / 2]} material={shaderMaterial}>
        {/* Create a plane geometry sized to match the rotated image */}
        <planeGeometry args={[height / 200, width / 200]} />
      </mesh>
      
      {/* Hit box visualization */}
      {showHitBox && (
        <mesh 
          rotation={[0, 0, Math.PI / 2]} 
          position={[hitBoxOffsetX, hitBoxOffsetY, 0.005]}
        >
          <boxGeometry args={[hitBoxDisplayWidth, hitBoxDisplayHeight, 0.01]} />
          <meshBasicMaterial 
            color="#00ff00" 
            wireframe={true} 
            transparent={true} 
            opacity={0.5}
          />
        </mesh>
      )}
    </group>
  );
} 