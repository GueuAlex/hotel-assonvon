"use client";

import { useRef } from "react";
import { ruban } from "@/content/site";
import { AVEC_ANIMATIONS, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const phrase = `${ruban.join(" ✦ ")} ✦ `;

// Bandeau ocre defilant ; sa vitesse et son inclinaison suivent le scroll
export function Ruban() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(AVEC_ANIMATIONS, () => {
        const boucle = gsap.to(".ruban-piste", { xPercent: -50, duration: 24, ease: "none", repeat: -1 });
        const incliner = gsap.quickTo(ref.current, "skewY", { duration: 0.5, ease: "power3.out" });
        ScrollTrigger.create({
          onUpdate(self) {
            const v = self.getVelocity();
            incliner(gsap.utils.clamp(-4, 4, v / -300));
            gsap.to(boucle, {
              timeScale: (v < 0 ? -1 : 1) * (1 + Math.min(Math.abs(v) / 300, 5)),
              duration: 0.2,
              overwrite: true,
              onComplete: () => {
                gsap.to(boucle, { timeScale: 1, duration: 1.2 });
              },
            });
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden="true" className="overflow-hidden bg-ocre py-4 text-ebene">
      <div className="ruban-piste flex w-max">
        {[0, 1].map((i) => (
          <span key={i} className="whitespace-nowrap font-display text-[clamp(28px,4.4vw,64px)] font-extrabold uppercase">
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}
