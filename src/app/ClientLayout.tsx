"use client";

import dynamic from "next/dynamic";
import { useIsMobile } from "@/hooks/useIsMobile";

// Dynamic import for CursorTrail3D (SSR disabled for WebGL)
const CursorTrail3D = dynamic(() => import("@/components/CursorTrail3D"), {
  ssr: false,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Fixed 3D Cursor Canvas - Global overlay (disabled on mobile for performance) */}
      {!isMobile && <CursorTrail3D />}
      
      {/* Portfolio Content */}
      {children}
    </>
  );
}
