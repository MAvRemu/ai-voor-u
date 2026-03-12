"use client";

import { useRef, type ReactNode } from "react";
import { useScroll, useTransform, motion, useReducedMotion, type MotionValue } from "framer-motion";

interface ScrollPinnedProps {
  stepCount: number;
  children: (currentStep: MotionValue<number>, progress: MotionValue<number>) => ReactNode;
  className?: string;
}

export default function ScrollPinned({ stepCount, children, className = "" }: ScrollPinnedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const currentStep = useTransform(scrollYProgress, [0, 1], [0, stepCount - 1]);

  if (shouldReduce) {
    // Fallback: render children with a static value
    return (
      <div className={className}>
        {children(currentStep, scrollYProgress)}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className} style={{ height: `${stepCount * 100}vh`, position: "relative" }}>
      <div className="sticky top-0 h-dvh flex items-center justify-center overflow-hidden">
        {children(currentStep, scrollYProgress)}
      </div>
    </div>
  );
}
