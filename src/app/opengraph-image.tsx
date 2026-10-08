import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hotel } from "@/content/site";

// Image d'apercu des partages (WhatsApp, Facebook...)
export const alt = `${hotel.nom} · ${hotel.quartier}, depuis ${hotel.depuis}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Lus au build : l'image est generee une seule fois, statiquement
const racine = process.cwd();
const [syne, archivo, masque] = await Promise.all([
  readFile(join(racine, "node_modules/@fontsource/syne/files/syne-latin-800-normal.woff")),
  readFile(join(racine, "node_modules/@fontsource/archivo/files/archivo-latin-500-normal.woff")),
  readFile(join(racine, "public/images/masque-sculpte.jpg")),
]);
const photo = `data:image/jpeg;base64,${masque.toString("base64")}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0c0a08", position: "relative" }}>
        {/* Masque a droite, fondu dans le noir par des degrades lineaires */}
        <img src={photo} width={480} height={640} alt="" style={{ position: "absolute", right: 0, top: -5, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(90deg, #0c0a08 0%, #0c0a08 58%, rgba(12,10,8,0.55) 72%, rgba(12,10,8,0.35) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "linear-gradient(180deg, rgba(12,10,8,0.7) 0%, rgba(12,10,8,0) 30%, rgba(12,10,8,0) 65%, rgba(12,10,8,0.85) 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", position: "relative" }}>
          <div style={{ fontFamily: "Archivo", fontSize: 24, letterSpacing: 6, color: "#c98b2b", textTransform: "uppercase" }}>
            Hôtel 3 étoiles · Yopougon · Depuis 1984
          </div>
          <div style={{ fontFamily: "Syne", fontSize: 168, lineHeight: 0.84, color: "#efe7da", marginTop: 26, letterSpacing: -6 }}>
            ASSON
          </div>
          <div style={{ fontFamily: "Syne", fontSize: 168, lineHeight: 0.84, color: "#c98b2b", letterSpacing: -6 }}>VON</div>
          <div style={{ fontFamily: "Archivo", fontSize: 30, color: "rgba(239,231,218,0.8)", marginTop: 34 }}>
            L&apos;immortel. Abidjan, Côte d&apos;Ivoire.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Syne", data: syne, style: "normal", weight: 800 },
        { name: "Archivo", data: archivo, style: "normal", weight: 500 },
      ],
    },
  );
}
