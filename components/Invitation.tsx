"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING } from "@/lib/content";
import { SmoothScroll } from "./SmoothScroll";
import { Intro } from "./Intro";
import { TopBar } from "./TopBar";
import { Hero } from "./Hero";
import { Welcome } from "./Welcome";
import { Countdown } from "./Countdown";
import { InvitationCard } from "./InvitationCard";
import { Baraat } from "./Baraat";
import { Events } from "./Events";
import { Family } from "./Family";
import { Closing } from "./Closing";
import { LoveQuiz } from "./LoveQuiz";
import { Petals, burstPetals } from "./Petals";
import { Preloader } from "./Preloader";
import { Cursor } from "./Cursor";
import { Marquee } from "./Marquee";
import { MobileDock } from "./MobileDock";
import { QuizFab } from "./QuizFab";

/** The whole invitation: palace doors first, then the scrolling site. */
export function Invitation() {
  const [guest, setGuest] = useState("");
  const [autoOpen, setAutoOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [introGone, setIntroGone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const music = WEDDING.config.music;

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setGuest((p.get("to") || p.get("name") || "").trim().slice(0, 80));
    if (p.has("open")) setAutoOpen(true); // handy while editing: add ?open to skip the doors
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    // Re-measure scroll animations whenever the page height changes (fonts/images finishing loading).
    let t: ReturnType<typeof setTimeout>;
    let lastH = 0;
    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (Math.abs(h - lastH) < 2) return;
      lastH = h;
      clearTimeout(t);
      t = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    ro.observe(document.body);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => { ro.disconnect(); clearTimeout(t); };
  }, []);

  const handleOpen = () => {
    document.body.classList.remove("is-sealed");
    document.body.classList.add("opened");
    window.scrollTo(0, 0);
    setOpened(true);
    burstPetals(30);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  // Start the song on the seal tap and fade it in softly
  const startMusic = () => {
    const a = audio.current;
    if (!music || !a) return;
    a.volume = 0;
    a.play().then(() => {
      let v = 0;
      const id = setInterval(() => { v = Math.min(0.55, v + 0.03); a.volume = v; if (v >= 0.55) clearInterval(id); }, 120);
    }).catch(() => {});
  };

  const toggleMusic = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {}); else a.pause();
  };

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll locked={!opened}>
        <Preloader />
        <Cursor />
        {!introGone && <Intro guest={guest} autoOpen={autoOpen} onTap={startMusic} onOpen={handleOpen} onDone={() => setIntroGone(true)} />}
        <TopBar opened={opened} />
        <main id="site" aria-hidden={!opened}>
          <Hero opened={opened} />
          <Marquee />
          <Welcome guest={guest} />
          <Countdown />
          <InvitationCard />
          <Baraat />
          <Events />
          <Family />
          <LoveQuiz guest={guest} />
          <Closing />
        </main>
        {music && (
          <>
            <audio ref={audio} src={music} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
            <motion.button className={`music-btn${playing ? " playing" : " muted"}`} type="button"
              aria-label={playing ? "Pause music" : "Play music"} aria-pressed={playing} title={playing ? "Music on — tap to pause" : "Music off — tap to play"}
              onClick={toggleMusic} whileTap={{ scale: 0.9 }} initial={{ opacity: 0, scale: 0.5 }} animate={opened ? { opacity: 1, scale: 1 } : {}}>
              <span className="ring" />
              <svg viewBox="0 0 24 24" aria-hidden="true" className="mb-icon">
                <path d="M9 18V6l11-2v12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6.5" cy="18" r="2.5" fill="currentColor" /><circle cx="17.5" cy="16" r="2.5" fill="currentColor" />
                {!playing && <path className="slash" d="M3 3 L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
              </svg>
              {playing && <span className="mb-bars" aria-hidden="true"><i /><i /><i /></span>}
            </motion.button>
          </>
        )}
        <QuizFab opened={opened} />
        <MobileDock opened={opened} />
        <Petals active={opened} />
        <div className="grain" aria-hidden="true" />
      </SmoothScroll>
    </MotionConfig>
  );
}
