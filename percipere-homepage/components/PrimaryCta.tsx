"use client";

import dynamic from "next/dynamic";
import { DEMO_HREF } from "@/lib/data";

const StarBorder = dynamic(() => import("@/components/StarBorder"), {
  ssr: false,
  loading: () => (
    <a href={DEMO_HREF} className="btn btn-dark star-cta">Talk to our team</a>
  ),
});

/** Single StarBorder CTA for Value & Next Steps. Hero Explore keeps Magnet. */
export default function PrimaryCta() {
  return (
    <StarBorder
      as="a"
      href={DEMO_HREF}
      className="star-cta"
      theme="dark"
      color="#00B7FF"
      trailColor="#FF00B7"
      backgroundColor="#000000"
      textColor="#ffffff"
      borderColor="rgba(255,255,255,0.18)"
      radius={6}
      thickness={1.25}
      duration={5.5}
      trailLength={0.28}
      stars={1}
      glow={0.45}
      sparkle={false}
      hover="brighten"
      clickPulse
    >
      Talk to our team
    </StarBorder>
  );
}
