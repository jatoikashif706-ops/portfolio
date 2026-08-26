"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Cursor trail disabled - removed for cleaner UI */}
      
      {/* Portfolio Content */}
      {children}
    </>
  );
}
