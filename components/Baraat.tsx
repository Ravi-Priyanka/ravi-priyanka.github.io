"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WEDDING } from "@/lib/content";
import { Reveal } from "./Reveal";

const T = WEDDING.text;

/** The section pins in place while the painted procession marches across as you scroll (GSAP ScrollTrigger). */
export function Baraat() {
  const root = useRef<HTMLElement>(null);
  const pro = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const el = pro.current!;
      let walkTimer: ReturnType<typeof setTimeout>;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current, start: "top top", pin: true, scrub: 0.8, invalidateOnRefresh: true,
          end: () => "+=" + Math.round(el.offsetWidth + innerWidth * 0.9),
          onUpdate: self => {
            if (Math.abs(self.getVelocity()) < 5) return;
            el.classList.add("walking");
            clearTimeout(walkTimer);
            walkTimer = setTimeout(() => el.classList.remove("walking"), 220);
          },
        },
      });
      tl.fromTo(el, { x: () => innerWidth * 0.9 }, { x: () => innerWidth * 0.08 - el.offsetWidth }, 0)
        .fromTo(".baraat .bg", { xPercent: 4 }, { xPercent: -6 }, 0)
        .fromTo(".progress span", { scaleX: 0 }, { scaleX: 1 }, 0)
        .to(".baraat .head", { y: -30, opacity: 0.35, duration: 0.4 }, 0.6);
    });
  }, { scope: root });

  return (
    <section className="baraat" id="baraat" ref={root}>
      <div className="baraat-sticky">
        <div className="bg" />
        <Reveal className="head">
          <span className="eyebrow">{T.baraatEyebrow}</span>
          <h2 className="title">{T.baraatTitle}</h2>
          <p className="lead">{T.baraatText}</p>
          <span className="hint"><i />{T.baraatHint}</span>
        </Reveal>
        <div className="road" />
        <div className="procession" ref={pro}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/baraat.webp" alt="Illustrated baraat procession with musicians, a decorated elephant carrying the groom, and dancers"
            onLoad={() => ScrollTrigger.refresh()} />
        </div>
        <div className="progress"><span /></div>
      </div>
    </section>
  );
}
