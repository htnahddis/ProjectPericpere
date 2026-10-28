import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap" style={{ minHeight: "60vh", display: "grid", placeItems: "center", textAlign: "center" }}>
      <div>
        <p className="eyebrow">404</p>
        <h1 className="h1" style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>Page not found</h1>
        <p className="lede" style={{ margin: "20px auto 0", maxWidth: "420px" }}>
          The page you were looking for doesn’t exist or may have moved.
        </p>
        <div className="ctas" style={{ marginTop: 28 }}>
          <Link href="/" className="btn btn-dark">Back home</Link>
        </div>
      </div>
    </main>
  );
}
