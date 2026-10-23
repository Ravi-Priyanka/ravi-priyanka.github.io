/* Small vector ornaments (as SVG strings) that sit alongside the painted artwork. */
/* Small vector ornaments that sit alongside the painted artwork. */
const gold = "currentColor";

export const icons: Record<string, string> = {
  diya: `<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="${gold}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 36 C14 50 50 50 54 36 Z"/><path d="M54 36 L61 31"/><path d="M14 40 C24 44 40 44 50 40" opacity=".5"/>
    <path d="M24 48 L22 55 H42 L40 48"/><path d="M18 55 H46"/></g>
    <path class="flame" d="M32 10 C39 19 39 28 32 33 C25 28 25 19 32 10 Z" fill="#E7A84A"/>
    <path class="flame" d="M32 19 C35 23 35 28 32 30 C29 28 29 23 32 19 Z" fill="#FFE7A8"/></svg>`,
  mandap: `<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="${gold}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M32 4 V9"/><circle cx="32" cy="11" r="2"/><path d="M10 25 C14 14 50 14 54 25"/><path d="M7 25 H57"/>
    <path d="M12 25 V56 M52 25 V56 M22 25 V56 M42 25 V56"/><path d="M5 56 H59"/>
    <path d="M22 38 C26 33 38 33 42 38"/><path d="M27 52 C27 46 37 46 37 52 Z"/><path d="M32 46 C34 43 34 41 32 39 C30 41 30 43 32 46"/></g></svg>`,
  thali: `<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="${gold}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="32" cy="42" rx="26" ry="9"/><ellipse cx="32" cy="42" rx="19" ry="5.5" opacity=".6"/>
    <path d="M25 38 C25 29 39 29 39 38"/><path d="M32 30 V24"/><path d="M27 24 C27 17 37 17 37 24 Z"/>
    <circle cx="17" cy="40" r="3"/><circle cx="47" cy="40" r="3"/><path d="M30 14 C31 12 33 12 34 14"/></g></svg>`
};

export const ui = {
  cal: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.5s6.5-5.8 6.5-11.2a6.5 6.5 0 1 0-13 0c0 5.4 6.5 11.2 6.5 11.2z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10.2" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.5h3.6l1.8 4.6-2.3 1.4a10.5 10.5 0 0 0 5.4 5.4l1.4-2.3 4.6 1.8V18a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3 5.5a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  wa: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.2-3.8A8 8 0 1 1 8 18.8z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.2 8.6c-.4 2.9 3 6.4 6 6l.7-1.4-1.9-.9-.8.8a3.6 3.6 0 0 1-2.4-2.4l.8-.8-.9-1.9z" fill="currentColor"/></svg>`,
  music: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l11-2v12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6.5" cy="18" r="2.5" fill="currentColor"/><circle cx="17.5" cy="16" r="2.5" fill="currentColor"/></svg>`
};

/* Lotus divider with fine gold lines */
export function divider(cls = "") {
  return `<svg class="ornament ${cls}" viewBox="0 0 240 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round">
    <path d="M8 12 H92"/><path d="M148 12 H232"/><circle cx="4" cy="12" r="1.6" fill="currentColor"/><circle cx="236" cy="12" r="1.6" fill="currentColor"/>
    <path d="M96 12 C102 7 108 7 112 12 C108 17 102 17 96 12 Z"/><path d="M144 12 C138 7 132 7 128 12 C132 17 138 17 144 12 Z"/>
    <path d="M120 2 C126 7 126 15 120 22 C114 15 114 7 120 2 Z" fill="currentColor" fill-opacity=".18"/>
    <path d="M120 8 C123 11 123 14 120 17 C117 14 117 11 120 8 Z" fill="currentColor"/></g></svg>`;
}

/* Filigree corner used on frames */
export function corner() {
  return `<svg viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round">
    <path d="M2 78 V20 C2 10 10 2 20 2 H78"/><path d="M8 78 V24 C8 15 15 8 24 8 H78" opacity=".55"/>
    <path d="M8 40 C18 38 22 30 20 22 C28 24 36 18 40 8"/><path d="M20 22 C24 18 26 14 24 10"/><path d="M20 22 C16 18 12 18 10 20"/>
    <circle cx="20" cy="22" r="2.2" fill="currentColor"/><circle cx="46" cy="8" r="1.4" fill="currentColor"/><circle cx="8" cy="46" r="1.4" fill="currentColor"/></g></svg>`;
}

/* Hanging brass lantern */
export function lantern(chain = 50) {
  return `<svg viewBox="0 0 40 ${chain + 70}" aria-hidden="true"><g stroke="currentColor" stroke-width="1.1" fill="none">
    <line x1="20" y1="0" x2="20" y2="${chain}" stroke-dasharray="2 2"/>
    <g transform="translate(0 ${chain})"><path d="M14 0 H26 L30 8 H10 Z" fill="currentColor" fill-opacity=".35"/>
    <path d="M10 8 C6 20 6 34 12 44 H28 C34 34 34 20 30 8 Z"/><path d="M20 8 V44 M14 10 C11 22 11 32 15 44 M26 10 C29 22 29 32 25 44"/>
    <path d="M12 44 H28 L24 52 H16 Z" fill="currentColor" fill-opacity=".35"/><path d="M20 52 V62"/><circle cx="20" cy="64" r="2.2" fill="currentColor"/>
    <ellipse class="glow" cx="20" cy="27" rx="6" ry="10" fill="#FFD989" stroke="none" opacity=".55"/></g></g></svg>`;
}

