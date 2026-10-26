"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import TextReveal from "@/components/TextReveal";

const SRC = "/media/percipere-demo.mp4";
const POSTER = "/images/video-poster.jpg";

export default function VideoSection() {
  const v = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const [entered, setEntered] = useState(false);
  const visible = useRef(false);

  useEffect(() => {
    const el = v.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (entry.isIntersecting) setEntered(true);
      if (!entry.isIntersecting || reduce) {
        el.pause();
        return;
      }
      el.play().catch(() => {
        if (visible.current) setPlaybackError(true);
      });
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => {
      visible.current = false;
      observer.disconnect();
    };
  }, []);

  const toggle = () => {
    const el = v.current;
    if (!el || failed) return;
    if (el.paused) {
      el.play().catch(() => setPlaybackError(true));
    } else {
      el.pause();
    }
  };

  return (
    <section className="wrap" id="demo">
      <div className="row-label"><span>Enterprise technology · 9 sec</span><Link href="/products" prefetch={false} className="ulink">Explore the platform ↗</Link></div>
      <div className={`video ${hasPlayed ? "has-played" : ""} ${failed ? "is-failed" : ""}`}>
        <img className="video-poster" src={POSTER} alt="A person working at a laptop" />
        <video
          ref={v}
          id="percipere-video"
          aria-label="A person typing on a laptop"
          muted
          loop
          playsInline
          preload="none"
          poster={POSTER}
          onPlay={() => { setPlaying(true); setHasPlayed(true); setPlaybackError(false); }}
          onPause={() => setPlaying(false)}
          onError={() => { setFailed(true); setPlaying(false); }}
          onCanPlay={() => setPlaybackError(false)}
        >
          <source src={SRC} type="video/mp4" />
        </video>
        <button
          className="vbtn"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          aria-pressed={playing}
          aria-controls="percipere-video"
          disabled={failed}
        >
          <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
        </button>
      </div>
      {(failed || playbackError) && (
        <p className="video-status" role="status">
          {failed ? "Video unavailable. Showing the preview image instead." : "Playback could not start. Please try the play control again."}
        </p>
      )}
      <TextReveal
        as="h2"
        className="h2 video-h"
        trigger={entered}
        lines={[
          { text: "See how Percipere resolves," },
          { text: "investigates and automates across SAP." },
        ]}
      />
    </section>
  );
}
