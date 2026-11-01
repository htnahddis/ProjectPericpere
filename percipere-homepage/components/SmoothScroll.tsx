"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/** Keep GSAP ScrollTrigger in sync with the single Lenis root (AnimatedContent). */
function LenisScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.clearScrollMemory?.();
    };
  }, []);

  return null;
}

/**
 * Single page-level Lenis instance.
 * Anchors stay in sync with sticky nav (html scroll-padding-top).
 * Respects prefers-reduced-motion via respectReducedMotion.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        anchors: true,
        respectReducedMotion: true,
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
