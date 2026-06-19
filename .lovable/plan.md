## Objectif

Centraliser les règles d'alignement typographique (center / justify) dans `src/index.css` via des classes sémantiques réutilisables, pour que toute nouvelle section hérite automatiquement du bon comportement et éviter d'avoir à patcher composant par composant.

## Principe

On définit **3 classes sémantiques** (intention, pas style) dans `@layer components` de `src/index.css`, plus des règles automatiques pour les éléments qui doivent toujours avoir le même alignement. Le code des composants utilisera ces classes au lieu d'utilitaires Tailwind bruts (`text-justify`, `text-center`, `hyphens-auto`).

### Les classes

| Classe | Usage | Effet |
|---|---|---|
| `.editorial-body` | Paragraphes éditoriaux longs (≥ 2 lignes) — intros de section, excerpts, descriptions | `text-align: justify` + `hyphens: auto` + `text-wrap: pretty` + garde-fou mobile |
| `.editorial-center` | Titres centrés, baselines de hero, blocs contact compacts | `text-align: center` |
| `.editorial-lead` | Headlines / H1 / H2 multi-lignes qui doivent rester lisibles | `text-align: justify` + `text-wrap: balance` (équilibre les fins de ligne sans rivières) |

### Règles automatiques (sans toucher au markup)

Pour limiter les régressions futures, ajout de sélecteurs automatiques :

- `p.leading-relaxed` → justify (déjà en place, conservé)
- `footer address`, `footer address *` → center (les contacts du footer)
- `section[data-align="center"] h1, h2, p` → center (opt-in par data-attribute)
- `section[data-align="justify"] p` → justify

Ainsi une nouvelle section peut écrire `<section data-align="center">` et tous ses textes hériteront du bon alignement sans toucher au CSS.

## Migration des composants existants

Remplacement des classes Tailwind brutes par les classes sémantiques sur :

- `HeroSection.tsx` — H1 : `text-center` → `editorial-center` (sur le H1)
- `Footer.tsx` — bloc Contact : déjà couvert par la règle auto `footer address`, on peut retirer `text-center` redondant
- `TestimonialsSection.tsx` — `<p>` témoignage : `text-justify hyphens-auto` → `editorial-body`
- `EventsHubSection.tsx` — intro + excerpts : `text-justify hyphens-auto` → `editorial-body`
- `CTASection.tsx` — H2 : `text-justify hyphens-auto` → `editorial-lead`

## Détails techniques

Ajout dans `src/index.css`, juste après le bloc justify existant (ligne 595) :

```css
@layer components {
  .editorial-body {
    text-align: justify;
    text-justify: inter-word;
    hyphens: auto;
    -webkit-hyphens: auto;
    hyphenate-limit-chars: 6 3 3;
    text-wrap: pretty;
  }
  .editorial-center {
    text-align: center;
    text-wrap: balance;
  }
  .editorial-lead {
    text-align: justify;
    text-justify: inter-word;
    hyphens: auto;
    text-wrap: balance;
  }

  /* Règles automatiques (opt-in via data-attribute ou structure) */
  footer address,
  footer address > * {
    text-align: center;
  }
  section[data-align="center"] :where(h1, h2, h3, p) {
    text-align: center;
  }
  section[data-align="justify"] :where(p) {
    text-align: justify;
    hyphens: auto;
  }

  @media (max-width: 480px) {
    .editorial-body { hyphenate-limit-chars: 5 2 2; }
  }
}
```

`:where(...)` garde la spécificité à 0 pour qu'une classe Tailwind locale puisse toujours surcharger en cas de besoin exceptionnel.

## Fichiers modifiés

- `src/index.css` — ajout du bloc `@layer components` (≈30 lignes)
- `src/components/HeroSection.tsx` — 1 classe
- `src/components/Footer.tsx` — nettoyage redondance
- `src/components/TestimonialsSection.tsx` — 1 classe
- `src/components/EventsHubSection.tsx` — 2 classes
- `src/components/CTASection.tsx` — 1 classe

## Bénéfice

Toute nouvelle section ajoutée plus tard n'a qu'à :
- utiliser `<p className="editorial-body">` pour un paragraphe long, **ou**
- envelopper la section avec `<section data-align="center">` / `data-align="justify"`

→ plus de risque d'oublier `text-justify` ou de mélanger `text-center` / `text-left` au hasard.