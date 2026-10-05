import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Home, PlusCircle, Tag, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useMe } from "@/lib/auth";

export function AppShell({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  const { data: me } = useMe();
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
          { to: "/tableau-de-bord", label: "Tournées", icon: Home },
          { to: "/prix", label: "Mes prix", icon: Tag },
        ]
      : [
          { to: "/tableau-de-bord", label: "Accueil", icon: Home },
          { to: "/declarer", label: "Déclarer", icon: PlusCircle },
          { to: "/prix", label: "Prix", icon: Tag },
        ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto grid max-w-2xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <img src="/icons/icon-192.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0 rounded-lg" />
            <h1 className="truncate text-lg font-bold">{title}</h1>
          </div>
          <div className="flex items-center gap-1">
            {action}
            <button onClick={signOut} aria-label="Se déconnecter" className="rounded-full p-2 text-muted-foreground hover:bg-muted">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-5 py-5">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-card pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-2xl justify-around">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="flex flex-1 flex-col items-center gap-1 py-3 text-xs font-semibold text-muted-foreground"
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
  const s = statusLabel[status] ?? statusLabel.pending;
  return <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${s.cls}`}>{s.label}</span>;
}
