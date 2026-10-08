"use client";

import { useRef, type ReactNode } from "react";
import { AVEC_ANIMATIONS, gsap, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  as?: "h2" | "h3" | "p";
  className?: string;
  children: ReactNode;
};

// Texte revele ligne par ligne a l'entree dans l'ecran
export function TexteRevele({ as: Balise = "p", className, children }: Props) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);

  useGSAP(() => {
    gsap.matchMedia().add(AVEC_ANIMATIONS, () => {
      SplitText.create(ref.current, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: { trigger: ref.current, start: "top 85%" },
          }),
      });
    });
  });

  return (
    <Balise ref={ref} className={className}>
      {children}
    </Balise>
  );
}
