"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import TimeSavedCounter from "@/components/ui/time-saved-counter";

interface TimelineMomentProps {
  time: string;
  title: string;
  user: string;
  ai: string;
  resultLabel: string;
  before: string;
  after: string;
  timeSaved: number;
  isLeft: boolean;
  index: number;
  category: "personal" | "business";
}

export default function TimelineMoment({
  time,
  title,
  user,
  ai,
  resultLabel,
  before,
  after,
  timeSaved,
  isLeft,
  index,
  category,
}: TimelineMomentProps) {
  return (
    <div className="relative py-8 md:py-12">
      {/* Timeline dot */}
      <div className="timeline-dot" />

      {/* Content container */}
      <BlurFade delay={0.1 + index * 0.1}>
        <div
          className={`relative ${
            isLeft
              ? "md:w-[45%] md:pr-12 md:text-right md:ml-0 md:mr-auto"
              : "md:w-[45%] md:pl-12 md:ml-auto"
          } pl-12 md:pl-0`}
        >
          {/* Time badge */}
          <div className="time-badge">{time}</div>

          {/* Title */}
          <h3 className="font-heading font-semibold text-navy text-lg mt-2">
            {title}
          </h3>

          {/* Chat exchange */}
          <div className="mt-3 space-y-2">
            <div className="mini-chat-user">{user}</div>
            <div className="mini-chat-ai">{ai}</div>
          </div>

          {/* Result label */}
          <div className="mt-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                category === "personal"
                  ? "bg-teal/10 text-teal-dark"
                  : "bg-violet/10 text-violet-dark"
              }`}
            >
              {resultLabel}
            </span>
          </div>

          {/* Before / After comparison */}
          <div className="mt-3 space-y-1 text-sm">
            <p className="text-slate line-through">{before}</p>
            <p className="text-teal font-medium">{after}</p>
          </div>

          {/* Time saved */}
          <div className="mt-3">
            <TimeSavedCounter minutes={timeSaved} />
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
