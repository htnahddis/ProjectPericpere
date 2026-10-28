"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";

/**
 * Single page-level Lenis instance.
 * Anchors stay in sync with sticky nav (html scroll-padding-top).
 * Lenis respects prefers-reduced-motion via respectReducedMotion.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.09,
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.4,
        anchors: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
