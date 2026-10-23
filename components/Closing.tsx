"use client";

import { motion } from "framer-motion";
import { WEDDING } from "@/lib/content";
import { ui } from "@/lib/art";
import { Reveal } from "./Reveal";
import { Svg } from "./Svg";

const { text: T, couple: C } = WEDDING;

export function Closing() {
  const d = T.heroDate;
  return (
    <section className="closing">
      <div className="scene">
        <div className="scene-img" />
        <div className="inner">
          <motion.img className="ganesh" src="/img/ganesh.webp" alt="" loading="lazy"
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }} transition={{ type: "spring", stiffness: 70, damping: 14 }} />
          <Reveal as="span" className="eyebrow">{T.closingEyebrow}</Reveal>
          <Reveal as="h2" className="title">{T.closingTitle}</Reveal>
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
          {T.mithiText && (
            <Reveal className="mithi" variant="zoom" delay={0.2}>
              <span className="eyebrow solo">{T.mithiTitle}</span>
              <div className="t">{T.mithiText}</div>
              {T.mithiNames && <><div className="from">{T.mithiFrom}</div><div className="kids">{T.mithiNames}</div></>}
            </Reveal>
          )}
        </div>
      </div>
      <footer className="foot">
        <span className="monogram">{C.monogram[0]}<b>&amp;</b>{C.monogram[1]}</span>
        <p>{T.footer}</p>
      </footer>
    </section>
  );
}
