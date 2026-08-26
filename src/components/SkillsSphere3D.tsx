"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

const SKILLS = [
  "Next.js 15", "React Native", "TypeScript", "Tailwind CSS",
  "Supabase", "Node.js", "CUDA C++", "Firebase",
  "Zustand", "Stripe", "PostgreSQL", "C#",
  "Python", "Docker", "Git", "REST APIs",
  "Framer Motion", "Three.js", "GraphQL", "Shadcn UI"
];

interface TagProps {
  children: string;
  position: THREE.Vector3;
}

function Tag({ children, position }: TagProps) {
  return (
    <Html position={position} center distanceFactor={10}>
      <div className="select-none cursor-pointer rounded-xl border border-sky-500/30 bg-slate-900/80 px-3 py-1.5 text-xs font-mono font-semibold text-sky-400 backdrop-blur-md shadow-lg shadow-sky-500/10 transition-all hover:scale-125 hover:border-sky-400 hover:bg-sky-500 hover:text-slate-950">
        {children}
      </div>
    </Html>
  );
}

function TagCloud({ radius = 3.2 }: { radius?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  // Distribute skills evenly on a sphere using Fibonacci sphere algorithm
  const tags = useMemo(() => {
    const temp: { position: THREE.Vector3; name: string }[] = [];
    const count = SKILLS.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // Radius at y
      const theta = phi * i; // Golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      temp.push({
        position: new THREE.Vector3(x * radius, y * radius, z * radius),
        name: SKILLS[i],
      });
    }

    return temp;
  }, [radius]);

  // Gentle continuous rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {tags.map((tag, idx) => (
          <Tag key={idx} position={tag.position}>
            {tag.name}
          </Tag>
        ))}
      </group>
    </Float>
  );
}

export default function SkillsSphere3D() {
  return (
    <div className="relative h-[450px] w-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1} />
        <TagCloud />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
