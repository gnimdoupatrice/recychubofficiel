# Plan de refonte de la page d'accueil

Direction visuelle validée : **Editorial Impact Report** (fond clair `#F9FAFB`, Playfair Display + Inter, accents emerald, numérotation 01/02/03, mise en page éditoriale alternée image/texte).

## 1. Nouvelle section "Pourquoi RECYCHUB TOGO ?"

Remplacer les 4 cartes actuelles par **3 cartes pleine largeur** en mise en page éditoriale alternée (image à droite / texte à gauche, puis inversé).

- **Carte 01 — Systèmes de collecte défaillants**
  Badge : `DÉFICIT LOGISTIQUE`
  Les entreprises de pré-collecte opèrent à l'aveugle, sans données précises sur les flux. Tournées sous-optimisées, gaspillage de carburant, temps d'intervention prolongé.

- **Carte 02 — Dépotoirs invisibles**
  Badge : `CÉCITÉ GÉOGRAPHIQUE`
  Visibles des citoyens mais absents de toute comptabilité institutionnelle. L'absence de cartographie dynamique empêche la mesure réelle et l'allocation des ressources.

- **Carte 03 — Potentiel économique inexploité**
  Badge : `VALEUR CACHÉE`
  Les déchets recyclables ont une valeur marchande réelle. Sans circuit de rachat structuré, cette ressource est perdue alors qu'elle pourrait générer revenus et emplois locaux.

Chaque carte : numéro géant en Playfair `01/02/03`, titre, paragraphe avec mots-clés en gras, badge bas, image éditoriale avec ombre décalée verte.

## 2. Nouvelle section "Notre réponse" (Vision / Mission / Objectifs)

Section **insérée juste après "Pourquoi"**, dans le même esprit éditorial mais plus dense (3 colonnes ou bloc structuré) :

- **Vision** — La phrase de vision actuelle du projet
- **Mission** — La mission opérationnelle
- **Objectifs** — 3 à 4 objectifs clés sous forme de liste numérotée ou puces fines

Style : fond contrasté (carte sombre `#0c2419` ou bande claire avec filets verts), typo Playfair pour les libellés, Inter pour le corps.

## 3. Nouvelle section "Nos solutions"

Section dédiée aux 4 piliers fonctionnels (avant "Comment ça marche") :

1. **Système de collecte intelligent** (tournées optimisées, données temps réel)
2. **Système de rachat** (tel qu'il existe actuellement)
3. **Alertes dépotoirs** (signalement citoyen + cartographie)
4. **Green Academy** (formation, sensibilisation)

Format : grille 2x2 ou 4 cartes alignées avec icône, titre, courte description et lien "En savoir plus". Style cohérent avec la nouvelle ligne éditoriale (cartes claires, accent emerald, typo mixte).

## 4. Restructuration de l'ordre des sections

Nouvel ordre de la home :

```text
1. Hero (inchangé)
2. Pourquoi RECYCHUB TOGO ?         ← refonte (3 cartes éditoriales)
3. Notre réponse (Vision/Mission/Objectifs)  ← nouvelle section
4. Nos solutions (4 piliers)        ← nouvelle section
5. Comment ça marche                ← conservé, déplacé après "Nos solutions"
6. Hub événementiel (blog opportunités)  ← nouvelle section (placeholder + lien vers route blog)
7. Footer / CTA final
```

Sections actuelles à **supprimer / fusionner** : les anciennes cartes "défis" et tout doublon entre l'ancien bloc "Pourquoi" et la nouvelle structure.

## 5. Hub événementiel

Sur la home : **aperçu** type blog (3 dernières opportunités/événements) avec image, date, titre, extrait, lien "Lire". Bouton "Voir toutes les opportunités" → route dédiée `/opportunites` (ou `/blog`) à créer dans une étape ultérieure (cette étape ne fera que l'aperçu + la route vide prête à recevoir le contenu).

## Détails techniques

- Ajout des tokens design (couleurs emerald foncé, ombres décalées, fonts Playfair Display + Inter) dans `src/styles.css` — pas de couleurs en dur dans les composants.
- Nouveaux composants dans `src/components/home/` : `WhySection.tsx`, `OurResponseSection.tsx`, `SolutionsSection.tsx`, `EventsHubSection.tsx`.
- Mise à jour de `src/routes/index.tsx` pour le nouvel ordre.
- Création de la route `/opportunites` (page liste vide prête à être alimentée).
- Images éditoriales : générées via `imagegen` (style documentaire/éditorial Afrique de l'Ouest) ou placeholders en attendant validation visuelle.
- Responsive : empilement mobile, alternance image/texte uniquement ≥ md.

## Hors périmètre de ce plan

- Le contenu réel des articles du Hub événementiel (CMS / base de données).
- Les pages détail de chaque solution (créées séparément si besoin).
- Refonte du Hero, du Footer ou du header (sauf ajustements mineurs si requis pour cohérence).

Validez ce plan ou indiquez les ajustements à apporter avant que je passe à l'implémentation.
