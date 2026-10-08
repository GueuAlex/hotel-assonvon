"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, SANS_ANIMATIONS } from "@/lib/gsap";

export type Lumiere = { x: number; y: number };

type Props = {
  // Position du projecteur, en px dans la fenetre
  lumiere: RefObject<Lumiere>;
  className?: string;
};

// Lignes ondulantes inspirees du tissu des fauteuils du hall ; elles se gonflent sous la lumiere
export function VaguesCanvas({ lumiere, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    const reduit = matchMedia(SANS_ANIMATIONS).matches;
    let largeur = 0;
    let hauteur = 0;
    const redimensionner = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      largeur = cv.clientWidth;
      hauteur = cv.clientHeight;
      cv.width = largeur * dpr;
      cv.height = hauteur * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let visible = true;
    const observateur = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    observateur.observe(cv);

    const debut = performance.now();
    const dessiner = () => {
      if (!visible) return;
      const t = reduit ? 0 : (performance.now() - debut) / 1000;
      const cadre = cv.getBoundingClientRect();
      const lx = lumiere.current.x - cadre.left;
      const ly = lumiere.current.y - cadre.top;
      const rayon = Math.max(largeur, hauteur) * 0.28;
      const nb = Math.round(hauteur / 26);
      const pas = hauteur / nb;

      ctx.clearRect(0, 0, largeur, hauteur);
      ctx.lineWidth = 1.2;
      for (let i = -1; i <= nb + 1; i++) {
        const base = i * pas;
        ctx.beginPath();
        for (let x = -10; x <= largeur + 10; x += 8) {
          const dx = x - lx;
          const dy = base - ly;
          const proche = Math.exp(-(dx * dx + dy * dy) / (2 * rayon * rayon));
          const amplitude = 7 + proche * 22;
          const y = base + Math.sin(x * 0.012 + i * 0.9 + t * 0.6) * amplitude + Math.sin(x * 0.031 - t * 0.4 + i) * 3;
          if (x === -10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const dy = base - ly;
        const alpha = 0.07 + 0.28 * Math.exp(-(dy * dy) / (2 * rayon * rayon));
        ctx.strokeStyle = `rgba(239, 231, 218, ${alpha})`;
        ctx.stroke();
      }
    };

    redimensionner();
    addEventListener("resize", redimensionner);
    if (reduit) dessiner();
    else gsap.ticker.add(dessiner);

    return () => {
      removeEventListener("resize", redimensionner);
      gsap.ticker.remove(dessiner);
      observateur.disconnect();
    };
  }, [lumiere]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
