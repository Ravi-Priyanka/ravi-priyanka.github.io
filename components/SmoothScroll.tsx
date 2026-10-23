"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

/** Buttery smooth scrolling (Lenis) kept in sync with GSAP ScrollTrigger. Locked while the doors are closed. */
export function SmoothScroll({ locked, children }: { locked: boolean; children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    l.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(l);
    return () => { gsap.ticker.remove(raf); l.destroy(); };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (locked) lenis.stop(); else lenis.start();
  }, [lenis, locked]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function scrollToId(lenis: Lenis | null, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -64, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}
