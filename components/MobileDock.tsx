"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WEDDING } from "@/lib/content";
import { scrollToId, useLenis } from "./SmoothScroll";

const I = {
  home: <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5.5h-5V21H5a1 1 0 0 1-1-1z" />,
  card: <><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 9.5h8M8 13h8M8 16.5h5" /></>,
  flag: <><path d="M6 21V4" /><path d="M6 5h11l-2.5 3.5L17 12H6" /></>,
  cal: <><rect x="4" y="5.5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3.5v4M15 3.5v4" /></>,
  fam: <><circle cx="9" cy="8.5" r="3" /><circle cx="16.5" cy="9.5" r="2.4" /><path d="M3.5 19.5c.6-3.3 2.9-5 5.5-5s4.9 1.7 5.5 5M14.5 14.6c2.6-.4 5 .9 6 4.9" /></>,
  call: <path d="M5 3.5h3.6l1.8 4.6-2.3 1.4a10.5 10.5 0 0 0 5.4 5.4l1.4-2.3 4.6 1.8V18a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3 5.5a2 2 0 0 1 2-2z" />,
};
const ITEMS = [["top", "Home", "home"], ["invitation", "Invite", "card"], ["baraat", "Baraat", "flag"], ["celebrations", "Events", "cal"], ["family", "Family", "fam"]] as const;

/** Floating glass navigation pill for phones, with a gliding highlight on the current section. */
export function MobileDock({ opened }: { opened: boolean }) {
  const lenis = useLenis();
  const [active, setActive] = useState("top");

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ITEMS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const phone = WEDDING.contacts[0]?.phone;
  return (
    <AnimatePresence>
      {opened && (
        <motion.nav className="dock" aria-label="Quick navigation"
          initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 120, opacity: 0 }}
          transition={{ delay: 2.2, type: "spring", stiffness: 160, damping: 20 }}>
          {ITEMS.map(([id, label, icon]) => (
            <button key={id} type="button" className={`dock-item${active === id ? " on" : ""}`} aria-label={label}
              aria-current={active === id ? "true" : undefined} onClick={() => scrollToId(lenis, id)}>
              {active === id && <motion.span layoutId="dock-pill" className="dock-pill" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <svg viewBox="0 0 24 24" aria-hidden="true">{I[icon]}</svg>
              <span>{label}</span>
            </button>
          ))}
          {phone && (
            <a className="dock-item call" href={`tel:+91${phone}`} aria-label="Call the family">
              <svg viewBox="0 0 24 24" aria-hidden="true">{I.call}</svg><span>Call</span>
            </a>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
