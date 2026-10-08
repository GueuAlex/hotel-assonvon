"use client";

import Image from "next/image";
import { useRef } from "react";
import { galerie } from "@/content/site";
import { AVEC_ANIMATIONS, gsap, useGSAP } from "@/lib/gsap";

// Les pieces de l'hotel presentees comme des oeuvres : defilement horizontal sur grand ecran
export function Galerie() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const piste = ref.current!.querySelector<HTMLElement>(".galerie-piste")!;
      const oeuvres = gsap.utils.toArray<HTMLElement>(".oeuvre");

      gsap.matchMedia().add(
        { grandEcran: "(min-width: 768px)", anime: AVEC_ANIMATIONS },
        (contexte) => {
          const { grandEcran, anime } = contexte.conditions!;
          let defilement: gsap.core.Tween | undefined;

          if (grandEcran) {
            const distance = () => piste.scrollWidth - innerWidth;
            defilement = gsap.to(piste, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: "top top",
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            });
          }

          if (!anime) return;
          // Chaque oeuvre s'allume quand elle arrive sous le projecteur
          oeuvres.forEach((oeuvre) => {
            const declencheur = defilement
              ? { trigger: oeuvre, containerAnimation: defilement, start: "left 85%", end: "left 35%", scrub: true }
              : { trigger: oeuvre, start: "top 85%", end: "top 40%", scrub: true };
            gsap
              .timeline({ scrollTrigger: declencheur })
              .fromTo(oeuvre.querySelector(".voile"), { opacity: 0.85 }, { opacity: 0, ease: "none" })
              .fromTo(oeuvre.querySelector(".halo"), { opacity: 0 }, { opacity: 1, ease: "none" }, 0);
          });
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="galerie" className="relative overflow-hidden">
      <div className="galerie-piste gouttiere flex flex-col gap-24 py-24 md:h-svh md:w-max md:flex-row md:items-center md:gap-[8vw] md:py-0 md:pr-[10vw]">
        <div className="md:w-[34vw] md:max-w-[520px] md:shrink-0">
          <p className="eyebrow">{galerie.eyebrow}</p>
          <h2 className="mt-4 font-display text-[clamp(44px,6.4vw,104px)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
            {galerie.titre}
          </h2>
          <p className="mt-6 max-w-sm text-ivoire/70">{galerie.intro}</p>
        </div>

        {galerie.oeuvres.map((o) => (
          <figure key={o.numero} className="oeuvre relative shrink-0">
            <div aria-hidden="true" className="halo pointer-events-none absolute -top-[20%] left-1/2 h-[70%] w-[160%] -translate-x-1/2" />
            <div className="relative bg-charbon p-2.5 shadow-[0_40px_80px_rgba(0,0,0,0.6)] md:p-3">
              <Image
                src={o.src}
                width={o.largeur}
                height={o.hauteur}
                alt={o.alt}
                sizes="(min-width: 768px) 60vw, 92vw"
                className="photo-galerie h-auto w-full md:h-[54vh] md:w-auto"
              />
              <div aria-hidden="true" className="voile absolute inset-0 bg-ebene opacity-0" />
            </div>
            <figcaption className="mt-5 flex items-baseline justify-between gap-6 text-sm">
              <span className="font-display font-bold uppercase tracking-[0.04em]">
                <span className="text-ocre">{o.numero}</span> · {o.titre}
              </span>
              <span className="text-right text-ivoire/55">{o.legende}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
