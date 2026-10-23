"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { WEDDING, type WeddingEvent } from "@/lib/content";
import { divider, icons, ui } from "@/lib/art";
import { downloadIcs } from "@/lib/ics";
import { Reveal } from "./Reveal";
import { Svg } from "./Svg";

const T = WEDDING.text;

/** Arched card that tilts towards the cursor in 3D on desktop. */
function EventCard({ e, i }: { e: WeddingEvent; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 });
  const glowX = useTransform(mx, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["10%", "70%"]);
  const glow = useTransform([glowX, glowY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(241,223,174,.28), transparent 55%)`);

  const onMove = (ev: React.PointerEvent) => {
    if (ev.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((ev.clientX - r.left) / r.width - 0.5);
    my.set((ev.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.article
      ref={ref}
      className={`ev${i === 1 ? " feature" : ""}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={onMove} onPointerLeave={reset}
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: [0.2, 0.75, 0.2, 1], delay: i * 0.15 }}
    >
      <motion.span aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: glow, pointerEvents: "none" }} />
      <motion.div className="icon" whileHover={{ rotate: 8, scale: 1.08 }}><Svg html={icons[e.icon]} /></motion.div>
      <div className="eyebrow solo day">{e.day}</div>
      <h3>{e.name}</h3>
      <p className="note">{e.note}</p>
      <ul className="meta">
        <li><Svg html={ui.cal} />{e.date}</li>
        <li><Svg html={ui.clock} />{e.time}</li>
        <li><Svg html={ui.pin} />{e.venue}</li>
      </ul>
      <div className="actions">
        <motion.button className="btn" type="button" whileTap={{ scale: 0.95 }} onClick={() => downloadIcs(e)}>
          <Svg html={ui.cal} />{T.addCalendar}
        </motion.button>
        <motion.a className="btn" whileTap={{ scale: 0.95 }} target="_blank" rel="noopener"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.mapQuery)}`}>
          <Svg html={ui.pin} />{T.openMap}
        </motion.a>
      </div>
    </motion.article>
  );
}

export function Events() {
  return (
    <section className="section events" id="celebrations">
      <Reveal className="head">
        <span className="eyebrow">{T.eventsEyebrow}</span>
        <h2 className="title">{T.eventsTitle}</h2>
        <p className="doha">{T.eventsDoha}</p>
        <p className="lead small-meaning">{T.eventsDohaMeaning}</p>
        <Svg html={divider()} />
      </Reveal>
      <div className="ev-grid">{WEDDING.events.map((e, i) => <EventCard key={e.id} e={e} i={i} />)}</div>
    </section>
  );
}
