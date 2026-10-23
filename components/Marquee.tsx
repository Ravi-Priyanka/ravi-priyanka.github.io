"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { WEDDING } from "@/lib/content";

/** A slow gold ribbon of the wedding details that leans with your scroll speed. */
export function Marquee() {
  const { couple: C, text: T } = WEDDING;
  const items = ["Shubh Vivah", `${C.groom} & ${C.bride}`, "09 · 12 · 2026", T.heroPlace, T.blessing];
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { stiffness: 120, damping: 40 });
  const skew = useTransform(vel, [-2500, 0, 2500], [7, 0, -7], { clamp: true });
  const row = (key: string) => (
    <div className="mq-row" key={key} aria-hidden={key !== "a"}>
      {[...items, ...items].map((t, i) => <span key={i}>{t}<i>✦</i></span>)}
    </div>
  );
  return (
    <div className="marquee" role="presentation">
      <motion.div className="mq-track" style={{ skewX: skew }}>{row("a")}{row("b")}</motion.div>
    </div>
  );
}
