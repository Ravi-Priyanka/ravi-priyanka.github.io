"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WEDDING } from "@/lib/content";
import { ui } from "@/lib/art";
import { Reveal } from "./Reveal";
import { SplitTitle } from "./SplitTitle";
import { Svg } from "./Svg";
import { Magnetic } from "./Magnetic";
import { Footer } from "./Footer";

const { text: T, couple: C } = WEDDING;

/** Shares the invitation link (native share sheet on phones, copy-to-clipboard elsewhere). */
function ShareButton() {
  const [toast, setToast] = useState("");
  const share = async () => {
    const url = location.origin + location.pathname;
    const text = `You're warmly invited to the wedding of ${C.groom} & ${C.bride} — ${T.heroDate.weekday}, ${+T.heroDate.day} ${T.heroDate.month} ${T.heroDate.year}`;
    if (navigator.share) { await navigator.share({ title: document.title, text, url }).catch(() => {}); return; }
    try { await navigator.clipboard.writeText(`${text}\n${url}`); setToast("Link copied"); }
    catch { setToast(url); }
    setTimeout(() => setToast(""), 2400);
  };
  return (
    <div className="share">
      <Magnetic>
        <motion.button className="btn solid" type="button" whileTap={{ scale: 0.95 }} onClick={share}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4M8 8l4-4 4 4M5 13v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Share this invitation
        </motion.button>
      </Magnetic>
      <AnimatePresence>
        {toast && <motion.p className="toast" role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{toast}</motion.p>}
      </AnimatePresence>
    </div>
  );
}

export function Closing() {
  const d = T.heroDate;
  return (
    <section className="closing">
      <div className="scene">
        <div className="inner">
          <motion.img className="ganesh" src="/img/ganesh.webp" alt="" loading="lazy"
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }} transition={{ type: "spring", stiffness: 70, damping: 14 }} />
          <Reveal as="span" className="eyebrow">{T.closingEyebrow}</Reveal>
          <SplitTitle className="title" text={T.closingTitle} />
          <Reveal className="names" variant="blur" delay={0.15}>{C.groom} <b>&amp;</b> {C.bride}</Reveal>
          <Reveal className="when" delay={0.25}>{d.weekday} · {d.day} {d.month} {d.year}</Reveal>
          <Reveal className="inviter" delay={0.3}>
            <span className="eyebrow">{T.inviterLabel}</span>
            <div className="who">{T.inviter}</div>
            <div className="note">{T.inviterNote}</div>
            <div className="addr">{T.inviterAddress}</div>
          </Reveal>
          <div className="contacts">
            {WEDDING.contacts.map((c, i) => (
              <Reveal className="contact" key={c.phone} delay={0.1 * i}>
                <div>
                  <div className="c-name">{c.name}</div>
                  <div className="c-num">+91 {c.phone.replace(/(\d{5})(\d{5})/, "$1 $2")}</div>
                </div>
                <div className="c-act">
                  <a className="btn" href={`tel:+91${c.phone}`}><Svg html={ui.phone} />{T.call}</a>
                  <a className="btn" href={`https://wa.me/91${c.phone}`} target="_blank" rel="noopener"><Svg html={ui.wa} />WhatsApp</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}><ShareButton /></Reveal>
          {T.mithiText && (
            <Reveal className="mithi" variant="zoom" delay={0.2}>
              <span className="eyebrow solo">{T.mithiTitle}</span>
              <div className="t">{T.mithiText}</div>
              {T.mithiNames && <><div className="from">{T.mithiFrom}</div><div className="kids">{T.mithiNames}</div></>}
            </Reveal>
          )}
        </div>
      </div>
      <motion.div className="closing-art" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.4, ease: [0.2, 0.75, 0.2, 1] }}>
        <picture>
          <source media="(min-aspect-ratio: 1/1)" srcSet="/img/hero-wide.webp 2560w, /img/hero-wide-2x.webp 3840w" sizes="100vw" />
          <img src="/img/hero-portrait.webp" srcSet="/img/hero-portrait.webp 1440w, /img/hero-portrait-2x.webp 2160w" sizes="100vw"
            alt="The pink palace and gardens at dawn" loading="lazy" decoding="async" />
        </picture>
      </motion.div>
      <Footer />
    </section>
  );
}
