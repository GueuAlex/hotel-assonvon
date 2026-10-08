import { contact, hotel, navigation, signature } from "@/content/site";

export function PiedDePage() {
  return (
    <footer className="gouttiere border-t border-ivoire/10 pb-10 pt-16">
      <p
        aria-hidden="true"
        className="contour select-none font-display text-[10.2vw] font-extrabold uppercase leading-[0.8] tracking-[-0.04em]"
      >
        {hotel.nomCourt}
      </p>

      <div className="mt-14 grid gap-10 text-sm text-ivoire/70 md:grid-cols-3">
        <div>
          <p className="font-display text-base font-bold uppercase text-ivoire">{hotel.nom}</p>
          <p className="mt-2">
            {hotel.categorie} · {hotel.quartier}, depuis {hotel.depuis}
          </p>
        </div>
        <div>
          {contact.adresse.slice(0, 1).map((l) => (
            <p key={l}>{l}</p>
          ))}
          <p className="mt-2">
            Réception :{" "}
            <a href={contact.telephoneLien} className="text-ivoire hover:text-ocre">
              {contact.telephoneAffiche}
            </a>
          </p>
        </div>
        <nav aria-label="Pied de page">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navigation.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-ocre">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="mt-14 border-t border-ivoire/10 pt-6 text-xs tracking-[0.1em] text-ivoire/45">{signature}</p>
    </footer>
  );
}
