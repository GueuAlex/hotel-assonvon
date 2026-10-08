"use client";

import { useRef } from "react";
import { heritage } from "@/content/site";
import { AVEC_ANIMATIONS, gsap, SplitText, useGSAP } from "@/lib/gsap";

export function Heritage() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(AVEC_ANIMATIONS, () => {
        // Les mots s'allument au fil du scroll
        const mots = SplitText.create(".heritage-texte", { type: "words" });
        gsap.fromTo(
          mots.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: ".heritage-texte", start: "top 78%", end: "bottom 45%", scrub: true },
          },
        );

        gsap.utils.toArray<HTMLElement>(".chiffre-valeur").forEach((el) => {
          // L'annee d'ouverture remonte le temps depuis aujourd'hui, les autres chiffres partent de zero
          const fin = Number(el.textContent);
          gsap.from(el, {
            textContent: fin > 1900 ? new Date().getFullYear() : 0,
            duration: 2.2,
            ease: "power3.out",
            snap: { textContent: 1 },
            scrollTrigger: { trigger: el, start: "top 90%" },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="heritage" className="gouttiere py-[clamp(96px,16vw,220px)]">
      <p className="eyebrow">{heritage.eyebrow}</p>
      <p className="heritage-texte mt-7 max-w-[1300px] font-display text-[clamp(30px,4.6vw,72px)] font-semibold leading-[1.08] tracking-[-0.02em]">
        {heritage.texte} <span className="text-marbre">{heritage.accent}</span>
      </p>

      <dl className="mt-[clamp(64px,9vw,128px)] grid grid-cols-2 border-t border-ivoire/15 lg:grid-cols-4">
        {heritage.chiffres.map((c) => (
          <div key={c.label} className="flex flex-col-reverse gap-2 border-b border-ivoire/15 py-8 pr-4 lg:border-b-0">
            <dt className="text-xs uppercase tracking-[0.18em] text-ocre">{c.label}</dt>
            <dd
              className="chiffre-valeur font-display text-[clamp(48px,7vw,112px)] font-extrabold leading-none tracking-[-0.04em] tabular-nums"
            >
              {c.valeur}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
