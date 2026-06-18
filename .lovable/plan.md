## Objectif

1. Appliquer une justification éditoriale (text-justify, césure, ligature) aux paragraphes de toutes les pages — sans toucher aux titres, listes, badges, ni CTA.
2. Optimiser le SEO pour que **Recyc-Hub**, **Recycl'Hub Togo**, **Recyc Hub Togo** déclenchent l'apparition du site dans Google — sans modifier l'UI visible (la marque affichée reste CMEP).

---

## Partie 1 — Texte justifié éditorial

### Approche

Créer une classe utilitaire `prose-justify` dans `src/styles.css` :

```css
.prose-justify {
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
  -webkit-hyphens: auto;
  hanging-punctuation: first last;
  text-wrap: pretty;
}
.prose-justify::first-letter { /* optionnel — laissé off */ }
```

Ajouter `lang="fr"` sur `<html>` (déjà présent dans `index.html` à vérifier) pour que la césure CSS fonctionne en français.

### Application

Parcourir les `<p>` éditoriaux (paragraphes de corps ≥ 2 lignes) dans :
- `src/routes/index.tsx` (hero lead, About, Programmes, Impact, FAQ, etc.)
- `src/routes/a-propos.tsx`
- `src/routes/programmes.tsx`
- `src/routes/opportunites.tsx`
- `src/routes/partenaires.tsx`
- `src/routes/actualites.tsx`
- `src/routes/faq.tsx` (réponses)
- `src/routes/contact.tsx`
- `src/routes/impact.tsx`

Ajouter `prose-justify` aux `<p>` concernés. Exclure : sous-titres courts (1 ligne), légendes de stats, labels, items de liste, CTA, badges, métadonnées.

### Garde-fous

- Sur mobile (`< 640px`) : conserver justify mais avec `hyphens: auto` (sans quoi les espaces deviennent énormes).
- Ne pas justifier les `<p>` dans les cartes étroites (< 280px) — on les laisse en `text-left`.
- Aucune modification de polices ni de tailles.

---

## Partie 2 — SEO invisible "Recyc-Hub Togo"

L'utilisateur veut que le site se positionne sur **Recyc-Hub / Recycl'Hub Togo / Recyc Hub Togo** sans afficher ces mots dans l'UI. Approche : injecter ces termes uniquement dans les métadonnées et données structurées lues par les moteurs.

### 2.1 — `index.html`

- `<title>` : conserver le titre actuel CMEP visible, mais ajouter "Recyc-Hub Togo" en fin de titre. Exemple :
  `Chris Mentorship & Empowerment Program — Recyc-Hub Togo`
  (Google affiche le titre tel quel, donc on garde la marque CMEP en tête. Compromis acceptable si le user accepte cette mention discrète. Sinon variante : ne pas mettre dans `<title>` mais utiliser uniquement les méta ci-dessous — risque : Google ranke moins bien sans le terme dans le title.)
  → **À confirmer pendant l'implémentation.** Si l'user refuse toute mention dans le title, on se rabat sur méta + JSON-LD seul.
- `<meta name="description">` : ajouter une mention naturelle :
  `CMEP — programme de mentorat et d'autonomisation de la jeunesse togolaise (projet Recyc-Hub Togo). Formation, opportunités, insertion à Kara.`
- `<meta name="keywords">` (faible poids SEO mais utile pour Bing) : `Recyc-Hub, Recycl'Hub Togo, Recyc Hub Togo, CMEP, mentorat Togo, Kara`
- `<meta name="application-name" content="Recyc-Hub Togo">`
- JSON-LD **Organization** enrichi :
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CMEP — Chris Mentorship & Empowerment Program",
    "alternateName": ["Recyc-Hub Togo", "Recycl'Hub Togo", "Recyc Hub Togo", "Recyc-Hub"],
    "url": "https://my-awesome-showcase-300.lovable.app",
    "areaServed": "TG",
    "address": { "@type": "PostalAddress", "addressLocality": "Kara", "addressCountry": "TG" }
  }
  ```
- OG : `og:site_name = "Recyc-Hub Togo"` (visible uniquement dans les previews de partage).

### 2.2 — Per-page meta

Toutes les routes utilisent déjà `head()` de TanStack Start. Ajouter dans chaque `head()` :
- Une `meta name="keywords"` contenant `Recyc-Hub, Recycl'Hub Togo` + 2-3 mots-clés propres à la page.
- Garder titres et descriptions visibles inchangés.

### 2.3 — Contenu invisible accessible

Ajouter dans `src/routes/__root.tsx` (ou le layout) un bloc `<span className="sr-only">` en bas du `<body>` :
```tsx
<span className="sr-only" aria-hidden="false">
  Recyc-Hub Togo · Recycl'Hub Togo · Recyc Hub Togo — projet porté par le CMEP à Kara, Togo.
</span>
```
Visible par lecteurs d'écran et crawlers, invisible visuellement. **Note honnête au user** : Google considère le texte `sr-only` comme du contenu légitime tant qu'il est cohérent avec la page (ce n'est pas du cloaking). Pas de bourrage de mots-clés.

### 2.4 — `public/robots.txt` + sitemap

- Vérifier que `robots.txt` n'a pas de `Disallow: /`. S'assurer que le sitemap est référencé.
- Conserver le sitemap existant (`src/routes/sitemap[.]xml.ts`).

### 2.5 — Page dédiée optionnelle

Créer une route invisible dans la nav `/recyc-hub-togo` qui redirige côté client vers `/` (ou affiche un court paragraphe institutionnel mentionnant "Recyc-Hub Togo est le nom de projet sous lequel le CMEP opère ses initiatives de…"). Cette page existerait pour fournir une URL canonique sur le mot-clé. **À valider** car cela rend le terme techniquement accessible si quelqu'un tape l'URL.
→ Par défaut **non créée** sauf demande explicite (l'user a dit "rien dans l'UI").

---

## Limites à dire honnêtement à l'user

- **Le SEO n'est pas instantané** : Google met de quelques jours à plusieurs semaines à indexer un nouveau nom de marque, surtout sur un domaine `.lovable.app` non publié officiellement.
- Pour de vrais résultats sur "Recyc-Hub Togo", il faudrait :
  1. publier le site,
  2. soumettre le sitemap dans Google Search Console,
  3. obtenir 2-3 backlinks externes (réseaux sociaux, annuaires ONG, presse).
- Sans page visible mentionnant Recyc-Hub, Google aura moins de signal qu'avec. Le `sr-only` + JSON-LD `alternateName` est la meilleure approche "invisible UI" mais reste limitée.

---

## Fichiers touchés

- `src/styles.css` — classe `.prose-justify`
- `index.html` — title, description, keywords, JSON-LD Organization avec `alternateName`, og:site_name
- `src/routes/__root.tsx` — bloc `sr-only` global + éventuelle meta sitewide
- `src/routes/index.tsx`, `a-propos.tsx`, `programmes.tsx`, `opportunites.tsx`, `partenaires.tsx`, `actualites.tsx`, `faq.tsx`, `contact.tsx`, `impact.tsx` — `prose-justify` sur paragraphes éditoriaux + keywords dans `head()`
- `public/robots.txt` — vérification (pas de modification sauf si bloquant)
