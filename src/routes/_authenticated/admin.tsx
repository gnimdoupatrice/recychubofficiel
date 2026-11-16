import type * as React from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Users, Package, Truck, Scale, Phone, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMe, formatDate } from "@/lib/auth";
import { isDonation } from "@/lib/declaration-form";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Supervision — RecycHub Togo" },
      { name: "description", content: "Contrôle des comptes, déclarations et tournées de la plateforme RecycHub." },
      { property: "og:title", content: "Supervision — RecycHub Togo" },
      { property: "og:description", content: "Tableau de bord administrateur RecycHub." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

// Admin RPCs are created by supabase/migrations/20261116_admin_supervision.sql (not yet in generated types).
async function rpc<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const call = supabase.rpc as unknown as (f: string, a?: Record<string, unknown>) => Promise<{ data: T; error: Error | null }>;
  const { data, error } = await call.call(supabase, fn, args);
  if (error) throw error;
  return data;
}

type Stats = Record<"households" | "companies" | "decl_pending" | "decl_scheduled" | "decl_collected" | "decl_cancelled" | "tours_planned" | "tours_done" | "kg_collected", number>;
type U = { id: string; full_name: string; phone: string; quartier: string; role: string; created_at: string; decl_count: number };
type D = { id: string; material_id: string; quartier: string; status: string; estimated_kg: number; collected_kg: number | null; note: string; created_at: string; household: string | null; phone: string | null; company: string | null; tour_date: string | null };
type T = { id: string; company: string | null; tour_date: string; zone: string; status: string; stops: number; kg_estimated: number; kg_collected: number };

const TABS = [
  { id: "decl", label: "Déclarations" },
  { id: "tours", label: "Tournées" },
  { id: "users", label: "Comptes" },
] as const;

function AdminPage() {
  const { data: me, isLoading } = useMe();
  if (isLoading || !me) return <AppShell title="Supervision"><p className="text-muted-foreground">Chargement…</p></AppShell>;
  if (me.role !== "admin") return <Navigate to="/tableau-de-bord" replace />;
  return <Supervision />;
}

function Supervision() {
  const qc = useQueryClient();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("decl");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const stats = useQuery({ queryKey: ["admin", "stats"], queryFn: () => rpc<Stats>("admin_stats") });
  const users = useQuery({ queryKey: ["admin", "users"], queryFn: () => rpc<U[]>("admin_users"), enabled: tab === "users" });
  const decls = useQuery({ queryKey: ["admin", "decls"], queryFn: () => rpc<D[]>("admin_declarations"), enabled: tab === "decl" });
  const tours = useQuery({ queryKey: ["admin", "tours"], queryFn: () => rpc<T[]>("admin_tours"), enabled: tab === "tours" });

  const act = useMutation({
    mutationFn: ({ fn, id }: { fn: string; id: string }) => rpc<null>(fn, { _id: id }),
    onSuccess: () => { toast.success("Action effectuée"); qc.invalidateQueries({ queryKey: ["admin"] }); },
    onError: (e: Error) => toast.error(e.message),
  });
  const run = (fn: string, id: string, msg: string) => confirm(msg) && act.mutate({ fn, id });

  const s = stats.data;
  const needle = q.trim().toLowerCase();
  const match = (...v: (string | null | undefined)[]) => !needle || v.some((x) => x?.toLowerCase().includes(needle));
  const fDecls = useMemo(() => (decls.data ?? []).filter((d) => (status === "all" || d.status === status) && match(d.household, d.phone, d.quartier, d.company, d.material_id)), [decls.data, status, needle]);
  const fTours = useMemo(() => (tours.data ?? []).filter((t) => (status === "all" || t.status === status) && match(t.company, t.zone)), [tours.data, status, needle]);
  const fUsers = useMemo(() => (users.data ?? []).filter((u) => (status === "all" || u.role.includes(status)) && match(u.full_name, u.phone, u.quartier)), [users.data, status, needle]);

  const filters: Record<string, [string, string][]> = {
    decl: [["all", "Toutes"], ["pending", "En attente"], ["scheduled", "Acceptées"], ["collected", "Collectées"], ["cancelled", "Annulées"]],
    tours: [["all", "Toutes"], ["planned", "Lancées"], ["done", "Collectées"], ["cancelled", "Annulées"]],
    users: [["all", "Tous"], ["household", "Ménages"], ["company", "Entreprises"], ["admin", "Admins"]],
  };
  const active = tab === "decl" ? decls : tab === "tours" ? tours : users;

  return (
    <AppShell title="Supervision">
      {stats.error ? (
        <p className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">Supervision indisponible : {(stats.error as Error).message}</p>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Kpi icon={Users} label="Comptes" value={s ? s.households + s.companies : "…"} sub={s ? `${s.households} ménages · ${s.companies} entr.` : ""} />
          <Kpi icon={Package} label="Déclarations" value={s ? s.decl_pending + s.decl_scheduled + s.decl_collected : "…"} sub={s ? `${s.decl_pending} en attente · ${s.decl_scheduled} acceptées` : ""} />
          <Kpi icon={Truck} label="Tournées" value={s ? s.tours_planned + s.tours_done : "…"} sub={s ? `${s.tours_planned} lancées · ${s.tours_done} collectées` : ""} />
          <Kpi icon={Scale} label="Collecté" value={s ? `${Number(s.kg_collected)} kg` : "…"} sub={s ? `${s.decl_collected} collectes` : ""} />
        </div>
      )}

      <div role="tablist" className="mt-5 grid grid-cols-3 gap-1 rounded-2xl bg-muted p-1">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => { setTab(t.id); setStatus("all"); }}
            className={`rounded-xl py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${tab === t.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>{t.label}</button>
        ))}
      </div>

      <div className="relative mt-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nom, téléphone, quartier, entreprise…" className="h-11 rounded-xl pl-9" />
      </div>
      <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
        {(filters[tab] ?? []).map(([v, l]) => (
          <button key={v} onClick={() => setStatus(v)} className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${status === v ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}>{l}</button>
        ))}
      </div>

      {active.isLoading ? <p className="mt-4 text-center text-sm text-muted-foreground">Chargement…</p> : active.error ? (
        <p className="mt-4 text-sm text-destructive">{(active.error as Error).message}</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {tab === "decl" && fDecls.map((d) => (
            <li key={d.id} className="rounded-2xl border border-border bg-card p-3">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                <div className="min-w-0">
                  <p className="truncate font-semibold capitalize">{d.material_id} · {Number(d.collected_kg ?? d.estimated_kg)} kg {isDonation(d.note) && <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] text-primary">🎁 Don</span>}</p>
                  <p className="truncate text-xs text-muted-foreground">{d.household || "—"} · {d.quartier} · {new Date(d.created_at).toLocaleDateString("fr-FR")}</p>
                  {d.company && <p className="truncate text-xs text-muted-foreground">{d.company}{d.tour_date ? ` · ${formatDate(d.tour_date)}` : ""}</p>}
                </div>
                <StatusBadge status={d.status} />
              </div>
              <Actions phone={d.phone}>
                {d.status === "scheduled" && <ActBtn onClick={() => run("admin_release_declaration", d.id, "Retirer de la tournée et remettre en attente ?")}>Remettre en attente</ActBtn>}
                {(d.status === "pending" || d.status === "scheduled") && <ActBtn danger onClick={() => run("admin_cancel_declaration", d.id, "Annuler cette déclaration ?")}>Annuler</ActBtn>}
              </Actions>
            </li>
          ))}
          {tab === "tours" && fTours.map((t) => (
            <li key={t.id} className="rounded-2xl border border-border bg-card p-3">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                <div className="min-w-0">
                  <p className="truncate font-semibold capitalize">{formatDate(t.tour_date)}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.company || "—"} · {t.zone || "Zone libre"}</p>
                  <p className="text-xs text-muted-foreground">{t.stops} arrêt(s) · ≈ {Number(t.kg_estimated)} kg prévus · {Number(t.kg_collected)} kg collectés</p>
                </div>
                <TourBadge status={t.status} />
              </div>
              {t.status === "planned" && <Actions><ActBtn danger onClick={() => run("admin_cancel_tour", t.id, "Annuler la tournée ? Les ménages repassent en attente.")}>Annuler la tournée</ActBtn></Actions>}
            </li>
          ))}
          {tab === "users" && fUsers.map((u) => (
            <li key={u.id} className="rounded-2xl border border-border bg-card p-3">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{u.full_name || "Sans nom"}</p>
                  <p className="truncate text-xs text-muted-foreground">{u.phone} · {u.quartier || "—"} · inscrit le {new Date(u.created_at).toLocaleDateString("fr-FR")}</p>
                  <p className="text-xs text-muted-foreground">{u.decl_count} déclaration(s)</p>
                </div>
                <span className="h-fit rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground">{u.role.includes("admin") ? "Admin" : u.role.includes("company") ? "Entreprise" : "Ménage"}</span>
              </div>
              <Actions phone={u.phone} />
            </li>
          ))}
          {(tab === "decl" ? fDecls : tab === "tours" ? fTours : fUsers).length === 0 && (
            <p className="rounded-2xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">Aucun résultat.</p>
          )}
        </ul>
      )}
    </AppShell>
  );
}

function Kpi({ icon: Icon, label, value, sub }: { icon: typeof Users; label: string; value: string | number; sub: string }) {
  return (
    <div className="rounded-2xl bg-secondary p-3">
      <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><Icon className="h-3.5 w-3.5 text-primary" />{label}</p>
      <p className="mt-1 font-display text-xl font-bold text-secondary-foreground">{value}</p>
      <p className="truncate text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}
function TourBadge({ status }: { status: string }) {
  const m: Record<string, string> = { planned: "Lancée", done: "Collectée", cancelled: "Annulée" };
  return <span className="h-fit rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground">{m[status] ?? status}</span>;
}
function Actions({ phone, children }: { phone?: string | null; children?: React.ReactNode }) {
  const wa = phone?.replace(/\D/g, "");
  if (!wa && !children) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2 border-t border-border pt-2">
      {wa && <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-semibold text-primary"><Phone className="h-3 w-3" />WhatsApp</a>}
      {wa && <a href={`tel:+${wa}`} className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-primary">Appeler</a>}
      {children}
    </div>
  );
}
function ActBtn({ onClick, danger, children }: { onClick: () => void; danger?: boolean; children: React.ReactNode }) {
  return <button onClick={onClick} className={`rounded-full border px-3 py-1 text-xs font-semibold ${danger ? "border-destructive/40 text-destructive" : "border-border text-foreground"}`}>{children}</button>;
}
