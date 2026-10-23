"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "@/lib/content";

const T = WEDDING.text;

/** Royal palace doors. Tapping the Ganesh medallion lights the seam and swings the doors open. */
export function Intro({ guest, autoOpen, onOpen, onDone }: { guest: string; autoOpen: boolean; onOpen: () => void; onDone: () => void }) {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const [dust, setDust] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    setDust(Array.from({ length: 24 }, () => ({
      left: `${(Math.random() * 100).toFixed(1)}%`, top: `${(30 + Math.random() * 70).toFixed(1)}%`,
      ["--t" as string]: `${(7 + Math.random() * 7).toFixed(1)}s`, ["--d" as string]: `${(-Math.random() * 10).toFixed(1)}s`,
    })));
  }, []);

  const open = () => {
    if (stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = reduce ? [0, 50, 100, 200] : [0, 650, 1150, 2600];
    setTimeout(() => setStage(1), t[0]);   // medallion glows, text fades
    setTimeout(() => setStage(2), t[1]);   // light through the seam, doors swing open
    setTimeout(onOpen, t[2]);              // cover starts its entrance while doors open
    setTimeout(() => setStage(3), t[3]);   // fade away
    setTimeout(onDone, t[3] + 900);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (autoOpen) open(); }, [autoOpen]);

  const door = (side: "left" | "right") => (
    <div className={`door ${side}`}>
      <div className="door-face">
        <span className="d-arch" /><span className="d-arch inner" />
        <span className="d-panel" /><span className="d-studs" /><span className="d-ring" />
      </div>
    </div>
  );

  return (
    <div className={`intro${stage >= 1 ? " s1" : ""}${stage >= 2 ? " s2" : ""}${stage >= 3 ? " s3" : ""}`} onClick={open}>
      <div className="gate">
        {door("left")}{door("right")}
        <span className="seam" /><span className="glow" />
      </div>
      <div className="dust">{dust.map((s, i) => <i key={i} style={s} />)}</div>
      <div className="gate-center">
        <div className="eyebrow solo top-line">{T.blessing}</div>
        <motion.button
          className="seal" type="button" aria-label="Open the invitation"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.94 }}
          onClick={e => { e.stopPropagation(); open(); }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/ganesh.webp" alt="" />
        </motion.button>
        <div className="for">{T.envelopeFor}</div>
        <div className="guest">{guest || T.guestDefault}</div>
        <div className="hint">{T.tapToOpen}</div>
      </div>
    </div>
  );
}
