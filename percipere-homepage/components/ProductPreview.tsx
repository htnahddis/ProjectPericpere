"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProductPreview({
  video,
  poster,
}: {
  video: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.play().catch(() => setHasPlayed(false));
      } else {
        element.pause();
      }
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="card-img product-preview">
      <Image src={poster} alt="" fill sizes="(max-width:760px) 100vw, 33vw" />
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setHasPlayed(true)}
        onError={() => setHasPlayed(false)}
        style={{ opacity: hasPlayed ? 1 : 0 }}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
