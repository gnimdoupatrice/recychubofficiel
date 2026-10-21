import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { WifiOff, RefreshCw } from "lucide-react";
import { flushOutbox, useOnline, useOutbox } from "@/lib/offline";

/** Small bar shown only when offline or when actions wait to be sent. */
export function NetworkStatus() {
  const online = useOnline();
  const outbox = useOutbox();
  const qc = useQueryClient();

  useEffect(() => {
    if (!online || outbox.length === 0) return;
    flushOutbox().then((n) => {
      if (n > 0) { toast.success(`${n} action(s) synchronisée(s)`); qc.invalidateQueries(); }
    });
  }, [online, outbox.length, qc]);

  if (online && outbox.length === 0) return null;
  return (
    <div role="status" className={`flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-semibold ${online ? "bg-secondary text-secondary-foreground" : "bg-warning text-warning-foreground"}`}>
      {online ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <WifiOff className="h-3.5 w-3.5" />}
      {online
        ? `Synchronisation de ${outbox.length} action(s)…`
        : outbox.length
          ? `Hors connexion · ${outbox.length} action(s) gardée(s) sur le téléphone`
          : "Hors connexion · vos données restent consultables"}
    </div>
  );
}
