import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

/** "Install RecycHub" banner, shown when the browser allows installation. */
export function InstallPrompt() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("recychub-install-dismissed")) return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    const onPrompt = (e: Event) => { e.preventDefault(); setEvt(e as BIPEvent); setHidden(false); };
    const onInstalled = () => setHidden(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (hidden || !evt) return null;
  return (
    <div className="fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-40 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-lg">
      <Download className="h-6 w-6 shrink-0 text-primary" />
      <p className="flex-1 text-sm font-semibold">Installer RecycHub sur mon téléphone</p>
      <button
        onClick={async () => { await evt.prompt(); await evt.userChoice; setHidden(true); setEvt(null); }}
        className="min-h-12 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground"
      >Installer</button>
      <button
        aria-label="Plus tard"
        onClick={() => { localStorage.setItem("recychub-install-dismissed", "1"); setHidden(true); }}
        className="flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground"
      ><X className="h-5 w-5" /></button>
    </div>
  );
}
