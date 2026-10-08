"use client";

import Image from "next/image";
import { useRef } from "react";
import { TexteRevele } from "@/components/motion/TexteRevele";
import { Bouton } from "@/components/ui/Bouton";
import { contact, salles } from "@/content/site";
import { AVEC_ANIMATIONS, gsap, useGSAP } from "@/lib/gsap";

// Liste des salles ; au survol, une photo suit le curseur
export function Salles() {
  const ref = useRef<HTMLElement>(null);
  const suiveur = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();

      mm.add(`${AVEC_ANIMATIONS} and (hover: hover)`, () => {
        gsap.set(suiveur.current, { xPercent: -50, yPercent: -50, scale: 0.8 });
        const sx = gsap.quickTo(suiveur.current, "x", { duration: 0.5, ease: "power3.out" });
        const sy = gsap.quickTo(suiveur.current, "y", { duration: 0.5, ease: "power3.out" });
        const bouger = (e: PointerEvent) => {
          sx(e.clientX);
          sy(e.clientY);
        };
        const montrer = contextSafe!(() =>
          gsap.to(suiveur.current, { autoAlpha: 1, scale: 1, rotate: gsap.utils.random(-6, 6), duration: 0.5, ease: "power3.out" }),
        );
        const cacher = contextSafe!(() => gsap.to(suiveur.current, { autoAlpha: 0, scale: 0.8, duration: 0.4 }));

        const lignes = gsap.utils.toArray<HTMLElement>(".salle");
        addEventListener("pointermove", bouger);
        lignes.forEach((l) => {
          l.addEventListener("pointerenter", montrer);
          l.addEventListener("pointerleave", cacher);
        });
        return () => {
          removeEventListener("pointermove", bouger);
          lignes.forEach((l) => {
            l.removeEventListener("pointerenter", montrer);
            l.removeEventListener("pointerleave", cacher);
          });
        };
      });

      mm.add(AVEC_ANIMATIONS, () => {
        gsap.from(".salle", {
          y: 60,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".salles-liste", start: "top 80%" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="salles" className="gouttiere pb-[clamp(96px,14vw,200px)] pt-[clamp(96px,12vw,160px)]">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{salles.eyebrow}</p>
          <TexteRevele
            as="h2"
            className="mt-4 font-display text-[clamp(40px,6vw,96px)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]"
          >
            {salles.titre[0]}
            <br />
            {salles.titre[1]}
          </TexteRevele>
        </div>
        <p className="max-w-sm text-ivoire/70">{salles.texte}</p>
      </div>

      <ul className="salles-liste">
        {salles.liste.map((s) => (
          <li
            key={s.nom}
            className="salle grid grid-cols-[1fr_auto] items-center gap-4 border-t border-ivoire/20 py-[clamp(18px,2.6vw,30px)] transition-[color,padding] duration-500 ease-galerie last:border-b hover:pl-6 hover:text-ocre"
          >
            <span className="font-display text-[clamp(56px,10vw,160px)] font-extrabold leading-[0.85] tracking-[-0.04em] tabular-nums">
              {s.places}
              <small className="ml-[0.3em] align-top text-[0.22em] font-semibold tracking-normal">places</small>
            </span>
            <span className="text-right text-sm uppercase tracking-[0.14em] text-ivoire/60">{s.nom}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        {salles.usages.map((u) => (
          <span key={u} className="border border-ivoire/25 px-4 py-2 text-sm">
            {u}
          </span>
        ))}
        <Bouton href={contact.telephoneLien} className="ml-auto max-md:ml-0 max-md:mt-4 max-md:w-full">
          {salles.cta}
        </Bouton>
      </div>

      <div
        ref={suiveur}
        aria-hidden="true"
        className="pointer-events-none invisible fixed left-0 top-0 z-40 aspect-[3/4] w-[260px] overflow-hidden opacity-0"
      >
        <Image
          src={salles.image.src}
          width={salles.image.largeur}
          height={salles.image.hauteur}
          alt=""
          sizes="260px"
          className="photo-galerie size-full object-cover"
        />
      </div>
    </section>
  );
}
