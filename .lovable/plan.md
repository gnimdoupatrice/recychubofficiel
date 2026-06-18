
## Objectif

1. **Refonte typographique** : alignement à gauche éditorial (style ONU, PNUD, OMS, grandes startups) au lieu du centrage actuel — plus institutionnel, plus lisible.
2. **Découvrabilité Google** : optimiser le site pour qu'une recherche "recyc hub" ou "recyc hub togo" fasse apparaître le site dans les résultats Google une fois publié.
3. **Lancer un audit SEO** automatisé en fin de chantier.

---

## Partie 1 — Alignement typographique style ONU/PNUD

Les sites de référence (un.org, undp.org, who.int, Stripe, Linear, Notion) partagent ces principes :
- **Texte aligné à gauche** (jamais centré pour les paragraphes longs)
- **Titres alignés à gauche** sur grille éditoriale
- **Eyebrow / kicker** (petit label majuscule au-dessus du titre)
- **Sous-titres en regard du titre** (max 60-70 caractères par ligne)
- **Conteneurs larges mais contenu contraint** (`max-w-3xl` à `max-w-4xl` pour le texte)

### Sections à refondre (passer de `text-center` → `text-left`)

| Composant | État actuel | Cible |
|---|---|---|
| `HeroSection.tsx` | Tout centré (badge, h1, sous-titre, meta) | Bloc texte aligné à gauche, badge en eyebrow, h1 + sous-titre sur grille gauche. Cartes services à droite/dessous |
| `SolutionsIntro.tsx` | À vérifier | Eyebrow + h2 + paragraphe alignés à gauche |
| `AboutSection.tsx` | À vérifier | Format éditorial gauche |
| `ImpactStatsSection.tsx` | Probablement centré | Titre à gauche, chiffres en grille |
| `ServicesSection.tsx`, `CivicTechSection.tsx`, `GreenAcademySection.tsx` | À auditer | Headers à gauche, contenu en grille |
| `EventsHubSection.tsx`, `TestimonialsSection.tsx`, `FAQSection.tsx`, `CTASection.tsx` | À auditer | Idem |

### Pattern type appliqué partout

```text
[EYEBROW MAJUSCULE — 11px, primary, tracking large]
[Titre H2 — font-display, 3xl→5xl, leading-tight, text-left]
[Sous-titre — max-w-2xl, text-muted-foreground, text-left]
                                                   [→ contenu]
```

- Ne **pas** toucher aux cartes/grilles (`grid`, `flex` items) qui peuvent rester centrées visuellement
- Garder uniquement le centrage pour : badges isolés, CTA finaux, indicateurs de carrousel

---

## Partie 2 — Découvrabilité Google ("recyc hub", "recyc hub togo")

### 2.1 — `index.html` (tags sitewide)

- **Title** : déjà bon (`RECYC HUB TOGO — Vendez vos plastiques...`) → garder, c'est le signal #1 pour "recyc hub togo"
- **Meta description** : enrichir avec "RECYC HUB TOGO" en début pour matcher la requête de marque
- **Ajouter `<meta name="keywords">`** (utile pour Bing, ignoré par Google mais sans coût)
- **Ajouter JSON-LD `Organization`** sitewide avec :
  - `name: "RECYC HUB TOGO"`
  - `alternateName: ["RecycHub Togo", "Recyc Hub", "Recyc Hub Togo"]` ← **clé pour matcher toutes les variantes orthographiques**
  - `url`, `logo`, `sameAs` (réseaux sociaux si dispo), `address`, `contactPoint`
- **Ajouter JSON-LD `WebSite`** avec `SearchAction` (sitelinks searchbox Google)

### 2.2 — `SEO.tsx` (par route)

- Vérifier que chaque page inclut "RECYC HUB TOGO" dans le `<title>` (déjà le cas via le suffixe `| RecycHub Togo` — **harmoniser** en `| RECYC HUB TOGO`)
- Mettre à jour `SITE_URL` quand le domaine sera connu (laisser relatif sinon)

### 2.3 — `public/robots.txt`

- Déjà ouvert à tous les bots ✓
- **Ajouter `Sitemap:` directive** une fois le domaine connu (sinon laisser tel quel)

### 2.4 — `public/sitemap.xml` (à créer via script)

- Créer `scripts/generate-sitemap.ts` + hooks `predev` / `prebuild`
- Entrées : `/`, `/vendre`, `/enlevement`, `/alerte`, `/solutions`, `/evenements`, `/green-academy`, `/connexion`, `/inscription`
- `BASE_URL = ""` avec TODO (pas de domaine encore)

### 2.5 — Densité du mot-clé "RECYC HUB TOGO"

- Hero h1 : déjà bon (le titre contient déjà le contexte)
- Footer : vérifier que "RECYC HUB TOGO" apparaît en clair (déjà OK)
- About : s'assurer que "RECYC HUB TOGO" apparaît au moins 1 fois dans le 1er paragraphe
- Ajouter une mention "RECYC HUB TOGO (Recyc Hub Togo)" dans About pour capter les deux orthographes

### 2.6 — Réalité à expliquer à l'utilisateur

Google ne classera le site sur "recyc hub togo" qu'**après publication** + **indexation** (généralement 3 à 14 jours). Étapes côté utilisateur après publication :
1. **Publier** le site (bouton Publish)
2. **Connecter Google Search Console** (je peux automatiser via le connecteur) et soumettre le sitemap
3. **Demander l'indexation** de la home dans Search Console
4. Patienter quelques jours

---

## Partie 3 — Audit SEO automatisé

À la fin, lancer `seo--trigger_scan` pour obtenir un rapport actionnable (titres, meta, alt, headings, performance) et corriger les éventuelles alertes restantes.

---

## Détail technique

- **Fichiers modifiés** : `index.html`, `src/components/SEO.tsx`, `src/components/HeroSection.tsx`, `src/components/SolutionsIntro.tsx`, `src/components/AboutSection.tsx`, `src/components/ImpactStatsSection.tsx`, `src/components/ServicesSection.tsx`, `src/components/CivicTechSection.tsx`, `src/components/GreenAcademySection.tsx`, `src/components/EventsHubSection.tsx`, `src/components/TestimonialsSection.tsx`, `src/components/FAQSection.tsx`, `src/components/CTASection.tsx`
- **Fichiers créés** : `scripts/generate-sitemap.ts`, `public/sitemap.xml` (généré)
- **package.json** : ajout `predev` / `prebuild`
- **Pas de changement de business logic ni de base de données**

---

## Question

Veux-tu que je :
- **(A)** Refonte typographique sur **toutes les sections** d'un coup (cohérent mais gros diff), ou
- **(B)** Commencer par le **Hero + intro Solutions + About** (sections vues en premier) puis itérer ?

Par défaut je pars sur **(A)** pour une cohérence éditoriale immédiate, et je lance le scan SEO en clôture.
