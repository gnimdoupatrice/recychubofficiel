// Synchronisation de la file d'attente locale vers le serveur.
// Règles clés :
//  - un signalement est TOUJOURS écrit en local d'abord (voir la page Alerte)
//  - échec réseau / serveur (5xx) => on retente plus tard, avec un délai croissant
//  - rejet explicite du serveur (4xx) => statut `failed`, aucune relance automatique
//  - plafond : 48h ou 50 tentatives, la première limite atteinte l'emportant
import { supabase } from "@/integrations/supabase/client";
import { isReallyOnline } from "./network";
import {
  getByStatut,
  updateSignalement,
  purgeSent,
  type SignalementLocal,
} from "./db";

const MAX_TENTATIVES = 50;
const MAX_AGE_MS = 48 * 60 * 60 * 1000; // 48 heures

/** Délai avant nouvelle tentative selon le nombre d'échecs déjà subis. */
export function delaiAvantRetry(tentatives: number): number {
  if (tentatives <= 1) return 10_000; // 10 s
  if (tentatives === 2) return 30_000; // 30 s
  if (tentatives === 3) return 60_000; // 1 min
  return 5 * 60_000; // puis toutes les 5 min
}

type EnvoiResultat =
  | { ok: true }
  | { ok: false; definitif: boolean; message: string };

function estRejetDefinitif(status?: number | string | null): boolean {
  const code = typeof status === "string" ? parseInt(status, 10) : status;
  return typeof code === "number" && code >= 400 && code < 500 && code !== 408 && code !== 429;
}

async function envoyer(item: SignalementLocal): Promise<EnvoiResultat> {
  try {
    let photo_url: string | null = null;

    // 1. Photo -> stockage
    if (item.photo) {
      const folder = item.user_id ?? "anonymous";
      const path = `${folder}/${item.id}.jpg`;
      const { error: upErr } = await supabase.storage
        .from("recychub-photos")
        .upload(path, item.photo, { contentType: item.photo_type || "image/jpeg", upsert: true });
      if (upErr) {
        const status = (upErr as unknown as { statusCode?: string | number }).statusCode;
        return {
          ok: false,
          definitif: estRejetDefinitif(status),
          message: upErr.message,
        };
      }
      photo_url = supabase.storage.from("recychub-photos").getPublicUrl(path).data.publicUrl;
    }

    // 2. Enregistrement du signalement
    const repereLisible =
      item.repere_texte?.trim() ||
      (item.latitude != null ? `Position GPS ${item.latitude.toFixed(5)}, ${item.longitude?.toFixed(5)}` : "Lieu non précisé");

    const complet = {
      user_id: item.user_id,
      photo_url,
      repere: repereLisible,
      latitude: item.latitude,
      longitude: item.longitude,
      description: item.description || null,
    };

    let { error } = await supabase.from("dumps_alerts").insert(complet as never);

    // Repli si les colonnes étendues n'existent pas encore côté base :
    // on regroupe l'info dans le champ texte plutôt que de perdre le signalement.
    if (error && (error.code === "PGRST204" || error.code === "42703")) {
      const extra = [
        item.description ? `Description : ${item.description}` : null,
        item.latitude != null ? `GPS : ${item.latitude.toFixed(6)}, ${item.longitude?.toFixed(6)}` : null,
      ]
        .filter(Boolean)
        .join(" — ");
      ({ error } = await supabase.from("dumps_alerts").insert({
        user_id: item.user_id,
        photo_url,
        repere: extra ? `${repereLisible} | ${extra}` : repereLisible,
      }));
    }

    if (error) {
      const status = (error as unknown as { status?: number }).status;
      // Les erreurs de validation PostgREST (code 4xx-like) ne se résoudront pas seules.
      const definitif =
        estRejetDefinitif(status) ||
        (!!error.code && /^(22|23|42)/.test(error.code));
      return { ok: false, definitif, message: error.message };
    }

    return { ok: true };
  } catch (e) {
    // Exception réseau (hors ligne, DNS, coupure) => on retentera.
    return { ok: false, definitif: false, message: (e as Error).message };
  }
}

let enCours = false;
let timer: ReturnType<typeof setTimeout> | null = null;

/** Parcourt la file `pending` et tente l'envoi un par un. */
export async function syncQueue(force = false): Promise<void> {
  if (enCours) return;
  enCours = true;
  try {
    const pending = await getByStatut("pending");
    if (pending.length === 0) {
      await purgeSent();
      return;
    }

    if (!(await isReallyOnline())) {
      planifierProchainePasse(30_000);
      return;
    }

    const maintenant = Date.now();

    for (const item of pending) {
      // Plafond atteint : on arrête le backoff et on laisse le citoyen décider.
      if (
        item.tentatives_envoi >= MAX_TENTATIVES ||
        maintenant - item.date_capture > MAX_AGE_MS
      ) {
        await updateSignalement(item.id, { statut: "failed", erreur: "Envoi impossible après plusieurs tentatives" });
        continue;
      }

      // Respect du délai croissant, sauf si on force (retour du réseau / envoi manuel).
      if (!force && item.derniere_tentative) {
        const attendu = delaiAvantRetry(item.tentatives_envoi);
        if (maintenant - item.derniere_tentative < attendu) continue;
      }

      const res = await envoyer(item);
      if (res.ok === true) {
        await updateSignalement(item.id, { statut: "sent", derniere_tentative: Date.now(), erreur: undefined });
      } else if (res.definitif === true) {
        await updateSignalement(item.id, {
          statut: "failed",
          derniere_tentative: Date.now(),
          erreur: res.message,
        });
      } else {
        await updateSignalement(item.id, {
          tentatives_envoi: item.tentatives_envoi + 1,
          derniere_tentative: Date.now(),
          erreur: res.message,
        });
      }

    }

    const restants = await getByStatut("pending");
    if (restants.length > 0) {
      const prochain = Math.min(...restants.map((r) => delaiAvantRetry(r.tentatives_envoi)));
      planifierProchainePasse(prochain);
    } else {
      await purgeSent();
    }
  } finally {
    enCours = false;
  }
}

function planifierProchainePasse(delai: number) {
  if (timer) clearTimeout(timer);
  // Ce minuteur ne vit que tant que l'app est ouverte au premier plan.
  timer = setTimeout(() => syncQueue(), delai);
}

/** Envoi manuel d'un signalement précis (bouton "Renvoyer"). */
export async function retryOne(id: string) {
  await updateSignalement(id, { statut: "pending", tentatives_envoi: 0, derniere_tentative: null });
  await syncQueue(true);
}

/**
 * Best effort en arrière-plan : Background Sync API.
 * Géré entièrement par le navigateur avec son propre timing — volontairement
 * indépendant du backoff ci-dessus (pas de logique de délai à y appliquer).
 * Non supporté par Safari/iOS : les mécanismes "online" + "au montage" restent
 * la garantie principale.
 */
export async function demanderBackgroundSync() {
  try {
    if (!("serviceWorker" in navigator)) return;
    const reg = await navigator.serviceWorker.ready;
    const sync = (reg as unknown as { sync?: { register: (tag: string) => Promise<void> } }).sync;
    await sync?.register("sync-signalements");
  } catch {
    /* silencieux : simple bonus quand le navigateur le supporte */
  }
}

/** Écoute du retour de connexion : on vide la file immédiatement, sans attendre le backoff. */
export function installOnlineListener() {
  const handler = () => syncQueue(true);
  window.addEventListener("online", handler);
  return () => window.removeEventListener("online", handler);
}
