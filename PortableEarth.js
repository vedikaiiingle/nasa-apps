import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, useTexture, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Earth texture - you'll need to copy this file to your public folder
const EARTH_TEXTURE = '/earth_hd.jpg';

function RotatingEarth() {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const earthTexture = useTexture(EARTH_TEXTURE);
  
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group scale={[1.0, 1.0, 1.0]}>
      <Sphere ref={earthRef} args={[1.1, 100, 100]}>
        <meshStandardMaterial
          map={earthTexture}
          metalness={0.1}
          roughness={0.1}
          emissive="#003366"
          emissiveIntensity={0.2}
          envMapIntensity={1.2}
          bumpScale={0.1}
        />
      </Sphere>
      <Sphere ref={cloudsRef} args={[1.15, 50, 50]}>
        <meshPhongMaterial
          color="#4a90e2"
          transparent
          opacity={0.4}
          side={THREE.BackSide}
          shininess={100}
        />
      </Sphere>
    </group>
  );
}

function PortableEarth({ style = {} }) {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      ...style
    }}>
      <Canvas
        camera={{ position: [0, 0, 3.0], fov: 70 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} color="#ffffff" />
        <directionalLight 
          position={[5, 3, 5]} 
          intensity={3.5} 
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Stars 
          radius={800} 
          depth={150} 
          count={30000} 
          factor={8} 
          saturation={0} 
          fade={true}
          speed={0.3}
        />
        <RotatingEarth />
      </Canvas>
    </div>
  );
}

export default PortableEarth;
