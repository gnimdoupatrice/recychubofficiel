## Constat

La première capture est le site actuel — la palette (vert prairie #28B381, orange carotte #F9A03B), la typographie (Space Grotesk titres + DM Sans corps) et le style sont déjà appliqués. Aucun changement global de design system requis.

Dans la section **Pourquoi RECYCHUB TOGO ?** (`src/components/AboutSection.tsx`), les badges chiffrés flottants en haut-droite des images sont déjà en place (+70%, 0, +50%). **Ce qui manque** par rapport à la 2ᵉ capture : un **lien d'action** au bas du bloc texte de chaque constat, qui redirige vers la page d'action correspondante.           

En vrai, quand tu prends par exemple chaque élément au niveau de pourquoi RECYP Up Togo, ce n'est pas seulement le pourcentage qu'il y a. En fait, le pourcentage se trouve dans un petit carré. Il faut bien analyser le texte. Tu vas voir que le pourcentage se trouve dans un petit carré où, par exemple, au niveau de l'état des lieux, au niveau des dépotoirs invisibles, il y a en haut, on a écrit Kara Togo et après ça, on a mis zéro. Et après tout, on a écrit Registre national des dépotoirs sauvages. Quand tu vas prendre celui d'un potentiel inexploité, on a mis le signe de la localisation Kara Togo plus zéro franc par kilo de plastique racheté. Et maintenant, quand tu vas prendre l'autre, on a toujours mis le logo de la localisation. On a mis Kara Togo, 60 % des foyers sans ramassage régulier. C'est un peu ça.

## Ce qui change

Pour chaque carte des 3 constats, ajout sous le paragraphe d'un lien CTA stylisé (flèche + libellé) dans le ton vert primary, avec hover (translation x + soulignement).


| #   | Constat              | Lien CTA               | Destination            |
| --- | -------------------- | ---------------------- | ---------------------- |
| 01  | Collecte défaillante | Demander un enlèvement | `/demander-enlevement` |
| 02  | Dépotoirs invisibles | Signaler un dépotoir   | `/alerte-depotoir`     |
| 03  | Potentiel inexploité | Vendre mes plastiques  | `/vendre-plastiques`   |


**Aucune autre modification** : la disposition zigzag, les images, les badges flottants, le numéro géant 01/02/03 et la typographie restent strictement identiques.

## Détails techniques

- Ajout de champs `cta: { label: string; href: string }` dans le tableau `cards`
- Ajout d'un `<Link>` (react-router-dom, déjà utilisé dans le projet) sous le paragraphe `<p>`, classes : `inline-flex items-center gap-2 mt-6 text-primary font-bold text-sm group/cta hover:gap-3 transition-all` + icône `ArrowRight` Lucide avec `group-hover/cta:translate-x-1`
- Import de `Link` depuis `react-router-dom` et `ArrowRight` depuis `lucide-react`
- Respect du système de design (tokens sémantiques uniquement)

## Fichier touché

- `src/components/AboutSection.tsx`