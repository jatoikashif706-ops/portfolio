"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { Terminal as TerminalIcon, Sparkles } from "lucide-react";

// Command output directory
const COMMANDS: Record<string, string> = {
  help: "Available commands: bio, skills, fyp, contact, clear",
  bio: "Full-Stack Software Engineer specializing in modern WebGL, Next.js, React Native, and AI integrations.",
  skills: "Tech Stack: Next.js 15, TypeScript, Tailwind, Supabase, React Native, CUDA, C#, Python, Firebase.",
  fyp: "Smart Lifestyle Tracking System - Built with React Native, Expo Router, and Gemini Vision API.",
  contact: "Email: contact@example.com | GitHub: github.com | LinkedIn: linkedin.com",
};

function TerminalWindow() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ cmd: string; res: string }>>([
    { cmd: "welcome", res: 'Type "help" to list available commands.' },
  ]);

  // Gentle 3D floating animation and cursor tracking
  useFrame((state, delta) => {
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      (state.pointer.x * Math.PI) / 12,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      (-state.pointer.y * Math.PI) / 12,
      0.05
    );
  });

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = input.trim().toLowerCase();
    if (cleanCmd === "clear") {
      setHistory([]);
    } else if (cleanCmd) {
      const response = COMMANDS[cleanCmd] || `Command not found: "${cleanCmd}". Type "help" for options.`;
      setHistory((prev) => [...prev, { cmd: input, res: response }]);
    }
    setInput("");
  };

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        {/* 3D Glass Frame Panel */}
        <boxGeometry args={[5.2, 3.4, 0.2]} />
        <meshPhysicalMaterial
          color="#090d16"
          roughness={0.15}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          wireframe={false}
        />

        {/* Embedded HTML Interactive Screen */}
        <Html transform distanceFactor={3.2} position={[0, 0, 0.11]}>
          <div className="w-[520px] h-[340px] rounded-xl bg-slate-950/95 border border-slate-800 p-4 font-mono text-xs shadow-2xl flex flex-col justify-between select-none">
            
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-400 font-semibold flex items-center gap-1.5 text-[11px]">
                  <TerminalIcon className="w-3.5 h-3.5 text-sky-400" /> developer-shell ~ zsh
                </span>
              </div>
              <Sparkles className="w-4 h-4 text-sky-400 opacity-60" />
            </div>

            {/* Terminal Logs Container */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2.5 text-slate-300 pr-1">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-sky-400">
                    <span>guest@portfolio:~$</span>
                    <span className="text-slate-100 font-semibold">{item.cmd}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed pl-4 border-l-2 border-sky-500/30">
                    {item.res}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive CLI Input */}
            <form onSubmit={handleCommand} className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">❯</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type command ('help', 'bio', 'skills')..."
                className="w-full bg-transparent text-slate-100 focus:outline-none placeholder:text-slate-600 font-mono text-xs"
              />
            </form>
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

export default function Terminal3D() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} color="#38bdf8" intensity={1.5} />
        
        <TerminalWindow />
      </Canvas>
    </div>
  );
}
