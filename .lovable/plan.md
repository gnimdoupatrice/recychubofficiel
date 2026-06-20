
# Green Academy — Agrégateur de formations hybride

## Vision

La Green Academy ne produit pas de formations. Elle **agrège, catégorise et héberge** les meilleures formations existantes (YouTube, MOOCs francophones, ADEME, ONU, etc.). L'apprenant reste **dans RECYC HUB TOGO** : il regarde, suit sa progression, obtient des certificats de parcours.

## Comment ça marche (modèle hybride)

```text
┌───────────────────────────────────────────────────────────┐
│  Catalogue Green Academy (interne)                        │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────┐    ┌────────────────────────┐    │
│  │ Source: YouTube     │    │ Source: MOOC externe   │    │
│  │ (embed autorisé)    │    │ (embed bloqué)         │    │
│  ├─────────────────────┤    ├────────────────────────┤    │
│  │ ▶ Lecteur natif     │    │ 🔗 Bouton "Suivre"     │    │
│  │   dans la page      │    │   → nouvel onglet      │    │
│  │   (iframe YouTube)  │    │   + tracking départ    │    │
│  │                     │    │   + auto-cochage au    │    │
│  │ Auto-progression    │    │     retour (déclaratif)│    │
│  │ via Player API      │    │                        │    │
│  └─────────────────────┘    └────────────────────────┘    │
│                                                           │
│            ↓ progression sauvegardée                      │
│                                                           │
│  ┌───────────────────────────────────────────────────┐    │
│  │ Profil apprenant                                  │    │
│  │ • Modules vus / en cours / terminés               │    │
│  │ • % par parcours                                  │    │
│  │ • Certificats PDF générés à 100 %                 │    │
│  └───────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────┘
```

## Étapes

### 1. Activer Lovable Cloud
Nécessaire pour : authentification (compte obligatoire), base de données (catalogue + progression), génération PDF des certificats.

### 2. Schéma base de données

```text
courses            : id, slug, title, description, cover_url,
                     track ('tri' | 'circulaire' | 'entrepreneuriat'),
                     level, language, source_type ('youtube' | 'vimeo' | 'external' | 'pdf'),
                     source_url, source_provider (YouTube, FUN, Coursera, ADEME…),
                     duration_minutes, is_free, sort_order, published
modules            : id, course_id, title, source_type, source_url, video_id,
                     duration_minutes, position
profiles           : id (= auth.users.id), full_name, avatar_url, region
enrollments        : user_id, course_id, started_at, completed_at, progress_pct
module_progress    : user_id, module_id, status ('not_started'|'in_progress'|'completed'),
                     watched_seconds, completed_at
certificates       : id, user_id, course_id, issued_at, pdf_url
user_roles         : user_id, role ('admin' | 'editor' | 'learner')  ← table séparée + has_role()
```

RLS sur tout. Admin/editor peuvent CRUD le catalogue, learner lit le catalogue + écrit sa propre progression.

### 3. Pages & composants

- `/academy` — landing (refonte de l'existant) : hero + 3 parcours + catalogue filtré
- `/academy/parcours/:track` — vue parcours avec ses cours
- `/academy/cours/:slug` — **page lecture** : 
  - **YouTube** → `<iframe>` + YouTube IFrame API pour récupérer la position et marquer "terminé" à 90 %
  - **PDF** → viewer intégré (`react-pdf`)
  - **MOOC externe** → carte "Suivre sur [provider]" + bouton "J'ai terminé" + lien retour
  - Sidebar : liste des modules + état (✓ / en cours / verrouillé optionnel)
- `/academy/mon-parcours` — dashboard apprenant (cours en cours, certificats, % global)
- `/admin/academy` — back-office (réservé `admin`/`editor`) pour ajouter/éditer cours et modules sans toucher au code

### 4. Auto-import YouTube (optionnel mais puissant)

Edge Function `import-youtube-playlist` :
- Input : URL playlist + parcours + niveau
- Appelle YouTube Data API v3 (clé via `add_secret YOUTUBE_API_KEY`)
- Insère chaque vidéo comme `module` dans la BDD

Ça permet de remplir le catalogue en 2 min au lieu de saisir vidéo par vidéo.

### 5. MOOCs francophones (FUN, OpenClassrooms, Coursera)

Curation manuelle dans le back-office :
- Titre, description, durée, provider, URL externe, niveau
- Affichés dans le catalogue comme tous les autres cours
- Bouton "Suivre la formation" ouvre le MOOC dans un nouvel onglet
- Au retour, l'apprenant clique "J'ai terminé" → certificat délivré par RECYC HUB TOGO (parcours/découverte, pas de la plateforme tierce)

**Mention légale claire** sur la fiche : "Formation hébergée par [Provider]. Le certificat officiel est délivré par [Provider]. RECYC HUB TOGO délivre un certificat de parcours."

### 6. Certificat PDF
À 100 % d'un parcours, Edge Function génère un PDF (jsPDF) avec logo, nom, parcours, date, QR code de vérification → URL stockée dans `certificates.pdf_url`.

## Détails techniques

- **Embed YouTube** : `<iframe src="https://www.youtube.com/embed/{id}?enablejsapi=1">` + chargement de `https://www.youtube.com/iframe_api`, listener `onStateChange` → update `module_progress.watched_seconds` toutes les 10 s.
- **Auth obligatoire** : route `/academy/cours/:slug` protégée par `<AuthGuard>` ; redirection vers `/inscription` si non connecté.
- **Profils** : table `profiles` créée + trigger `on_auth_user_created` pour insertion auto.
- **Roles** : enum `app_role` + table `user_roles` + fonction `has_role(uuid, app_role) SECURITY DEFINER` (jamais de rôle sur `profiles`).
- **SEO** : meta dynamiques par cours, JSON-LD `Course` schema pour visibilité Google.

## Secrets à demander (plus tard, à l'étape correspondante)

- `YOUTUBE_API_KEY` — uniquement si on active l'import auto de playlists (étape 4)

Aucun autre secret externe : MOOCs sont simplement des liens.

## Découpage de livraison proposé

1. **Phase 1 — Fondations** : Lovable Cloud + auth + schéma BDD + back-office minimal + refonte landing `/academy` branchée sur la BDD
2. **Phase 2 — Lecture** : page cours, lecteur YouTube avec tracking auto, dashboard apprenant
3. **Phase 3 — MOOCs externes & PDF** : intégration sources externes + viewer PDF
4. **Phase 4 — Certificats** : génération PDF + QR code de vérification
5. **Phase 5 (optionnelle)** : import YouTube auto via API

On peut démarrer par la Phase 1 dès que tu valides. Veux-tu qu'on enchaîne directement Phase 1 + 2 dans une première implémentation, ou Phase 1 seule pour valider la structure avant ?
