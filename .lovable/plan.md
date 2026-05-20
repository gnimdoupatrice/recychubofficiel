# Refonte RECYC HUB TOGO — Direction "Émeraude Éditorial"

Direction artistique choisie en tant qu'expert : un croisement entre la sobriété Apple, la rigueur éditoriale d'un magazine (Kinfolk / National Geographic) et la fierté civique africaine. Premium, crédible, mémorable — loin du look "ONG générique".

## Identité visuelle

**Palette — Émeraude Prestige + Terre**
- Fond principal : `#0B1F17` (vert-nuit profond, presque noir)
- Surface : `#0F2A20` / `#143329`
- Vert signature : `#1F8A5C` (émeraude vivant)
- Vert lumière : `#34D399` (highlights, CTAs hover)
- Or sable : `#D4A24C` (accent rare, pour chiffres-clés et badges premium)
- Crème papier : `#F5F0E0` (texte sur fond sombre)
- Terracotta `#C4654A` réservé aux alertes (dépotoir sauvage)

**Typographie**
- Titres : **Instrument Serif** (italique pour les mots emphasés — "plastiques", "Kara")
- Corps & UI : **Inter Tight** (lisible, moderne, neutre)
- Mono accent (chiffres-clés, codes prix) : **JetBrains Mono**
- Installation via `@fontsource` (pas de CDN)

**Principe : éditorial sombre.** Fond sombre par défaut sur le hero et les sections-clés, sections crème pour respiration. Sandwich dark → light → dark.

## Structure de la page d'accueil

```
1. NAV         minimaliste, transparente, blur au scroll
2. HERO        éditorial — grand titre serif + photo terrain Kara en split
3. DUO         deux parcours (Vendre / Enlèvement) — cartes verre dépoli
4. CHIFFRES    bandeau crème, gros chiffres mono + or — 2500 kg, X foyers
5. COMMENT     timeline 3 étapes, illustrations vectorielles minimales
6. ALERTE      bandeau terracotta — signaler un dépotoir (CTA fort)
7. ACADEMY     teaser éducation — image + texte éditorial
8. IMPACT      témoignages + carte Kara stylisée
9. PARTENAIRES logos en niveaux de gris
10. CTA FINAL  pleine largeur sombre, serif imposant
11. FOOTER     dense, structuré 4 colonnes
```

## Détails de craft

- **Grille 12 colonnes**, gutter 24px, marges généreuses (≥ 96px desktop)
- **Micro-interactions Framer Motion** : fade-up au scroll (16px, 600ms ease-out), parallax léger sur images hero, hover scale 1.02 sur cartes
- **Photos terrain** : traitement uniforme — léger contraste +, désaturation -10%, overlay vert nuit 20% pour cohésion
- **Iconographie** : Lucide en stroke 1.5, jamais remplis, dans cercles `bg-emerald-500/10`
- **Bordures** : `1px solid rgba(212,162,76,0.15)` — l'or comme liseré rare
- **Radius** : 16px sur cartes, 999px sur badges, 8px sur inputs
- **Mobile-first** : sticky bar repensée (verre dépoli, 2 CTAs équilibrés)
- **Accessibilité** : contraste AAA sur tous les textes, focus rings or visibles

## Ce qui change concrètement

- Refonte **Hero** : passage à un layout split éditorial avec photo terrain Kara
- Refonte **Navbar** : minimaliste, logo simplifié, nav typographique
- Refonte **cartes services** : style "verre dépoli" sur fond éditorial
- Nouveau **bandeau chiffres** crème avec typo mono géante
- Refonte **footer** : 4 colonnes structurées, dense, premium
- **Tokens design** : remplacement complet de `src/index.css` (palette, typo, ombres, gradients)
- **Tailwind config** : nouvelles familles de fonts, nouveaux tokens couleurs
- Pages internes (Solutions, Academy, Alerte…) : application des nouveaux tokens — pas de refonte structurelle dans cette première passe

## Détails techniques

- Installation : `@fontsource/instrument-serif`, `@fontsource/inter-tight`, `@fontsource/jetbrains-mono`
- Imports dans `src/main.tsx`
- Mise à jour `tailwind.config.ts` : `fontFamily.serif`, `fontFamily.sans`, `fontFamily.mono`
- Réécriture des tokens HSL dans `src/index.css` (light + dark — dark devient le mode par défaut)
- Composants impactés : `Navbar`, `HeroSection`, `MobileStickyBar`, `Footer`, `ImpactStatsSection`, `HowItWorks`, `AlerteTeaser`, `ServicesSection`, `CTASection`
- Aucune modification de la logique métier ni des routes
- Aucun ajout de dépendance backend

## Hors scope (pour cette passe)

- Refonte du dashboard admin
- Nouvelles photos professionnelles (j'utiliserai des placeholders Unsplash cohérents en attendant les vraies photos terrain)
- Internationalisation EN/FR
- Animations 3D / WebGL

Une fois ce plan validé, j'implémente d'un trait — palette + typo + hero + navbar + cartes + footer dans la même passe pour garantir la cohérence visuelle.
