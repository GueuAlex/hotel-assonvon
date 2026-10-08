import type { ComponentPropsWithoutRef } from "react";

type Variante = "ocre" | "ligne";

const styles: Record<Variante, string> = {
  ocre: "bg-ocre text-ebene hover:bg-ivoire",
  ligne: "border-[1.5px] border-ivoire/50 hover:bg-ivoire hover:text-ebene",
};

type Props = ComponentPropsWithoutRef<"a"> & { variante?: Variante };

// Lien d'action principal du site (appel, itineraire, ancre)
export function Bouton({ variante = "ocre", className = "", ...props }: Props) {
  return (
    <a
      className={`inline-flex items-center justify-center px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.06em] transition-colors duration-500 ease-galerie ${styles[variante]} ${className}`}
      {...props}
    />
  );
}
