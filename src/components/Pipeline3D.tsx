"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float, Line } from "@react-three/drei";
import * as THREE from "three";

// System Nodes
const NODES = [
  { id: "client", name: "Client (Next.js/Expo)", pos: [-3.5, 0, 0], color: "#38bdf8", detail: "Frontend Requests & UI" },
  { id: "api", name: "API Gateway", pos: [-1.2, 0, 0], color: "#a855f7", detail: "Authentication & Routing" },
  { id: "ai", name: "AI Engine / Gemini", pos: [1.2, 0, 0], color: "#34d399", detail: "LLM Processing & Vision API" },
  { id: "db", name: "Supabase / DB", pos: [3.5, 0, 0], color: "#f43f5e", detail: "Persisted Data & Storage" },
];

// Animated Data Pulses Traveling Along Paths
function DataPulse({ start, end, speed = 1, delay = 0 }: { start: [number, number, number]; end: [number, number, number]; speed?: number; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const progress = useRef(delay);

  useFrame((_, delta) => {
    progress.current += delta * speed * 0.4;
    if (progress.current > 1) progress.current = 0;

    // Linear interpolation between node positions
    meshRef.current.position.x = THREE.MathUtils.lerp(start[0], end[0], progress.current);
    meshRef.current.position.y = THREE.MathUtils.lerp(start[1], end[1], progress.current);
    meshRef.current.position.z = THREE.MathUtils.lerp(start[2], end[2], progress.current);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color="#38bdf8" />
    </mesh>
  );
}

// Interactive Node Block
function NodeBlock({ node, activeNode, setActiveNode }: { node: typeof NODES[0]; activeNode: string | null; setActiveNode: (id: string | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const isHovered = activeNode === node.id;

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={node.pos as [number, number, number]}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setActiveNode(node.id)}
          onPointerOut={() => setActiveNode(null)}
        >
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial
            color={node.color}
            wireframe={!isHovered}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* HTML Label overlay */}
        <Html position={[0, -0.8, 0]} center distanceFactor={8}>
          <div className={`select-none whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-mono font-semibold transition-all duration-300 ${
            isHovered
              ? "bg-slate-100 text-slate-950 scale-110 shadow-lg"
              : "bg-slate-900/90 text-slate-300 border border-slate-800"
          }`}>
            {node.name}
          </div>
        </Html>
      </group>
    </Float>
  );
}

// Pipeline Main Canvas Scene
function PipelineScene({ setActiveNode, activeNode }: { setActiveNode: (id: string | null) => void; activeNode: string | null }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[0, 0, 5]} color="#38bdf8" intensity={2} />

      {/* Connecting Wireframe Pipeline Lines */}
      <Line points={[NODES[0].pos as [number, number, number], NODES[1].pos as [number, number, number]]} color="#334155" lineWidth={2} />
      <Line points={[NODES[1].pos as [number, number, number], NODES[2].pos as [number, number, number]]} color="#334155" lineWidth={2} />
      <Line points={[NODES[2].pos as [number, number, number], NODES[3].pos as [number, number, number]]} color="#334155" lineWidth={2} />

      {/* Animated Data Packets Flowing through system */}
      <DataPulse start={NODES[0].pos as [number, number, number]} end={NODES[1].pos as [number, number, number]} speed={1.2} delay={0} />
      <DataPulse start={NODES[1].pos as [number, number, number]} end={NODES[2].pos as [number, number, number]} speed={1.2} delay={0.3} />
      <DataPulse start={NODES[2].pos as [number, number, number]} end={NODES[3].pos as [number, number, number]} speed={1.2} delay={0.6} />

      {/* Render Node Blocks */}
      {NODES.map((node) => (
        <NodeBlock key={node.id} node={node} activeNode={activeNode} setActiveNode={setActiveNode} />
      ))}
    </>
  );
}

export default function Pipeline3D() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const selectedNodeInfo = NODES.find((n) => n.id === activeNode);

  return (
    <div className="relative w-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 backdrop-blur-md">
      
      {/* 3D WebGL Canvas */}
      <div className="h-[280px] w-full">
        <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
          <PipelineScene activeNode={activeNode} setActiveNode={setActiveNode} />
        </Canvas>
      </div>

      {/* Status Bar / Detail Overlay */}
      <div className="mt-2 min-h-[44px] rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 text-center transition-all">
        {selectedNodeInfo ? (
          <p className="text-xs font-mono text-sky-400">
            <span className="font-bold text-slate-200">{selectedNodeInfo.name}:</span> {selectedNodeInfo.detail}
          </p>
        ) : (
          <p className="text-xs font-mono text-slate-500">
            Hover over any 3D node to inspect system data flow.
          </p>
        )}
      </div>
    </div>
  );
}
