## Objectif

1. **Hero** : refonte purement visuelle, niveau agence institutionnelle (PNUD / ONU / OMS). **Aucun mot du contenu n'est modifié.**
2. **Section "Pourquoi RECYC HUB TOGO"** : corriger uniquement le rendu mobile (le badge "Déficit logistique" est masqué par la carte stat flottante, et l'image est désolidarisée du titre).

---

## 1. Hero — refonte design (sans toucher au contenu)

Contenu préservé à l'identique :
- Eyebrow : "Bienvenue sur RECYC HUB TOGO"
- H1 : "Faites collecter vos déchets ménagers et vendez vos plastiques"
- Sous-titre, 2 cartes (Vendre / Enlèvement), pill alerte dépotoir, indicateurs (kg, téléphone, Kara Togo), indicateurs de slides.

Direction visuelle visée (registre institutionnel) :
- Grille éditoriale stricte, hiérarchie typographique forte, palette sobre verte + neutres profonds, gradients minimaux.
- Lisibilité maximale : overlay sombre dégradé bas → haut + voile vert très léger (au lieu du voile global actuel qui délave).
- Typo display plus structurée, eyebrow institutionnel (filet + label), kicker "Initiative locale · Kara, Togo".
- Cartes CTA repensées en "policy cards" (coins doux, accent vert net, micro-iconographie, ligne d'action).
- Pill alerte revisitée en bandeau d'urgence discret mais visible.
- Indicateurs en barre méta inférieure type rapport (séparateurs fins, chiffres mis en avant).
- Motion sobre (fade + translate court), conforme prefers-reduced-motion.

Je proposerai **3 directions rendues** via design directions, toutes verrouillées sur la même palette et la même typo, variantes sur composition / densité / hiérarchie. Tu choisis, j'implémente la direction retenue sans modifier le contenu textuel.

---

## 2. Section "Pourquoi RECYC HUB TOGO" — fix mobile

Problèmes constatés sur mobile :
- La carte stat flottante (logo Kara Togo + chiffre) est positionnée en `-top-5 -right-4` au-dessus de l'image et **recouvre le badge** "Déficit logistique" / "Cécité géographique" / "État des lieux Économie".
- L'image et le bloc texte sont en deux colonnes de la grille — sur mobile la grille passe en 1 col mais avec `i % 2 === 1` l'image se retrouve parfois après le texte, et visuellement détachée du titre.

Corrections (mobile uniquement, desktop inchangé) :

a) **Ordre vertical mobile** pour chaque carte (01, 02, 03) :
   1. Numéro (01 / 02 / 03)
   2. Titre (`Systèmes de collecte défaillants`, etc.)
   3. Image
   4. Carte stat (sous l'image, plus en flottant)
   5. Corps de texte
   6. CTA

   Concrètement : sur `<md` on force `order-*` pour réorganiser, et on neutralise l'inversion `i % 2 === 1` qui ne s'applique qu'à `md+`.

b) **Carte stat flottante** : sur mobile, on la sort du positionnement absolu (`static`, marge négative supprimée, largeur pleine ou auto centrée juste sous l'image). Sur `md+` elle redevient flottante comme aujourd'hui.

c) **Badge "Déficit logistique"** : reste en `absolute top-5 left-5` sur l'image, mais comme la carte stat n'est plus en `-top-5 -right-4` sur mobile, plus aucun recouvrement.

d) Ajustements d'espacement mobile (`gap`, `mb`) pour que titre → image → stat → texte respirent.

---

## Détails techniques

Fichiers touchés :
- `src/components/HeroSection.tsx` — refonte structure + classes Tailwind, mêmes chaînes de texte.
- `src/components/AboutSection.tsx` — réordonnancement responsive de la carte `.grid` + repositionnement responsive de la carte stat flottante.

Aucun changement de logique, de routes, de données ou de contenu textuel. Aucune migration backend.

Workflow Hero :
1. Capture screenshot du Hero actuel (mobile + desktop).
2. `design--create_directions` → 3 directions verrouillées sur palette/typo, variant composition.
3. `ask_questions` type `prototype` pour ton choix.
4. Implémentation de la direction choisie + fix mobile AboutSection dans la foulée.

Si tu valides ce plan, je lance la capture + génération des 3 directions Hero immédiatement.
