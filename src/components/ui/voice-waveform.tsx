"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface VoiceWaveformProps {
  onComplete?: () => void;
  className?: string;
  color?: string;
  duration?: number;
}

export default function VoiceWaveform({ onComplete, className = "", color = "#0EA5E9", duration = 2500 }: VoiceWaveformProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduce = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isInView || shouldReduce) {
      if (isInView && shouldReduce && onComplete) onComplete();
      return;
    }
    setIsPlaying(true);
    const timer = setTimeout(() => {
      setIsPlaying(false);
      onComplete?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [isInView, shouldReduce, duration, onComplete]);

  const barCount = 7;
  const barHeights = [0.4, 0.7, 0.5, 1, 0.6, 0.8, 0.3];

  return (
    <div ref={ref} className={`flex items-center justify-center gap-1 h-16 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className="w-1.5 rounded-full transition-all"
          style={{
            backgroundColor: color,
            height: isPlaying ? `${barHeights[i] * 100}%` : "20%",
            animation: isPlaying ? `waveform-bar 0.6s ease-in-out ${i * 0.08}s infinite alternate` : "none",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes waveform-bar {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
