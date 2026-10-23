"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WEDDING } from "@/lib/content";
import { divider } from "@/lib/art";
import { Reveal } from "./Reveal";
import { Svg } from "./Svg";

const T = WEDDING.text;

export function Welcome({ guest }: { guest: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const floraA = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const floraB = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const coupleY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section className="section welcome" id="welcome">
      <div className="grid">
        <Reveal variant="zoom" className="arch-art">
          <div ref={ref} style={{ position: "absolute", inset: 0 }}>
            <div className="arch" />
            <motion.img src="/img/couple.webp" className="couple" alt="Illustration of the bride and groom in wedding attire" loading="lazy" style={{ y: coupleY, x: "-50%" }} />
            <motion.img src="/img/florals.webp" className="flora a" alt="" loading="lazy" style={{ y: floraA }} />
            <motion.img src="/img/florals.webp" className="flora b" alt="" loading="lazy" style={{ y: floraB, rotate: 180 }} />
          </div>
        </Reveal>
        <div className="text">
          <Reveal as="span" className="eyebrow">{T.welcomeEyebrow}</Reveal>
          <Reveal as="p" className="dear" delay={0.1}>{T.welcomeDear}</Reveal>
          <Reveal as="h2" className="guest" variant="blur" delay={0.2}>{guest || T.guestDefault}</Reveal>
          <Reveal variant="fade" delay={0.25}><Svg html={divider()} /></Reveal>
          <Reveal as="p" className="lead" delay={0.3}>{T.welcomeText}</Reveal>
          <Reveal as="p" className="sign" delay={0.4}>{T.welcomeSign}</Reveal>
        </div>
      </div>
    </section>
  );
}
