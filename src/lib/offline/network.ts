// Détection réseau robuste : `navigator.onLine` ment souvent (wifi capté mais sans
// internet réel). On le complète par un tout petit appel réseau avec timeout court.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

export async function isReallyOnline(timeoutMs = 4000): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.onLine === false) return false;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    await fetch(`${SUPABASE_URL}/auth/v1/health`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
