"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";

const ScrollExpand = dynamic(() => import("@/components/ScrollExpand"), {
  ssr: false,
}) as unknown as ComponentType<Record<string, unknown> & { children?: ReactNode }>;

/**
 * Suites band: ScrollExpand on a white stage (window scroll + Lenis).
 * Reduced-motion → static full frame with the suite browser.
 */
export default function SuitesScrollExpand({ browseContent }: { browseContent: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener?.("change", sync);
    setReady(true);
    return () => query.removeEventListener?.("change", sync);
  }, []);

  const overlay = (
    <div className="suites-browse-overlay" data-lenis-prevent>
      {browseContent}
    </div>
  );

  if (!ready) return <div className="suites-expand suites-expand--loading" aria-hidden="true" />;

  if (reduceMotion) {
    return (
      <div className="suites-expand suites-expand--static">
        <div className="suites-expand-static-media">
          {overlay}
        </div>
      </div>
    );
  }

  return (
    <div className="suites-expand">
      <ScrollExpand
        mediaType="solid"
        solidColor="#ffffff"
        alt="PerciVerse product suites"
        title="The Product Suites"
        scrollHint="Scroll"
        startWidth={42}
        startHeight={58}
        startRadius={24}
        endRadius={0}
        mediaZoom={1}
        scrollDistance={1.15}
        holdDistance={0.3}
        smoothing={0.12}
        overlayScrim={0}
        useWindowScroll
      >
        {overlay}
      </ScrollExpand>
    </div>
  );
}
