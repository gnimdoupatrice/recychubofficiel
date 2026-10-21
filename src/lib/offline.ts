import { useEffect, useState, useSyncExternalStore } from "react";
import { supabase } from "@/integrations/supabase/client";

/** Offline outbox: actions recorded on the phone, sent to the server when the network returns. */
export type OutboxItem =
  | { id: string; kind: "complete_stop"; args: { _id: string; _kg: number; _price: number }; at: number }
  | { id: string; kind: "declaration"; args: Record<string, unknown>; at: number };

const KEY = "recychub-outbox";
const listeners = new Set<() => void>();
let cache: OutboxItem[] | null = null;

function read(): OutboxItem[] {
  if (typeof window === "undefined") return [];
  if (cache) return cache;
  try { cache = JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { cache = []; }
  return cache!;
}
function write(items: OutboxItem[]) {
  cache = items;
  localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
}
const EMPTY: OutboxItem[] = [];

export function enqueue(item: Omit<OutboxItem, "id" | "at">) {
  write([...read(), { ...item, id: crypto.randomUUID(), at: Date.now() } as OutboxItem]);
}

export function useOutbox() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    read,
    () => EMPTY,
  );
}

let flushing = false;
export async function flushOutbox(): Promise<number> {
  if (flushing || !navigator.onLine) return 0;
  flushing = true;
  let sent = 0;
  try {
    for (const item of read()) {
      const { error } = item.kind === "complete_stop"
        ? await supabase.rpc("complete_stop", item.args)
        : await supabase.from("declarations").insert(item.args as never);
      if (error && /fetch|network/i.test(error.message)) break; // still offline
      write(read().filter((i) => i.id !== item.id));
      sent++;
    }
  } finally { flushing = false; }
  return sent;
}

export const isNetworkError = (e: unknown) =>
  typeof navigator !== "undefined" && (!navigator.onLine || /fetch|network/i.test(String((e as Error)?.message ?? e)));

export function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true), off = () => setOnline(false);
    window.addEventListener("online", on); window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);
  return online;
}
