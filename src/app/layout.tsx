import type { Metadata, Viewport } from "next";
import { Archivo, Syne } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { hotel } from "@/content/site";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://hotel-assonvon.vercel.app"),
  title: `${hotel.nom} · Complexe hôtelier 3 étoiles à Yopougon, Abidjan`,
  description: hotel.description,
  // Site de prospection : pas d'indexation avant la signature
  robots: { index: false, follow: false },
  openGraph: {
    title: `${hotel.nom} · L'immortel, depuis ${hotel.depuis}`,
    description: hotel.description,
    siteName: hotel.nom,
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0a08",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${syne.variable} ${archivo.variable}`}>
      <body>
        {/* Sans JavaScript, le contenu du hero reste visible */}
        <noscript>
          <style>{".hero-contenu{visibility:visible!important}"}</style>
        </noscript>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
