## Objectif

Renforcer la qualité responsive (mobile-first, niveau ONU/PNUD) avec 3 corrections ciblées + audit mobile global.

## 1. Solution Pro — Stats chip mobile (`SolutionProSection.tsx`)

Problème : sur mobile, les 3 valeurs (`−35%`, `+60%`, `100%`) se collent dans le chip flottant absolu.

- Repositionner le chip : passer de `absolute -bottom-8 left-6 right-6` à un rendu **non absolu en mobile** (`relative mt-6` en xs, `md:absolute md:-bottom-8 md:left-10`) pour libérer la largeur.
- Resserrer la grille mobile : `grid-cols-3 gap-2 md:gap-4`, valeurs en `text-xl` (au lieu de `text-2xl`) en xs, label `text-[10px] leading-tight`.
- Ajouter `min-w-0` + `break-words` sur chaque cellule pour éviter le chevauchement des signes `−` / `+`.
- Padding chip : `p-4 md:p-6`.

## 2. Green Academy — Réordonner le texte descriptif (`GreenAcademySection.tsx`)

Demande : déplacer le paragraphe descriptif (« Une académie verte qui outille… ») **juste après le H2**, avant les 3 axes et les CTAs, sur mobile ET desktop.

Mobile (bloc `lg:hidden`) :
```
eyebrow → H2 → paragraphe descriptif → image → 3 axes → CTAs
```

Desktop (bloc `hidden lg:block`) : inchangé (le paragraphe est déjà juste après le H2). Vérifier et conserver l'ordre actuel.

Action : dans le rendu mobile, déplacer le `<p>` actuellement dans `.order-4` vers le bloc d'en-tête `.order-1`, juste sous le H2. Retirer le `<p>` du bloc CTAs mobile.

## 3. Hero — Image noire/vide (`HeroSection.tsx`)

L'utilisateur voit un écran noir entre deux slides. Lister les `SLIDES`, tester chaque image (chargement + contenu non-noir) et :

- Si une image est cassée/manquante/quasi-noire → la retirer du tableau `SLIDES`.
- Sinon, renforcer la transition pour éviter le « flash noir » entre slides : assurer que la slide précédente reste visible (`opacity` cross-fade au lieu d'un swap), placer un `bg-muted` ou un fallback gradient derrière le carrousel, et ajouter `loading="eager"` + `decoding="async"` sur la première slide uniquement (déjà fait selon mémoire — vérifier).
- Si la slide cassée est `hero-2-pickup.webp` (déjà suspectée), la supprimer puisque la mémoire d'analyse précédente note qu'elle n'est pas noire — donc le souci est probablement le **fond noir entre transitions**, pas l'image. Priorité : corriger la transition.

## 4. Audit mobile-first global (qualité ONU/PNUD)

Passe ciblée sur les sections principales au viewport 390px :

- `HeroSection` : vérifier hauteur, lisibilité H1, padding latéral, chip stats.
- `AboutSection` : badges « Déficit logistique » + stat card flottante (déjà traité au plan précédent — re-vérifier).
- `SolutionProSection` : (cf. §1).
- `ServicesSection` / `SolutionsSection` : grilles, espacements, tailles de police.
- `CivicTechSection`, `GreenAcademySection`, `EventsHubSection`, `FAQSection`, `ImpactStatsSection`, `TestimonialsSection`, `PartnersSection`, `CTASection`, `Footer` : vérifier débordements horizontaux, tailles de typo, contrastes, `min-h` cohérents, CTAs ≥ 44px tactile.

Critères qualité appliqués partout :
- Aucun débordement horizontal (`overflow-x-hidden` au besoin sur conteneurs).
- Typographie fluide : H2 mobile `text-3xl`, descriptifs `text-base leading-relaxed`.
- Espacement vertical entre sections : `py-16 md:py-24` minimum cohérent.
- Tailles tactiles ≥ 44px sur tous les CTAs et liens nav.
- Images en `loading="lazy"` (sauf hero LCP), `decoding="async"`, dimensions explicites.
- Aucun chevauchement d'éléments absolus en xs.

## Fichiers touchés

- `src/components/SolutionProSection.tsx`
- `src/components/GreenAcademySection.tsx`
- `src/components/HeroSection.tsx`
- Petits ajustements potentiels sur les autres sections si l'audit révèle des défauts mobile.

## Hors scope

- Aucune modification de contenu (textes, CTAs, routes, données).
- Aucune logique métier, aucun changement backend.
- Desktop : préservé tel quel sauf si l'audit révèle un bug évident.
