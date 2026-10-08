# Hôtel Assonvon : site vitrine

> Ce site fait partie de l'espace de travail `sites/`. Les règles globales sont dans `../README.md` et `../CLAUDE.md`.
> Ce fichier ne contient que ce qui est propre à ce site.

## Fiche
- Établissement : Hôtel Assonvon, complexe hôtelier 3 étoiles, depuis 1984
- Type, ville : hôtel, Yopougon (Abidjan, Côte d'Ivoire)
- Statut : en ligne (démo à proposer au propriétaire)
- Repo : https://github.com/GueuAlex/hotel-assonvon
- Démo : https://hotel-assonvon.vercel.app
- Brief : `brief/infos.md`

## Direction artistique
Trois pistes proposées dans `docs/maquettes/` (sommaire : `docs/maquettes/index.html`) :
- **A · Marbre & Laiton** : héritage de grand hôtel. Shader de marbre rose vivant, laiton, Bodoni Moda.
- **B · Oasis** : le patio tropical. Eau et mosaïque en WebGL, feuillages en parallaxe, Fraunces.
- **C · Galerie de nuit** : l'art ivoirien. Masque révélé au projecteur, motif de vagues, Syne.

**Validée : piste C · Galerie de nuit** (2026-10-08)
- Concept en une phrase : l'hôtel présenté comme une galerie d'art de nuit, où le projecteur révèle l'art ivoirien et l'histoire du lieu.
- Palette (tokens dans `src/app/globals.css`) :

  | Token | Couleur |
  |---|---|
  | `ebene` | #0C0A08 |
  | `charbon` | #17130F |
  | `ivoire` | #EFE7DA |
  | `ocre` | #C98B2B |
  | `terre` | #A8482A |
  | `marbre` | #D6B19C |

- Typographies : Syne (titres, 800, en capitales) et Archivo (textes).
- Animation signature : le curseur devient un projecteur qui révèle le masque du hall (sur mobile, la lumière se déplace seule). En fond, des lignes ondulantes en canvas reprennent le motif des fauteuils et se gonflent sous la lumière.
- Autres effets :
  - ruban ocre qui réagit à la vitesse du scroll ;
  - mots qui s'allument dans la section Héritage, avec des compteurs (l'année part d'aujourd'hui et remonte jusqu'à 1984) ;
  - galerie horizontale épinglée où chaque œuvre s'allume ;
  - mots en contour qui se remplissent d'ocre ;
  - photo qui suit le curseur sur la liste des salles ;
  - radar du plan d'accès.

## Contraintes propres à ce site
- **Photos fournies de faible qualité** (720 px, compressées). Ne jamais les afficher en plein écran. Les mettre en scène dans des cadres, des masques ou sous projecteur, avec étalonnage et grain. Le waouh repose sur la typographie, les shaders et le mouvement.
- **Ne pas présenter** la piscine olympique et le cinéma comme existants : ils sont « en construction », et leur appartenance à l'hôtel reste à confirmer.
- **Pas de citation d'avis** tant que les avis Google ne sont pas relevés.

## Stack et commandes
- Stack : Next.js 16.4 (cacheComponents activé par défaut), Tailwind 4.3, GSAP 3.15 + @gsap/react, Lenis 1.3. Pas de WebGL : les lignes sont dessinées en canvas 2D.
- Maquettes : `preview_start` avec la config `assonvon-maquettes` (port 4101) de `../.claude/launch.json`
- Dev : `preview_start` avec la config `assonvon-dev` (port 3001)
- `pnpm dev` · `pnpm build` · `pnpm lint`

## Exceptions aux règles globales
<!-- Rien pour l'instant. -->

## Journal de session
> Entrée la plus récente en haut. Chaque entrée indique la date, le travail fait, les décisions et la **prochaine étape précise**.

### 2026-10-08 (2)
- Fait :
  - piste C validée ;
  - site Next.js complet en une page : navigation avec menu mobile, hero, ruban, héritage, galerie, espaces, séjours, salles, « bientôt », contact, pied de page ;
  - image de partage générée au build, favicon ;
  - vérifié en desktop et en mobile 375 px ; lint et build OK ;
  - repo GitHub créé et démo déployée sur Vercel ;
  - redéploiement automatique non branché : l'application GitHub de Vercel n'a pas accès au repo. Redéployer avec `vercel --prod --yes` depuis ce dossier.
- Décisions :
  - catégories de chambres nommées « Catégorie I à IV » sans unité (prix « FCFA ») tant que l'hôtel n'a pas confirmé ;
  - salles nommées « Salle I à IV » ;
  - aucun avis client affiché.
- Prochaine étape : l'utilisateur envoie le lien au propriétaire. Ensuite, intégrer les infos manquantes (catégories, WhatsApp, e-mail, photos HD, logo) dans `src/content/site.ts` et remplacer les photos de `public/images/`.

### 2026-10-08 (1)
- Fait :
  - recherches en ligne (OpenStreetMap, Yandex, annuaires, Facebook) ;
  - brief rempli avec ses sources ;
  - 4 photos rangées dans `brief/sources/` ;
  - 3 maquettes de direction artistique dans `docs/maquettes/`.
- Décisions : nom de dossier et de repo `hotel-assonvon` ; signature « Proposition de site réalisée par Digifaz ».
- Prochaine étape : obtenir la validation d'une piste (ou d'un mélange), puis initialiser Next.js. En parallèle, l'utilisateur récupère les infos manquantes (voir `brief/infos.md`).
