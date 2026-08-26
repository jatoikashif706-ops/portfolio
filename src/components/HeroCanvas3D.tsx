"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshWobbleMaterial, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

// 1. Reactive Central Wireframe / Wobble Mesh
function AnimatedCoreMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    // Gentle continuous rotation
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.25;

    // React subtly to mouse pointer position
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;

    meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
  });

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.4}>
        <MeshWobbleMaterial
          color="#38bdf8"
          // @ts-ignore - MeshWobbleMaterial props from drei
          distort={0.35}
          speed={1.5}
          roughness={0.1}
          wireframe
        />
      </Sphere>
    </Float>
  );
}

// 2. Interactive Background Particle Cloud
function FloatingParticles() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Rotate particle cloud gently based on cursor position
    groupRef.current.rotation.y = state.pointer.x * 0.3;
    groupRef.current.rotation.x = -state.pointer.y * 0.3;
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={50}
        depth={50}
        count={2500}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </group>
  );
}

// 3. Main WebGL Canvas Component
export default function HeroCanvas3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} color="#38bdf8" intensity={2} />
        <pointLight position={[5, -5, 5]} color="#34d399" intensity={1.5} />

        {/* 3D Scene Elements */}
        <AnimatedCoreMesh />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
