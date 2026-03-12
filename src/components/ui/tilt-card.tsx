"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: string;
}

export default function TiltCard({ children, className = "", maxTilt = 8, glowColor = "rgba(14, 165, 233, 0.15)" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * maxTilt;
    const rotateY = (x - 0.5) * maxTilt;
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 0.1s ease-out",
    });
    setGlowStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${glowColor}, transparent 60%)`,
    });
  }, [shouldReduce, maxTilt, glowColor]);

  const handleMouseLeave = useCallback(() => {
    setStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)", transition: "transform 0.4s ease-out" });
    setGlowStyle({ opacity: 0 });
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`} style={style} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300" style={glowStyle} aria-hidden="true" />
      {children}
    </div>
  );
}
