import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Jost, Pinyon_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const pinyon = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-pinyon", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-cinzel", display: "swap" });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-playfair", display: "swap" });

// Set this to your live address (e.g. https://ravisaumya.in) so WhatsApp shows the preview image.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ravindra & Saumya · Wedding Invitation · 9 December 2026",
  description: "Ravindra (Ravi) & Saumya (Priyanka) request the pleasure of your company at their wedding on Wednesday, 9 December 2026 in Pindwara, Rajasthan.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    title: "Ravindra & Saumya · Wedding Invitation",
    description: "Wednesday, 9 December 2026 · Pindwara, Rajasthan. You and your family are warmly invited.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#35091B", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [cormorant, pinyon, cinzel, jost, playfair].map(f => f.variable).join(" ");
  return (
    <html lang="en" className={fonts}>
      <body className="is-sealed">{children}</body>
    </html>
  );
}
