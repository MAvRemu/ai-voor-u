"use client";

import NumberTicker from "@/components/ui/number-ticker";

interface TimeSavedCounterProps {
  minutes: number;
  label?: string;
  className?: string;
}

export default function TimeSavedCounter({ minutes, label = "min bespaard", className = "" }: TimeSavedCounterProps) {
  return (
    <span className={`time-saved-badge ${className}`}>
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <NumberTicker value={minutes} suffix={` ${label}`} duration={1} className="text-inherit" />
    </span>
  );
}
