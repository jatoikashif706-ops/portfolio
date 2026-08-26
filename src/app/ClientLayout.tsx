"use client";

import dynamic from "next/dynamic";

// Dynamic import for CursorTrail3D (SSR disabled for WebGL)
const CursorTrail3D = dynamic(() => import("@/components/CursorTrail3D"), {
  ssr: false,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Fixed 3D Cursor Canvas - Global overlay */}
      <CursorTrail3D />
      
      {/* Portfolio Content */}
      {children}
    </>
  );
}
