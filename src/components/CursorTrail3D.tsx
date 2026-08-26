"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 40;

function ParticleSystem() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Store individual particle state (position, scale, velocity, life)
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: 0,
      y: 0,
      z: 0,
      vx: (Math.random() - 0.5) * 0.02,
      vy: (Math.random() - 0.5) * 0.02,
      scale: 0,
      life: 0,
      maxLife: 0.6 + Math.random() * 0.4,
    }));
  }, []);

  const lastSpawnIndex = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // 1. Convert normalized pointer (-1 to 1) into 3D world coordinates
    const targetX = (state.pointer.x * state.viewport.width) / 2;
    const targetY = (state.pointer.y * state.viewport.height) / 2;

    // 2. Cycle through particle pool and spawn a new particle at cursor location
    const pIndex = lastSpawnIndex.current;
    const p = particles[pIndex];

    if (p.life <= 0) {
      p.x = targetX;
      p.y = targetY;
      p.z = 0;
      p.vx = (Math.random() - 0.5) * 0.03;
      p.vy = (Math.random() - 0.5) * 0.03;
      p.scale = 0.18 + Math.random() * 0.12;
      p.life = p.maxLife;
      lastSpawnIndex.current = (lastSpawnIndex.current + 1) % PARTICLE_COUNT;
    }

    // 3. Update particle physics & update instance matrix
    particles.forEach((particle, idx) => {
      if (particle.life > 0) {
        particle.life -= delta;
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Shrink particle as life decreases
        const progress = Math.max(0, particle.life / particle.maxLife);
        const currentScale = particle.scale * progress;

        dummy.position.set(particle.x, particle.y, particle.z);
        dummy.scale.set(currentScale, currentScale, currentScale);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);
      } else {
        // Hide dead particle
        dummy.position.set(0, 0, -100);
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);
      }
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, PARTICLE_COUNT]}
    >
      <octahedronGeometry args={[0.3, 0]} />
      <meshBasicMaterial
        color="#38bdf8"
        transparent
        opacity={0.7}
        wireframe
      />
    </instancedMesh>
  );
}

export default function CursorTrail3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleSystem />
      </Canvas>
    </div>
  );
}
