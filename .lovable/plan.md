# Refonte visuelle inspirée du template "Waste Heroes" (Weblium)

## Ce que la référence impose (et qui contredit la version actuelle)

| Axe | Référence Waste Heroes | Site actuel |
|---|---|---|
| Ambiance hero | Clair, lumineux, photo nature feuillage | Sombre, immersif, overlay noir 85% |
| Palette | Vert frais + **orange chaud CTA** + blanc | Vert profond + ambre + glassmorphisme |
| Typo | Sans-serif friendly (type Nunito / Mulish) | Playfair Display italique + Inter |
| Hauteur hero | ~80vh, respirable | 92–95vh, dense, deux cartes glass |
| Navbar | Blanche, minimaliste, 1 CTA orange pill "Order a pickup" | 5 items + sélecteur "Découvrir" + pulse alerte |
| Ton | Approchable, civique, rassurant | Premium / SaaS Stripe-vert |
| Densité | Sections aérées, beaucoup de blanc | 13 sections, brochure |

C'est une direction **clair + nature + friendly civic**, à l'opposé du parti actuel.

## Plan d'exécution

### 1. Design tokens (`src/index.css` + `tailwind.config.ts`)
- `--background`: blanc cassé `0 0% 100%` / `48 30% 98%`
- `--primary` (vert frais): `145 55% 38%` (au lieu du vert profond `158 64% 18%`)
- `--accent` (orange chaud CTA — nouveau rôle clé): `22 92% 56%`
- `--foreground`: `220 15% 18%`
- Retirer ambre/glass tokens devenus inutiles
- Typo : remplacer Playfair Display par **Nunito** (display + body) — friendly, rond, lisible. Garder Inter en fallback éventuel.
- Retirer `font-editorial` italic des titres

### 2. Hero (`HeroSection.tsx`) — réécriture
- Fond : photo nature/feuillage **claire** (pas d'overlay noir, voile blanc 40% max)
- Hauteur ~80vh
- Titre H1 sans-serif gras, vert sur fond clair, **pas d'italique**, 2 lignes max
- Sous-titre court (1 phrase)
- **Un seul CTA orange pill** "Commander un enlèvement" + lien texte secondaire "Vendre mes plastiques"
- Supprimer les 2 cartes glassmorphism, le badge "Plateforme phygitale", le pulse alerte, le carrousel 5 slides → 1 image fixe ou 2 max
- Indicateurs téléphone/lieu en bas, discrets

### 3. Navbar (`Navbar.tsx`)
- Fond blanc, ombre légère au scroll
- Logo gauche, 4 liens centraux max, 1 CTA pill orange à droite
- Retirer le sélecteur "Découvrir", retirer le pulse "trash alert"

### 4. Sections — alléger
Réduire de 13 à 8 sections, ordre revu :
1. Hero  2. Services (3 cartes claires : Vendre / Enlèvement / Alerte)  3. Comment ça marche  4. Impact (stats sur fond vert clair, plus sur foreground noir)  5. Témoignages  6. FAQ  7. Partenaires  8. CTA + Footer

Supprimer/fusionner : AboutSection, SolutionProSection, CivicTechSection, GreenAcademySection, EventsHubSection (déplacer vers pages dédiées).

### 5. Composants à mettre au même langage
- `WhyUsSection`, `ImpactStatsSection`, `CTASection`, `MobileStickyBar` : passer du fond sombre au fond clair, CTA orange uniforme, retirer gradients bio.

### 6. Animations
- Subtiles, `prefers-reduced-motion` respecté
- Fade-up doux à l'apparition, pas de pulse permanent

## Détails techniques

```text
Tokens HSL clés (light only) :
--background       0 0% 100%
--foreground     220 15% 18%
--primary        145 55% 38%   (vert frais)
--primary-foreground  0 0% 100%
--accent          22 92% 56%   (orange CTA)
--accent-foreground   0 0% 100%
--muted           48 20% 96%
--border         220 13% 91%
--radius        14px (pill: 9999px sur CTA)

Fonts:
display, body, sans → "Nunito", system-ui, sans-serif (weights 400/600/700/800)
```

Fichiers modifiés : `src/index.css`, `tailwind.config.ts`, `src/components/HeroSection.tsx`, `src/components/Navbar.tsx`, `src/components/MobileStickyBar.tsx`, `src/components/ImpactStatsSection.tsx`, `src/components/WhyUsSection.tsx`, `src/components/CTASection.tsx`, `src/pages/Index.tsx` (ordre + suppressions).

## Ce que je ne touche pas
- Logique métier, routes, AuthContext, intégration Supabase, contenus textuels métier (FAQ, services, prix).
- Pages internes `/vendre`, `/enlevement`, `/alerte` (style hérité des tokens, pas de refonte structurelle).

## Question avant d'attaquer
Pour le hero, tu préfères :
- **A** — Photo nature feuillage type Waste Heroes (urbain + verdure)
- **B** — Photo d'action terrain Kara (collecte, tri) plus locale et authentique
