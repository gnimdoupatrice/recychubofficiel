## Objectif

Refondre **uniquement la palette de couleurs** du site pour qu'il respire le moderne, le pro et l'écologie. Aucun changement de layout, de composants, de cartes, d'images, de typographie ou de structure. La section Hero (actuellement sombre/peu attirante) devient lumineuse et claire dès l'arrivée sur le site.

## Palette imposée (verrouillée)

| Rôle | Hex | HSL (pour tokens) |
|---|---|---|
| Background principal | #FFFFFF | `0 0% 100%` |
| Surface secondaire (sections, cartes douces) | #F7F9FA | `204 20% 97%` |
| Accent principal / CTA (Carotte Orange) | #F9A03B | `30 94% 60%` |
| Accent éco / validation (Prairie de montagne) | #28B381 | `158 64% 43%` |
| Texte principal / surface foncée (Chypre) | #292F38 | `216 16% 19%` |

## Stratégie d'application

Tout passe par les **tokens sémantiques** déjà en place dans `src/index.css` et `tailwind.config.ts`. Aucune classe couleur en dur dans les composants ne sera modifiée — seuls les tokens sont changés, donc tout le site se met à jour automatiquement.

### Mapping des tokens

- `--background` → Blanc #FFFFFF
- `--foreground` → Chypre #292F38
- `--card` → Blanc, `--card-foreground` → Chypre
- `--popover` → Blanc, `--popover-foreground` → Chypre
- `--primary` → Carotte Orange #F9A03B, `--primary-foreground` → Blanc
- `--secondary` → Prairie #28B381, `--secondary-foreground` → Blanc
- `--muted` → Glace #F7F9FA, `--muted-foreground` → gris doux dérivé `216 10% 45%`
- `--accent` → Glace #F7F9FA, `--accent-foreground` → Chypre
- `--destructive` → rouge sobre conservé pour erreurs (`0 72% 51%`), `--destructive-foreground` → Blanc
- `--border` → gris très léger dérivé `216 16% 90%`
- `--input` → même que border
- `--ring` → Carotte Orange (focus visible)
- `--sidebar-*` → ajustés sur la même base (fond Blanc/Glace, accents identiques)

Bascule du thème par défaut en **light**. Le bloc `.dark { ... }` est conservé mais réajusté avec les mêmes 5 couleurs (fond Chypre, surfaces dérivées légèrement éclaircies, accents Carotte/Prairie identiques) pour cohérence si jamais le mode sombre est activé.

### Hero spécifiquement

Le composant `HeroSection.tsx` utilise actuellement une image de fond sombre + voile noir qui rend la section peu lumineuse. Je ne touche pas la structure, mais je remplace le **voile/overlay** par un fond utilisant les tokens (`bg-background` + une touche subtile de `bg-muted` ou un dégradé doux Blanc → Glace) afin que la Hero soit lumineuse. Le titre passe en `text-foreground` (Chypre), l'accent "vendez vos plastiques" reste en `text-primary` (Carotte Orange) qui apporte immédiatement la vibe "moderne". Aucun déplacement d'élément, juste la couche de couleur.

Si l'image de fond reste indispensable au sens visuel, je la conserve mais la passe en très basse opacité (`opacity-10` ou `mix-blend-multiply` sur fond clair) pour qu'elle devienne texture discrète au lieu de dominer.

### Sections au cas par cas (couleur uniquement)

- Toutes les sections qui utilisaient `bg-foreground`, `bg-black`, `text-white` en dur (pattern brutaliste actuel) sont relues : je remplace par les tokens sémantiques (`bg-background`, `bg-muted`, `bg-primary`, `text-foreground`) sans changer la disposition. Cible : `Navbar`, `HeroSection`, `AlerteTeaser`, `EventsTeaser`, `AcademyTeaser`, `ImpactStatsSection`, `Footer`, `CTASection`, `PartnersSection`, etc.
- Les badges "eco" / validations passent en vert Prairie (`bg-secondary` ou `bg-secondary/10 text-secondary`).
- Les CTA principaux passent en orange Carotte (`bg-primary text-primary-foreground`).
- Les bordures épaisses `border-foreground` brutalistes sont allégées en `border-border` pour un rendu pro/moderne (changement de **valeur** du token uniquement, pas de la classe).

## Fichiers touchés

- `src/index.css` — uniquement le bloc `:root` et `.dark` (variables CSS HSL).
- `tailwind.config.ts` — vérification que les tokens sémantiques pointent bien sur ces variables (a priori déjà OK, sinon ajustement mineur).
- Quelques composants qui utilisent des couleurs **en dur** (ex. `text-white`, `bg-black`, `border-foreground/90`) sont migrés vers les tokens équivalents — sans toucher au layout, à l'ordre des éléments ni au markup structurel. Liste à confirmer après scan : `HeroSection.tsx`, `AlerteTeaser.tsx`, `EventsTeaser.tsx`, `AcademyTeaser.tsx`, `Footer.tsx`, `Navbar.tsx`, `ImpactStatsSection.tsx`.

## Hors scope (non modifié)

- Typographie / polices.
- Disposition, grille, ordre des sections, nombre de cartes, contenu texte.
- Images, illustrations, icônes.
- Logique, animations, routing.

## Vérification

1. Recharger la preview, screenshot du Hero + scroll complet desktop pour valider la cohérence claire/moderne.
2. Vérifier la lisibilité : contraste texte Chypre sur fond Blanc/Glace, contraste blanc sur Carotte et Prairie (ratios AA respectés).
3. Vérifier qu'aucune zone n'est restée "trouée" en sombre par accident.