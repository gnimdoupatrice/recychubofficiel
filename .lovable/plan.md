## Refonte de la section « État des Lieux » et transitions visuelles

### 1. Suppression du tiret avant l'eyebrow
Dans `src/components/AboutSection.tsx`, l'eyebrow « L'État des Lieux » est précédé d'un petit trait (`<span className="w-8 h-px bg-primary" />`). Je le supprime pour ne garder que le texte typographique propre.

### 2. Dégradés de transition entre les sections
Pour donner un sentiment de passage entre sections (sortie d'une, entrée dans une autre), j'ajoute :
- En haut de la section État des lieux : un dégradé doux (`from-background via-primary/5 to-transparent`) sur une bande de ~120px pour marquer l'entrée.
- En bas de la section : un dégradé inverse vers la section suivante.
- Réplique du même principe à l'entrée/sortie des sections voisines (Hero → About → Services → Impact) pour que chaque changement de section soit lisible visuellement.
- Ajout d'un utilitaire `.wp-section-fade-top` / `.wp-section-fade-bottom` dans `src/index.css` pour réutiliser proprement.

### 3. Image « Potentiel inexploité » (carte 03) plus réaliste
L'image actuelle (`src/assets/challenge-3.webp`) manque de réalisme. Je régénère une image **photo-réaliste** sur le même thème (déchets plastiques recyclables ayant une valeur marchande, contexte togolais : balles de plastique triées, collecteur pesant des bouteilles PET, marché informel de rachat), en gardant la même composition et cadrage 4/3 que les autres cartes pour préserver la cohérence visuelle de la section.

### 4. Image de la section « Solution Pro »
Restauration d'un visuel plus institutionnel pour `src/components/SolutionProSection.tsx` (actuellement `solution-pro-hero.webp`). Je régénère une image photo-réaliste représentant une équipe pro de collecte (camion benne, opérateurs en uniforme, conteneurs PEHD) cohérente avec la version précédente plus « terrain ».

### Détails techniques
- Fichiers modifiés : `src/components/AboutSection.tsx`, `src/index.css`, `src/components/SolutionProSection.tsx` et éventuellement les composants voisins pour les fades.
- Nouveaux assets : `src/assets/challenge-3.webp` (regen) et `src/assets/solution-pro-hero.webp` (regen) — mêmes noms pour ne casser aucun import.
- Aucun changement de contenu textuel ni de logique métier.

### Question rapide
Pour la « Solution Pro », je n'ai pas conservé d'historique de la version exacte d'image précédente. Je pars sur une régénération photo-réaliste « équipe de collecte pro togolaise en action ». Si tu avais une référence précise en tête, dis-le moi et j'ajuste le prompt.