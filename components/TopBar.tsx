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
            <a className="monogram" href="#top" onClick={go("top")} aria-label="Back to top">{m1}<b>&amp;</b>{m2}</a>
            <nav aria-label="Sections">
              {LINKS.map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={go(id)} className={active === id ? "active" : ""}>{label}</a>
              ))}
            </nav>
            <a className="btn solid" href="#celebrations" onClick={go("celebrations")}>Celebrations</a>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}
