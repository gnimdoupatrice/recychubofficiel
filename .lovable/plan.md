# Refonte visuelle harmonisée

## 1. Restaurer la section Hero (HeroSection.tsx)

Revenir au hero sombre et dramatique visible sur la capture jointe :
- Fond image sombre (dépotoir) avec voile noir dégradé bas → haut (et non blanc).
- Badge centré « ✨ BIENVENUE SUR RECYC HUB TOGO » sur pilule sombre translucide.
- Grand titre éditorial blanc en deux lignes : « Faites collecter vos déchets ménagers et **vendez vos plastiques** en quelques clics » avec « vendez vos plastiques » en accent doré/jaune.
- Deux cartes côte à côte sous le titre :
  - « Vendre mes plastiques » + sous-texte + ligne dorée « Jusqu'à 150 FCFA/kg — Mobile Money ou cash » + footer « CATALOGUE & PRIX AU KG » → bouton « Vendre maintenant ».
  - « Faire enlever mes déchets » + sous-texte + footer « DOMICILE · KARA » → bouton « Demander ».
- Pilule large « ⚠ Signaler un dépotoir sauvage — ponts, caniveaux, terrains » centrée sous les cartes.
- Ligne d'infos : « 2 500+ kg de plastiques collectés · +228 97 68 40 30 · Kara, Togo ».
- Garder le contenu textuel actuel (commander un enlèvement, vendre, téléphone, etc.) en l'intégrant à cette structure.

## 2. Harmoniser la direction visuelle de toute la page

Adopter UNE seule direction sur Index.tsx : éditoriale, sombre/clair alternés mais avec un système cohérent.

- **Palette unique** : fond crème `hsl(40 30% 97%)` pour sections claires, fond charbon `hsl(160 15% 10%)` pour sections sombres, accent vert primaire + accent doré (déjà dans le hero). Plus de bleus/violets/dégradés exotiques résiduels.
- **Typo unique** : `font-editorial` (display serif) pour tous les titres H2/H3, `font-inter` pour le corps. Plus de `font-black` sans-serif mélangé avec serif.
- **Rythme** : chaque section utilise la même grille `max-w-6xl mx-auto px-6 md:px-12`, même padding vertical `py-24 md:py-32`, mêmes eyebrow `uppercase tracking-[0.2em] text-xs text-primary`.
- **Alternance** : sections claires (AboutSection, GreenAcademy, FAQ) ↔ sombres (SolutionPro, CivicTech, CTA) pour créer un rythme sans casser l'unité.
- Refactor des sections qui dépareillent : `SolutionProSection`, `CivicTechSection`, `GreenAcademySection`, `HowItWorks`, `ImpactStatsSection`, `WhyUsSection`, `TestimonialsSection`, `EventsHubSection` → mêmes tokens, mêmes eyebrows, mêmes boutons (`btn-cta` / `btn-outline-green`).

## 3. Corriger « État des lieux » (AboutSection.tsx)

Problèmes signalés : couleurs pas jolies, numérotation « I — » avec long trait pas esthétique, disposition des images.

- Remplacer le fond vert pâle `hsl(150 14% 97%)` par le crème harmonisé.
- Supprimer le grand chiffre romain + trait horizontal. Le remplacer par un eyebrow propre « 01 · DÉFICIT LOGISTIQUE » aligné sur l'image.
- Nouvelle structure : grille 12 colonnes asymétrique. Image plus petite (5 col) avec ratio 4/5 portrait, cadre épuré sans ombre offset colorée. Texte (6 col) avec titre éditorial, paragraphe, badge thématique en bas.
- Alterner gauche/droite mais en gardant la même hauteur de carte pour un rendu rythmé.
- Ombres remplacées par une fine bordure `border border-foreground/8` + léger rayon `rounded-2xl`.

## 4. Corriger les images zoomées du catalogue

`ServicesSection.tsx` ligne 119 et autres cartes utilisent `object-cover` sur des hauteurs fixes → images recadrées.
- Pour les cartes catalogue produits (PET, PEHD, PP, Pure Water) : passer en ratio `aspect-[4/3]` + `object-contain` sur fond neutre `bg-muted` afin de voir le produit entier.
- Pour les images éditoriales contextuelles (hero secondaire, illustrations de section) : garder `object-cover` mais avec `object-position` adapté.

## 5. Optimisation web des images

- Convertir les `.jpg` / `.png` lourds de `src/assets/` en `.webp` (qualité 80), garder `.jpg` en fallback uniquement si nécessaire.
- Ajouter `loading="lazy"`, `decoding="async"`, `width` / `height` explicites sur toutes les `<img>` hors hero.
- Hero : conserver `fetchPriority="high"` + `loading="eager"`.
- Réduire la résolution source des assets > 1600px de large à 1600px max.

## Détails techniques

- Fichiers modifiés : `src/components/HeroSection.tsx`, `src/components/AboutSection.tsx`, `src/components/ServicesSection.tsx`, `src/components/SolutionProSection.tsx`, `src/components/CivicTechSection.tsx`, `src/components/GreenAcademySection.tsx`, `src/components/HowItWorks.tsx`, `src/components/ImpactStatsSection.tsx`, `src/components/WhyUsSection.tsx`, `src/components/TestimonialsSection.tsx`, `src/components/EventsHubSection.tsx`, `src/components/CTASection.tsx`, `src/index.css` (tokens harmonisés), `tailwind.config.ts` si besoin.
- Conversion images : script `cwebp` sur les `.jpg/.png` de `src/assets/` > 200 KB.
- Aucun changement de logique métier ni de routes.
