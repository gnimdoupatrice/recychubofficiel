import { createFileRoute, Link } from "@tanstack/react-router";
import { House, Truck, Building2, ClipboardList, HandCoins, ArrowRight, CircleUserRound, ChevronLeft, ChevronRight, ChevronDown, Network, Scale, BadgeCheck, HeartHandshake, Tag, PackageOpen, Users, Leaf } from "lucide-react";
import { PlasticBottleIcon, CanIcon, CardboardIcon, OldPhoneIcon } from "@/components/MaterialIcons";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatFcfa } from "@/lib/auth";
import { entrySearch } from "@/lib/declaration-form";
import heroImg from "@/assets/tri-plastique-collecteurs.jpg";
import collectorImg from "@/assets/pesee-menage-collecteur.jpg";
import donImg from "@/assets/donation-handover.jpg";
import matPlastique from "@/assets/mat-plastique.jpg";
import matCarton from "@/assets/mat-carton.jpg";
import matMetal from "@/assets/mat-metal.jpg";
import matElec from "@/assets/mat-electronique.jpg";
const logo = { url: "/recychub-logo.png" };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RecycHub Togo — Agrégateur de matières recyclables à Kara" },
      { name: "description", content: "RecycHub regroupe les matières recyclables des ménages de Kara et les met en relation avec les entreprises de collecte. Vente ou don." },
      { property: "og:title", content: "RecycHub — Agrégateur de matières recyclables à Kara" },
      { property: "og:description", content: "Vendez ou donnez vos plastiques, métaux et cartons : un collecteur partenaire passe chez vous." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Landing,
});

const materials = [
  { img: matPlastique, icon: PlasticBottleIcon, t: "Plastiques", d: "Bouteilles, bidons" },
  { img: matMetal, icon: CanIcon, t: "Métaux", d: "Fer, cuivre, alu" },
  { img: matCarton, icon: CardboardIcon, t: "Cartons", d: "Emballages, papier" },
  { img: matElec, icon: OldPhoneIcon, t: "Électronique", d: "Câbles, appareils" },
];

function Landing() {
  const materialsRef = useRef<HTMLUListElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);
  const [intent, setIntent] = useState<"sale" | "don">("sale");

  useEffect(() => {
    const list = materialsRef.current;
    if (!list) return;
    const update = () => {
      setCanScrollBack(list.scrollLeft > 2);
      setCanScrollForward(list.scrollLeft + list.clientWidth < list.scrollWidth - 2);
    };
    const ro = new ResizeObserver(update);
    ro.observe(list);
    list.addEventListener("scroll", update, { passive: true });
    update();
    return () => { ro.disconnect(); list.removeEventListener("scroll", update); };
  }, []);

  function scrollMaterials(direction: number) {
    materialsRef.current?.scrollBy({ left: direction * 180, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  const kicker = "text-[11px] font-bold uppercase tracking-[0.16em] text-primary";
  const h2 = "mt-2 text-balance text-2xl font-bold leading-tight tracking-tight sm:text-[2rem]";

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
          <Link to="/" className="flex h-12 items-center gap-2.5" aria-label="RecycHub Togo — accueil">
            <img src={logo.url} alt="" width={40} height={40} className="h-9 w-9" />
            <span className="hidden font-display text-base font-bold tracking-tight sm:inline">RecycHub <span className="font-medium text-muted-foreground">Togo</span></span>
          </Link>
          <nav aria-label="Sections" className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#plateforme" className="hover:text-foreground">La plateforme</a>
            <a href="#simulateur" className="hover:text-foreground">Simulateur</a>
            <a href="#fonctionnement" className="hover:text-foreground">Fonctionnement</a>
            <a href="#matieres" className="hover:text-foreground">Matières</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <Link to="/auth" className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <CircleUserRound className="h-4 w-4" />Connexion
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. Hero */}
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-12 md:py-16">
            <div className="text-center md:text-left">
              <p className={kicker}>Agrégateur de matières recyclables</p>
              <h1 className="mt-3 text-balance text-[2rem] font-bold leading-[1.1] tracking-tight sm:text-5xl">La collecte organisée des matières recyclables.</h1>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-lg md:mx-0">RecycHub met en relation les ménages et commerces avec des opérateurs de collecte partenaires. Enlèvement planifié, pesée sur place, vente ou don.</p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center md:justify-start">
                <Link to="/auth" search={entrySearch("household")} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <House className="h-4 w-4" />Déclarer un gisement<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link to="/auth" search={entrySearch("company")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-semibold hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <Building2 className="h-4 w-4" />Espace collecteur
                </Link>
              </div>
            </div>
            <figure className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
              <img src={heroImg} alt="Des collecteurs en gilet trient des bouteilles plastiques dans de grands sacs" width={1289} height={860} fetchPriority="high" className="aspect-[3/2] w-full object-cover" />
            </figure>
          </div>
          <ul className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-border border-t border-border px-2 py-4 text-center sm:px-8">
            {trust.map((x) => (
              <li key={x.t} className="flex flex-col items-center gap-1.5 px-1 text-[11px] font-semibold text-muted-foreground sm:flex-row sm:justify-center sm:gap-2 sm:text-sm"><x.icon className="h-4 w-4 text-primary" />{x.t}</li>
            ))}
          </ul>
        </section>

        {/* 2. Plateforme */}
        <section id="plateforme" aria-labelledby="pf-title" className="scroll-mt-20 bg-secondary/40 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className={kicker}>La plateforme</p>
              <h2 id="pf-title" className={h2}>RecycHub n'achète pas vos déchets. Il les agrège.</h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">La transaction reste entre vous et le collecteur. RecycHub structure ce qui se passe avant : déclaration, regroupement, planification.</p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {services.map((x) => (
                <li key={x.t} className="rounded-lg border border-border bg-card p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-primary"><x.icon className="h-5 w-5" /></span>
                  <h3 className="mt-4 text-base font-bold">{x.t}</h3>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Simulateur */}
        <section id="simulateur" aria-labelledby="sim-title" className="scroll-mt-20 py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-8 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12">
            <div className="text-center md:text-left">
              <p className={kicker}>Simulateur</p>
              <h2 id="sim-title" className={h2}>Estimez la valeur de vos matières</h2>
              <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:mx-0">Le calcul utilise le meilleur tarif au kilo publié par les collecteurs partenaires. Le montant final dépend de la pesée sur place.</p>
            </div>
            <Simulator intent={intent} setIntent={setIntent} />
          </div>
        </section>

        {/* 4. Vente / Don */}
        <section aria-labelledby="intent-title" className="border-y border-border bg-secondary/40 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className={kicker}>Vente ou don</p>
              <h2 id="intent-title" className={h2}>Vendre ou donner : c'est vous qui choisissez</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {([["sale", "Vendre", collectorImg, "Un collecteur pèse un sac de matières devant une habitante", saleFacts], ["don", "Donner", donImg, "Un commerçant donne ses cartons à un collecteur", donFacts]] as const).map(([k, title, img, alt, facts]) => (
                <article key={k} className="overflow-hidden rounded-lg border border-border bg-card">
                  <img src={img} alt={alt} loading="lazy" width={830} height={553} className="aspect-[16/9] w-full object-cover" />
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <ul className="mt-4 grid gap-3.5">
                      {facts.map((f) => (
                        <li key={f.t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                          <f.icon className="mt-0.5 h-5 w-5 text-primary" />
                          <span><span className="block text-sm font-semibold">{f.t}</span><span className="block text-pretty text-sm leading-snug text-muted-foreground">{f.d}</span></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Fonctionnement */}
        <section id="fonctionnement" aria-labelledby="how-title" className="scroll-mt-20 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className={kicker}>Fonctionnement</p>
              <h2 id="how-title" className={h2}>Trois étapes, de la déclaration à la pesée</h2>
            </div>
            <ol className="mt-8 grid gap-3 sm:grid-cols-3">
              {chain.map((c, i) => (
                <li key={c.t} className="rounded-lg border border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-primary">Étape {i + 1}</span>
                    <c.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="mt-3 text-base font-bold">{c.t}</h3>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. Matières */}
        <section id="matieres" aria-labelledby="buy-title" className="scroll-mt-20 border-t border-border bg-secondary/40 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2">
              <div>
                <p className={kicker}>Matières</p>
                <h2 id="buy-title" className={h2}>Matières recherchées par les collecteurs</h2>
              </div>
              <div className="flex shrink-0 sm:hidden">
                <Button variant="ghost" size="icon" className="h-12 w-12" aria-label="Matières précédentes" disabled={!canScrollBack} onClick={() => scrollMaterials(-1)}><ChevronLeft /></Button>
                <Button variant="ghost" size="icon" className="h-12 w-12" aria-label="Matières suivantes" disabled={!canScrollForward} onClick={() => scrollMaterials(1)}><ChevronRight /></Button>
              </div>
            </div>
            <ul ref={materialsRef} tabIndex={0} aria-label="Matières recherchées" className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0">
              {materials.map((m) => (
                <li key={m.t} className="w-[clamp(10.5rem,44vw,13rem)] shrink-0 snap-start overflow-hidden rounded-lg border border-border bg-card sm:w-auto">
                  <img src={m.img} alt={m.t} loading="lazy" width={480} height={480} className="aspect-[4/3] w-full object-cover" />
                  <div className="flex items-center gap-3 p-3.5">
                    <m.icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="min-w-0"><span className="block text-sm font-bold">{m.t}</span><span className="block text-xs text-muted-foreground">{m.d}</span></span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-xs text-muted-foreground sm:text-sm">Le prix au kilo est fixé par chaque entreprise de collecte et affiché dans l'application avant le passage. Gardez vos matières propres et au sec.</p>
          </div>
        </section>

        {/* 7. FAQ */}
        <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
            <div>
              <p className={kicker}>FAQ</p>
              <h2 id="faq-title" className={h2}>Questions fréquentes</h2>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {faq.map((f) => (
                <details key={f.q} className="group py-3">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold sm:text-base">
                    {f.q}<ChevronDown className="h-4 w-4 shrink-0 text-primary transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-1 max-w-xl pb-2 text-pretty text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-10 text-ink-foreground sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={logo.url} alt="" width={40} height={40} className="h-10 w-10 rounded-md bg-ink-foreground p-1" />
              <span className="font-display text-base font-bold">RecycHub Togo</span>
            </div>
            <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed opacity-75">Plateforme d'agrégation des matières recyclables à Kara, Togo.</p>
          </div>
          <nav aria-label="Accès">
            <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-60">Accès</p>
            <ul className="mt-3 grid gap-2 text-sm">
              <li><Link to="/auth" search={entrySearch("household")} className="hover:text-amber">Espace ménage</Link></li>
              <li><Link to="/auth" search={entrySearch("company")} className="hover:text-amber">Espace collecteur</Link></li>
              <li><Link to="/auth" className="hover:text-amber">Connexion</Link></li>
            </ul>
          </nav>
          <nav aria-label="Sections du site">
            <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-60">Plateforme</p>
            <ul className="mt-3 grid gap-2 text-sm">
              <li><a href="#fonctionnement" className="hover:text-amber">Fonctionnement</a></li>
              <li><a href="#matieres" className="hover:text-amber">Matières</a></li>
              <li><a href="#faq" className="hover:text-amber">FAQ</a></li>
            </ul>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-6xl border-t border-ink-foreground/15 pt-5 text-xs opacity-60">© {new Date().getFullYear()} RecycHub Togo</p>
      </footer>
    </div>
  );
}

function Simulator({ intent, setIntent }: { intent: "sale" | "don"; setIntent: (v: "sale" | "don") => void }) {
  const { data } = useQuery({
    queryKey: ["home-sim-prices"],
    queryFn: async () => {
      const [m, p] = await Promise.all([
        supabase.from("materials").select("id,name,sort").order("sort"),
        supabase.from("company_prices").select("material_id,price_per_kg"),
      ]);
      return { materials: m.data ?? [], prices: p.data ?? [] };
    },
    staleTime: 5 * 60_000,
  });
  const mats = data?.materials ?? [];
  const [matId, setMatId] = useState("");
  const [kg, setKg] = useState(15);
  const current = matId || mats[0]?.id || "";
  const best = (data?.prices ?? []).filter((p) => p.material_id === current).reduce((a, p) => Math.max(a, Number(p.price_per_kg)), 0);

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-soft sm:p-6">
      <div role="tablist" aria-label="Intention" className="grid grid-cols-2 gap-1 rounded-md bg-muted p-1">
        {([["sale", "Vendre", HandCoins], ["don", "Donner", HeartHandshake]] as const).map(([k, l, I]) => (
          <button key={k} role="tab" type="button" aria-selected={intent === k} onClick={() => setIntent(k)} className={`flex min-h-11 items-center justify-center gap-1.5 rounded text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${intent === k ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`}>
            <I className="h-4 w-4" />{l}
          </button>
        ))}
      </div>
      <label className="mt-4 block text-sm font-semibold">
        Matière
        <select value={current} onChange={(e) => setMatId(e.target.value)} className="mt-1.5 h-11 w-full rounded-md border border-input bg-background px-3 text-sm font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {mats.length === 0 && <option value="">Chargement…</option>}
          {mats.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </label>
      <label className="mt-4 block">
        <span className="flex items-baseline justify-between text-sm font-semibold"><span>Quantité estimée</span><span className="font-display text-lg text-primary">{kg} kg</span></span>
        <input type="range" min={1} max={100} value={kg} onChange={(e) => setKg(Number(e.target.value))} className="mt-2 h-11 w-full accent-[var(--primary)]" />
      </label>
      <div className="mt-3 rounded-md bg-ink p-4 text-ink-foreground" aria-live="polite">
        {intent === "don" ? (
          <><p className="text-xs font-semibold uppercase tracking-wider opacity-70">Votre don</p><p className="mt-1 font-display text-2xl font-bold">{kg} kg remis en filière</p><p className="mt-1 text-xs opacity-70">Enlèvement sans frais, pesé et enregistré dans votre historique.</p></>
        ) : best > 0 ? (
          <><p className="text-xs font-semibold uppercase tracking-wider opacity-70">Estimation au meilleur tarif publié</p><p className="mt-1 font-display text-2xl font-bold">{formatFcfa(best * kg)}</p><p className="mt-1 text-xs opacity-70">{formatFcfa(best)} / kg. Montant final établi à la pesée.</p></>
        ) : (
          <><p className="text-xs font-semibold uppercase tracking-wider opacity-70">Tarif</p><p className="mt-1 font-display text-lg font-bold">Aucun tarif publié pour cette matière</p><p className="mt-1 text-xs opacity-70">Les prix apparaissent dès qu'un collecteur partenaire les publie.</p></>
        )}
      </div>
    </div>
  );
}

const trust = [{ icon: Truck, t: "Enlèvement planifié" }, { icon: Scale, t: "Pesée sur place" }, { icon: BadgeCheck, t: "Opérateurs partenaires" }];
const services = [
  { icon: ClipboardList, t: "Déclaration des gisements", d: "Ménages et commerces déclarent matière, quantité estimée et quartier, en vente ou en don." },
  { icon: Network, t: "Consolidation par quartier", d: "Les déclarations proches sont regroupées pour former des volumes utiles aux opérateurs." },
  { icon: Truck, t: "Tournées des opérateurs", d: "Les entreprises partenaires planifient leurs tournées et pèsent les matières sur place." },
];

const saleFacts = [
  { icon: Tag, t: "Prix affiché d'avance", d: "Le tarif au kilo de l'entreprise est visible avant le passage." },
  { icon: Scale, t: "Pesée sur place", d: "Le collecteur pèse vos matières devant vous." },
  { icon: HandCoins, t: "Payé par le collecteur", d: "Règlement direct, en espèces ou mobile money." },
];
const donFacts = [
  { icon: PackageOpen, t: "Enlèvement sans frais", d: "Vos matières sont collectées à domicile ou en boutique, sans contrepartie." },
  { icon: Users, t: "Remise en filière", d: "Les matières rejoignent directement le circuit de recyclage des opérateurs." },
  { icon: Leaf, t: "Traçabilité", d: "Chaque don est pesé et enregistré dans votre historique." },
];
const chain = [
  { icon: ClipboardList, t: "Vous déclarez", d: "Matière, quantité estimée, quartier, et choix vente ou don." },
  { icon: Network, t: "RecycHub regroupe", d: "Les déclarations d'un même quartier sont rassemblées et proposées aux entreprises partenaires." },
  { icon: Truck, t: "Le collecteur passe", d: "Il organise sa tournée, pèse chez vous et conclut directement avec vous." },
];
const faq = [
  { q: "Est-ce RecycHub qui m'achète mes déchets ?", a: "Non. RecycHub est un agrégateur : la plateforme regroupe les déclarations et vous met en relation avec une entreprise de collecte. La transaction se fait entre vous et le collecteur." },
  { q: "Puis-je donner au lieu de vendre ?", a: "Oui. Choisissez « Don » lors de la déclaration : l'enlèvement est gratuit et aucun paiement n'est demandé." },
  { q: "Qui fixe le prix au kilo ?", a: "Chaque entreprise de collecte publie ses tarifs dans l'application. Vous les consultez avant le passage." },
  { q: "Comment préparer mes matières ?", a: "Triez-les par type, gardez-les propres et au sec. Aplatissez les cartons et videz les bouteilles avant le passage." },
];
