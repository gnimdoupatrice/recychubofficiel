import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMe, formatFcfa } from "@/lib/auth";
import { materialDisplay } from "@/lib/declaration-form";
import { AppShell } from "@/components/AppShell";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Button } from "@/components/ui/button";
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

type Mat = { id: string; name: string; category: string };

function CategoryTabs({ cats, active, onChange }: { cats: string[]; active: string; onChange: (c: string) => void }) {
  return (
    <div role="tablist" aria-label="Catégories de déchets" className="flex shrink-0 gap-1 overflow-x-auto pb-1">
      {cats.map((c) => (
        <Button key={c} type="button" role="tab" aria-selected={active === c} variant={active === c ? "secondary" : "ghost"} onClick={() => onChange(c)} className="h-12 shrink-0 rounded-lg px-3 text-sm">{c}</Button>
      ))}
    </div>
  );
}

function useCategory(mats: Mat[]) {
  const [category, setCategory] = useState("");
  const cats = [...new Set(mats.map((m) => m.category))];
  const active = category || cats[0] || "";
  return { cats, active, setCategory, visible: mats.filter((m) => m.category === active) };
}

function MarketPrices() {
  const { data: mats = [], isPending } = useMaterials();
  const { data: prices = [] } = useQuery({
    queryKey: ["all-prices"],
    queryFn: async () => (await supabase.from("company_prices").select("*, companies(name)")).data ?? [],
  });
  const { cats, active, setCategory, visible } = useCategory(mats);
  return (
    <AppShell title="Prix au kilo" compact>
      <CategoryTabs cats={cats} active={active} onChange={setCategory} />
      <ul className="mt-1 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
        {isPending && <li className="text-sm text-muted-foreground">Chargement…</li>}
        {visible.map((m) => {
          const d = materialDisplay(m);
          const list = prices.filter((p) => p.material_id === m.id).sort((a, b) => Number(b.price_per_kg) - Number(a.price_per_kg));
          const others = list.slice(0, 2).map((p) => p.companies?.name).filter(Boolean).join(" · ");
          return (
            <li key={m.id} className="grid min-h-14 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
              <span className="grid size-9 place-items-center rounded-full bg-secondary text-secondary-foreground"><MaterialIcon hint={`${m.category} ${m.id}`} className="size-4" /></span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{d.label}</p>
                <p className="truncate text-xs text-muted-foreground">{list.length ? `${list.length} acheteur${list.length > 1 ? "s" : ""} · ${others}` : d.detail}</p>
              </div>
              <p className="text-right text-sm font-bold text-primary">{list[0] ? <>{formatFcfa(Number(list[0].price_per_kg))}<span className="block text-[11px] font-medium text-muted-foreground">max / kg</span></> : "—"}</p>
            </li>
          );
        })}
      </ul>
      <Button asChild className="mt-2 h-12 w-full shrink-0 rounded-full text-sm font-semibold"><Link to="/declarer"><Send />Déclarer mes déchets</Link></Button>
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
  const { cats, active, setCategory, visible } = useCategory(mats);

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
    <AppShell title="Mes prix" compact>
      <CategoryTabs cats={cats} active={active} onChange={setCategory} />
      <p className="shrink-0 text-xs text-muted-foreground">Laissez vide ce que vous n'achetez pas.</p>
      <ul className="mt-1 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
        {visible.map((m) => {
          const d = materialDisplay(m);
          return (
            <li key={m.id} className="grid min-h-14 grid-cols-[auto_minmax(0,1fr)_7.5rem] items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
              <span className="grid size-9 place-items-center rounded-full bg-secondary text-secondary-foreground"><MaterialIcon hint={`${m.category} ${m.id}`} className="size-4" /></span>
              <label htmlFor={`p-${m.id}`} className="min-w-0"><span className="block truncate text-sm font-semibold">{d.label}</span><span className="block truncate text-xs text-muted-foreground">{d.detail}</span></label>
              <div className="relative">
                <Input id={`p-${m.id}`} type="number" inputMode="numeric" min="0" value={vals[m.id] ?? ""} onChange={(e) => setVals({ ...vals, [m.id]: e.target.value })} className="h-12 rounded-lg bg-card pr-12 text-right" />
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">F/kg</span>
              </div>
            </li>
          );
        })}
      </ul>
      <Button onClick={() => save.mutate()} disabled={save.isPending} className="mt-2 h-12 w-full shrink-0 rounded-full text-sm font-semibold">
        {save.isPending ? <><LoaderCircle className="animate-spin" />Enregistrement…</> : "Enregistrer mes prix"}
      </Button>
    </AppShell>
  );
}
