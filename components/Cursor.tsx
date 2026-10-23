"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Gold dot + trailing ring cursor for mouse users; the ring swells over anything clickable. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY); setVisible(true);
      setHover(!!(e.target as Element)?.closest?.("a, button, [role=tab], .ev, .plate, summary"));
    };
    const leave = () => setVisible(false);
    const dn = () => setDown(true), up = () => setDown(false);
    addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    addEventListener("pointerdown", dn); addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave);
      removeEventListener("pointerdown", dn); removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="cursor-ring" style={{ x: rx, y: ry }}
        animate={{ scale: down ? 0.8 : hover ? 2.1 : 1, opacity: visible ? 1 : 0, backgroundColor: hover ? "rgba(215,180,106,.14)" : "rgba(215,180,106,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }} />
      <motion.div className="cursor-dot" style={{ x, y }} animate={{ opacity: visible && !hover ? 1 : 0 }} />
    </>
  );
}
