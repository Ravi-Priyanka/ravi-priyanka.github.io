"use client";

import { useEffect, useRef } from "react";

type Petal = { x: number; y: number; s: number; vy: number; vx: number; r: number; vr: number; sw: number; f: number; c: [string, string]; a: number; keep?: boolean };

const COLORS: [string, string][] = [["#F4C7CC", "#E59AA6"], ["#FBE3E6", "#EDB6BF"], ["#F7C873", "#E59A35"], ["#E7A3AE", "#B8566B"]];

/** Rose and marigold petals drifting over the cover. Call burstPetals(n) for a celebratory shower. */
export function burstPetals(n: number, keep = false) {
  window.dispatchEvent(new CustomEvent("petals:burst", { detail: { n, keep } }));
}

export function Petals({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    let petals: Petal[] = [];
    let raf = 0;

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const make = (top: boolean): Petal => ({
      x: Math.random() * innerWidth, y: top ? -30 - Math.random() * innerHeight * 0.5 : Math.random() * innerHeight,
      s: 6 + Math.random() * 7, vy: 0.45 + Math.random() * 0.9, vx: -0.25 + Math.random() * 0.5,
      r: Math.random() * 6.28, vr: -0.025 + Math.random() * 0.05, sw: Math.random() * 6.28, f: Math.random() * 6.28,
      c: COLORS[(Math.random() * COLORS.length) | 0], a: 0.9,
    });
    const onBurst = (e: Event) => {
      const { n, keep } = (e as CustomEvent).detail;
      for (let i = 0; i < n; i++) { const p = make(true); p.keep = keep; petals.push(p); }
    };
    const loop = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      const on = activeRef.current && scrollY < innerHeight * 0.8;
      const want = on ? (innerWidth < 600 ? 14 : 24) : 0;
      petals = petals.filter(p => p.y < innerHeight + 40 && p.a > 0);
      if (petals.length < want && Math.random() < 0.06) petals.push(make(true));
      for (const p of petals) {
        if (!on && !p.keep) p.a -= 0.012;
        p.sw += 0.018; p.f += 0.05; p.y += p.vy; p.x += p.vx + Math.sin(p.sw) * 0.6; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.scale(1, 0.55 + Math.abs(Math.sin(p.f)) * 0.45);
        const g = ctx.createLinearGradient(0, -p.s, 0, p.s);
        g.addColorStop(0, p.c[0]); g.addColorStop(1, p.c[1]);
        ctx.fillStyle = g; ctx.globalAlpha = Math.max(0, p.a);
        ctx.beginPath();
        ctx.moveTo(0, -p.s);
        ctx.bezierCurveTo(p.s * 0.9, -p.s * 0.6, p.s * 0.7, p.s * 0.7, 0, p.s);
        ctx.bezierCurveTo(-p.s * 0.7, p.s * 0.7, -p.s * 0.9, -p.s * 0.6, 0, -p.s);
        ctx.fill(); ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };

    size();
    addEventListener("resize", size);
    addEventListener("petals:burst", onBurst);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("petals:burst", onBurst); };
  }, []);

  return <canvas id="petals" ref={ref} aria-hidden="true" />;
}
