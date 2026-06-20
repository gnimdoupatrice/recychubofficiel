// Helpers Green Academy
export const TRACK_LABELS: Record<string, string> = {
  tri: "Tri & recyclage",
  circulaire: "Économie circulaire",
  entrepreneuriat: "Entrepreneuriat vert",
};

export const TRACK_DESCRIPTIONS: Record<string, string> = {
  tri: "Maîtriser l'identification des plastiques, les chaînes de tri et les process de valorisation.",
  circulaire: "Comprendre les cycles de la matière, les modèles régénératifs et les politiques publiques.",
  entrepreneuriat: "Lancer son activité dans la collecte, le recyclage ou la sensibilisation au Togo.",
};

export const LEVEL_LABELS: Record<string, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
  tous: "Tous niveaux",
};

/** Extrait l'ID vidéo YouTube depuis n'importe quelle URL. */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /youtube\.com\/v\/([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export function formatDuration(minutes?: number | null): string {
  if (!minutes) return "—";
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}min` : `${h}h`;
}
