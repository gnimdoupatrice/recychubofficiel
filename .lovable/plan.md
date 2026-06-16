# Plan : accessibilité mobile, réorganisation et images

## 1. Réorganisation des sections (src/pages/Index.tsx)

Nouvel ordre après Hero :

1. HeroSection
2. AboutSection (« Pourquoi RECYC HUB » — les défis)
3. **SolutionProSection** (remontée — réponse directe aux défis)
4. ServicesSection (catalogue plastiques — inchangé)
5. CivicTechSection
6. GreenAcademySection
7. HowItWorks
8. ImpactStatsSection
9. TestimonialsSection
10. PartnersSection
11. EventsHubSection
12. FAQSection
13. CTASection

## 2. Accessibilité & performance mobile

- Audit complet via le skill accessibility : `alt`, `aria-label` sur boutons-icônes (Navbar, MobileStickyBar, WhatsAppButton, sliders du Hero), un seul `<main>`, un seul `<h1>` par page, contraste tokens, `h-screen` → `h-dvh`, tap targets ≥ 44×44.
- Vérifier que toutes les images ont `loading="lazy"` + `decoding="async"` + `width`/`height` (sauf LCP du Hero qui reste `eager` + `fetchpriority="high"`).
- Tailles de police mobile : revoir `text-4xl`/`text-5xl` sur petits écrans, garantir lisibilité (line-height, letter-spacing, padding latéral 6 → confortable).
- Navigation mobile : vérifier le menu (Sheet shadcn), z-index, espace pour `MobileStickyBar` (déjà `pb-16 lg:pb-0`).
- Footer : revoir grille mobile (colonnes empilées, espacement, hiérarchie typographique, alignement, séparateurs).

## 3. Catalogue plastiques (ServicesSection.tsx)

- **Effet zoom au hover** sur les images : remplacer le swap d'opacité par un `scale-110` doux sur l'image active (transition 500ms), tout en gardant le crossfade entre les 2 visuels.
- **Suppressions d'images** :
  - Mobilier (chaises & tables) : supprimer `mobilier-2.webp` (chaises propres non cassées) → garder uniquement `chaises_plastique.webp`.
  - PEBD (sachets pure water) : supprimer `pure-water-2.webp` (main avec films) → garder uniquement `purWater`.
- Quand une seule image reste, désactiver le swap et conserver l'effet zoom au hover.

## 4. Remplacement d'images dans « Pourquoi RECYC HUB » (AboutSection)

À régénérer via imagegen (format `.webp`, dimensions optimisées) :

- **Déficit logistique** → camion-benne de collecte de déchets sur une route togolaise (style photoréaliste, lumière naturelle).
- **Potentiel inexploité** → tas de sachets plastiques accumulés dans un caniveau à côté d'un pont en milieu urbain africain.
- **Hub événementiel** (EventsHubSection) → 2-3 nouvelles images : ateliers de sensibilisation / collecte communautaire / formation terrain à Kara.

## 5. Vérifications finales

- `browser--view_preview` en 390×586 pour valider l'affichage mobile, le nouvel ordre, le footer et le zoom hover.
- `browser--performance_profile` pour confirmer LCP < 2.5s et CLS stable.
- Pas de modification de contenu textuel.

## Détails techniques

- `ServicesSection.PlasticImageSwap` : ajouter `transform transition-transform duration-500 group-hover:scale-110`, wrapper en `group`. Si `images.length === 1`, ne rendre qu'une seule `<img>`.
- Images générées en 1280×960 max, qualité 78, exportées en `.webp` dans `src/assets/hero/` ou `src/assets/about/`.
- Aucune modification du `ServicesSection` autre que les 2 suppressions de tableau + le hover-zoom.
- Aucune modification des textes des sections.

&nbsp;

&nbsp;

Il faut comprendre que la section service en réalité commence à partir de la solution pro. La solution pro fait partie des services. Donc nos services sont en réalité la solution pro, la catalogue des plastiques, le Civil Tech, la Green Academy. Donc c'est en réalité les quatre là qui constituent nos services. Il faut prendre en compte cet aspect et voir comment est-ce que tu vas refaire les choses.