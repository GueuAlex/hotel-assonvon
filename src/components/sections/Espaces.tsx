"use client";

import { useRef } from "react";
import { espaces } from "@/content/site";
import { AVEC_ANIMATIONS, gsap, SANS_ANIMATIONS, useGSAP } from "@/lib/gsap";

// Grands mots en contour qui se remplissent d'ocre au passage
export function Espaces() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(AVEC_ANIMATIONS, () => {
        gsap.utils.toArray<HTMLElement>(".espace").forEach((ligne) => {
          gsap.to(ligne.querySelector(".espace-plein"), {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: ligne, start: "top 80%", end: "top 40%", scrub: true },
          });
        });
      });
      mm.add(SANS_ANIMATIONS, () => {
        gsap.set(".espace-plein", { clipPath: "inset(0% 0% 0% 0%)" });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="espaces" className="gouttiere py-[clamp(96px,14vw,200px)]">
      <p className="eyebrow">{espaces.eyebrow}</p>
      <ul className="mt-10">
        {espaces.liste.map((e) => (
          <li
            key={e.nom}
            className="espace grid gap-4 border-t border-ivoire/15 py-[clamp(24px,4vw,48px)] last:border-b"
          >
            <h3 className="relative font-display text-[clamp(28px,8.2vw,170px)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em]">
              <span className="contour block">{e.nom}</span>
              <span aria-hidden="true" className="espace-plein absolute inset-0 text-ocre [clip-path:inset(0%_100%_0%_0%)]">
                {e.nom}
              </span>
            </h3>
            <p className="max-w-[340px] text-ivoire/75 md:ml-auto">{e.texte}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
