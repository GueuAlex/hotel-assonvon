import { Revele } from "@/components/motion/Revele";
import { TexteRevele } from "@/components/motion/TexteRevele";
import { Bouton } from "@/components/ui/Bouton";
import { contact, hotel } from "@/content/site";

// Radar decoratif centre sur l'hotel
function Radar() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-full max-w-[560px] justify-self-center overflow-hidden rounded-full border border-ivoire/15 bg-[repeating-radial-gradient(circle,transparent_0_44px,rgb(239_231_218/0.07)_45px_46px)]"
    >
      <div className="absolute inset-x-0 top-1/2 h-px bg-ivoire/10" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-ivoire/10" />
      {[0, 1.2, 2.4].map((delai) => (
        <div
          key={delai}
          style={{ animationDelay: `${delai}s` }}
          className="onde-radar absolute inset-0 rounded-full border border-ocre/60"
        />
      ))}
      <div className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocre shadow-[0_0_30px_8px_rgb(201_139_43/0.5)]" />
      <p className="absolute left-1/2 top-[57%] -translate-x-1/2 whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.1em]">
        {hotel.nom}
      </p>
      <p className="absolute bottom-[14%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] uppercase tracking-[0.24em] text-ivoire/50">
        {contact.gps.affiche}
      </p>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="gouttiere grid gap-14 py-[clamp(96px,12vw,180px)] md:grid-cols-2 md:items-center">
      <div>
        <p className="eyebrow">Nous trouver</p>
        <TexteRevele
          as="h2"
          className="mt-4 font-display text-[clamp(34px,4.6vw,80px)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]"
        >
          Venir à
          <br />
          Assonvon
        </TexteRevele>

        <Revele className="mt-8 space-y-7">
          <address className="text-lg not-italic leading-relaxed text-ivoire/80">
            {contact.adresse.map((ligne) => (
              <span key={ligne} className="block">
                {ligne}
              </span>
            ))}
          </address>
          <p>
            <span className="eyebrow block">Réception</span>
            <a
              href={contact.telephoneLien}
              className="mt-1 inline-block font-display text-[clamp(28px,3vw,40px)] font-bold transition-colors duration-500 hover:text-ocre"
            >
              {contact.telephoneAffiche}
            </a>
          </p>
          <div className="flex flex-wrap gap-3">
            <Bouton href={contact.itineraire} target="_blank" rel="noopener noreferrer">
              Itinéraire
            </Bouton>
            <Bouton href={contact.facebook} target="_blank" rel="noopener noreferrer" variante="ligne">
              Facebook
            </Bouton>
          </div>
        </Revele>
      </div>

      <Radar />
    </section>
  );
}
