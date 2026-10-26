import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatDate, formatFcfa } from "@/lib/auth";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import { enqueue, isNetworkError, useOutbox } from "@/lib/offline";

export const Route = createFileRoute("/_authenticated/tournees/$tourId")({
  head: () => ({
    meta: [
      { title: "Détail de la tournée — RecycHub Togo" },
      { name: "description", content: "Arrêts, adresses et pesées de votre tournée de collecte." },
      { property: "og:title", content: "Détail de la tournée — RecycHub Togo" },
      { property: "og:description", content: "Gérez les arrêts de votre tournée." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TourDetail,
});

function TourDetail() {
  const { tourId } = Route.useParams();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { data: mats = [] } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => (await supabase.from("materials").select("*").order("sort")).data ?? [],
    staleTime: Infinity,
  });
  const { data: prices = [] } = useQuery({
    queryKey: ["my-prices-tour"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      return (await supabase.from("company_prices").select("*").eq("company_id", u.user!.id)).data ?? [];
    },
  });
  const { data: tour, isLoading } = useQuery({
    queryKey: ["tour", tourId],
    queryFn: async () => {
      const { data, error } = await supabase.from("tours").select("*, declarations(*)").eq("id", tourId).maybeSingle();
      if (error) throw error;
      return data;
    },
  });
  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["tour", tourId] });
    qc.invalidateQueries({ queryKey: ["my-tours"] });
    qc.invalidateQueries({ queryKey: ["open-declarations"] });
  };
  const setStatus = useMutation({
    mutationFn: async (status: "done" | "cancelled") => {
      const { error } = await supabase.from("tours").update({ status }).eq("id", tourId);
      if (error) throw error;
    },
    onSuccess: (_, s) => { toast.success(s === "done" ? "Tournée terminée" : "Tournée annulée"); refresh(); navigate({ to: "/tableau-de-bord" }); },
  });
  const release = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.rpc("release_from_tour", { _id: id }); if (error) throw error; },
    onSuccess: refresh,
  });

  if (isLoading) return <AppShell title="Tournée"><p className="text-muted-foreground">Chargement…</p></AppShell>;
  if (!tour) return <AppShell title="Tournée"><p className="text-muted-foreground">Tournée introuvable.</p></AppShell>;

  const stops = tour.declarations.filter((d) => d.status !== "cancelled" && d.status !== "pending")
    .sort((a, b) => a.quartier.localeCompare(b.quartier));
  const total = stops.reduce((s, d) => s + (d.status === "collected" ? Number(d.collected_kg) * Number(d.price_per_kg) : 0), 0);
  const matName = (id: string) => mats.find((m) => m.id === id)?.name ?? id;
  const priceFor = (id: string) => prices.find((p) => p.material_id === id)?.price_per_kg;

  return (
    <AppShell title="Tournée">
      <Link to="/tableau-de-bord" className="inline-flex items-center gap-1 text-sm font-semibold text-primary"><ArrowLeft className="h-4 w-4" /> Retour</Link>
      <div className="mt-3 rounded-3xl bg-primary p-5 text-primary-foreground">
        <p className="text-sm opacity-80">{tour.zone || "Zone libre"}</p>
        <h2 className="text-2xl font-bold capitalize">{formatDate(tour.tour_date)}</h2>
        {tour.note && <p className="mt-1 text-sm opacity-80">{tour.note}</p>}
        <p className="mt-3 text-sm">{stops.length} arrêt(s) · {stops.filter((s) => s.status === "collected").length} collecté(s) · {formatFcfa(total)} payés</p>
      </div>

      <ul className="mt-5 space-y-3">
        {stops.map((d, i) => (
          <Stop key={d.id} index={i + 1} d={d} material={matName(d.material_id)} defaultPrice={priceFor(d.material_id)}
            editable={tour.status === "planned"} onDone={refresh} onRelease={() => release.mutate(d.id)} />
        ))}
      </ul>
      {stops.length === 0 && <p className="mt-4 text-sm text-muted-foreground">Aucun arrêt. Ajoutez des ménages depuis le tableau de bord.</p>}

      {tour.status === "planned" && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={() => confirm("Annuler la tournée ? Les ménages non collectés redeviendront disponibles.") && setStatus.mutate("cancelled")} className="h-12 rounded-full border border-border font-semibold text-destructive">Annuler</button>
          <button onClick={() => setStatus.mutate("done")} className="h-12 rounded-full bg-primary font-semibold text-primary-foreground">Terminer</button>
        </div>
      )}
    </AppShell>
  );
}

type Decl = { id: string; quartier: string; city: string; address: string; note: string; estimated_kg: number; status: string; collected_kg: number | null; price_per_kg: number | null; material_id: string };

function Stop({ index, d, material, defaultPrice, editable, onDone, onRelease }: {
  index: number; d: Decl; material: string; defaultPrice?: number | undefined; editable: boolean; onDone: () => void; onRelease: () => void;
}) {
  const [open, setOpen] = useState(false);
  const pending = useOutbox().some((o) => o.kind === "complete_stop" && o.args._id === d.id);
  const [kg, setKg] = useState(String(d.estimated_kg));
  const [price, setPrice] = useState(defaultPrice != null ? String(defaultPrice) : "");
  const done = useMutation({
    mutationFn: async () => {
      const args = { _id: d.id, _kg: Number(kg), _price: Number(price) };
      if (!navigator.onLine) { enqueue({ kind: "complete_stop", args }); return "queued"; }
      const { error } = await supabase.rpc("complete_stop", args);
      if (error) {
        if (isNetworkError(error)) { enqueue({ kind: "complete_stop", args }); return "queued"; }
        throw error;
      }
      return "sent";
    },
    onSuccess: (r) => {
      toast.success(r === "queued" ? "Pesée gardée sur le téléphone, envoi au retour du réseau" : "Collecte enregistrée");
      setOpen(false); if (r === "sent") onDone();
    },
    onError: (e: Error) => toast.error(e.message),
  });
  return (
    <li className="rounded-2xl border border-border bg-card p-4">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">{index}</span>
        <div className="min-w-0">
          <p className="truncate font-semibold">{material}</p>
          <p className="text-sm text-muted-foreground">≈ {Number(d.estimated_kg)} kg</p>
          <p className="mt-1 flex items-start gap-1 text-sm"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a className="underline decoration-dotted" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.address} ${d.quartier} ${d.city} Togo`)}`} target="_blank" rel="noreferrer">{d.quartier}, {d.city}{d.address ? ` — ${d.address}` : ""}</a></p>
          {d.note && <p className="mt-1 text-xs text-muted-foreground">{d.note}</p>}
        </div>
        <StatusBadge status={d.status} />
      </div>
      {d.status === "collected" && (
        <p className="mt-3 text-sm font-semibold text-primary">{Number(d.collected_kg)} kg × {formatFcfa(Number(d.price_per_kg))} = {formatFcfa(Number(d.collected_kg) * Number(d.price_per_kg))}</p>
      )}
      {pending && (
        <p className="mt-3 rounded-xl bg-warning p-2 text-sm font-semibold text-warning-foreground">Pesée enregistrée hors connexion : {kg} kg × {price} F — en attente d'envoi</p>
      )}
      {editable && d.status === "scheduled" && !open && !pending && (
        <div className="mt-3 flex gap-2">
          <button onClick={() => setOpen(true)} className="flex min-h-12 flex-1 items-center justify-center gap-1 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground"><Check className="h-4 w-4" /> Collecté</button>
          <button onClick={onRelease} className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground">Retirer</button>
        </div>
      )}
      {open && (
        <div className="mt-3 space-y-2 rounded-xl bg-muted p-3">
          <div className="grid grid-cols-2 gap-2">
            <label className="text-xs font-semibold">Poids réel (kg)<Input type="number" inputMode="decimal" value={kg} onChange={(e) => setKg(e.target.value)} className="mt-1 h-11 rounded-xl bg-card" /></label>
            <label className="text-xs font-semibold">Prix (F/kg)<Input type="number" inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 h-11 rounded-xl bg-card" /></label>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[-1, 1, 5, 10].map((n) => (
              <button key={n} type="button" onClick={() => setKg(String(Math.max(0, Math.round((Number(kg) || 0) * 10 + n * 10) / 10)))}
                className="min-h-12 rounded-xl bg-card text-sm font-bold active:bg-secondary">{n > 0 ? `+${n}` : n} kg</button>
            ))}
          </div>
          {Number(kg) > 0 && Number(price) >= 0 && price !== "" && <p className="text-sm font-semibold">À payer : {formatFcfa(Number(kg) * Number(price))}</p>}
          <div className="flex gap-2">
            <button disabled={!(Number(kg) > 0) || price === "" || done.isPending} onClick={() => done.mutate()} className="min-h-12 flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50">Valider</button>
            <button onClick={() => setOpen(false)} className="rounded-full px-4 text-sm font-semibold text-muted-foreground">Fermer</button>
          </div>
        </div>
      )}
    </li>
  );
}
