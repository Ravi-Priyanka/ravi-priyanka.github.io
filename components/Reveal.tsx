"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.2, 0.75, 0.2, 1] as const;

const variants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  wipe: { hidden: { clipPath: "inset(100% -30% -30% -30%)", opacity: 0.4 }, show: { clipPath: "inset(-30% -30% -30% -30%)", opacity: 1 } },
  blur: { hidden: { opacity: 0, y: 20, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } },
};

const tags = {
  div: motion.div, section: motion.section, p: motion.p, h2: motion.h2, span: motion.span, article: motion.article,
};

type Props = {
  as?: keyof typeof tags;
  variant?: keyof typeof variants;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children?: React.ReactNode;
};

/** Fades/rises its content in the first time it scrolls into view. */
export function Reveal({ as = "div", variant = "up", delay = 0, className, style, id, children }: Props) {
  const M = tags[as];
  return (
    <M
      id={id}
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      variants={variants[variant]}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}
