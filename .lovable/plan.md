## Problème détecté

Page blanche causée par une erreur JSX dans `src/components/AcademyTeaser.tsx` (lignes ~26-32) :

- Un premier `<p>` est ouvert avec un texte sur les "emplois verts"
- Au lieu d'être fermé par `</p>`, un **deuxième `<p>`** est ouvert juste après (paragraphe dupliqué)
- Résultat : balises mal imbriquées → React/Vite n'arrive pas à rendre la page → écran blanc

## Correction proposée

Supprimer le paragraphe dupliqué et ne garder qu'un seul `<p>` correctement fermé dans la section texte de `AcademyTeaser.tsx`.

Avant (cassé) :
```tsx
<p ...>
  ...former la prochaine génération... emplois verts          .    
<p ...>
  ...former la prochaine génération... emplois verts.
</p>
```

Après (corrigé) :
```tsx
<p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
  Parce que le changement durable passe par l'éducation. La Green Academy
  propose des ressources, des formations et des bonnes pratiques pour
  sensibiliser le grand public et former la prochaine génération de
  professionnels aux emplois verts.
</p>
```

Je nettoie aussi un espace excédentaire similaire dans la deuxième description (`...transition écologique                          .`) pour cohérence.

## Vérification

Après la correction, je vérifie que la preview se charge correctement (plus de page blanche, section Green Academy visible).