// Unique point d'enregistrement du service worker (mise en cache des fichiers de
// l'app pour qu'elle s'ouvre même sans internet).
// Jamais actif en développement ni dans l'aperçu Lovable.
const KILL_SWITCH = "sw=off";

function contexteInterdit(): boolean {
  if (!import.meta.env.PROD) return true;
  if (typeof window === "undefined") return true;
  if (window.top !== window.self) return true; // iframe (aperçu)
  const h = window.location.hostname;
  if (h.startsWith("id-preview--") || h.startsWith("preview--")) return true;
  if (h === "lovableproject.com" || h.endsWith(".lovableproject.com")) return true;
  if (h === "lovableproject-dev.com" || h.endsWith(".lovableproject-dev.com")) return true;
  if (h === "beta.lovable.dev" || h.endsWith(".beta.lovable.dev")) return true;
  if (window.location.search.includes(KILL_SWITCH)) return true;
  return false;
}

async function desenregistrer() {
  if (!("serviceWorker" in navigator)) return;
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    regs.filter((r) => (r.active?.scriptURL ?? "").endsWith("/sw.js")).map((r) => r.unregister())
  );
}

export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (contexteInterdit()) {
    await desenregistrer();
    return;
  }
  try {
    await navigator.serviceWorker.register("/sw.js", { scope: "/" });
  } catch {
    /* l'app reste utilisable sans cache hors ligne */
  }
}
