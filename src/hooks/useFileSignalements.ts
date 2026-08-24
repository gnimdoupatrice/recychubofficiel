import { useCallback, useEffect, useState } from "react";
import { getAllSignalements, onQueueChange, type SignalementLocal } from "@/lib/offline/db";
import { installOnlineListener, syncQueue } from "@/lib/offline/sync";

/**
 * Suit la file d'attente locale et déclenche la synchronisation :
 *  1. au retour du réseau (événement `online`)
 *  2. à chaque montage (retour dans l'app)
 */
export function useFileSignalements() {
  const [items, setItems] = useState<SignalementLocal[]>([]);

  const recharger = useCallback(async () => {
    setItems(await getAllSignalements());
  }, []);

  useEffect(() => {
    recharger();
    const offQueue = onQueueChange(recharger);
    const offOnline = installOnlineListener();
    // Tentative systématique au chargement de la page.
    syncQueue(true);
    const onVisible = () => {
      if (document.visibilityState === "visible") syncQueue(true);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      offQueue();
      offOnline();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [recharger]);

  const enAttente = items.filter((i) => i.statut === "pending");
  const echecs = items.filter((i) => i.statut === "failed");

  return { items, enAttente, echecs, recharger };
}
