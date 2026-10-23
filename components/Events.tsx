"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { WEDDING, type WeddingEvent } from "@/lib/content";
import { divider, icons, ui } from "@/lib/art";
import { downloadIcs, googleCalendarUrl } from "@/lib/ics";
import { Reveal } from "./Reveal";
import { SplitTitle } from "./SplitTitle";
import { Magnetic } from "./Magnetic";
import { Svg } from "./Svg";

const T = WEDDING.text;
const EASE = [0.2, 0.75, 0.2, 1] as const;

/** "Add to calendar" opens a small menu: Google Calendar or a file for Apple/Outlook. */
function CalendarMenu({ e }: { e: WeddingEvent }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (ev: PointerEvent) => { if (!ref.current?.contains(ev.target as Node)) setOpen(false); };
    const esc = (ev: KeyboardEvent) => { if (ev.key === "Escape") setOpen(false); };
    addEventListener("pointerdown", close); addEventListener("keydown", esc);
    return () => { removeEventListener("pointerdown", close); removeEventListener("keydown", esc); };
  }, [open]);

  return (
    <div className="cal-wrap" ref={ref}>
      <Magnetic>
        <motion.button className="btn" type="button" aria-expanded={open} aria-haspopup="menu" whileTap={{ scale: 0.95 }} onClick={() => setOpen(o => !o)}>
          <Svg html={ui.cal} />{T.addCalendar}
        </motion.button>
      </Magnetic>
      <AnimatePresence>
        {open && (
          <motion.div className="cal-menu" role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}>
            <a role="menuitem" href={googleCalendarUrl(e)} target="_blank" rel="noopener" onClick={() => setOpen(false)}>Google Calendar</a>
            <button role="menuitem" type="button" onClick={() => { downloadIcs(e); setOpen(false); }}>Apple / Outlook</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Arched card that tilts towards the cursor in 3D on desktop. */
function EventCard({ e, i }: { e: WeddingEvent; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });
  const glow = useTransform([mx, my], ([x, y]) =>
    `radial-gradient(circle at ${50 + (x as number) * 60}% ${40 + (y as number) * 60}%, rgba(241,223,174,.3), transparent 55%)`);

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
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: EASE, delay: i * 0.15 }}
    >
      <motion.span aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: glow, pointerEvents: "none" }} />
      <span className="ev-num" aria-hidden="true">0{i + 1}</span>
      <div className="ev-date" aria-hidden="true">
        <b>{e.date.split(" ")[0].padStart(2, "0")}</b>
        <span>{e.date.split(" ")[1].slice(0, 3)}</span>
        <small>{e.day.slice(0, 3)}</small>
      </div>
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
        <CalendarMenu e={e} />
        <Magnetic>
          <motion.a className="btn" whileTap={{ scale: 0.95 }} target="_blank" rel="noopener"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.mapQuery)}`}>
            <Svg html={ui.pin} />{T.openMap}
          </motion.a>
        </Magnetic>
      </div>
    </motion.article>
  );
}

/** Three-day timeline whose gold line draws itself as you scroll; each day lights up as the line reaches it. */
function Timeline() {
  const root = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(-1);
  const n = WEDDING.events.length;
  useGSAP(() => {
    gsap.fromTo(".tl-fill", { scaleX: 0 }, {
      scaleX: 1, ease: "none",
      scrollTrigger: {
        trigger: root.current, start: "top 85%", end: "top 35%", scrub: 0.6,
        onUpdate: self => setLit(Math.min(n - 1, Math.floor(self.progress * (n - 1) + 0.05))),
      },
    });
  }, { scope: root });
  return (
    <div className="timeline" ref={root} aria-hidden="true">
      <div className="tl-track">
      <div className="tl-line"><span className="tl-fill" /></div>
      {WEDDING.events.map((e, i) => (
        <div key={e.id} className={`tl-node${i <= lit ? " lit" : ""}`} style={{ left: `${(i / (n - 1)) * 100}%` }}>
          <span className="tl-dot" />
          <span className="tl-day">{e.date.split(" ").slice(0, 2).join(" ")}</span>
          <span className="tl-name">{e.name}</span>
        </div>
      ))}
      </div>
    </div>
  );
}

export function Events() {
  return (
    <section className="section events" id="celebrations">
      <Reveal className="head">
        <span className="eyebrow">{T.eventsEyebrow}</span>
        <SplitTitle className="title" text={T.eventsTitle} />
        <p className="doha">{T.eventsDoha}</p>
        <p className="lead small-meaning">{T.eventsDohaMeaning}</p>
        <Svg html={divider()} />
      </Reveal>
      <Timeline />
      <div className="ev-grid">{WEDDING.events.map((e, i) => <EventCard key={e.id} e={e} i={i} />)}</div>
    </section>
  );
}
