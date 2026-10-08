"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { contact, navigation } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";

export function Navigation() {
  const [ouvert, setOuvert] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Timeline>(null);
  const lenis = useLenis();

  // Rideau ocre du menu mobile
  useGSAP(
    () => {
      animation.current = gsap
        .timeline({ paused: true })
        .set(menu.current, { visibility: "visible" })
        .fromTo(menu.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" })
        .from(".menu-lien", { yPercent: 110, duration: 0.7, stagger: 0.06, ease: "expo.out" }, "-=0.3");
    },
    { scope: menu },
  );

  useEffect(() => {
    if (ouvert) {
      animation.current?.play();
      lenis?.stop();
    } else {
      animation.current?.reverse();
      lenis?.start();
    }
  }, [ouvert, lenis]);

  const allerA = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOuvert(false);
    lenis?.start();
    lenis?.scrollTo(href, { duration: 1.4 });
  };

  return (
    <>
      <nav
        aria-label="Navigation principale"
        className={`gouttiere fixed inset-x-0 top-0 z-50 flex items-center justify-between py-5 transition-colors ${
          ouvert ? "text-ebene" : "text-white mix-blend-difference"
        }`}
      >
        <a href="#accueil" className="font-display text-lg font-extrabold uppercase tracking-[0.04em]">
          Assonvon
        </a>
        <ul className="hidden gap-7 text-[13px] uppercase tracking-[0.1em] md:flex">
          {navigation.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-opacity hover:opacity-60">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-5">
          <a
            href={contact.telephoneLien}
            className="hidden border-b-2 border-current pb-0.5 font-display text-sm font-bold uppercase tracking-[0.06em] sm:inline-block"
          >
            Réserver
          </a>
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            onClick={() => setOuvert((o) => !o)}
            className="font-display text-sm font-bold uppercase tracking-[0.06em] md:hidden"
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>

      <div
        id="menu-mobile"
        ref={menu}
        inert={!ouvert}
        className="invisible fixed inset-0 z-40 flex flex-col justify-end bg-ocre px-4 pb-14 text-ebene md:hidden"
      >
        <ul>
          {navigation.map((l) => (
            <li key={l.href} className="overflow-hidden">
              <a
                href={l.href}
                onClick={(e) => allerA(e, l.href)}
                className="menu-lien block font-display text-[10vw] font-extrabold uppercase leading-[1.05] tracking-[-0.03em]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={contact.telephoneLien} className="menu-lien mt-8 block font-display text-xl font-bold">
          Réception · {contact.telephoneAffiche}
        </a>
      </div>
    </>
  );
}
