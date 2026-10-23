"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WEDDING } from "@/lib/content";

const ASSETS = ["/img/ganesh.webp", "/img/hero-portrait.webp", "/img/hero-wide.webp", "/img/couple.webp", "/img/florals.webp"];
const EASE = [0.76, 0, 0.24, 1] as const;

/** Gold monogram that draws itself while the key artwork loads, then wipes away to reveal the doors. */
export function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const { monogram, groom, bride } = WEDDING.couple;

  useEffect(() => {
    let loaded = 0;
    const start = performance.now();
    const finish = () => {
      const wait = Math.max(0, 2200 - (performance.now() - start));
      setTimeout(() => setDone(true), wait);
    };
    const tick = () => { loaded++; setPct(Math.round((loaded / ASSETS.length) * 100)); if (loaded === ASSETS.length) finish(); };
    ASSETS.forEach(src => { const img = new Image(); img.onload = img.onerror = tick; img.src = src; });
    const safety = setTimeout(() => setDone(true), 7000); // never block guests on a slow connection
    return () => clearTimeout(safety);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="preloader" exit={{ clipPath: "inset(0% 0% 100% 0%)" }} transition={{ duration: 1.1, ease: EASE }}>
          <svg className="pl-mono" viewBox="0 0 320 140" aria-hidden="true">
            <motion.text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle"
              initial={{ strokeDashoffset: 700, fillOpacity: 0 }}
              animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
              transition={{ strokeDashoffset: { duration: 1.8, ease: "easeInOut" }, fillOpacity: { delay: 1.3, duration: 0.8 } }}
            >{monogram[0]} &amp; {monogram[1]}</motion.text>
          </svg>
          <motion.p className="pl-names" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
            {groom} · {bride}
          </motion.p>
          <div className="pl-bar"><motion.span animate={{ scaleX: pct / 100 }} transition={{ ease: "easeOut", duration: 0.5 }} /></div>
          <p className="pl-pct">{pct}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
