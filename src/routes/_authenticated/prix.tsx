import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useMe, formatFcfa } from "@/lib/auth";
import { AppShell } from "@/components/AppShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/prix")({
  head: () => ({
    meta: [
      { title: "Prix au kilo — RecycHub Togo" },
      { name: "description", content: "Comparez les prix d'achat au kilo proposés par les entreprises de recyclage." },
      { property: "og:title", content: "Prix au kilo — RecycHub Togo" },
      { property: "og:description", content: "Prix des plastiques et métaux recyclables." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Prices,
});

function useMaterials() {
  return useQuery({
    queryKey: ["materials"],
    queryFn: async () => (await supabase.from("materials").select("*").order("sort")).data ?? [],
    staleTime: Infinity,
  });
}

function Prices() {
  const { data: me } = useMe();
  if (!me) return <AppShell title="Prix"><p className="text-muted-foreground">Chargement…</p></AppShell>;
  return me.role === "company" ? <CompanyPrices companyId={me.id} /> : <MarketPrices />;
}

function MarketPrices() {
  const { data: mats = [] } = useMaterials();
  const { data: prices = [] } = useQuery({
    queryKey: ["all-prices"],
    queryFn: async () => (await supabase.from("company_prices").select("*, companies(name)")).data ?? [],
  });
  return (
    <AppShell title="Prix au kilo">
      <p className="text-sm text-muted-foreground">Prix d'achat affichés par les entreprises de recyclage.</p>
      <ul className="mt-4 space-y-3">
        {mats.map((m) => {
          const list = prices.filter((p) => p.material_id === m.id).sort((a, b) => Number(b.price_per_kg) - Number(a.price_per_kg));
          return (
            <li key={m.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <p className="truncate font-semibold">{m.name}</p>
                <p className="font-display font-bold text-primary">{list[0] ? `jusqu'à ${formatFcfa(Number(list[0].price_per_kg))}` : "—"}</p>
              </div>
              {list.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {list.map((p) => (
                    <li key={p.company_id} className="flex justify-between text-sm text-muted-foreground">
                      <span className="truncate">{p.companies?.name}</span><span>{formatFcfa(Number(p.price_per_kg))}/kg</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}

function CompanyPrices({ companyId }: { companyId: string }) {
  const qc = useQueryClient();
  const { data: mats = [] } = useMaterials();
  const { data: mine } = useQuery({
    queryKey: ["my-prices"],
    queryFn: async () => (await supabase.from("company_prices").select("*").eq("company_id", companyId)).data ?? [],
  });
  const [vals, setVals] = useState<Record<string, string>>({});
  useEffect(() => {
    if (mine) setVals(Object.fromEntries(mine.map((p) => [p.material_id, String(p.price_per_kg)])));
  }, [mine]);

  const save = useMutation({
    mutationFn: async () => {
      const rows = Object.entries(vals).filter(([, v]) => v !== "" && Number(v) >= 0)
        .map(([material_id, v]) => ({ company_id: companyId, material_id, price_per_kg: Number(v), updated_at: new Date().toISOString() }));
      const empty = Object.entries(vals).filter(([, v]) => v === "").map(([k]) => k);
      if (rows.length) { const { error } = await supabase.from("company_prices").upsert(rows); if (error) throw error; }
      if (empty.length) await supabase.from("company_prices").delete().eq("company_id", companyId).in("material_id", empty);
    },
    onSuccess: () => { toast.success("Prix enregistrés"); qc.invalidateQueries({ queryKey: ["my-prices"] }); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <AppShell title="Mes prix">
      <p className="text-sm text-muted-foreground">Fixez votre prix d'achat au kilo. Laissez vide les matières que vous n'achetez pas.</p>
      <ul className="mt-4 space-y-2">
        {mats.map((m) => (
          <li key={m.id} className="grid grid-cols-[minmax(0,1fr)_8rem] items-center gap-3 rounded-2xl border border-border bg-card p-3">
            <span className="min-w-0 text-sm font-medium">{m.name}</span>
            <div className="relative">
              <Input type="number" inputMode="numeric" min="0" value={vals[m.id] ?? ""} onChange={(e) => setVals({ ...vals, [m.id]: e.target.value })} className="h-11 rounded-xl pr-14 text-right" />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">F/kg</span>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => save.mutate()} disabled={save.isPending} className="mt-5 h-12 w-full rounded-full bg-primary font-semibold text-primary-foreground disabled:opacity-60">
        Enregistrer mes prix
      </button>
    </AppShell>
  );
}
