# Plan : Hero vert, suppression des tirets, accessibilité mobile

## 1. Hero — réduire le voile blanc, virer au vert

Dans `src/components/HeroSection.tsx`, remplacer les deux overlays actuels (qui empilent `background/85 → background/55 → background/85` + `primary/10 via-transparent to-secondary/10`) par un dégradé **plus discret et teinté vert** :

- Overlay 1 (base) : `bg-gradient-to-b from-primary/25 via-primary/15 to-primary/30` — au lieu du voile blanc dominant. Le sujet de la photo reste lisible, l'ambiance devient « verte » signature RECYC.
- Overlay 2 (lisibilité du texte) : un dégradé local *derrière le contenu uniquement*, par ex. un radial doux `bg-[radial-gradient(ellipse_at_center,hsl(var(--background)/0.55),transparent_70%)]` pour préserver le contraste du H1 sans noyer toute l'image.

Vérification du contraste WCAG AA sur le H1 après changement (≥ 4.5:1) — si insuffisant, ajuster l'opacité du voile vert (≤ 0.35) ou augmenter le radial central.

## 2. Suppression des tirets visibles (em-dash & en-dash)

Cibler **uniquement les chaînes affichées à l'utilisateur** (ignorer les commentaires JSX et les `aria-label` techniques) :


| Fichier                                             | Remplacement                                                      |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| `HeroSection.tsx` L209                              | `« ponts, caniveaux, terrains »` (parenthèses ou retirer le span) |
| `Footer.tsx` L99                                    | `© {year} RECYC HUB TOGO · Tous droits réservés.`                 |
| `ImpactStatsSection.tsx` L40                        | virgule à la place du tiret                                       |
| `GreenAcademy.tsx` L158                             | virgule                                                           |
| `serviceData.ts` L58 & L247                         | virgule ou point                                                  |
| `TopBar.tsx` L44                                    | `Lun‑Sam · 7h‑18h` → `Lun au Sam · 7h à 18h`                      |
| `AdminDashboard.tsx` L314                           | placeholder `—` → `«—»` retiré, afficher « N/A »                  |
| Titres `<title>` SEO (Index/Solutions/GreenAcademy) | remplacer `—` par `·` ou virgule                                  |


Les `aria-label` et commentaires conservent leurs tirets (invisibles à l'écran, lisibles par lecteurs d'écran sans gêne).

## 3. Accessibilité & responsivité mobile (standards type ONU/PNUD/OMS)

Audit ciblé sur petits écrans (<640px) :

- **Hero** : 
  - `min-h-[92vh]` → `min-h-[88dvh]` pour respecter la barre d'URL iOS.
  - H1 : `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` → `text-[28px] sm:text-4xl md:text-5xl lg:text-6xl` (28 px lisible, jamais sur 4 lignes).
  - Cartes (Vendre / Enlèvement) : padding interne `p-6` → `p-5` mobile, titres `text-xl` → `text-lg`, retirer les `blur-3xl` lourds sur mobile (`md:` only) pour CLS/INP.
  - Pill « Signaler un dépotoir » : autoriser `flex-wrap` sur mobile pour ne plus déborder.
  - Meta indicators (téléphone, lieu) : `gap-y-2` + texte 13px min.
- **AboutSection** L188 : `text-7xl md:text-8xl lg:text-9xl` (numéros décoratifs) → `text-5xl md:text-7xl lg:text-9xl` pour éviter le débordement mobile.
- **Titres de section** unifiés : tous les `text-4xl md:text-5xl lg:text-6xl` deviennent `text-[30px] sm:text-4xl md:text-5xl lg:text-6xl` + `break-words` quand le contenu peut casser.
- **Container global** : vérifier que toutes les sections ont `px-6` mobile (pas `px-12`). Patcher celles qui n'en ont pas.
- **Tap targets** ≥ 44×44 : audit Navbar mobile, MobileStickyBar, indicators du Hero (déjà 1.5 h, agrandir la zone cliquable via `before:absolute before:inset-[-12px]`).
- `**h-screen**` → `h-dvh` partout (audit global, remplacement).
- **Images** : confirmer `loading="lazy"` + `decoding="async"` + `width`/`height` sur les `<img>` hors LCP.
- `**<html lang="fr">**` : vérifier dans `index.html`.

## 4. Vérifications finales

- `browser--view_preview` à 390×844 puis 375×812 → lecture sans débordement horizontal, contraste H1 conservé, tirets disparus, pas de scroll horizontal.
- Lighthouse mobile mental check : contraste, taille de cibles, taille de texte ≥ 14px.

## Détails techniques

- Tokens couleur : ne pas hardcoder, utiliser `hsl(var(--primary))` via les utilitaires `bg-primary/XX`.
- Aucune logique métier modifiée, aucun contenu textuel autre que les tirets.
- Pas d'ajout de dépendances.

&nbsp;

COURRIGER TOUT LES FAUT D'orthographe de conjugaison ou de grammaire 