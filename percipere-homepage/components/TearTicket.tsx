"use client";

import { useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import "./TearTicket.css";

type Orientation = "horizontal" | "vertical";

type TearTicketProps = {
  image: string;
  imageAlt: string;
  stub: ReactNode;
  children: ReactNode;
  orientation?: Orientation;
  scrim?: boolean;
  imageRadius?: number;
  onTear?: () => void;
  width?: number;
  height?: number;
  stubSize?: number;
  radius?: number;
  holes?: number;
  holeSize?: number;
  notch?: number;
  roughness?: number;
  tearAngle?: number;
  stretch?: number;
  resistance?: number;
  rotate?: number;
  tilt?: boolean;
  tiltMax?: number;
  tiltReach?: number;
  parallax?: number;
  perspective?: number;
  background?: string;
  color?: string;
  border?: boolean;
  borderWidth?: number;
  recenter?: boolean;
};

export default function TearTicket({
  image,
  imageAlt,
  stub,
  children,
  orientation = "horizontal",
  scrim = false,
  imageRadius = 0,
  onTear,
  width = 460,
  height = 250,
  stubSize = 150,
  radius = 16,
  holes = 12,
  holeSize = 6,
  notch = 3,
  roughness = 0,
  tearAngle = 30,
  stretch = 30,
  resistance = 0.45,
  rotate = 0,
  tilt = false,
  tiltMax = 9,
  tiltReach = 260,
  parallax = 0,
  perspective = 1000,
  background = "#27272a",
  color = "#f5f5f5",
  border = false,
  borderWidth = 1,
  recenter = true,
}: TearTicketProps) {
  const [torn, setTorn] = useState(false);
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const style = {
    "--ticket-width": `${width}px`,
    "--ticket-height": `${height}px`,
    "--stub-size": `${stubSize}px`,
    "--ticket-radius": `${radius}px`,
    "--image-radius": `${imageRadius}px`,
    "--hole-size": `${holeSize}px`,
    "--notch-size": `${notch}px`,
    "--roughness": roughness,
    "--tear-angle": `${tearAngle}deg`,
    "--tear-stretch": `${stretch}px`,
    "--tear-resistance": `${Math.max(0, resistance)}s`,
    "--ticket-rotate": `${rotate}deg`,
    "--tilt-x": `${pointer.y * (tilt ? tiltMax : 0)}deg`,
    "--tilt-y": `${pointer.x * (tilt ? tiltMax : 0)}deg`,
    "--parallax-x": `${pointer.x * parallax}px`,
    "--parallax-y": `${pointer.y * parallax}px`,
    "--ticket-perspective": `${perspective}px`,
    "--ticket-background": background,
    "--ticket-color": color,
    "--ticket-border-width": `${border ? borderWidth : 0}px`,
  } as CSSProperties;

  const tear = () => {
    if (torn) return;
    setTorn(true);
    onTear?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      tear();
    }
  };

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!tilt && parallax === 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / Math.max(1, tiltReach))),
      y: Math.max(-1, Math.min(1, (event.clientY - rect.top - rect.height / 2) / Math.max(1, tiltReach))),
    });
  };

  const classes = [
    "tear-ticket",
    `tear-ticket--${orientation}`,
    torn && "is-torn",
    scrim && "has-scrim",
    border && "has-border",
  ].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      style={style}
      role="button"
      tabIndex={torn ? -1 : 0}
      aria-label={`Tear ${typeof children === "string" ? children : "ticket"}`}
      aria-disabled={torn}
      onClick={tear}
      onKeyDown={handleKeyDown}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => recenter && setPointer({ x: 0, y: 0 })}
    >
      <div className="tear-ticket-image">
        {!imageUnavailable && (
          <img
            src={image}
            alt={imageAlt}
            onError={() => setImageUnavailable(true)}
          />
        )}
        {scrim && <div className="tear-ticket-scrim" />}
        <div className="tear-ticket-title">{children}</div>
      </div>
      <div className="tear-ticket-seam" aria-hidden="true">
        {Array.from({ length: Math.max(0, Math.round(holes)) }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="tear-ticket-stub">{stub}</div>
      {torn && <span className="tear-ticket-used">Used</span>}
    </div>
  );
}
