"use client";

import Link from "next/link";
import type { CSSProperties, PointerEvent } from "react";
import { useState } from "react";
import ProductPreview from "@/components/ProductPreview";
import ProductTilt from "@/components/ProductTilt";
import Reveal from "@/components/Reveal";

type Product = {
  name: string;
  tag: string;
  href: string;
  video: string;
  poster: string;
  desc: string;
};

export default function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const [spot, setSpot] = useState({ x: "50%", y: "20%" });

  const onMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
    const y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
    setSpot({ x: `${x.toFixed(1)}%`, y: `${y.toFixed(1)}%` });
  };

  return (
    <Reveal delay={delay} className="product-card-reveal">
      <ProductTilt>
        <Link
          href={product.href}
          prefetch={false}
          className="card product-card"
          style={{ "--spot-x": spot.x, "--spot-y": spot.y } as CSSProperties}
          onPointerMove={onMove}
        >
          <span className="product-card-glow" aria-hidden="true" />
          <ProductPreview video={product.video} poster={product.poster} />
          <small>{product.tag}</small>
          <h3>{product.name}</h3>
          <p>{product.desc}</p>
          <span className="product-card-cta" aria-hidden="true">View suite</span>
        </Link>
      </ProductTilt>
    </Reveal>
  );
}
