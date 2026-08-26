"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  // Motion values to track mouse cursor relative position (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out tilt motion with spring physics
  const mouseX = useSpring(x, { stiffness: 350, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 350, damping: 25 });

  // Map mouse positions to rotation angles (max tilt: 15 degrees)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  // Dynamic light glare offset moving with the cursor
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center normalized between -0.5 and 0.5
    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    // Reset back to flat orientation on mouse leave
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-1000">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-colors duration-300 hover:border-sky-500/50 ${className}`}
      >
        {/* Dynamic Light Reflection Glare */}
        <motion.div
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(600px circle at ${gx} ${gy}, rgba(56, 189, 248, 0.15), transparent 40%)`
            ),
          }}
          className="pointer-events-none absolute inset-0 z-10"
        />

        {/* Card Content with 3D Z-Axis Elevation */}
        <div style={{ transform: "translateZ(30px)" }} className="relative z-0">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
