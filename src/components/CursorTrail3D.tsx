"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 50;

// Gradient Palette Setup (Sky Blue -> Electric Purple -> Emerald Accent)
const COLOR_START = new THREE.Color("#38bdf8");
const COLOR_END = new THREE.Color("#a855f7");

function CustomParticleTrail() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Individual particle state
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: 0,
      y: 0,
      z: 0,
      vx: (Math.random() - 0.5) * 0.025,
      vy: (Math.random() - 0.5) * 0.025,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      rotation: Math.random() * Math.PI,
      scale: 0,
      life: 0,
      maxLife: 0.5 + Math.random() * 0.5,
      color: new THREE.Color(),
    }));
  }, []);

  const lastSpawnIndex = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Convert mouse position to 3D world space
    const targetX = (state.pointer.x * state.viewport.width) / 2;
    const targetY = (state.pointer.y * state.viewport.height) / 2;

    // Spawn new particle at mouse position
    const pIndex = lastSpawnIndex.current;
    const p = particles[pIndex];

    if (p.life <= 0) {
      p.x = targetX;
      p.y = targetY;
      p.z = 0;
      p.vx = (Math.random() - 0.5) * 0.035;
      p.vy = (Math.random() - 0.5) * 0.035;
      p.scale = 0.22 + Math.random() * 0.15;
      p.life = p.maxLife;
      p.rotation = Math.random() * Math.PI;
      lastSpawnIndex.current = (lastSpawnIndex.current + 1) % PARTICLE_COUNT;
    }

    // Update particle states and matrix attributes
    particles.forEach((particle, idx) => {
      if (particle.life > 0) {
        particle.life -= delta;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        const progress = Math.max(0, particle.life / particle.maxLife);
        const currentScale = particle.scale * progress;

        // Position & Rotation
        dummy.position.set(particle.x, particle.y, particle.z);
        dummy.rotation.set(particle.rotation, particle.rotation, particle.rotation);
        dummy.scale.set(currentScale, currentScale, currentScale);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);

        // Interpolate Color Gradient over life cycle
        particle.color.copy(COLOR_START).lerp(COLOR_END, 1 - progress);
        meshRef.current.setColorAt(idx, particle.color);
      } else {
        // Hide inactive particles
        dummy.position.set(0, 0, -100);
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);
      }
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, PARTICLE_COUNT]}
    >
      {/* Choice of Shape: IcosahedronGeometry (or TetrahedronGeometry / RingGeometry) */}
      <icosahedronGeometry args={[0.25, 0]} />
      {/* Additive Blending Material for Neon Bloom Glow Effect */}
      <meshBasicMaterial
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
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
        <CustomParticleTrail />
      </Canvas>
    </div>
  );
}
