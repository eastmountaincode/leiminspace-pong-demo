import { forwardRef } from 'react';
import { useTexture } from '@react-three/drei';
import { Mesh, ShaderMaterial } from 'three';

// forwardRef is React helper that lets a parent component attach a ref to something rendered inside a component.
const Ball = forwardRef<Mesh>((_props, ref) => {
  // Load heart texture
  const heartTexture = useTexture('/images/leminspace_heart.png');
  
  // Custom shader to invert black heart to white (same as paddles)
  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      map: { value: heartTexture }
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

  // Ball size
  const ballSize = 0.24;

  return (
    <mesh ref={ref} position={[0, 0, 0]} material={shaderMaterial}>
      <planeGeometry args={[ballSize, ballSize]} />
    </mesh>
  );
}); 

export default Ball;