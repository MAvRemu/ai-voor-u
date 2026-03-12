"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface ChatMessage {
  role: "user" | "ai";
  text: string;
  delay: number;
  card?: ReactNode;
}

interface AutoPlayChatProps {
  messages: ChatMessage[];
  loop?: boolean;
  className?: string;
}

export default function AutoPlayChat({ messages, loop = true, className = "" }: AutoPlayChatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const shouldReduce = useReducedMotion();
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [typingIndex, setTypingIndex] = useState<number | null>(null);
  const [displayedText, setDisplayedText] = useState<Record<number, string>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const reset = useCallback(() => {
    setVisibleMessages([]);
    setTypingIndex(null);
    setDisplayedText({});
  }, []);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduce) {
      setVisibleMessages(messages.map((_, i) => i));
      const texts: Record<number, string> = {};
      messages.forEach((m, i) => { texts[i] = m.text; });
      setDisplayedText(texts);
      return;
    }

    let cancelled = false;
    let currentIndex = 0;

    const playNext = () => {
      if (cancelled || currentIndex >= messages.length) {
        if (loop && !cancelled) {
          timeoutRef.current = setTimeout(() => { reset(); currentIndex = 0; playNext(); }, 2000);
        }
        return;
      }

      const msg = messages[currentIndex];
      const idx = currentIndex;

      if (msg.role === "ai") {
        setTypingIndex(idx);
        timeoutRef.current = setTimeout(() => {
          if (cancelled) return;
          setTypingIndex(null);
          setVisibleMessages(prev => [...prev, idx]);
          // Typewriter
          let charIdx = 0;
          const typeInterval = setInterval(() => {
            if (cancelled) { clearInterval(typeInterval); return; }
            charIdx++;
            setDisplayedText(prev => ({ ...prev, [idx]: msg.text.slice(0, charIdx) }));
            if (charIdx >= msg.text.length) {
              clearInterval(typeInterval);
              currentIndex++;
              timeoutRef.current = setTimeout(playNext, 500);
            }
          }, 30);
        }, msg.delay);
      } else {
        setVisibleMessages(prev => [...prev, idx]);
        setDisplayedText(prev => ({ ...prev, [idx]: msg.text }));
        currentIndex++;
        timeoutRef.current = setTimeout(playNext, msg.delay);
      }
    };

    reset();
    timeoutRef.current = setTimeout(playNext, 500);

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isInView, shouldReduce, messages, loop, reset]);

  return (
    <div ref={ref} className={`flex flex-col gap-3 p-4 min-h-[200px] ${className}`}>
      <AnimatePresence>
        {visibleMessages.map((idx) => {
          const msg = messages[idx];
          const isUser = msg.role === "user";
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${isUser ? "bg-teal text-white rounded-br-md" : "bg-navy/5 text-navy rounded-bl-md"}`}>
                {displayedText[idx] || ""}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {typingIndex !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
          <div className="bg-navy/5 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
            <span className="w-2 h-2 bg-navy/30 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-navy/30 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-navy/30 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </motion.div>
      )}

      {/* Render cards after AI messages */}
      <AnimatePresence>
        {visibleMessages.map((idx) => {
          const msg = messages[idx];
          if (!msg.card || !displayedText[idx] || displayedText[idx].length < msg.text.length) return null;
          return (
            <motion.div key={`card-${idx}`} initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
              {msg.card}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
