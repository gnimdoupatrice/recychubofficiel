# Harmonisation typo + nettoyage tirets + accessibilité + performance

Quatre chantiers strictement visuels et techniques. **Aucun texte de contenu ne change**, aucune logique métier touchée.

---

## 1. Police d'écriture harmonisée (inspiration Weblium)

Le site mixe aujourd'hui `Libre Baskerville` (serif, titres) + `IBM Plex Sans` (corps). Ce contraste donne un côté "deux univers". Le template Weblium de référence utilise **une seule famille sans-serif moderne et géométrique** sur tout le site.

Adoption d'un seul système typographique cohérent :

- **Titres (h1–h6)** : `Plus Jakarta Sans` 700/800 — proche de la typo du site Weblium, lettres rondes, professionnel, écologique.
- **Corps de texte** : `Inter` 400/500/600 — neutre, ultra-lisible, parfaitement pairé.
- Suppression de `Libre Baskerville` partout (`index.css`, `tailwind.config.ts`, composants).
- Letter-spacing et line-height recalibrés pour un rendu "premium" (titres `-0.02em`, corps `1.6`).

Fichiers touchés : `src/index.css` (import Google Fonts + `@layer base` h1-h6 + body), `tailwind.config.ts` (font families).

---

## 2. Suppression des tirets parasites avant les titres

Audit fait — un seul tiret visible légitime trouvé dans `HeroSection.tsx:209` (`"— ponts, caniveaux, terrains"`), qui est du contenu.

Les "petits tirets avant les titres" que vous voyez viennent en réalité de la décoration des **eyebrows / section-badges** (petites étiquettes au-dessus des titres). Plusieurs composants utilisent un style qui peut donner une impression de tiret à gauche (bordure, ou caractère "•"/"–" décoratif dans les eyebrows).

Actions :

- Auditer chaque section (`AboutSection`, `ServicesSection`, `HowItWorks`, `ImpactStatsSection`, `SolutionsSection`, `FAQSection`, `CTASection`, `Footer`, etc.).
- Retirer tout caractère décoratif "–", "—", "•" présent en préfixe d'eyebrow ou de titre.
- Standardiser les eyebrows sur le style pill propre `.wp-eyebrow` (déjà défini), sans décoration de tiret.

---

## 3. Accessibilité

Passage ciblé sur les points qui dégradent l'UX :

- Boutons icône-seule (Navbar, MobileStickyBar, WhatsAppButton, sliders Hero) → ajout systématique de `aria-label`.
- Vérification d'un seul `<main>` par page.
- Hiérarchie des titres : un seul `<h1>` par page (le Hero), descente logique ensuite.
- Cibles tactiles mobiles ≥ 44×44px (boutons icône).
- `h-screen` → `h-dvh` si présent (mobile viewport).
- `alt` descriptifs sur toutes les images de contenu, `alt=""` sur les images décoratives.
- Contraste vérifié sur les badges et textes secondaires.
- Attribut `lang="fr"` déjà présent ✓.

---

## 4. Optimisation des performances (images)

Diagnostic : le dossier `src/assets/hero/` contient **5 JPG non-optimisés** (710K, 363K, 301K, 236K, 214K, 205K) chargés au-dessus du fold → c'est la cause principale du LCP lent.

Actions :

- Conversion des 5 JPG hero en **WebP qualité 80** via `cwebp` (gain attendu : ~70–80%, soit ~2.8 MB → ~600 KB).
- Ajout de `loading="lazy"` sur toutes les images hors-fold (sections About, Services, Impact, Testimonials, etc.).
- Ajout de `loading="eager"` + `fetchpriority="high"` sur la **première slide du Hero** uniquement (image LCP).
- Ajout d'attributs `width` et `height` explicites sur les `<img>` pour éviter le CLS (Cumulative Layout Shift).
- Ajout d'un `<link rel="preload" as="image">` dans `index.html` pour l'image LCP du Hero.
- Vérification finale via `browser--performance_profile`.

---

## Hors périmètre

- Contenu textuel (titres, paragraphes, FAQ, témoignages, prix) — intact.
- Palette de couleurs (déjà validée vert/orange Waste Heroes).
- Logique métier, Supabase, routes, formulaires.
- Carrousel et animations (conservés tels quels).

## Vérification finale

1. Build OK.
2. Screenshot avant/après du Hero et d'une section type.
3. `browser--performance_profile` pour confirmer l'amélioration LCP.
4. Audit a11y rapide sur la home. 
5. ne touche pas au contenu de section hero