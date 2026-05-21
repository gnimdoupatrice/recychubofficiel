## Objectif

Transformer la navbar actuelle en une navbar **premium, originale et signature** pour RecycHub Togo, avec des micro-interactions adaptées à chaque service (vendre, enlèvement, alerte, découvrir).

---

## 1. Corrections demandées (obligatoires)

- **Logo figé** : suppression de toutes les transformations au hover (`group-hover:scale-110`, `group-hover:rotate-[-4deg]`, `transition-transform`). Le logo reste strictement statique au survol et au clic. On garde uniquement le `drop-shadow` pour la lisibilité.
- **Badge « Urgence »** : suppression du petit chip rouge `Urgence` à côté de « Alerte dépotoir ». L'icône triangle + l'animation de pulsation suffisent à signaler la criticité et cangement du Faites varier les couleurs en passant du jaune à l’alerte rouge, avec une animation de pulsation bien visible .

---

## 2. Effets adaptés à la sémantique de chaque CTA

Chaque lien reçoit un effet **cohérent avec sa fonction métier**, plus uniforme.


| Lien                      | Couleur d'accent au hover/active | Micro-interaction signature                                                           |
| ------------------------- | -------------------------------- | ------------------------------------------------------------------------------------- |
| Accueil                   | Blanc neutre                     | Underline classique + léger glow                                                      |
| **Alerte dépotoir**       | Rouge → orange (déjà pulsant)    | Halo rouge qui « respire » + icône qui vibre légèrement au hover (shake court)        |
| **Vendre mes plastiques** | Vert secondary (argent/valeur)   | Icône sac qui « rebondit » + petit indicateur FCFA qui apparaît au hover              |
| **Découvrir** ▾           | Accent doré                      | Chevron rotatif (déjà OK) + dropdown qui s'ouvre avec effet « pétale » plus organique |
| **Enlèvement de déchets** | Bleu/teal (logistique)           | Icône camion qui glisse légèrement à droite au hover (translate-x)                    |
| **S'inscrire**            | Gradient secondary→accent        | Shimmer (déjà OK) + halo qui pulse subtilement au repos pour attirer l'œil            |


Chaque pill garde la même hauteur (h-9), même typo, même rythme — seule la couleur d'accent et la micro-interaction changent. Cohérence visuelle, expressivité fonctionnelle.

---

## 3. Évolution couleur au scroll

Actuellement la navbar passe juste de `bg-black/30` → `bg-black/60` au scroll. Proposition :

- **État haut de page** : fond translucide très léger, bordure invisible, links blancs purs. Esprit "flottant".
- **État scrollé** : fond noir profond + **fine ligne d'accent verte (1px) animée** sous la navbar (gradient horizontal qui se déplace doucement, ~8s loop). Signature "écologie en mouvement".
- Transition fluide 400ms cubic-bezier.

---

## 4. Propositions premium (à valider avant exécution)

Idées pour donner une vraie **particularité** à la navbar :

**A. Indicateur de page actif "liquide"**
Un petit blob/pilule de fond qui **glisse** d'un lien actif à l'autre lors de la navigation (style Framer Motion `layoutId`), au lieu de juste changer le fond. Très premium, signature mémorable.

**B. Mini "live indicator" sur Alerte dépotoir**
Un compteur discret (ex: « 3 signalements aujourd'hui ») qui apparaît au hover du lien — donne de la vie et du sens civique. Connecté plus tard à la vraie data.

**C. Curseur magnétique sur les CTAs principaux**
Les liens « Vendre » et « S'inscrire » attirent légèrement le curseur quand on passe à proximité (effet magnétique subtil ~6px). Très premium, Awwwards-style.

**D. Logo : micro-respiration au scroll uniquement**
Puisque tu veux le logo figé au hover, on peut quand même lui donner une vie discrète : très légère opacity breathing (0.95→1) **uniquement** quand la page est scrollée, pour qu'il "vive" sans bouger.

**E. Barre de progression de scroll intégrée**
Une fine ligne verte (1px) en bas de la navbar qui se remplit à mesure qu'on scrolle la page. Utile + élégant.

**F. Dropdown "Découvrir" enrichi**
Ajouter une petite preview visuelle (mini thumbnail / icône animée) à chaque item du dropdown, au lieu de juste icône + texte. Plus immersif.

---

## Questions avant d'exécuter

1. Parmi les **6 idées premium (A–F)**, lesquelles veux-tu que j'implémente ? (je recommande **A + C + E** pour un effet signature fort sans surcharge)
2. Pour l'évolution couleur au scroll, la fine ligne verte animée te parle, ou tu préfères rester sur un changement de fond plus classique ?
3. Le mini "live indicator" sur Alerte dépotoir (idée B) — on met un nombre fictif joli pour l'instant, ou on attend la vraie data ?

Une fois tes réponses reçues, je passe à l'exécution en une seule itération propre.

&nbsp;

elargire une la navbar longeur comme largeur mais de fason primium et personalité 

&nbsp;