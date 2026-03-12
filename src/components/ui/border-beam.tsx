"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 4,
  colorFrom = "var(--color-teal)",
  colorTo = "var(--color-violet)",
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className,
      )}
    >
      <div
        className="animate-border-rotate absolute inset-[-100%]"
        style={
          {
            "--beam-size": `${size}px`,
            "--beam-duration": `${duration}s`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            background: `conic-gradient(from 0deg, transparent 0deg, var(--color-from) 10deg, var(--color-to) 30deg, transparent 40deg, transparent 360deg)`,
            animationDuration: `var(--beam-duration, ${duration}s)`,
          } as React.CSSProperties
        }
      />
      <div className="absolute inset-[1px] rounded-[inherit] bg-inherit" />
    </div>
  );
}
