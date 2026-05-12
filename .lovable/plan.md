## Objectif

Mettre Solution Pro (digitalisation B2B) avant le système de rachat, et donner à chacun des trois piliers (Solution Pro, Civic Tech / Alerte dépotoir, Green Academy) une section plein écran dédiée à valeur éditoriale. Compléter ce qui manque à la home pour qu'elle paraisse pleinement professionnelle. Régénérer / réadapter les images de chaque étape (sauf celles du catalogue de rachat).

## 1. Réorganisation de la home

Nouvel ordre dans `src/pages/Index.tsx` :

```text
Hero
AboutSection ("Pourquoi" — état des lieux)
SolutionProSection      ← NOUVEAU plein écran (avant le rachat)
ServicesSection         ← Catalogue de rachat (inchangé sur le fond)
CivicTechSection        ← NOUVEAU plein écran (Alerte dépotoir)
GreenAcademySection     ← NOUVEAU plein écran (Academy)
ImpactStatsSection      ← NOUVEAU (chiffres clés)
HowItWorks
EventsHubSection
FAQSection
TestimonialsSection
PartnersSection
CTASection
```

`SolutionsSection` (la grille 4-cartes) est retiré de la home : ses contenus sont absorbés par les trois sections plein écran. La page `/solutions` est conservée.

## 2. Trois sections plein écran (style Editorial Impact)

Chacune occupe `min-h-screen`, fond contrasté, mise en page éditoriale (numéro géant 01/02/03, titre Playfair, image principale large, liste de bénéfices, micro-stats, CTA double).

### `SolutionProSection.tsx` (nouveau, plein écran)
- Eyebrow : « Solution Pro — B2B »
- Titre : « La plateforme qui pilote la collecte »
- Cible : entreprises de pré-collecte, mairies, PME assainissement
- 4 fonctionnalités : Optimisation des tournées, Suivi temps réel, Tableau de bord & reporting, Gestion abonnements & facturation
- 3 micro-stats (ex. -35% km parcourus, +60% ménages desservis, 100% traçabilité)
- CTA : « Découvrir Solution Pro » + « Demander une démo »
- Visuel : nouvelle image générée (dashboard logistique sur tablette/terrain)

### `CivicTechSection.tsx` (nouveau, plein écran)
- Eyebrow : « Civic Tech »
- Titre : « Rendre visibles les dépotoirs invisibles »
- 3 piliers : Signalement géolocalisé en 3 clics, Cartographie dynamique, Notifications d'intervention
- 3 micro-stats (alertes traitées, sites résolus, communautés actives)
- CTA : « Signaler un dépotoir » + « Voir la carte »
- Visuel : nouvelle image (citoyen + smartphone géolocalisation)

### `GreenAcademySection.tsx` (nouveau, plein écran)
- Eyebrow : « Formation »
- Titre : « Former la prochaine génération du recyclage »
- 3 parcours : Tri & recyclage, Économie circulaire, Entrepreneuriat vert
- Indicateurs : modules, certifiés, taux de complétion
- CTA : « Explorer les formations » + « Devenir ambassadeur »
- Visuel : nouvelle image (atelier de formation au Togo)

## 3. Éléments ajoutés pour rehausser le niveau pro

Analyse du manque actuel : la home enchaîne piliers et opportunités sans preuves chiffrées ni preuves « presse / institutionnel ». Ajouts proposés :

1. `ImpactStatsSection` — bandeau éditorial chiffres clés (kg collectés, ménages desservis, alertes traitées, certifiés Academy) avec une note méthodologique discrète.
2. Renforcement du bloc presse / partenaires institutionnels dans `PartnersSection` (logos en niveaux de gris, mention « Ils nous accompagnent »).
3. (Léger) Réécriture du sous-titre Hero pour une promesse plus institutionnelle ; aucun changement structurel du Hero.

Tout reste dans la ligne « Editorial Impact Report » (Playfair Display + Inter, accent emerald, fond `hsl(150 14% 97%)` alterné avec blanc et `bg-foreground` pour les sections sombres).

## 4. Images régénérées / réadaptées

Hors catalogue de rachat (laissé intact). Génération en `imagegen` standard, format paysage, palette éditoriale (vert profond, neige, terracotta léger).

| Emplacement | Asset | Sujet |
|---|---|---|
| AboutSection 01 | `challenge-1.jpg` | Tournée de collecte désorganisée à Kara, vue éditoriale |
| AboutSection 02 | `challenge-2.jpg` | Dépotoir sauvage en bord de route, ambiance documentaire |
| AboutSection 03 | `challenge-3.jpg` | Mains tenant des bouteilles plastique triées, lumière chaude |
| SolutionProSection | `solution-pro-hero.jpg` | Agent terrain consultant un dashboard sur tablette |
| CivicTechSection | `civictech-hero.jpg` | Citoyen photographiant un dépotoir, géolocalisation visible |
| GreenAcademySection | `academy-hero.jpg` | Atelier de formation au tri, jeunes apprenants togolais |
| EventsHub (3 cartes) | `event-1/2/3.jpg` | Bénévoles, collecte géante, formation certifiante |

Les illustrations « step-*.png » (HowItWorks) restent telles quelles ; elles servent un autre composant et ne font pas partie des sections refondues.

## 5. Détails techniques

- Pas de toucher à `ServicesSection.tsx` (catalogue de rachat) ni aux images plastiques.
- Trois nouveaux composants dans `src/components/` : `SolutionProSection.tsx`, `CivicTechSection.tsx`, `GreenAcademySection.tsx`, `ImpactStatsSection.tsx`.
- Mise à jour de `src/pages/Index.tsx` (ordre + imports).
- Génération d'assets via `imagegen--generate_image` en `model: standard`, ratio 16:9, sortie `.jpg` dans `src/assets/`.
- Import direct ES6 des images (pas d'externalisation).
- Conservation de la page `/solutions` qui agrège `SolutionsSection` (vue récap dédiée).

## Validation

Après build : vérification visuelle des 3 sections plein écran sur viewport 783×586 (mobile-like) et desktop, contraste lisible, cohérence Playfair / Inter, ordre respecté.
