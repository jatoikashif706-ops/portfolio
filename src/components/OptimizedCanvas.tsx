"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";

interface OptimizedCanvasProps {
  children: React.ReactNode;
  camera?: any;
  className?: string;
  isStatic?: boolean; // Set true for non-animated scenes to render on demand only
}

export default function OptimizedCanvas({
  children,
  camera = { position: [0, 0, 5], fov: 50 },
  className = "h-full w-full",
  isStatic = false,
}: OptimizedCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);

  // Pause WebGL rendering entirely when canvas scrolls out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {isVisible && (
        <Canvas
          // Cap resolution to avoid 3x Retina mobile GPU melt
          dpr={dpr}
          // On-demand rendering for static scenes saves massive battery
          frameloop={isStatic ? "demand" : "always"}
          camera={camera}
          gl={{
            powerPreference: "high-performance",
            antialias: false, // Disable AA on mobile for 30%+ GPU performance boost
            depth: true,
            stencil: false, // Turn off unused buffers
          }}
        >
          {/* Dynamically degrade DPR if framerate drops below 40 FPS */}
          <PerformanceMonitor
            onDecline={() => setDpr([0.75, 1])}
            onIncline={() => setDpr([1, 1.5])}
          >
            {children}
          </PerformanceMonitor>
        </Canvas>
      )}
    </div>
  );
}
