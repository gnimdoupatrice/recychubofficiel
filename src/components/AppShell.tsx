import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { House, Truck, PlusCircle, Tag, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useMe } from "@/lib/auth";
import { useOnline } from "@/lib/offline";
import { Button } from "@/components/ui/button";
const logo = { url: "/recychub-logo.png" };

export function AppShell({ title, children, action, compact = false }: { title: string; children: ReactNode; action?: ReactNode; compact?: boolean }) {
  const { data: me } = useMe();
  const online = useOnline();
  const qc = useQueryClient();
  const navigate = useNavigate();

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const nav =
    me?.role === "company"
      ? [
          { to: "/tableau-de-bord", label: "Tournées", icon: Truck },
          { to: "/prix", label: "Mes prix", icon: Tag },
        ]
      : [
          { to: "/tableau-de-bord", label: "Accueil", icon: House },
          { to: "/declarer", label: "Déclarer", icon: PlusCircle },
          { to: "/prix", label: "Prix", icon: Tag },
        ];

  return (
    <div className={compact ? `flex flex-col overflow-hidden bg-background pb-[calc(4rem+env(safe-area-inset-bottom))] ${online ? "h-dvh" : "h-[calc(100dvh-2rem)]"}` : "min-h-dvh bg-background pb-[calc(5rem+env(safe-area-inset-bottom))]"}>
      <header className="sticky top-0 z-20 shrink-0 border-b border-border bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto grid max-w-2xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <img src={logo.url} alt="RecycHub" width={36} height={36} className="h-9 w-9 shrink-0" />
            <h1 className="truncate text-lg font-bold">{title}</h1>
          </div>
          <div className="flex items-center gap-1">
            {action}
            <Button variant="ghost" size="icon" onClick={signOut} aria-label="Se déconnecter" className="h-12 w-12 rounded-full text-muted-foreground hover:bg-muted">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className={compact ? "mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col px-4 py-2" : "mx-auto max-w-2xl px-5 py-5"}>{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-card pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-2xl justify-around">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="flex flex-1 flex-col items-center gap-1 min-h-14 justify-center py-2 text-xs font-semibold text-muted-foreground active:bg-muted"
              activeProps={{ className: "text-primary" }}>
              <n.icon className="h-5 w-5" />
              {n.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export const statusLabel: Record<string, { label: string; cls: string }> = {
  pending: { label: "En attente", cls: "bg-muted text-muted-foreground" },
  scheduled: { label: "Passage programmé", cls: "bg-accent text-accent-foreground" },
  collected: { label: "Collecté", cls: "bg-primary text-primary-foreground" },
  cancelled: { label: "Annulé", cls: "bg-destructive/10 text-destructive" },
};

export function StatusBadge({ status }: { status: string }) {
  const s = statusLabel[status] ?? { label: "En attente", cls: "bg-muted text-muted-foreground" };
  return <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${s.cls}`}>{s.label}</span>;
}
