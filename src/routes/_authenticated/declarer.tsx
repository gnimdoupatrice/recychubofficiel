import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMe } from "@/lib/auth";
import { enqueue, isNetworkError } from "@/lib/offline";
import { materialDisplay, validDeclaration } from "@/lib/declaration-form";
import { AppShell } from "@/components/AppShell";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuartierSelect } from "@/components/QuartierSelect";

export const Route = createFileRoute("/_authenticated/declarer")({
  head: () => ({ meta: [
    { title: "Déclarer mes déchets — RecycHub Togo" },
    { name: "description", content: "Déclarez vos déchets recyclables, leur poids et votre quartier à Kara pour une collecte à domicile." },
    { property: "og:title", content: "Déclarer mes déchets — RecycHub Togo" },
    { property: "og:description", content: "Plastique et métal : déclarez votre quantité en kilos à Kara." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Declare,
});

function Declare() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: me } = useMe();
  const { data: mats = [], isPending, isError, refetch } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("materials").select("*").order("sort");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: Infinity,
  });
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [kg, setKg] = useState("");
  const [quartier, setQuartier] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const cats = [...new Set(mats.map((m) => m.category))];
  const activeCategory = category || cats[0] || "";
  const selected = mats.find((m) => m.id === material);

  useEffect(() => {
    const profile = me?.profile;
    if (!profile) return;
    setQuartier((q) => q || profile.quartier);
    setAddress((a) => a || profile.address);
  }, [me]);

  const save = useMutation({
    mutationFn: async () => {
      if (!me || me.role !== "household" || !validDeclaration(material, kg, quartier)) throw new Error("Vérifiez la matière, le poids et le quartier.");
      const row = { user_id: me.id, material_id: material, estimated_kg: Number(kg), quartier: quartier.trim(), city: me.profile?.city ?? "Kara", address: address.trim(), note: note.trim() };
      if (!navigator.onLine) { enqueue({ kind: "declaration", args: row }); return "queued"; }
      const { error } = await supabase.from("declarations").insert(row);
      if (error) {
        if (isNetworkError(error)) { enqueue({ kind: "declaration", args: row }); return "queued"; }
        throw error;
      }
      return "sent";
    },
    onSuccess: (result) => {
      toast.success(result === "queued" ? "Enregistré sur votre téléphone · En attente de réseau" : "Déclaration envoyée ! Vous serez prévenu de la date de passage.");
      qc.invalidateQueries({ queryKey: ["my-declarations"] });
      navigate({ to: "/tableau-de-bord" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (me && me.role !== "household") return <AppShell title="Déclarer"><p className="text-muted-foreground">Cette page est réservée aux ménages.</p></AppShell>;

  return (
    <AppShell title="Déclarer" compact>
      <form onSubmit={(e) => { e.preventDefault(); save.mutate(); }} className="flex min-h-0 flex-1 flex-col gap-2">
        <section aria-labelledby="material-title">
          <h2 id="material-title" className="mb-1 text-sm font-bold">Matière</h2>
          <div role="tablist" aria-label="Catégories de déchets" className="flex gap-1 overflow-x-auto pb-1">
            {cats.map((c) => <Button key={c} type="button" role="tab" aria-selected={activeCategory === c} variant={activeCategory === c ? "secondary" : "ghost"} onClick={() => { setCategory(c); setMaterial(""); }} className="h-12 shrink-0 rounded-lg px-3 text-sm">{c}</Button>)}
          </div>
          <div role="group" aria-label="Matières recyclables" className="grid grid-cols-3 gap-1.5">
            {mats.filter((m) => m.category === activeCategory).map((m) => {
              const display = materialDisplay(m);
              return <Button key={m.id} type="button" variant="outline" aria-pressed={material === m.id} title={display.detail} onClick={() => setMaterial(m.id)} className={`h-12 min-w-0 gap-1 rounded-lg px-1 text-xs whitespace-normal leading-tight ${material === m.id ? "border-primary bg-secondary text-secondary-foreground hover:bg-secondary" : "hover:bg-muted hover:text-foreground"}`}><MaterialIcon hint={`${m.category} ${m.id}`} className="size-4 shrink-0" /><span>{display.label}</span></Button>;
            })}
          </div>
          <p className="mt-1 min-h-4 text-xs leading-4 text-muted-foreground">{selected ? materialDisplay(selected).detail : isPending ? "Chargement des matières…" : "\u00a0"}</p>
          {isError && <Button type="button" variant="link" onClick={() => refetch()}>Recharger les matières</Button>}
        </section>
        <div className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] gap-2">
          <div className="space-y-1"><Label htmlFor="kg" className="text-xs font-semibold">Poids estimé (kg)</Label><Input id="kg" type="number" inputMode="decimal" min="0.01" step="any" value={kg} onChange={(e) => setKg(e.target.value)} placeholder="0" className="h-12 rounded-lg bg-card" /></div>
          <div className="space-y-1"><Label htmlFor="quarter" className="text-xs font-semibold">Quartier</Label><QuartierSelect id="quarter" placeholder="Choisir" value={quartier} onChange={setQuartier} /></div>
        </div>
        <div className="space-y-1"><Label htmlFor="address" className="text-xs font-semibold">Repère / adresse (privé)</Label><Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Près de la pharmacie…" className="h-12 rounded-lg bg-card" /></div>
        <div className="space-y-1"><Label htmlFor="note" className="text-xs font-semibold">Précision (facultatif)</Label><Input id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ex. : 3 sacs, vieux fils électriques" className="h-12 rounded-lg bg-card" /></div>
        <Button type="submit" disabled={!me || !validDeclaration(material, kg, quartier) || save.isPending} className="mt-auto h-12 w-full shrink-0 rounded-full text-sm font-semibold">{save.isPending ? <><LoaderCircle className="animate-spin" />Envoi…</> : <><Send />Envoyer ma déclaration</>}</Button>
      </form>
    </AppShell>
  );
}
