# Corrections mobile ciblées (desktop inchangé)

## 1. Hero — Carrousel arrière-plan (`HeroSection.tsx`)

Vérification effectuée sur `hero-2-pickup.webp` : l'image **n'est pas noire/vide** (moyenne 119/255, plage 0–255, contenu réel). Je ne la supprime donc pas. Si tu confirmes vouloir la retirer malgré tout, dis-le et je l'enlève de `SLIDES`.

## 2. Hero — Méta footer (`HeroSection.tsx`)

« 2 500+ kg / +228 97 68 40 30 / Kara, Togo » doivent tenir **sur une seule ligne en mobile**.

- Passer la grille de `grid-cols-1 sm:grid-cols-3` → `grid-cols-3` (toujours 3 colonnes).
- Compacter chaque item en mobile : icône 8×8 (au lieu de 11×11), `gap-2`, valeur en `text-[11px]/text-xs`, label tronqué/masqué en xs (`hidden xs:block` ou taille réduite), centrage vertical, suppression des marges latérales superflues. À partir de `sm:` on garde la version actuelle riche (icône 11×11 + label complet).

## 3. About — Stat card à côté du titre en mobile (`AboutSection.tsx`)

Aujourd'hui en mobile la stat card est rendue en bloc plein sous l'image. Tu veux qu'elle flotte à côté du titre comme en desktop, sans masquer le titre.

- Supprimer le rendu mobile « relative mt-4 w-full » et garder le positionnement flottant aussi en mobile : `absolute -top-4 right-3 w-[150px]` en xs, puis `md:-top-6 md:-right-6 md:w-[200px]`.
- La stat card est posée sur **l'image** (zone titre éditorial « 01/02/03 + titre » au-dessus), donc elle ne recouvre pas le titre.
- Vérifier que le badge « Déficit logistique » reste lisible : décaler la stat card vers `right-3` (au lieu de `-right-4`) pour ne pas chevaucher le badge en haut-gauche (badges et stat card sont sur des coins opposés, OK).

## 4. Green Academy — Ordre mobile (`GreenAcademySection.tsx`)

Ordre actuel mobile : titre + texte + tracks + CTA, puis image **à la fin**.
Nouvel ordre mobile demandé :

```text
Eyebrow « 03 Green Academy »
H2 « Former la prochaine génération du recyclage »
Texte descriptif
Image (academy-hero.webp + badges flottants)
3 axes (Tri / Économie circulaire / Entrepreneuriat vert)
CTAs
```

- Sortir l'image de sa colonne et la placer dans le flux mobile entre le H2 et les tracks via deux rendus (un mobile `lg:hidden` entre H2 et tracks, un desktop `hidden lg:block` dans la colonne gauche), **ou** restructurer en `flex flex-col` mobile avec `order-*` Tailwind sur chaque bloc tout en gardant le `lg:grid lg:grid-cols-12`.
- Réduire la hauteur image mobile (`h-[320px]` au lieu de `h-[420px]`).
- Déplacer le paragraphe descriptif **après** les 3 axes en mobile (ordre logique demandé).

## 5. Civic Tech — Ordre mobile (`CivicTechSection.tsx`)

Ordre actuel mobile : header → 3 piliers → grande carte image+stats.
Nouvel ordre mobile : header (eyebrow + H2 + texte) → **grande carte image+stats juste après le texte** → 3 piliers en dessous.

- En mobile uniquement, placer le bloc image-stats avant la grille des piliers via `order-*` ou en dupliquant le rendu sous flag `md:hidden` / `hidden md:block`. Desktop reste identique.

## 6. Page Solutions — 2 colonnes en mobile (`SolutionsSection.tsx`)

4 cartes : `Solution Pro` (hero card, pleine largeur) + 3 cartes (Rachat / Alerte / Academy).
Tu veux en **mobile** : « Solution Pro + Rachat plastique » sur une ligne, « Civic Tech + Green Academy » sur la ligne suivante (2 colonnes).

- Aujourd'hui Solution Pro est rendue en hero card pleine largeur séparée. Il faut donc en mobile :
  1. La sortir de son traitement « hero pleine largeur » et la rendre comme **carte normale** dans une grille `grid-cols-2` (avec les 3 autres).
  2. À partir de `md:`, revenir au layout actuel (hero pleine largeur + 3 cartes en `md:grid-cols-3`).
- Implémentation : créer un rendu compact de Solution Pro (icône + nom + cta) pour mobile (`md:hidden`) inclus dans la grille `grid-cols-2 md:grid-cols-3` avec les 3 autres ; et masquer la version « hero » sur mobile (`hidden md:grid`).

## Détails techniques

- Aucune modification de contenu (textes, CTA, routes, données, images sources hors suppression éventuelle si confirmée).
- Aucune logique métier, aucun changement backend.
- Accessibilité : conserver les `aria-label`, ordre DOM logique (le réordonnancement Green Academy / Civic Tech se fera via duplication de blocs sous flags `md:hidden` plutôt qu'avec `order-*` pour préserver l'ordre de lecture screen-reader).
- Fichiers touchés : `src/components/HeroSection.tsx`, `src/components/AboutSection.tsx`, `src/components/GreenAcademySection.tsx`, `src/components/CivicTechSection.tsx`, `src/components/SolutionsSection.tsx`.

Used the accessibility skill.