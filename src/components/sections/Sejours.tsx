import { Revele } from "@/components/motion/Revele";
import { TexteRevele } from "@/components/motion/TexteRevele";
import { Bouton } from "@/components/ui/Bouton";
import { contact, sejours } from "@/content/site";

export function Sejours() {
  return (
    <section id="sejours" className="gouttiere bg-charbon py-[clamp(72px,10vw,140px)]">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="eyebrow">{sejours.eyebrow}</p>
          <TexteRevele
            as="h2"
            className="mt-4 font-display text-[clamp(30px,5vw,80px)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em]"
          >
            {sejours.titre[0]}
            <br />
            <span className="text-ocre">{sejours.titre[1]}</span>
          </TexteRevele>
        </div>
        <p className="max-w-sm text-ivoire/70">{sejours.texte}</p>
      </div>

      <Revele className="mt-12 grid grid-cols-2 border-l border-t border-ivoire/15 md:grid-cols-4" cascade={0.08}>
        {sejours.tarifs.map((t) => (
          <div key={t.categorie} className="border-b border-r border-ivoire/15 px-5 py-7">
            <span className="font-display text-sm font-bold uppercase tracking-[0.08em] text-ocre">Catégorie {t.categorie}</span>
            <b className="mt-3 block font-display text-[clamp(28px,3vw,44px)] font-bold tabular-nums">{t.prix}</b>
            <small className="text-xs uppercase tracking-[0.14em] text-ivoire/55">{sejours.devise}</small>
          </div>
        ))}
      </Revele>

      <div className="mt-10">
        <Bouton href={contact.telephoneLien}>{sejours.cta}</Bouton>
      </div>
    </section>
  );
}
