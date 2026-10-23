"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { WEDDING } from "@/lib/content";
import { divider } from "@/lib/art";
import { Reveal } from "./Reveal";
import { Svg } from "./Svg";

const T = WEDDING.text;
const EASE = [0.2, 0.75, 0.2, 1] as const;

const panel: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96, filter: "blur(5px)" },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};
const chip: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
};

function Plate({ name }: { name: string }) {
  const parts = name.split(" & ");
  return (
    <motion.li className={`plate${parts.length === 2 ? "" : " note"}`} variants={item} whileHover={{ y: -4 }}>
      <span className="p1">{parts[0]}</span>
      {parts.length === 2 && <><span className="pamp">&amp;</span><span className="p2">{parts[1]}</span></>}
    </motion.li>
  );
}

/** Three family groups as tabs; the wine pill glides between tabs and names cascade in. */
export function Family() {
  const groups = WEDDING.family.filter(g => g.names.length);
  const [active, setActive] = useState(0);
  if (!groups.length) return null;
  const g = groups[active];
  const extra: readonly string[] = ("extra" in g && g.extra) || [];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setActive(a => (a + 1) % groups.length);
    if (e.key === "ArrowLeft") setActive(a => (a - 1 + groups.length) % groups.length);
  };

  return (
    <section className="section family" id="family">
      <Reveal className="head">
        <span className="eyebrow">{T.familyEyebrow}</span>
        <h2 className="title">{T.familyTitle}</h2>
        <p className="lead">{T.familyText}</p>
      </Reveal>
      <Reveal className="fam-tabs" delay={0.1}>
        <div role="tablist" aria-label={T.familyTitle} onKeyDown={onKey} style={{ display: "contents" }}>
          {groups.map((x, i) => (
            <button key={x.title} className={`fam-tab${i === active ? " on" : ""}`} role="tab" type="button"
              aria-selected={i === active} tabIndex={i === active ? 0 : -1} onClick={() => setActive(i)}>
              {i === active && <motion.span layoutId="fam-ind" className="fam-ind" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <b>{x.title}</b><small>{x.sub}</small>
            </button>
          ))}
        </div>
      </Reveal>
      <Reveal variant="zoom" className="fam-stage" delay={0.15}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/florals.webp" className="flora a" alt="" loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/florals.webp" className="flora b" alt="" loading="lazy" />
        <AnimatePresence mode="wait">
          <motion.div key={active} className="fam-panel" role="tabpanel" variants={panel} initial="hidden" animate="show" exit="exit">
            <motion.span className="eyebrow solo" variants={item}>{g.sub}</motion.span>
            <motion.h3 variants={item}>{g.title}</motion.h3>
            <motion.div variants={item}><Svg html={divider()} /></motion.div>
            <motion.ul className="plates" variants={panel}>
              {g.names.map(n => <Plate key={n} name={n} />)}
            </motion.ul>
            {extra.length > 0 && (
              <motion.div className="kids-chips" variants={panel}>
                {extra.join(", ").split(/,\s*/).map(n => <motion.span key={n} variants={chip}>{n}</motion.span>)}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </section>
  );
}
