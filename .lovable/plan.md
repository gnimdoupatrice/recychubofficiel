# Plan : storytelling solutions, image Solution Pro, footer mobile

## 1. Nouveau bloc d'intro « Nos solutions face aux défis »

Créer `src/components/SolutionsIntro.tsx` — bloc court inséré dans `src/pages/Index.tsx` **entre `AboutSection` et `SolutionProSection**`.

Contenu :

- Petit eyebrow : `NOS SOLUTIONS` (uppercase, tracking, couleur primaire)
- Grand titre H2 : **« Nos solutions face aux défis. »** (font-black, 4xl→6xl, tracking-tight)
- Sous-texte court (1 phrase) : « Quatre leviers complémentaires pour transformer la gestion des déchets à Kara — du terrain à la donnée, de la collecte à l'éducation. »
- Sous-ligne : 4 puces numérotées **01 Solution Pro · 02 Achat de plastiques · 03 CivicTech · 04 Green Academy** (rappel des 4 services qui suivent → cohérence storytelling)
- Bande `band-cool` ou fond neutre court (~py-20), pas d'image, pour servir de **transition narrative**.

Ainsi l'utilisateur comprend qu'il entre dans la zone « Solutions » et que les 4 sections suivantes en font partie.

## 2. Solution Pro B2B — nouvelle image

L'image actuelle (`src/assets/solution-pro-hero.webp`) coupe la personne tenant le smartphone.

Régénérer via imagegen :

- **Sujet** : agent terrain africain en gilet, **vue plus large**, **smartphone entièrement visible** dans la main, montrant un tableau de bord/itinéraire.
- **Cadrage** : plan poitrine, sujet centré, marge généreuse en haut et bas, format paysage 3:2 (1600×1067).
- **Ambiance** : extérieur urbain Kara, lumière douce, photoréaliste.
- Écraser `src/assets/solution-pro-hero.webp` (qualité 78, max 1600px).

## 3. Footer — disposition mobile en zigzag (gauche / droite)

Sur mobile, les 4 colonnes (Logo, Services, Découvrir, Contact) sont actuellement empilées toutes à gauche → trop long.

Refonte `src/components/Footer.tsx` :

- Mobile (`grid-cols-2`) : 
  - Ligne 1 : bloc **Logo + description + social** (col-span-2, pleine largeur).
  - Ligne 2 : **Services** (gauche, `text-left`) | **Découvrir** (droite, `text-right items-end`).
  - Ligne 3 : **Contact** (gauche) | bloc vide ou réutilisé (droite).
  - Pour la colonne droite (`Découvrir`), aligner titre + liens à droite (`text-right`) et icônes Contact en miroir si besoin.
- ≥ `sm` : revenir à la grille actuelle `sm:grid-cols-2`.
- ≥ `lg` : grille 12 colonnes inchangée.

Résultat : hauteur du footer mobile divisée par ~2, lecture zigzag plus dynamique.

## 4. Vérifications

- `browser--view_preview` 390×586 → vérifier ordre About → Intro solutions → Solution Pro, image lisible, footer compact en 2 colonnes alternées.
- Pas d'autres modifications de contenu.

## Détails techniques

- `SolutionsIntro.tsx` : `<section id="nos-solutions" className="py-16 md:py-20 bg-muted/40">`, conteneur `max-w-5xl`, H2 distinctive, liste inline horizontale des 4 services (badges arrondis bordés).
- Index.tsx : importer et placer `<SolutionsIntro />` juste avant `<SolutionProSection />`.
- Footer mobile : utiliser `grid-cols-2 sm:grid-cols-2 lg:grid-cols-12` et `text-right` conditionnel via classe utilitaire sur les colonnes paires (`[&>div:nth-child(3)]:text-right` ou explicite par bloc).
- Image Solution Pro : conserver le nom de fichier pour éviter de toucher l'import.