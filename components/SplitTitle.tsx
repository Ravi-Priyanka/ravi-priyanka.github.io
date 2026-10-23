"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.2, 0.75, 0.2, 1] as const;
const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const word: Variants = {
  hidden: { y: "110%", rotate: 5 },
  show: { y: "0%", rotate: 0, transition: { duration: 1.05, ease: EASE } },
};
const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, div: motion.div };

/** Heading whose words rise up one by one from behind a mask — an editorial-style reveal. */
export function SplitTitle({ text, as = "h2", className, italic, delay = 0 }: {
  text: string; as?: keyof typeof tags; className?: string; italic?: boolean; delay?: number;
}) {
  const M = tags[as];
  const words = text.split(" ");
  const inner = words.map((w, i) => (
    <span key={i}>
      <span className="sw"><motion.span className="swi" variants={word}>{w}</motion.span></span>
      {i < words.length - 1 ? " " : ""}
    </span>
  ));
  return (
    <M className={className} aria-label={text} initial="hidden" whileInView="show"
      viewport={{ once: true, amount: 0.5 }} variants={parent} transition={{ delayChildren: delay }}>
      {italic ? <em aria-hidden="true">{inner}</em> : <span aria-hidden="true">{inner}</span>}
    </M>
  );
}
