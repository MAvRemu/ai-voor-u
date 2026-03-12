"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useInView, useReducedMotion } from "framer-motion";

interface NumberTickerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function NumberTicker({ value, prefix = "", suffix = "", duration = 1.5, className = "" }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      motionValue.set(shouldReduce ? value : value);
      if (!shouldReduce) {
        motionValue.set(0);
        // Small delay to ensure spring starts from 0
        requestAnimationFrame(() => motionValue.set(value));
      }
    }
  }, [isInView, value, motionValue, shouldReduce]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, prefix, suffix]);

  return <span ref={ref} className={className}>{prefix}{shouldReduce ? value.toLocaleString() : "0"}{suffix}</span>;
}
