"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV, DEMO_HREF } from "@/lib/data";

export default function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const out = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setMobile(false); } };
    document.addEventListener("mousedown", out); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", out); document.removeEventListener("keydown", esc); };
  }, []);
  return (
    <header className="nav" ref={ref}>
      <div className="nav-in">
        <Link href="/" className="logo" aria-label="Percipere home"><span className="logo-mark" />Percipere</Link>
        <nav className={`links ${mobile ? "show" : ""}`} aria-label="Primary">
          {NAV.map(g => (
            <div key={g.label} className="dd" onMouseEnter={() => setOpen(g.label)} onMouseLeave={() => setOpen(null)}>
              <button aria-expanded={open === g.label} aria-haspopup="true"
                onClick={() => setOpen(open === g.label ? null : g.label)}>{g.label}</button>
              <ul className={open === g.label ? "open" : ""}>
                {g.items.map(i => <li key={i.href}><Link href={i.href} prefetch={false} onClick={() => { setOpen(null); setMobile(false); }}>{i.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </nav>
        <Link href={DEMO_HREF} prefetch={false} className="btn btn-dark btn-sm">Book a demo</Link>
        <button className="burger" aria-expanded={mobile} aria-label="Toggle menu" onClick={() => setMobile(!mobile)}>Menu</button>
      </div>
    </header>
  );
}
