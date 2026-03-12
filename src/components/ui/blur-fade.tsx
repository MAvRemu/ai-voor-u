"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  inView?: boolean;
}

export function BlurFade({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 24,
  className,
  inView = true,
}: BlurFadeProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  const initial = { opacity: 0, y: yOffset, filter: "blur(6px)" };
  const animate = { opacity: 1, y: 0, filter: "blur(0px)" };
  const transition = { duration, delay, ease: [0.25, 0.4, 0.25, 1] as const };

  if (inView) {
    return (
      <motion.div
        className={cn(className)}
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, margin: "-80px" }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
