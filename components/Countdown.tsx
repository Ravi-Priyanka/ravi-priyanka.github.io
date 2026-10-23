"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WEDDING } from "@/lib/content";
import { Reveal } from "./Reveal";

const T = WEDDING.text;
const target = new Date(WEDDING.config.countdownTo).getTime();

function parts(): number[] | null {
  const diff = Math.max(0, target - Date.now());
  if (!diff) return null;
  return [Math.floor(diff / 864e5), Math.floor(diff / 36e5) % 24, Math.floor(diff / 6e4) % 60, Math.floor(diff / 1e3) % 60];
}

/** Each digit flips in from above when it changes. */
function Digit({ ch }: { ch: string }) {
  return (
    <span style={{ position: "relative", display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ch}
          className="gold-text"
          style={{ display: "inline-block" }}
          initial={{ y: "-70%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "70%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.55, ease: [0.2, 0.75, 0.2, 1] }}
        >{ch}</motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Countdown() {
  const [v, setV] = useState<number[] | null | undefined>(undefined);
  useEffect(() => {
    setV(parts());
    const id = setInterval(() => setV(parts()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section dark countdown">
      <span className="band t" /><span className="band b" />
      <Reveal className="head">
        <span className="eyebrow">{T.countdownEyebrow}</span>
        <h2 className="title"><em>{T.countdownTitle}</em></h2>
      </Reveal>
      {v === null ? (
        <div className="cd-done gold-text">{T.countdownDone}</div>
      ) : (
        <Reveal className="cd-grid" delay={0.15}>
          {T.units.map((u, i) => (
            <div className="cd-unit" key={u}>
              <div className="cd-num">
                {String(v ? v[i] : 0).padStart(2, "0").split("").map((ch, k) => <Digit key={k} ch={v ? ch : "0"} />)}
              </div>
              <div className="cd-label">{u}</div>
            </div>
          ))}
        </Reveal>
      )}
      <Reveal as="p" className="cd-sub" delay={0.3}>{T.countdownSub}</Reveal>
    </section>
  );
}
