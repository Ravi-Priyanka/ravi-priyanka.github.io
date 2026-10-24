"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WEDDING } from "@/lib/content";
import { COMPLIMENTS, QUESTIONS, STATUSES, TYPES, hasPlayedQuiz, loveScore, markQuizPlayed, type Status, type TypeKey } from "@/lib/quiz";
import { SplitTitle } from "./SplitTitle";
import { Magnetic } from "./Magnetic";
import { burstPetals } from "./Petals";

const EASE = [0.2, 0.75, 0.2, 1] as const;
const DUP = "This email or mobile number has already played — each guest can enter once. Thank you for playing 💛";
const TOTAL = QUESTIONS.length + 1; // status + fun questions
const slide = {
  initial: { opacity: 0, x: 40, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, x: -40, scale: 0.98, transition: { duration: 0.3 } },
};

type Details = { name: string; email: string; phone: string };

/** "What's your love story?" — a short romantic quiz that ends in a personalised reading. */
export function LoveQuiz({ guest }: { guest: string }) {
  const [step, setStep] = useState(0); // 0 intro · 1 status · 2..5 questions · 6 details · 7 result
  const [status, setStatus] = useState<Status | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [d, setD] = useState<Details>({ name: "", email: "", phone: "" });
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState<"no" | "sending" | "yes">("no");

  const result: TypeKey = (() => {
    const tally: Record<TypeKey, number> = { romantic: 0, baraat: 0, adventurer: 0, home: 0 };
    answers.forEach((a, i) => { tally[QUESTIONS[i].options[a].type]++; });
    return (Object.keys(tally) as TypeKey[]).sort((a, b) => tally[b] - tally[a])[0];
  })();
  const firstName = d.name.trim().split(" ")[0];

  const pick = (i: number) => {
    const next = [...answers]; next[step - 2] = i; setAnswers(next);
    setTimeout(() => setStep(s => s + 1), 260);
  };

  const reveal = () => { setStep(7); burstPetals(45, true); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phone = d.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
    if (d.name.trim().length < 2) return setErr("Please tell us your full name.");
    if (!/^\S+@\S+\.\S+$/.test(d.email.trim())) return setErr("Please enter a valid email address.");
    if (!/^[6-9]\d{9}$/.test(phone)) return setErr("Please enter a valid 10-digit mobile number.");
    if (hasPlayedQuiz(d.email, phone)) return setErr(DUP);
    setErr("");
    const endpoint = WEDDING.config.quizEndpoint;
    if (endpoint) {
      setSaved("sending");
      const data = new URLSearchParams({
        name: d.name.trim(), email: d.email.trim(), phone: "+91" + phone, status: status ?? "",
        ...Object.fromEntries(QUESTIONS.map((q, i) => [`q${i + 1}`, q.options[answers[i]]?.label ?? ""])),
        result: TYPES[result].title, score: String(loveScore(d.name)), invitedAs: guest, submittedAt: new Date().toISOString(),
      });
      try {
        const res = await fetch(endpoint, { method: "POST", body: data });
        const out = await res.json().catch(() => ({ ok: true }));
        if (out && out.duplicate) { setSaved("no"); markQuizPlayed(d.email, phone); return setErr(DUP); }
        setSaved("yes");
      } catch {
        // The request may still have reached the sheet even if the reply could not be read.
        setSaved("yes");
      }
      markQuizPlayed(d.email, phone);
    }
    reveal();
  };

  const shareText = `I'm "${TYPES[result].title}" ${TYPES[result].emoji} — take the love quiz on Ravi & Priyanka's wedding invitation! ${typeof location !== "undefined" ? location.origin : ""}`;

  return (
    <section className="section quiz" id="quiz">
      <div className="head">
        <span className="eyebrow">A little fun</span>
        <SplitTitle className="title" text="What's your love story?" />
        <p className="lead">Five quick taps, one sweet surprise. Play our wedding love quiz!</p>
      </div>

      <div className="quiz-card">
        <span className="qz-glow" aria-hidden="true" />
        {step >= 1 && step <= TOTAL && (
          <div className="qz-progress" aria-label={`Question ${step} of ${TOTAL}`}>
            {Array.from({ length: TOTAL }, (_, i) => <span key={i} className={i < step ? "on" : ""} />)}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="intro" className="qz-step qz-intro" {...slide}>
              <motion.div className="qz-hearts" aria-hidden="true" animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}>💞</motion.div>
              <h3>Discover your love personality</h3>
              <p>Answer five playful questions and get a personalised reading — with love from Ravi &amp; Priyanka.</p>
              <Magnetic><button type="button" className="btn solid qz-cta" onClick={() => setStep(1)}>Let&apos;s play ✨</button></Magnetic>
              <small>Takes about 30 seconds</small>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="status" className="qz-step" {...slide}>
              <h3>First things first — your love status?</h3>
              <div className="qz-options grid2">
                {STATUSES.map(s => (
                  <motion.button key={s.key} type="button" className={`qz-opt${status === s.key ? " on" : ""}`}
                    whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}
                    onClick={() => { setStatus(s.key); setTimeout(() => setStep(2), 260); }}>
                    <span className="e">{s.emoji}</span><span>{s.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step >= 2 && step <= TOTAL && (
            <motion.div key={`q${step}`} className="qz-step" {...slide}>
              <h3>{QUESTIONS[step - 2].q}</h3>
              <div className="qz-options">
                {QUESTIONS[step - 2].options.map((o, i) => (
                  <motion.button key={o.label} type="button" className={`qz-opt row${answers[step - 2] === i ? " on" : ""}`}
                    whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }} onClick={() => pick(i)}>
                    <span className="e">{o.emoji}</span><span>{o.label}</span>
                  </motion.button>
                ))}
              </div>
              <button type="button" className="qz-back" onClick={() => setStep(s => s - 1)}>← Back</button>
            </motion.div>
          )}

          {step === 6 && (
            <motion.form key="details" className="qz-step qz-details" {...slide} onSubmit={submit} noValidate>
              <motion.div className="qz-sealed" aria-hidden="true" animate={{ rotate: [0, -6, 6, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}>💌</motion.div>
              <h3>Your reading is ready!</h3>
              <p className="qz-note">Tell us who you are so we can personalise it — and keep in touch about the wedding.</p>
              <label className="qz-field"><span>Your full name</span>
                <input type="text" autoComplete="name" value={d.name} onChange={e => setD({ ...d, name: e.target.value })} />
              </label>
              <label className="qz-field"><span>Email</span>
                <input type="email" autoComplete="email" inputMode="email" value={d.email} onChange={e => setD({ ...d, email: e.target.value })} />
              </label>
              <label className="qz-field"><span>Mobile number</span>
                <div className="qz-phone"><b>+91</b>
                  <input type="tel" autoComplete="tel-national" inputMode="numeric" value={d.phone} onChange={e => setD({ ...d, phone: e.target.value })} />
                </div>
              </label>
              {err && <p className="qz-err" role="alert">{err}</p>}
              <Magnetic><button type="submit" className="btn solid qz-cta" disabled={saved === "sending"}>{saved === "sending" ? "Saving…" : "Reveal my reading ✨"}</button></Magnetic>
            </motion.form>
          )}

          {step === 7 && (
            <motion.div key="result" className="qz-step qz-result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } }}>
              <motion.div className="qz-badge" initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}>
                {TYPES[result].emoji}
              </motion.div>
              <span className="eyebrow solo">{firstName ? `${firstName}, you are` : "You are"}</span>
              <h3 className="qz-type">{TYPES[result].title}</h3>
              <p className="qz-line">{TYPES[result].line}</p>
              {status && <p className="qz-compliment">{COMPLIMENTS[status]}</p>}
              {firstName && (
                <div className="qz-score">
                  <span>Love score</span>
                  <b>{loveScore(d.name)}%</b>
                  <i><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: loveScore(d.name) / 100 }} transition={{ duration: 1.4, ease: EASE, delay: 0.5 }} /></i>
                </div>
              )}
              {saved === "yes" && <p className="qz-saved">✓ Thank you — your details are saved with love.</p>}
              <div className="qz-actions">
                <a className="btn solid" href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener">Share on WhatsApp</a>
                <button type="button" className="btn" onClick={() => { setStep(1); setAnswers([]); setStatus(null); setSaved("no"); }}>Play again</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
