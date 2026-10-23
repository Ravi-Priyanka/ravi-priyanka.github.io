# Ravindra & Saumya — Wedding Invitation (Next.js)

Next.js 15 + React 19, with **Framer Motion** (reveals, tabs, 3D tilt, flipping countdown), **GSAP ScrollTrigger** (cover parallax, letter-by-letter names, pinned baraat procession) and **Lenis** (smooth scrolling). Exported as plain static files, so it runs on any hosting, including Hostinger shared hosting.

## Where things are

| Path | What it is |
|---|---|
| `lib/content.ts` | **All wedding text, dates, events, family names, phone numbers.** Edit this. |
| `components/` | One file per section: `Intro` (palace doors), `Hero`, `Welcome`, `Countdown`, `InvitationCard`, `Baraat`, `Events`, `Family`, `Closing` |
| `app/globals.css` | Colours, fonts, layout (same design as before) |
| `app/layout.tsx` | Fonts and the WhatsApp link-preview settings |
| `public/img/` | Painted artwork |
| `public/.htaccess` | Caching and 404 settings for Hostinger |

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 (add `?open` to skip the doors, or `?to=Sharma Family` to see a personal greeting).

## Build for Hostinger

Set your real address so WhatsApp shows the preview picture, then build:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.in npm run build
```

This creates the `out/` folder. Upload **the contents of `out/`** (including the hidden `.htaccess` file) into `public_html` on Hostinger.

## Music

Put an MP3 at `public/music.mp3` and set `music: "/music.mp3"` in `lib/content.ts`. A gold music button appears and the song starts when the doors open.

## Personal links

`https://yourdomain.in/?to=Sharma Family` shows the family's name on the doors and in the welcome greeting.
