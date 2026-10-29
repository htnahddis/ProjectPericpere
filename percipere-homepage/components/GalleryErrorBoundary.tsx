"use client";

import { Component, type ReactNode } from "react";

/** Catches CircularGallery / WebGL mount failures so PhaseRail stays visible. */
export default class GalleryErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.warn("[SapPhaseGallery] CircularGallery failed:", error.message);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
