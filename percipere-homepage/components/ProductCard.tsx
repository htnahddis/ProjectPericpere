"use client";

import Link from "next/link";
import ProductPreview from "@/components/ProductPreview";
import ProductTilt from "@/components/ProductTilt";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";

type Product = {
  name: string;
  tag: string;
  href: string;
  video: string;
  poster: string;
  desc: string;
};

export default function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  return (
    <Reveal delay={delay} className="product-card-reveal">
      <ProductTilt>
        <SpotlightCard
          className="product-spotlight"
          theme="light"
          spotlightColor="#1B1466"
          intensity={0.22}
          spotlightSize={280}
          softness={0.75}
          borderGlow={0.55}
          proximity={40}
          smoothing={0.35}
          flare={false}
          grain={0}
        >
          <Link href={product.href} prefetch={false} className="card product-card">
            <ProductPreview video={product.video} poster={product.poster} />
            <small>{product.tag}</small>
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <span className="product-card-cta" aria-hidden="true">View suite</span>
          </Link>
        </SpotlightCard>
      </ProductTilt>
    </Reveal>
  );
}
