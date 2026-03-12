"use client";

import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";

interface ChatMessage {
  role: "user" | "ai";
  text: string;
  delay: number;
  card?: ReactNode;
}

interface Conversation {
  messages: ChatMessage[];
}

interface ConversationPlayerProps {
  conversations: Conversation[];
  className?: string;
}

export default function ConversationPlayer({ conversations, className = "" }: ConversationPlayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const shouldReduce = useReducedMotion();

  const [convoIndex, setConvoIndex] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [typingIndex, setTypingIndex] = useState<number | null>(null);
  const [displayedText, setDisplayedText] = useState<Record<number, string>>({});
  const [fading, setFading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
  }, []);

  const resetMessages = useCallback(() => {
    setVisibleMessages([]);
    setTypingIndex(null);
    setDisplayedText({});
  }, []);

  useEffect(() => {
    if (!isInView || conversations.length === 0) return;

    const currentConvo = conversations[convoIndex];
    if (!currentConvo) return;
    const messages = currentConvo.messages;

    // Reduced motion: show all instantly
    if (shouldReduce) {
      setVisibleMessages(messages.map((_, i) => i));
      const texts: Record<number, string> = {};
      messages.forEach((m, i) => { texts[i] = m.text; });
      setDisplayedText(texts);
      // Move to next conversation after a pause
      timeoutRef.current = setTimeout(() => {
        setFading(true);
        timeoutRef.current = setTimeout(() => {
          resetMessages();
          setConvoIndex((prev) => (prev + 1) % conversations.length);
          setFading(false);
        }, 300);
      }, 4000);
      return () => clearAllTimers();
    }

    let cancelled = false;
    let currentMsgIndex = 0;

    const playNext = () => {
      if (cancelled || currentMsgIndex >= messages.length) {
        if (!cancelled) {
          // Conversation finished — pause, fade out, move to next
          timeoutRef.current = setTimeout(() => {
            if (cancelled) return;
            setFading(true);
            timeoutRef.current = setTimeout(() => {
              if (cancelled) return;
              resetMessages();
              setConvoIndex((prev) => (prev + 1) % conversations.length);
              setFading(false);
            }, 300);
          }, 2000);
        }
        return;
      }

      const msg = messages[currentMsgIndex];
      const idx = currentMsgIndex;

      if (msg.role === "ai") {
        setTypingIndex(idx);
        timeoutRef.current = setTimeout(() => {
          if (cancelled) return;
          setTypingIndex(null);
          setVisibleMessages((prev) => [...prev, idx]);
          // Typewriter effect
          let charIdx = 0;
          const typeInterval = setInterval(() => {
            if (cancelled) { clearInterval(typeInterval); return; }
            charIdx++;
            setDisplayedText((prev) => ({ ...prev, [idx]: msg.text.slice(0, charIdx) }));
            if (charIdx >= msg.text.length) {
              clearInterval(typeInterval);
              currentMsgIndex++;
              timeoutRef.current = setTimeout(playNext, 500);
            }
          }, 30);
          intervalsRef.current.push(typeInterval);
        }, msg.delay);
      } else {
        // User messages appear instantly
        setVisibleMessages((prev) => [...prev, idx]);
        setDisplayedText((prev) => ({ ...prev, [idx]: msg.text }));
        currentMsgIndex++;
        timeoutRef.current = setTimeout(playNext, msg.delay);
      }
    };

    resetMessages();
    timeoutRef.current = setTimeout(playNext, 500);

    return () => {
      cancelled = true;
      clearAllTimers();
    };
  }, [isInView, shouldReduce, convoIndex, conversations, resetMessages, clearAllTimers]);

  const currentMessages = conversations[convoIndex]?.messages ?? [];

  return (
    <div ref={ref} className={`relative min-h-[240px] ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={convoIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: fading ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-3 p-4"
        >
          <AnimatePresence>
            {visibleMessages.map((idx) => {
              const msg = currentMessages[idx];
              if (!msg) return null;
              const isUser = msg.role === "user";
              return (
                <motion.div
                  key={`msg-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div className={isUser ? "chat-bubble-user" : "chat-bubble-ai"}>
                    {displayedText[idx] || ""}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing indicator */}
          {typingIndex !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="chat-bubble-ai flex gap-1 !py-3">
                <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}

          {/* Render cards after AI messages finish typing */}
          <AnimatePresence>
            {visibleMessages.map((idx) => {
              const msg = currentMessages[idx];
              if (!msg?.card || !displayedText[idx] || displayedText[idx].length < msg.text.length) return null;
              return (
                <motion.div
                  key={`card-${idx}`}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {msg.card}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
