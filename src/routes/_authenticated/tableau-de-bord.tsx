import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CalendarDays, MapPin, Plus, ChevronRight } from "lucide-react";
import { MaterialIcon } from "@/components/MaterialIcon";
import { supabase } from "@/integrations/supabase/client";
import { useMe, formatDate, formatFcfa } from "@/lib/auth";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/_authenticated/tableau-de-bord")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — RecycHub Togo" },
      { name: "description", content: "Suivez vos déclarations de déchets recyclables ou vos tournées de collecte." },
      { property: "og:title", content: "Tableau de bord — RecycHub Togo" },
      { property: "og:description", content: "Votre espace de recyclage." },
    ],
  }),
  component: Dashboard,
});

function useMaterials() {
  return useQuery({
    queryKey: ["materials"],
    queryFn: async () => (await supabase.from("materials").select("*").order("sort")).data ?? [],
    staleTime: Infinity,
  });
}

function Dashboard() {
  const { data: me, isLoading } = useMe();
  if (isLoading || !me) return <AppShell title="RecycHub"><p className="text-muted-foreground">Chargement…</p></AppShell>;
  return me.role === "company" ? <CompanyHome /> : <HouseholdHome name={me.profile?.full_name ?? ""} />;
}

/* ---------------- Ménage ---------------- */
function HouseholdHome({ name }: { name: string }) {
  const qc = useQueryClient();
  const { data: mats = [] } = useMaterials();
  const { data: decls = [], isLoading } = useQuery({
    queryKey: ["my-declarations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("declarations")
        .select("*, tours(tour_date, companies(name))")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const cancel = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.rpc("cancel_declaration", { _id: id });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Déclaration annulée"); qc.invalidateQueries({ queryKey: ["my-declarations"] }); },
  });
  const matName = (id: string) => mats.find((m) => m.id === id)?.name ?? id;
  const active = decls.filter((d) => d.status === "pending" || d.status === "scheduled");
  const earned = decls.reduce((s, d) => s + (d.status === "collected" ? Number(d.collected_kg ?? 0) * Number(d.price_per_kg ?? 0) : 0), 0);

  return (
    <AppShell title="Mon espace">
      <p className="text-sm text-muted-foreground">Bonjour {name.split(" ")[0]}</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Stat label="En cours" value={String(active.length)} />
        <Stat label="Déjà gagné" value={formatFcfa(earned)} />
      </div>
      <Link to="/declarer" className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-semibold text-primary-foreground">
        <Plus className="h-5 w-5" /> Déclarer des déchets
      </Link>

      <h2 className="mt-8 text-lg font-bold">Mes déclarations</h2>
      {isLoading ? <p className="mt-3 text-muted-foreground">Chargement…</p> : decls.length === 0 ? (
        <Empty text="Aucune déclaration pour l'instant. Déclarez vos plastiques ou métaux pour qu'une entreprise passe les acheter." />
      ) : (
        <ul className="mt-3 space-y-3">
          {decls.map((d) => (
            <li key={d.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{matName(d.material_id)}</p>
                  <p className="text-sm text-muted-foreground">≈ {Number(d.estimated_kg)} kg · {d.quartier}</p>
                </div>
                <StatusBadge status={d.status} />
              </div>
              {d.status === "scheduled" && d.tours && (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-secondary p-3 text-sm text-secondary-foreground">
                  <CalendarDays className="h-4 w-4 shrink-0" />
                  <span><b>{d.tours.companies?.name}</b> passe le <b>{formatDate(d.tours.tour_date)}</b>. Gardez vos déchets prêts.</span>
                </div>
              )}
              {d.status === "collected" && (
                <p className="mt-3 text-sm font-semibold text-primary">
                  {Number(d.collected_kg)} kg × {formatFcfa(Number(d.price_per_kg))} = {formatFcfa(Number(d.collected_kg) * Number(d.price_per_kg))}
                </p>
              )}
              {(d.status === "pending" || d.status === "scheduled") && (
                <button onClick={() => confirm("Annuler cette déclaration ?") && cancel.mutate(d.id)} className="mt-3 text-sm font-semibold text-destructive">
                  Annuler
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}

/* ---------------- Entreprise ---------------- */
function CompanyHome() {
  const qc = useQueryClient();
  const { data: mats = [] } = useMaterials();
  const [selected, setSelected] = useState<string[]>([]);
  const [newTour, setNewTour] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  const { data: open = [] } = useQuery({
    queryKey: ["open-declarations"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("open_declarations");
      if (error) throw error;
      return data ?? [];
    },
  });
  const { data: tours = [] } = useQuery({
    queryKey: ["my-tours"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tours").select("*, declarations(id, estimated_kg, status)").order("tour_date");
      if (error) throw error;
      return data;
    },
  });
  const planned = tours.filter((t) => t.status === "planned");

  const groups = useMemo(() => {
    const m = new Map<string, typeof open>();
    open.forEach((d) => {
      const k = `${d.quartier} · ${d.city}`;
      m.set(k, [...(m.get(k) ?? []), d]);
    });
    return [...m.entries()];
  }, [open]);
  const matName = (id: string) => mats.find((m) => m.id === id)?.name ?? id;
  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const assign = useMutation({
    mutationFn: async (tourId: string) => {
      const { data, error } = await supabase.rpc("assign_to_tour", { _tour: tourId, _ids: selected });
      if (error) throw error;
      return data;
    },
    onSuccess: (n) => {
      toast.success(`${n} ménage(s) ajouté(s) à la tournée`);
      setSelected([]); setAssignOpen(false);
      qc.invalidateQueries({ queryKey: ["open-declarations"] });
      qc.invalidateQueries({ queryKey: ["my-tours"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <AppShell title="Mes tournées">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h2 className="text-lg font-bold">Tournées à venir</h2>
        <button onClick={() => setNewTour(true)} className="flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> Nouvelle
        </button>
      </div>
      {planned.length === 0 ? <Empty text="Aucune tournée programmée. Créez-en une puis ajoutez-y des ménages." /> : (
        <ul className="mt-3 space-y-3">
          {planned.map((t) => {
            const stops = t.declarations.filter((d) => d.status !== "cancelled");
            const kg = stops.reduce((s, d) => s + Number(d.estimated_kg), 0);
            return (
              <li key={t.id}>
                <Link to="/tournees/$tourId" params={{ tourId: t.id }} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold capitalize">{formatDate(t.tour_date)}</p>
                    <p className="truncate text-sm text-muted-foreground">{t.zone || "Zone libre"} · {stops.length} arrêt(s) · ≈ {kg} kg</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <h2 className="mt-8 text-lg font-bold">Déchets disponibles</h2>
      <p className="text-sm text-muted-foreground">Sélectionnez des ménages pour les ajouter à une tournée. L'adresse exacte sera visible une fois ajoutés.</p>
      {groups.length === 0 ? <Empty text="Aucune déclaration en attente pour le moment." /> : groups.map(([zone, items]) => (
        <section key={zone} className="mt-4">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-sm font-bold"><MapPin className="h-4 w-4 text-primary" />{zone}</p>
            <button className="text-xs font-semibold text-primary" onClick={() => setSelected((s) => [...new Set([...s, ...items.map((i) => i.id)])])}>Tout sélectionner</button>
          </div>
          <ul className="mt-2 space-y-2">
            {items.map((d) => {
              const on = selected.includes(d.id);
              return (
                <li key={d.id}>
                  <button onClick={() => toggle(d.id)} className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border p-3 text-left transition ${on ? "border-primary bg-secondary" : "border-border bg-card"}`}>
                    <span className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${on ? "border-primary bg-primary" : "border-border"}`}>{on && <span className="h-2 w-2 rounded-sm bg-primary-foreground" />}</span>
                    <span className="flex min-w-0 items-center gap-2"><MaterialIcon hint={`${d.material_id} ${matName(d.material_id)}`} className="h-4 w-4 shrink-0 text-primary" /><span className="truncate text-sm font-medium">{matName(d.material_id)}</span></span>
                    <span className="text-sm font-bold">{Number(d.estimated_kg)} kg</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      {selected.length > 0 && (
        <div className="fixed inset-x-0 bottom-20 z-20 px-5">
          <button onClick={() => (planned.length ? setAssignOpen(true) : setNewTour(true))} className="mx-auto block w-full max-w-2xl rounded-2xl bg-primary py-4 font-semibold text-primary-foreground shadow-lg">
            Ajouter {selected.length} ménage(s) à une tournée
          </button>
        </div>
      )}

      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent className="rounded-3xl">
          <DialogHeader><DialogTitle>Choisir la tournée</DialogTitle></DialogHeader>
          <div className="space-y-2">
            {planned.map((t) => (
              <button key={t.id} disabled={assign.isPending} onClick={() => assign.mutate(t.id)} className="w-full rounded-2xl border border-border p-3 text-left hover:bg-secondary">
                <p className="font-semibold capitalize">{formatDate(t.tour_date)}</p>
                <p className="text-sm text-muted-foreground">{t.zone || "Zone libre"}</p>
              </button>
            ))}
            <button onClick={() => { setAssignOpen(false); setNewTour(true); }} className="w-full rounded-2xl border border-dashed border-primary p-3 text-sm font-semibold text-primary">+ Nouvelle tournée</button>
          </div>
        </DialogContent>
      </Dialog>

      <NewTourDialog open={newTour} onOpenChange={setNewTour} onCreated={(id) => { if (selected.length) assign.mutate(id); }} />
    </AppShell>
  );
}

function NewTourDialog({ open, onOpenChange, onCreated }: { open: boolean; onOpenChange: (o: boolean) => void; onCreated: (id: string) => void }) {
  const qc = useQueryClient();
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const [date, setDate] = useState(tomorrow);
  const [zone, setZone] = useState("");
  const [note, setNote] = useState("");
  const create = useMutation({
    mutationFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data, error } = await supabase.from("tours").insert({ company_id: u.user!.id, tour_date: date, zone, note }).select("id").single();
      if (error) throw error;
      return data.id;
    },
    onSuccess: (id) => {
      toast.success("Tournée créée");
      qc.invalidateQueries({ queryKey: ["my-tours"] });
      onOpenChange(false); setZone(""); setNote("");
      onCreated(id);
    },
    onError: (e: Error) => toast.error(e.message),
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl">
        <DialogHeader><DialogTitle>Nouvelle tournée</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5"><Label>Date de passage</Label><Input type="date" min={new Date().toISOString().slice(0, 10)} value={date} onChange={(e) => setDate(e.target.value)} className="h-12 rounded-xl" /></div>
          <div className="space-y-1.5"><Label>Zone / quartiers</Label><Input value={zone} onChange={(e) => setZone(e.target.value)} placeholder="Ex : Kpéwa, Tomdè" className="h-12 rounded-xl" /></div>
          <div className="space-y-1.5"><Label>Note (heure, consignes)</Label><Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Passage à partir de 8 h" className="h-12 rounded-xl" /></div>
          <button disabled={create.isPending || !date} onClick={() => create.mutate()} className="h-12 w-full rounded-full bg-primary font-semibold text-primary-foreground disabled:opacity-60">Créer la tournée</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-secondary p-4">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <p className="mt-1 truncate font-display text-xl font-bold text-secondary-foreground">{value}</p>
    </div>
  );
}
export function Empty({ text }: { text: string }) {
  return <p className="mt-3 rounded-2xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">{text}</p>;
}
