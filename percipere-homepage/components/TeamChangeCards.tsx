"use client";

import { useEffect, useState } from "react";
import TiltedCard, { TiltedCardLayer } from "@/components/TiltedCard";

type Outcome = {
  title: string;
  text: string;
};

const OUTCOME_IMAGES = [
  "/images/products/perciserve.jpg",
  "/images/products/percixpert.jpg",
  "/images/products/percihub.jpg",
  "/images/products/futuroot.jpg",
] as const;

/**
 * “What changes for the team” — one restrained TiltedCard per outcome.
 * Front: brand product still + title layer. Back: outcome body.
 */
export default function TeamChangeCards({ outcomes }: { outcomes: readonly Outcome[] }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener?.("change", sync);
    return () => query.removeEventListener?.("change", sync);
  }, []);

  return (
    <div className="team-change-grid">
      {outcomes.map((item, index) => (
        <TiltedCard
          key={item.title}
          imageSrc={OUTCOME_IMAGES[index % OUTCOME_IMAGES.length]}
          altText={item.title}
          captionText={item.title}
          containerHeight="280px"
          containerWidth="100%"
          imageHeight="280px"
          imageWidth="100%"
          scaleOnHover={reduceMotion ? 1 : 1.03}
          rotateAmplitude={reduceMotion ? 0 : 8}
          showTooltip={!reduceMotion}
          displayOverlayContent
          overlayContent={
            <TiltedCardLayer depth={24} className="team-change-front">
              <span className="team-change-index">0{index + 1}</span>
              <strong>{item.title}</strong>
            </TiltedCardLayer>
          }
          backContent={
            <TiltedCardLayer depth={12} className="team-change-back">
              <span className="feature-label">For the team</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </TiltedCardLayer>
          }
          flipOnClick
          radius={16}
          perspective={900}
          glare={reduceMotion ? 0 : 0.35}
          glareColor="#ffffff"
          shadow={0.28}
          parallax={reduceMotion ? 0 : 0.7}
          gyroscope={false}
          floating={false}
          intro={!reduceMotion}
          className="team-change-card"
        />
      ))}
    </div>
  );
}
