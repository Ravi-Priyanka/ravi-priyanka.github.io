"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WEDDING } from "@/lib/content";
import { ui } from "@/lib/art";
import { SplitTitle } from "./SplitTitle";
import { Magnetic } from "./Magnetic";
import { Svg } from "./Svg";

const T = WEDDING.text;
const EASE = [0.2, 0.75, 0.2, 1] as const;

/** Gold and rose fireworks that burst over the palace while the section is on screen. */
function Fireworks({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const on = useRef(active);
  on.current = active;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = ref.current!, ctx = cv.getContext("2d")!;
    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; c: string; s: number };
    let parts: P[] = [], raf = 0, last = 0, w = 0, h = 0;
    const small = window.matchMedia("(max-width: 700px), (pointer: coarse)").matches;
    const COLS = ["#F1DFAE", "#E4C77A", "#FFD27A", "#F4C7CC", "#E7A3AE", "#FFFFFF"];
    const size = () => {
      const dpr = small ? 1 : Math.min(2, devicePixelRatio || 1), r = cv.getBoundingClientRect();
      w = r.width; h = r.height; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const burst = () => {
      // keep bursts clear of the title: sides on wide screens, the open middle band on phones
      const side = Math.random() < 0.5;
      const x = w < 700 ? w * (0.15 + Math.random() * 0.7) : side ? w * (0.04 + Math.random() * 0.22) : w * (0.74 + Math.random() * 0.22);
      const y = h * (0.15 + Math.random() * 0.4);
      const c = COLS[(Math.random() * COLS.length) | 0], n = small ? 26 + ((Math.random() * 8) | 0) : 46 + ((Math.random() * 20) | 0);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2, sp = 1.2 + Math.random() * 2.4;
        parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, max: 60 + Math.random() * 30, c, s: 1.2 + Math.random() * 1.4 });
      }
    };
    const loop = (t: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,.22)"; ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      if (on.current && t - last > (small ? 1600 : 900) + Math.random() * 900) { burst(); last = t; }
      if (!on.current && !parts.length) { raf = requestAnimationFrame(loop); return; }
      parts = parts.filter(p => p.life < p.max);
      for (const p of parts) {
        p.life++; p.vx *= 0.975; p.vy = p.vy * 0.975 + 0.035; p.x += p.vx; p.y += p.vy;
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.max);
        ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    size(); addEventListener("resize", size); raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); };
  }, []);

  return <canvas ref={ref} className="b-fireworks" aria-hidden="true" />;
}

/** A garland of warm string lights draped across the top of the scene. */
function StringLights() {
  const bulbs = Array.from({ length: 19 }, (_, i) => {
    const t = i / 18, x = t * 1000, y = 18 + Math.sin(t * Math.PI) * 70;
    return { x, y, d: (i % 5) * 0.35 };
  });
  return (
    <svg className="b-lights" viewBox="0 0 1000 110" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 18 Q500 158 1000 18" fill="none" stroke="rgba(241,223,174,.45)" strokeWidth="1.2" />
      {bulbs.map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y})`}>
          <line y2="7" stroke="rgba(241,223,174,.5)" strokeWidth="1" />
          <circle cy="11" r="4.2" className="bulb" style={{ animationDelay: `${b.d}s` }} />
        </g>
      ))}
    </svg>
  );
}

/** Night-time baraat: the section pins while the painted procession marches across under fireworks,
 *  and a gold dot travels the route from home to the hotel in step with the scroll. */
export function Baraat() {
  const root = useRef<HTMLElement>(null);
  const pro = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const stars = useRef(Array.from({ length: 46 }, (_, i) => ({
    l: `${(i * 37) % 100}%`, t: `${(i * 23) % 52}%`, s: 1 + (i % 3), d: `${(i % 7) * 0.6}s`,
  }))).current;

  useGSAP(() => {
    ScrollTrigger.create({ trigger: root.current, start: "top 80%", end: "bottom 20%", onToggle: s => setInView(s.isActive) });
    ScrollTrigger.config({ ignoreMobileResize: true });
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const el = pro.current!;
      const touch = window.matchMedia("(max-width: 700px), (pointer: coarse)").matches;
      let walkTimer: ReturnType<typeof setTimeout>;
      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 }, // every tween spans the whole pinned scroll
        scrollTrigger: {
          trigger: root.current, start: "top top", pin: true, scrub: touch ? true : 0.8, anticipatePin: 1, invalidateOnRefresh: true,
          end: () => "+=" + Math.round(innerWidth * 0.5 + el.offsetWidth),
          onUpdate: self => {
            if (touch || Math.abs(self.getVelocity()) < 5) return;
            el.classList.add("walking");
            clearTimeout(walkTimer);
            walkTimer = setTimeout(() => el.classList.remove("walking"), 220);
          },
        },
      });
      tl.fromTo(el, { x: () => innerWidth * 0.85 }, { x: () => innerWidth * 0.35 - el.offsetWidth, force3D: true }, 0)
        .fromTo(".route-fill", { scaleX: 0 }, { scaleX: 1 }, 0)
        .fromTo(".route-dot", { left: "0%" }, { left: "100%" }, 0)
        .fromTo(".route .end", { opacity: 0.45 }, { opacity: 1, duration: 0.15 }, 0.85);
      // Gentle background drift only on larger screens (keeps phones smooth)
      if (!touch) tl.fromTo(".b-palace", { xPercent: 3 }, { xPercent: -5 }, 0).fromTo(".b-moon", { y: 20 }, { y: -30 }, 0);
    });
  }, { scope: root });

  return (
    <section className="baraat night" id="baraat" ref={root}>
      <div className="baraat-sticky">
        <div className="b-sky" />
        <div className="b-stars" aria-hidden="true">
          {stars.map((s, i) => <i key={i} style={{ left: s.l, top: s.t, width: s.s, height: s.s, animationDelay: s.d }} />)}
        </div>
        <div className="b-moon" aria-hidden="true" />
        <Fireworks active={inView} />
        <StringLights />
        <div className="b-palace" aria-hidden="true" />

        <div className="b-head">
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE }}>
            {T.baraatEyebrow}
          </motion.span>
          <SplitTitle className="title" text={T.baraatTitle} />
          <motion.p className="b-tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }}>
            {T.baraatTagline}
          </motion.p>

          <motion.div className="route-card" initial={{ opacity: 0, y: 30, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1, ease: EASE, delay: 0.3 }}>
            <div className="route-top">
              <span className="chip"><Svg html={ui.clock} />{T.baraatTime}</span>
              <Magnetic>
                <a className="btn light" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(T.baraatMap)}`} target="_blank" rel="noopener">
                  <Svg html={ui.pin} />Directions
                </a>
              </Magnetic>
            </div>
            <div className="route">
              <div className="stop">
                <span className="pin" />
                <b>{T.baraatFrom}</b>
                <small>{T.baraatFromSub}</small>
              </div>
              <div className="route-track" aria-hidden="true">
                <span className="route-line" /><span className="route-fill" />
                <span className="route-dot">✦</span>
              </div>
              <div className="stop end">
                <span className="pin" />
                <b>{T.baraatTo}</b>
                <small>{T.baraatToSub}</small>
              </div>
            </div>
            <p className="sr-only">{T.baraatText}</p>
          </motion.div>
          <span className="hint"><i />{T.baraatHint}</span>
        </div>

        <div className="b-glow" aria-hidden="true" />
        <div className="road" />
        <div className="procession" ref={pro}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/baraat.webp" alt="Illustrated baraat procession with musicians, a decorated elephant carrying the groom, and dancers"
            onLoad={() => ScrollTrigger.refresh()} />
        </div>
      </div>
    </section>
  );
}
