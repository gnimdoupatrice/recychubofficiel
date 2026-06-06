## Objectif

Enrichir la section **Pourquoi RECYC HUB TOGO ?** (`src/components/AboutSection.tsx`) en ajoutant un badge chiffré flottant sur chaque image des 3 constats, dans l'esprit de la 2ᵉ capture (référence). **La disposition zigzag actuelle reste inchangée.**

## Ce qui change

Pour chacune des 3 cartes, ajout d'un badge "stat" positionné en **coin haut-droit de l'image**, débordant légèrement (`-top-4 -right-4`), avec pastille verte (primary) + icône (flèche tendance) + chiffre + libellé court.

Stats cohérentes avec chaque constat :

| # | Constat | Badge |
|---|---|---|
| 01 | Systèmes de collecte défaillants | **+70%** carburant gaspillé |
| 02 | Dépotoirs invisibles | **0** cartographie officielle |
| 03 | Potentiel économique inexploité | **+50%** valeur perdue |

## Détails techniques

- Badge : `absolute -top-4 -right-4 z-10` sur le conteneur image (déjà en `relative`)
- Style : pastille `rounded-2xl bg-primary text-primary-foreground` avec ombre `shadow-[0_12px_30px_-8px_hsl(var(--primary)/0.5)]`, padding `px-4 py-3`
- Contenu : icône Lucide (`TrendingUp` / `MapOff` / `Coins`) + grand chiffre en Space Grotesk 700 + petit libellé DM Sans en dessous
- Animation d'entrée discrète (`motion` scale 0.8→1, 300ms, respect `prefers-reduced-motion` déjà couvert globalement)
- Aucune modif du grid, des images, ou du numéro géant 01/02/03 dans le texte

## Fichier touché

- `src/components/AboutSection.tsx` — ajout d'un champ `stat` dans le tableau `cards` + rendu du badge dans la carte image
