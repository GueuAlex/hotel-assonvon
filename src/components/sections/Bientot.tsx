import { TexteRevele } from "@/components/motion/TexteRevele";
import { bientot } from "@/content/site";

export function Bientot() {
  return (
    <section className="gouttiere border-y border-ivoire/10 py-[clamp(80px,12vw,180px)] text-center">
      <p className="eyebrow">{bientot.eyebrow}</p>
      <TexteRevele
        as="h2"
        className="mx-auto mt-6 max-w-6xl font-display text-[clamp(30px,6.4vw,110px)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]"
      >
        {bientot.titre[0]}
        <br />
        <span className="contour">{bientot.titre[1]}</span>
      </TexteRevele>
      <p className="mx-auto mt-6 max-w-md text-ivoire/70">{bientot.texte}</p>
    </section>
  );
}
