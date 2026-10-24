"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToId, useLenis } from "./SmoothScroll";
import { hasPlayedQuiz } from "@/lib/quiz";

/** Floating heart button that takes guests straight to the love quiz. */
export function QuizFab({ opened }: { opened: boolean }) {
  const lenis = useLenis();
  const [quizInView, setQuizInView] = useState(false);
  const [played, setPlayed] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    setPlayed(hasPlayedQuiz());
    const onPlayed = () => setPlayed(true);
    window.addEventListener("quiz-played", onPlayed);
    const el = document.getElementById("quiz");
    const io = new IntersectionObserver(([en]) => setQuizInView(en.isIntersecting), { threshold: 0.15 });
    if (el) io.observe(el);
    return () => { io.disconnect(); window.removeEventListener("quiz-played", onPlayed); };
  }, []);

  // Show a short "Play the love quiz" label a little after the invitation opens.
  useEffect(() => {
    if (!opened) return;
    const a = setTimeout(() => setHint(true), 6000);
    const b = setTimeout(() => setHint(false), 12000);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [opened]);

  const show = opened && !quizInView && !played;
  return (
    <AnimatePresence>
      {show && (
        <motion.button className="quiz-fab" type="button" aria-label="Play the love quiz" title="Play the love quiz"
          onClick={() => scrollToId(lenis, "quiz")}
          initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.4 }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.4 }} whileTap={{ scale: 0.9 }}>
          <span className="qf-pulse" aria-hidden="true" />
          <motion.svg className="qf-heart" viewBox="0 0 24 24" aria-hidden="true" animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}>
            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M12 16.2s-3.4-2.2-3.4-4.9a1.9 1.9 0 0 1 3.4-1.2 1.9 1.9 0 0 1 3.4 1.2c0 2.7-3.4 4.9-3.4 4.9z" fill="currentColor" opacity=".9" />
          </motion.svg>
          <AnimatePresence>
            {hint && (
              <motion.span className="qf-hint" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                Play the love quiz ✨
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
