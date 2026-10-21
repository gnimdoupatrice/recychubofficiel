import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useMe } from "@/lib/auth";
import { enqueue, isNetworkError } from "@/lib/offline";
import { AppShell } from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/declarer")({
  head: () => ({
    meta: [
      { title: "Déclarer mes déchets — RecycHub Togo" },
      { name: "description", content: "Déclarez vos plastiques et métaux recyclables pour qu'une entreprise passe les acheter." },
      { property: "og:title", content: "Déclarer mes déchets — RecycHub Togo" },
      { property: "og:description", content: "Plastique, fer, cuivre, aluminium : déclarez en un instant." },
    ],
  }),
  component: Declare,
});

function Declare() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: me } = useMe();
  const { data: mats = [] } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => (await supabase.from("materials").select("*").order("sort")).data ?? [],
    staleTime: Infinity,
  });
  const [material, setMaterial] = useState("");
  const [kg, setKg] = useState("");
  const [quartier, setQuartier] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (me?.profile) {
      setQuartier((q) => q || me.profile!.quartier);
      setAddress((a) => a || me.profile!.address);
    }
  }, [me]);

  const save = useMutation({
    mutationFn: async () => {
      const row = {
        user_id: me!.id, material_id: material, estimated_kg: Number(kg),
        quartier: quartier.trim(), city: me?.profile?.city ?? "Kara", address: address.trim(), note: note.trim(),
      };
      if (!navigator.onLine) { enqueue({ kind: "declaration", args: row }); return "queued"; }
      const { error } = await supabase.from("declarations").insert(row);
      if (error) {
        if (isNetworkError(error)) { enqueue({ kind: "declaration", args: row }); return "queued"; }
        throw error;
      }
      return "sent";
    },
    onSuccess: (r) => {
      toast.success(r === "queued" ? "Pas de réseau : déclaration gardée sur le téléphone, envoi automatique au retour de la connexion." : "Déclaration envoyée ! Vous serez prévenu de la date de passage.");
      qc.invalidateQueries({ queryKey: ["my-declarations"] });
      navigate({ to: "/tableau-de-bord" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const valid = material && Number(kg) > 0 && quartier.trim();
  const cats = [...new Set(mats.map((m) => m.category))];

  if (me && me.role !== "household") {
    return <AppShell title="Déclarer"><p className="text-muted-foreground">Cette page est réservée aux ménages.</p></AppShell>;
  }

  return (
    <AppShell title="Déclarer">
      <h2 className="text-lg font-bold">Quel type de déchets ?</h2>
      {cats.map((c) => (
        <div key={c} className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{c}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {mats.filter((m) => m.category === c).map((m) => (
              <button key={m.id} type="button" onClick={() => setMaterial(m.id)}
                className={`min-h-14 rounded-2xl border p-3 text-left text-sm font-medium transition active:scale-[0.98] ${material === m.id ? "border-primary bg-secondary text-secondary-foreground" : "border-border bg-card"}`}>
                {m.name}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label>Quantité estimée (kg)</Label>
          <div className="grid grid-cols-3 gap-2">
            {[["Petit sac", 5], ["Gros sac", 15], ["Beaucoup", 30]].map(([l, v]) => (
              <button key={l} type="button" onClick={() => setKg(String(v))}
                className={`min-h-14 rounded-2xl border text-sm font-semibold ${kg === String(v) ? "border-primary bg-secondary" : "border-border bg-card"}`}>
                {l}<span className="block text-xs font-normal text-muted-foreground">≈ {v} kg</span>
              </button>
            ))}
          </div>
          <Input type="number" inputMode="decimal" min="0.5" step="0.5" value={kg} onChange={(e) => setKg(e.target.value)} placeholder="Ou saisir le poids (kg)" className="h-12 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label>Quartier</Label>
          <Input value={quartier} onChange={(e) => setQuartier(e.target.value)} className="h-12 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label>Repère / adresse</Label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Visible seulement par le collecteur confirmé" className="h-12 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label>Précision (facultatif)</Label>
          <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ex : 3 sacs, vieux fils électriques" className="h-12 rounded-xl" />
        </div>
        <button disabled={!valid || save.isPending} onClick={() => save.mutate()} className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] h-14 w-full rounded-full bg-primary shadow-lg font-semibold text-primary-foreground disabled:opacity-50">
          {save.isPending ? "Envoi…" : "Envoyer ma déclaration"}
        </button>
      </div>
    </AppShell>
  );
}
