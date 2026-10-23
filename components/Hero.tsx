"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { WEDDING } from "@/lib/content";
import { corner, lantern } from "@/lib/art";
import { Svg } from "./Svg";
import { scrollToId, useLenis } from "./SmoothScroll";

const { text: T, couple: C } = WEDDING;

const Chars = ({ word }: { word: string }) => (
  <span className="n" aria-label={word}>
    {[...word].map((ch, i) => <span key={i} className="char" aria-hidden="true">{ch}</span>)}
  </span>
);

export function Hero({ opened }: { opened: boolean }) {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const d = T.heroDate;

  // Scroll parallax + desktop mouse-follow depth
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-layer", { yPercent: 14, ease: "none", scrollTrigger: st });
      gsap.to(".hero-content", { yPercent: 28, opacity: 0, ease: "none", scrollTrigger: st });
      gsap.to(".lantern", { y: -60, ease: "none", scrollTrigger: st });
    });
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const lx = gsap.quickTo(".hero-img", "x", { duration: 1.2, ease: "power3" });
      const ly = gsap.quickTo(".hero-img", "y", { duration: 1.2, ease: "power3" });
      const cx = gsap.quickTo(".hero-content .names", "x", { duration: 1.4, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        lx(nx * -24); ly(ny * -14); cx(nx * 10);
      };
      root.current!.addEventListener("pointermove", onMove);
      return () => root.current?.removeEventListener("pointermove", onMove);
    });
  }, { scope: root });

  // Entrance once the doors open: slow zoom on the painting and the names writing in letter by letter
  useGSAP(() => {
    if (!opened) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { gsap.set(".char", { opacity: 1 }); return; }
    const tl = gsap.timeline();
    tl.fromTo(".hero-img", { scale: 1.16 }, { scale: 1.04, duration: 7, ease: "power2.out" }, 0)
      .fromTo(".char",
        { yPercent: 120, opacity: 0, rotateX: -70, filter: "blur(10px)" },
        { yPercent: 0, opacity: 1, rotateX: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out", stagger: 0.045 }, 0.7)
      .fromTo(".hero .names .amp", { scale: 0, rotate: -90, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: "back.out(2)" }, 1.1);
  }, { scope: root, dependencies: [opened] });

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-layer">
        <picture>
          <source media="(min-aspect-ratio: 1/1)" srcSet="/img/hero-wide.webp 2560w, /img/hero-wide-2x.webp 3840w" sizes="100vw" />
          <img className="hero-img" src="/img/hero-portrait.webp" srcSet="/img/hero-portrait.webp 1440w, /img/hero-portrait-2x.webp 2160w" sizes="100vw" alt="A pink Rajasthani palace at dawn, framed by cherry blossoms" fetchPriority="high" />
        </picture>
      </div>
      <div className="veil" />
      <div className="frame">
        {["tl", "tr", "bl", "br"].map(c => <Svg key={c} className={`corner ${c}`} html={corner()} />)}
      </div>
      <Svg className="lantern l" html={lantern(46)} />
      <Svg className="lantern r" html={lantern(76)} />
      <div className="hero-content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ganesh" src="/img/ganesh.webp" alt="Lord Ganesha" data-in="1" />
        <div className="eyebrow solo blessing" data-in="1">{T.blessing}</div>
        <p className="together" data-in="2">{T.heroEyebrow}</p>
        <h1 className="names" style={{ perspective: 600 }}>
          <Chars word={C.groom} /><span className="amp">&amp;</span><Chars word={C.bride} />
        </h1>
        <div className="date" data-in="5">
          <span className="side">{d.weekday}</span>
          <span className="big">{d.day}</span>
          <span className="side">{d.month} {d.year}</span>
        </div>
        <div className="place" data-in="6">{T.heroPlace}</div>
      </div>
      <a className="scroll-cue" href="#welcome" data-in="7" onClick={e => { e.preventDefault(); scrollToId(lenis, "welcome"); }}>
        <i />{T.scroll}
      </a>
    </section>
  );
}
