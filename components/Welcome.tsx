"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { WEDDING } from "@/lib/content";
import { divider } from "@/lib/art";
import { Svg } from "./Svg";
import { Magnetic } from "./Magnetic";
import { scrollToId, useLenis } from "./SmoothScroll";

const { text: T, events: EVENTS } = WEDDING;
const EASE = [0.2, 0.75, 0.2, 1] as const;
const VIEW = { once: true, amount: 0.25 } as const;

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: EASE } },
};

// Arch outline in the shape of the card's jharokha windows
const ARCH = "M14 556 V214 A186 186 0 0 1 386 214 V556 Z";
const ARCH_IN = "M30 540 V218 A170 170 0 0 1 370 218 V540 Z";

const SPARKLES = [
  { l: "8%", t: "22%", d: 0 }, { l: "88%", t: "16%", d: 1.2 }, { l: "94%", t: "58%", d: 0.6 },
  { l: "4%", t: "70%", d: 1.8 }, { l: "50%", t: "4%", d: 2.4 }, { l: "70%", t: "88%", d: 0.9 },
];

/** Rotating circular seal: "SHUBH VIVAH ✦ 09 · 12 · 2026 ✦ PINDWARA ✦" around the Ganesh medallion. */
function Seal() {
  const ring = `SHUBH VIVAH ✦ ${T.heroDate.day} · 12 · ${T.heroDate.year} ✦ PINDWARA ✦ `;
  return (
    <motion.div className="w-seal" initial={{ scale: 0, rotate: -120, opacity: 0 }} whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={VIEW} transition={{ type: "spring", stiffness: 80, damping: 14, delay: 1.2 }}>
      <svg viewBox="0 0 120 120" className="w-seal-ring" aria-hidden="true">
        <defs><path id="sealPath" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" /></defs>
        <text><textPath href="#sealPath" startOffset="0" textLength="286" lengthAdjust="spacingAndGlyphs">{ring}</textPath></text>
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/ganesh.webp" alt="" />
    </motion.div>
  );
}

export function Welcome({ guest }: { guest: string }) {
  const lenis = useLenis();
  const art = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: art, offset: ["start end", "end start"] });
  const coupleY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const floraA = useTransform(scrollYProgress, [0, 1], [-24, 30]);
  const floraB = useTransform(scrollYProgress, [0, 1], [30, -24]);
  const haloRotate = useTransform(scrollYProgress, [0, 1], [-40, 60]);

  const chips = [
    { k: "Date", v: `${+T.heroDate.day} ${T.heroDate.month} ${T.heroDate.year}` },
    { k: "Place", v: "Pindwara, Rajasthan" },
    { k: "Celebrations", v: `${EVENTS.length} days of festivities` },
  ];

  return (
    <section className="section welcome" id="welcome">
      <div className="grid">
        {/* Artwork */}
        <div className="w-art" ref={art}>
          <motion.div className="w-halo" style={{ rotate: haloRotate }}
            initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={VIEW} transition={{ duration: 1.6, ease: EASE }} />
          <svg className="w-arch" viewBox="0 0 400 560" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <radialGradient id="archFill" cx="50%" cy="32%" r="75%">
                <stop offset="0" stopColor="#FFF8EF" /><stop offset=".6" stopColor="#F6E7E2" /><stop offset="1" stopColor="#EFD6D0" />
              </radialGradient>
            </defs>
            <motion.path d={ARCH} fill="url(#archFill)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEW} transition={{ duration: 1 }} />
            <motion.path d={ARCH} fill="none" stroke="#B8893A" strokeWidth="1.6"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={VIEW} transition={{ duration: 2.2, ease: "easeInOut" }} />
            <motion.path d={ARCH_IN} fill="none" stroke="#B8893A" strokeOpacity=".45" strokeWidth="1"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={VIEW} transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }} />
          </svg>
          <motion.div className="w-couple-wrap" style={{ y: coupleY }}>
            <motion.img src="/img/couple.webp" className="w-couple" alt="Illustration of the bride and groom in wedding attire" loading="lazy"
              initial={{ opacity: 0, y: 60, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={VIEW}
              transition={{ duration: 1.5, ease: EASE, delay: 0.5 }} />
          </motion.div>
          <motion.div className="w-flora a" style={{ y: floraA }}>
            <motion.img src="/img/florals.webp" alt="" loading="lazy" initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }} viewport={VIEW} transition={{ duration: 1.4, ease: EASE, delay: 0.9 }} />
          </motion.div>
          <motion.div className="w-flora b" style={{ y: floraB }}>
            <motion.img src="/img/florals.webp" alt="" loading="lazy" initial={{ opacity: 0, rotate: 150, scale: 0.6 }}
              whileInView={{ opacity: 1, rotate: 180, scale: 1 }} viewport={VIEW} transition={{ duration: 1.4, ease: EASE, delay: 1.05 }} />
          </motion.div>
          {SPARKLES.map((s, i) => <span key={i} className="w-spark" style={{ left: s.l, top: s.t, animationDelay: `${s.d}s` }} aria-hidden="true" />)}
          <Seal />
        </div>

        {/* Text */}
        <motion.div className="text" variants={stagger} initial="hidden" whileInView="show" viewport={VIEW}>
          <motion.span className="eyebrow" variants={rise}>{T.welcomeEyebrow}</motion.span>
          <motion.p className="dear" variants={rise}>{T.welcomeDear}</motion.p>
          <motion.h2 className="guest" variants={rise}>{guest || T.guestDefault}</motion.h2>
          <motion.span className="w-underline" variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, ease: EASE } } }} />
          <motion.p className="lead" variants={rise}>{T.welcomeText}</motion.p>
          <motion.ul className="w-chips" variants={stagger}>
            {chips.map(c => (
              <motion.li key={c.k} variants={rise} whileHover={{ y: -3 }}>
                <span className="k">{c.k}</span><span className="v">{c.v}</span>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div className="w-actions" variants={rise}>
            <Magnetic>
              <motion.button type="button" className="btn solid" whileTap={{ scale: 0.95 }} onClick={() => scrollToId(lenis, "celebrations")}>
                See the celebrations <span aria-hidden="true">→</span>
              </motion.button>
            </Magnetic>
            <span className="sign">{T.welcomeSign}</span>
          </motion.div>
          <motion.div variants={rise} className="w-orn"><Svg html={divider()} /></motion.div>
        </motion.div>
      </div>
    </section>
  );
}
