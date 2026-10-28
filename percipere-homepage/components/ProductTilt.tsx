"use client";

import { useEffect, useRef, type ReactNode } from "react";

const MAX_TILT = 4;

/**
 * Gentle pointer-follow tilt for suite cards.
 * Fine pointer only; disabled on touch / coarse pointers / reduced-motion.
 * No flip — one tilt approach for the homepage.
 */
export default function ProductTilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduce.matches || !fine.matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hovering = false;

    const apply = () => {
      raf = 0;
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      el.style.transform = `perspective(900px) rotateX(${currentY.toFixed(2)}deg) rotateY(${currentX.toFixed(2)}deg)`;
      if (hovering || Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02) {
        raf = requestAnimationFrame(apply);
      }
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = el.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const ny = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
      targetX = Math.max(-1, Math.min(1, nx)) * MAX_TILT;
      targetY = Math.max(-1, Math.min(1, -ny)) * MAX_TILT;
      hovering = true;
      wake();
    };

    const onLeave = () => {
      hovering = false;
      targetX = 0;
      targetY = 0;
      wake();
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointercancel", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointercancel", onLeave);
      el.style.transform = "";
    };
  }, []);

  return (
    <div ref={ref} className="product-tilt">
      {children}
    </div>
  );
}
