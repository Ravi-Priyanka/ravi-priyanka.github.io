"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { WEDDING } from "@/lib/content";
import { scrollToId, useLenis } from "./SmoothScroll";

const LINKS = [["invitation", "Invitation"], ["baraat", "Baraat"], ["celebrations", "Celebrations"], ["family", "Family"]] as const;

/** Slim bar with monogram and section links that slides in after the cover, plus a gold reading-progress line. */
export function TopBar({ opened }: { opened: boolean }) {
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("");
  const [m1, m2] = WEDDING.couple.monogram;

  useMotionValueEvent(scrollY, "change", y => setShow(opened && y > window.innerHeight * 0.75));

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    LINKS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); scrollToId(lenis, id); };

  return (
    <>
      {opened && <motion.div className="scroll-progress" style={{ scaleX: progress }} />}
      <AnimatePresence>
        {show && (
          <motion.header
            className="topbar show"
            initial={{ y: "-110%" }} animate={{ y: 0 }} exit={{ y: "-110%" }}
            transition={{ duration: 0.6, ease: [0.2, 0.75, 0.2, 1] }}
          >
            <nav className="tb-side left" aria-label="Sections">
              {LINKS.slice(0, 2).map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={go(id)} className={active === id ? "active" : ""}>{label}</a>
              ))}
            </nav>
            <a className="tb-logo" href="#top" onClick={go("top")} aria-label="Ravi and Priyanka — back to top">
              <svg viewBox="0 0 120 64" aria-hidden="true">
                <path className="arch" d="M14 62 V30 A46 26 0 0 1 106 30 V62" />
                <path className="arch in" d="M20 62 V31 A40 21 0 0 1 100 31 V62" />
                <path className="gem" d="M60 1.5 L63.5 5 L60 8.5 L56.5 5 Z" />
                <line className="rule" x1="30" y1="62" x2="90" y2="62" />
                <text x="60" y="49" textAnchor="middle">
                  <tspan className="l">{m1}</tspan><tspan className="amp" dx="3">&amp;</tspan><tspan className="l" dx="3">{m2}</tspan>
                </text>
              </svg>
            </a>
            <nav className="tb-side right" aria-label="More sections">
              {LINKS.slice(2).map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={go(id)} className={active === id ? "active" : ""}>{label}</a>
              ))}
            </nav>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}
