"use client";

import Image from "next/image";
import { useRef } from "react";
import { VaguesCanvas, type Lumiere } from "@/components/motion/VaguesCanvas";
import { Bouton } from "@/components/ui/Bouton";
import { contact, hero } from "@/content/site";
import { AVEC_ANIMATIONS, gsap, SplitText, useGSAP } from "@/lib/gsap";

export function Hero() {
  const racine = useRef<HTMLElement>(null);
  const oeuvre = useRef<HTMLElement>(null);
  const lumiere = useRef<Lumiere>({ x: 0, y: 0 });
  // Position relative de la lumiere sur l'oeuvre quand elle se deplace seule (0..1)
  const relative = useRef({ u: 0.5, v: 0.4, auto: true });

  useGSAP(
    () => {
      const el = oeuvre.current!;

      // Applique la position du projecteur sur l'oeuvre a chaque image
      const appliquer = () => {
        const r = el.getBoundingClientRect();
        if (relative.current.auto) {
          lumiere.current.x = r.left + relative.current.u * r.width;
          lumiere.current.y = r.top + relative.current.v * r.height;
        }
        el.style.setProperty("--x", `${lumiere.current.x - r.left}px`);
        el.style.setProperty("--y", `${lumiere.current.y - r.top}px`);
      };
      appliquer();
      gsap.ticker.add(appliquer);
      gsap.set(".hero-contenu", { autoAlpha: 1 });

      const mm = gsap.matchMedia();

      // Souris : le projecteur suit le curseur
      mm.add(`${AVEC_ANIMATIONS} and (hover: hover)`, () => {
        const qx = gsap.quickTo(lumiere.current, "x", { duration: 0.6, ease: "power3.out" });
        const qy = gsap.quickTo(lumiere.current, "y", { duration: 0.6, ease: "power3.out" });
        const suivre = (e: PointerEvent) => {
          relative.current.auto = false;
          qx(e.clientX);
          qy(e.clientY);
        };
        addEventListener("pointermove", suivre);
        return () => removeEventListener("pointermove", suivre);
      });

      // Tactile : la lumiere balaie l'oeuvre toute seule
      mm.add(`${AVEC_ANIMATIONS} and (hover: none)`, () => {
        gsap.fromTo(relative.current, { u: 0.25 }, { u: 0.75, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.fromTo(relative.current, { v: 0.3 }, { v: 0.62, duration: 2.3, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });

      // Entree en scene puis sortie au scroll
      mm.add(AVEC_ANIMATIONS, () => {
        const split = SplitText.create(".hero-ligne", { type: "chars", mask: "chars" });
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(el, { autoAlpha: 0, scale: 1.08, duration: 2.2, ease: "power2.out" })
          .from(split.chars, { yPercent: 110, duration: 1.3, stagger: 0.05 }, 0.2)
          .from(".hero-apparition", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.6);

        gsap.to(".hero-contenu", {
          yPercent: -12,
          autoAlpha: 0.15,
          ease: "none",
          scrollTrigger: { trigger: racine.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      return () => gsap.ticker.remove(appliquer);
    },
    { scope: racine },
  );

  return (
    <section ref={racine} id="accueil" className="relative h-svh min-h-[620px] overflow-hidden">
      <VaguesCanvas lumiere={lumiere} className="absolute inset-0 size-full" />

      <div className="gouttiere relative z-10 grid h-full content-end pb-24 md:grid-cols-[1.15fr_0.85fr] md:content-center md:items-center md:pb-0">
        <div className="hero-contenu invisible">
          <p className="hero-apparition eyebrow">{hero.kicker}</p>
          <h1
            aria-label="Assonvon"
            className="my-5 font-display text-[14vw] font-extrabold uppercase leading-[0.82] tracking-[-0.035em] md:text-[clamp(52px,8.8vw,200px)]"
          >
            <span className="hero-ligne block">{hero.titre[0]}</span>
            <span className="hero-ligne contour block">{hero.titre[1]}</span>
          </h1>
          <p className="hero-apparition max-w-[440px] text-[clamp(17px,1.6vw,21px)] text-ivoire/80">{hero.sousTitre}</p>
          <div className="hero-apparition mt-8 flex flex-wrap gap-3">
            <Bouton href={contact.telephoneLien}>{hero.ctaPrincipal}</Bouton>
            <Bouton href="#salles" variante="ligne">
              {hero.ctaSecondaire}
            </Bouton>
          </div>
        </div>

        <figure
          ref={oeuvre}
          className="projecteur absolute right-0 top-[8%] -z-10 w-[78vw] opacity-90 md:relative md:top-auto md:z-auto md:w-full md:max-w-[460px] md:justify-self-center md:opacity-100"
        >
          <Image
            src={hero.oeuvre.src}
            width={hero.oeuvre.largeur}
            height={hero.oeuvre.hauteur}
            alt={hero.oeuvre.alt}
            preload
            sizes="(min-width: 768px) 460px, 78vw"
            className="photo-galerie aspect-[3/4] w-full object-cover"
          />
          <figcaption className="absolute -bottom-9 right-0 hidden text-[11px] uppercase tracking-[0.2em] text-ivoire/45 md:block">
            {hero.oeuvre.cartel}
          </figcaption>
        </figure>
      </div>

      <div className="gouttiere absolute inset-x-0 bottom-5 z-10 flex justify-between text-[11px] uppercase tracking-[0.24em] text-ivoire/50">
        <span>{contact.gps.affiche}</span>
        <span>Défiler</span>
      </div>
    </section>
  );
}
