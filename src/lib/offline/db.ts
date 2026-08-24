// Stockage local des signalements (file d'attente hors ligne).
// On utilise `idb` pour lire/écrire simplement dans le stockage du navigateur.
import { openDB, type DBSchema, type IDBPDatabase } from "idb";

/** Statuts internes : toujours en ASCII sans accent (l'affichage FR est fait dans l'UI). */
export type SignalementStatut = "pending" | "sent" | "failed";

export interface SignalementLocal {
  id: string;
  photo: Blob | null;
  photo_type: string;
  latitude: number | null;
  longitude: number | null;
  repere_texte: string;
  description: string;
  date_capture: number;
  statut: SignalementStatut;
  tentatives_envoi: number;
  derniere_tentative: number | null;
  user_id: string | null;
  erreur?: string;
}

interface RecycHubDB extends DBSchema {
  signalements_locaux: {
    key: string;
    value: SignalementLocal;
    indexes: { by_statut: SignalementStatut };
  };
}

const DB_NAME = "recychub-offline";
const STORE = "signalements_locaux";

let dbPromise: Promise<IDBPDatabase<RecycHubDB>> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<RecycHubDB>(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          const store = db.createObjectStore(STORE, { keyPath: "id" });
          store.createIndex("by_statut", "statut");
        }
      },
    });
  }
  return dbPromise;
}

export async function saveSignalement(item: SignalementLocal) {
  const db = await getDB();
  await db.put(STORE, item);
  notifyQueueChange();
}

export async function updateSignalement(id: string, patch: Partial<SignalementLocal>) {
  const db = await getDB();
  const current = await db.get(STORE, id);
  if (!current) return;
  await db.put(STORE, { ...current, ...patch });
  notifyQueueChange();
}

export async function deleteSignalement(id: string) {
  const db = await getDB();
  await db.delete(STORE, id);
  notifyQueueChange();
}

export async function getAllSignalements(): Promise<SignalementLocal[]> {
  const db = await getDB();
  return db.getAll(STORE);
}

export async function getByStatut(statut: SignalementStatut): Promise<SignalementLocal[]> {
  const db = await getDB();
  return db.getAllFromIndex(STORE, "by_statut", statut);
}

/** Nettoyage : on ne garde pas les signalements déjà transmis plus de 24h. */
export async function purgeSent() {
  const sent = await getByStatut("sent");
  const limite = Date.now() - 24 * 60 * 60 * 1000;
  const db = await getDB();
  for (const s of sent) {
    if (s.date_capture < limite) await db.delete(STORE, s.id);
  }
}

// Petit bus d'événements pour que l'UI se rafraîchisse quand la file change.
const QUEUE_EVENT = "recychub:queue-change";
export function notifyQueueChange() {
  window.dispatchEvent(new Event(QUEUE_EVENT));
}
export function onQueueChange(cb: () => void) {
  window.addEventListener(QUEUE_EVENT, cb);
  return () => window.removeEventListener(QUEUE_EVENT, cb);
}
