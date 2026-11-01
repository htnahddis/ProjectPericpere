"use client";

import type { ReactNode } from "react";
import AnimatedContent from "@/components/AnimatedContent";

type Props = {
  children: ReactNode;
  className?: string;
  /** When true, stagger direct children (default). Set false for a single block. */
  staggerChildren?: boolean;
};

/**
 * Sitewide section-chunk motion — AnimatedContent defaults for major blocks.
 * Reduced-motion handled inside AnimatedContent.
 */
export default function SectionMotion({ children, className = "", staggerChildren = true }: Props) {
  return (
    <AnimatedContent
      distance={100}
      direction="vertical"
      duration={0.8}
      ease="power3.out"
      stagger={staggerChildren ? 0.08 : 0}
      threshold={0.1}
      once
      className={className}
    >
      {children}
    </AnimatedContent>
  );
}
