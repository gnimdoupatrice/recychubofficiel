# Refonte visuelle inspirée de Waste Heroes

## Ce qui change

**Uniquement le design visuel** — couleurs, typographie, traitement des sections, overlays, ombres, boutons. Aucun texte, aucune fonctionnalité, aucune restructuration de contenu.

## Direction visuelle (inspirée de la référence)

- **Ambiance** : claire, aérée, lumineuse — fond blanc/crème dominant au lieu du dark glassmorphism actuel
- **Palette** :
  - Primaire vert frais : `hsl(158 64% 45%)` (vert émeraude type "Waste Heroes")
  - Accent orange chaud : `hsl(24 95% 58%)` (CTA, badges importants)
  - Fond : blanc cassé `hsl(0 0% 100%)` / sections alternées en `hsl(150 20% 97%)`
  - Texte : gris-noir profond `hsl(220 15% 15%)`
- **Typographie** : conserver Libre Baskerville pour l'editorial, mais alléger ; corps en IBM Plex Sans
- **Boutons** : pleins arrondis (orange pour CTA principal, vert pour secondaire), bordure fine pour outline
- **Ombres** : douces et diffuses, pas dramatiques

## Sections touchées

### 1. `src/index.css` (tokens globaux)

Redéfinir les variables HSL : `--background`, `--foreground`, `--primary`, `--secondary`, `--accent`, gradients et ombres. Tout le reste hérite automatiquement.

### 2. `HeroSection.tsx`

- Retirer les overlays sombres `from-primary/70 via-primary/40` → overlay blanc/vert très léger sur photo
- Cartes glassmorphism sombres → cartes blanches avec ombre douce et bordure verte subtile
- Badge "Bienvenue" : pilule verte claire au lieu de glass sombre
- Titre : texte vert foncé + accent orange (au lieu de blanc sur sombre)
- Indicateurs slide : points verts

### 3. `Navbar.tsx` / `TopBar.tsx`

- Barre supérieure verte (comme la référence)
- Nav blanche avec logo bien visible, CTA orange "Demander un enlèvement"

### 4. Sections intermédiaires (About, Services, HowItWorks, Impact, Testimonials, FAQ, CTA, Footer)

- Alterner fond blanc / fond crème vert très pâle
- Cartes : fond blanc, bordure légère, ombre douce, accents verts
- Icônes dans cercles verts pâles avec icône verte
- Boutons CTA orange pleins

### 5. `Solutions.tsx` (header éditorial sombre)

- Passer en fond clair avec accent vert/orange

## Hors-scope (non modifié)

- Tous les textes, titres, FAQ, témoignages, prix, numéros
- Structure des composants et ordre des sections
- Routes, logique métier, données Supabase
- Images du carousel hero

## Détails techniques

Travail concentré dans :

- `src/index.css` (refonte des tokens — impact global)
- `tailwind.config.ts` (ajustement si besoin de nouveaux tokens sémantiques)
- Composants listés ci-dessus : remplacer les classes hardcodées (`text-white`, `bg-white/12`, `from-primary/70`) par des classes basées sur tokens (`text-foreground`, `bg-card`, `border-border`)

Une fois les tokens redéfinis, ~70% du rendu change automatiquement. Les 30% restants concernent les overlays sombres et le glassmorphism du Hero/Navbar à réécrire en version claire.     IL NE FAUT PAS PAS CHANGER LE CONTENUE DU SITE 

&nbsp;