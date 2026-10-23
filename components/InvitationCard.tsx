"use client";

import { motion } from "framer-motion";
import { WEDDING } from "@/lib/content";
import { corner, divider } from "@/lib/art";
import { Reveal } from "./Reveal";
import { Svg } from "./Svg";

const { text: T, couple: C } = WEDDING;
const VIEW = { once: true, amount: 0.3 } as const;

export function InvitationCard() {
  const fam = (lines: readonly string[]) => lines.map(l => <p className="fam" key={l}>{l}</p>);
  return (
    <section className="section invitation" id="invitation">
      <Reveal variant="zoom" className="card">
        {["tl", "tr", "bl", "br"].map(c => <Svg key={c} className={`corner ${c}`} html={corner()} />)}
        <motion.img src="/img/florals.webp" className="flora a" alt="" loading="lazy"
          initial={{ opacity: 0, rotate: -25, scale: 0.7 }} whileInView={{ opacity: 1, rotate: 0, scale: 1 }} viewport={VIEW} transition={{ duration: 1.4, ease: [0.2, 0.75, 0.2, 1], delay: 0.2 }} />
        <motion.img src="/img/florals.webp" className="flora b" alt="" loading="lazy"
          initial={{ opacity: 0, rotate: 155, scale: 0.7 }} whileInView={{ opacity: 1, rotate: 180, scale: 1 }} viewport={VIEW} transition={{ duration: 1.4, ease: [0.2, 0.75, 0.2, 1], delay: 0.35 }} />
        <motion.img className="medal" src="/img/ganesh.webp" alt="" loading="lazy" style={{ x: "-50%", y: "-50%" }}
          initial={{ rotate: -120, scale: 0.4, opacity: 0 }} whileInView={{ rotate: 0, scale: 1, opacity: 1 }} viewport={VIEW} transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.2 }} />
        <div className="body">
          <span className="eyebrow">{T.inviteEyebrow}</span>
          <p className="invocations">
            {T.invocations.map((x, i) => <span key={x}>{i > 0 && <i aria-hidden="true">✦</i>}{x}</span>)}
          </p>
          <p className="shloka">{T.doha}</p>
          <p className="meaning">{T.dohaMeaning}</p>
          <Svg html={divider()} />
          <p className="grace">{T.graceLine}</p>
          <Reveal as="h2" className="who" variant="blur">{C.groomFull}<small>({C.groomNick})</small></Reveal>
          {fam(T.groomFamily)}
          <Reveal as="span" className="with gold-text" variant="zoom">{T.withWord}</Reveal>
          <Reveal as="h2" className="who" variant="blur">{C.brideFull}<small>({C.brideNick})</small></Reveal>
          {fam(T.brideFamily)}
          <p className="solemn">{T.muhurat}</p>
          <p className="request">{T.request}</p>
        </div>
      </Reveal>
    </section>
  );
}
