# Hôtel Assonvon · site vitrine

Proposition de site pour l'**Hôtel Assonvon**, complexe hôtelier 3 étoiles à Yopougon (Abidjan) depuis 1984.

- **Démo** : https://hotel-assonvon.vercel.app (non indexée par les moteurs de recherche)
- **Direction artistique** : piste C « Galerie de nuit ». Le masque du hall est révélé par un projecteur, sur un fond de lignes ondulantes qui reprennent le motif des fauteuils. Les maquettes sont dans `docs/maquettes/`.
- Proposition de site réalisée par **Digifaz**.

## Stack
Next.js 16 (App Router, TypeScript) · Tailwind CSS 4 · GSAP 3.15 (ScrollTrigger, SplitText) · Lenis

## Commandes
```bash
pnpm install
pnpm dev --port 3001
pnpm lint
pnpm build
```

## Organisation
- `src/content/site.ts` : **tout le contenu** (textes, tarifs, salles, contact). C'est le seul fichier à modifier pour changer une information.
- `src/components/sections/` : une section de la page par fichier.
- `src/components/motion/` : animations réutilisables (révélations de texte, lignes ondulantes).
- `src/app/globals.css` : tokens du thème (couleurs, polices, courbes d'animation).
- `brief/infos.md` : brief de l'hôtel et sources ; infos manquantes à faire confirmer.
