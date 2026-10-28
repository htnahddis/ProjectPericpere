"use client";

import Link from "next/link";
import ProductPreview from "@/components/ProductPreview";
import ProductTilt from "@/components/ProductTilt";
import SpotlightCard from "@/components/SpotlightCard";

type Product = {
  name: string;
  tag: string;
  href: string;
  video: string;
  poster: string;
  desc: string;
};

export type BentoSize = "feature" | "wide" | "default";

export default function ProductCard({
  product,
  size = "default",
}: {
  product: Product;
  size?: BentoSize;
}) {
  return (
    <article className={`bento-cell bento-${size}`}>
      <ProductTilt>
        <SpotlightCard
          className="product-spotlight"
          theme="light"
          spotlightColor="#1B1466"
          intensity={0.22}
          spotlightSize={size === "feature" ? 360 : 280}
          softness={0.75}
          borderGlow={0.55}
          proximity={40}
          smoothing={0.35}
          flare={false}
          grain={0}
        >
          <Link href={product.href} prefetch={false} className="card product-card">
            <ProductPreview video={product.video} poster={product.poster} />
            <div className="product-card-meta">
              <small>{product.tag}</small>
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <span className="product-card-cta" aria-hidden="true">View suite</span>
            </div>
          </Link>
        </SpotlightCard>
      </ProductTilt>
    </article>
  );
}
