import { createFileRoute, Link } from "@tanstack/react-router";
import { House, Truck, Building2, ClipboardList, HandCoins, ArrowRight, CircleUserRound, ChevronLeft, ChevronRight, ChevronDown, Network, Scale, BadgeCheck, Tag, PackageOpen, Users, Leaf } from "lucide-react";
import { PlasticBottleIcon, CanIcon, CardboardIcon, OldPhoneIcon } from "@/components/MaterialIcons";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
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

  useEffect(() => {
    const materialsList = materialsRef.current;
    if (!materialsList) return;
    const updateScroll = () => {
      setCanScrollBack(materialsList.scrollLeft > 2);
      setCanScrollForward(materialsList.scrollLeft + materialsList.clientWidth < materialsList.scrollWidth - 2);
    };
    const resizeObserver = new ResizeObserver(updateScroll);
    resizeObserver.observe(materialsList);
    materialsList.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => {
      resizeObserver.disconnect();
      materialsList.removeEventListener("scroll", updateScroll);
    };
  }, []);

  function scrollMaterials(direction: number) {
    const list = materialsRef.current;
    if (!list) return;
    list.scrollBy({ left: direction * 152, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  const [intent, setIntent] = useState<"sale" | "don">("sale");

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.setAttribute("data-shown", "true"); io.unobserve(e.target); } }), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);


  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="bg-night text-ink-foreground">
      <header className="sticky top-0 z-30 pt-[env(safe-area-inset-top)]">
        <div className="glass mx-auto mt-2 flex h-14 w-[calc(100%-1rem)] max-w-5xl items-center justify-between gap-2 rounded-full pl-3 pr-1.5 sm:mt-4">
          <Link to="/" className="flex h-12 items-center" aria-label="RecycHub Togo — accueil">
            <img src={logo.url} alt="" width={40} height={40} className="h-9 w-9 rounded-lg bg-ink-foreground p-0.5" />
          </Link>
          <nav aria-label="Sections" className="hidden items-center gap-7 text-sm font-medium opacity-80 md:flex">
            <a href="#modele" className="hover:text-amber">Le modèle</a>
            <a href="#matieres" className="hover:text-amber">Matières</a>
            <a href="#faq" className="hover:text-amber">FAQ</a>
          </nav>
          <Link to="/auth" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink-foreground px-4 text-sm font-bold text-ink transition-transform motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber">
            <CircleUserRound className="h-5 w-5" strokeWidth={1.75} />Connexion
          </Link>
        </div>
      </header>

      <main className="pb-2">
        <section className="mx-auto max-w-5xl px-4 pb-12 pt-12 text-center sm:px-8 sm:pt-20">
          <p className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber">
            Agrégateur de matières recyclables
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl text-balance text-[2.3rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-7xl">
            La collecte organisée des <span className="text-amber">matières recyclables</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed opacity-75 sm:text-lg">
            RecycHub met en relation les ménages et commerces avec des opérateurs de collecte partenaires. Enlèvement planifié, pesée sur place, vente ou don.
          </p>
          <div className="mx-auto mt-7 flex max-w-md flex-col gap-2.5 sm:max-w-none sm:flex-row sm:justify-center">
            <Link to="/auth" search={entrySearch("household")} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber px-6 text-sm font-bold text-ink shadow-lift transition-transform motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-foreground">
              <House className="h-4 w-4" />Déclarer un gisement<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/auth" search={entrySearch("company")} className="glass inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-colors hover:bg-ink-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber">
              <Building2 className="h-4 w-4" />Espace collecteur
            </Link>
          </div>

          <div className="relative mx-auto mt-12 max-w-4xl">
            <div className="glass overflow-hidden rounded-[1.5rem] p-1.5 sm:p-2">
              <img src={heroImg} alt="Des collecteurs en gilet trient des bouteilles plastiques dans de grands sacs" width={1289} height={860} fetchPriority="high" className="aspect-[16/10] w-full rounded-[1.1rem] object-cover" />
            </div>
            <div className="glass absolute -bottom-6 left-3 rounded-2xl px-4 py-3 text-left shadow-lift sm:-left-8 sm:bottom-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] opacity-70">Gisement déclaré</p>
              <p className="mt-0.5 flex items-center gap-2 font-display text-lg font-bold"><Scale className="h-4 w-4 text-amber" />Pesée sur place</p>
            </div>
            <div className="glass absolute -right-2 -top-5 hidden rounded-2xl px-4 py-3 text-left shadow-lift sm:-right-8 sm:top-10 sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] opacity-70">Tournée</p>
              <p className="mt-0.5 flex items-center gap-2 font-display text-lg font-bold"><Truck className="h-4 w-4 text-amber" />Enlèvement planifié</p>
            </div>
          </div>
        </section>
        <div className="border-t border-ink-foreground/10">
          <ul className="mx-auto grid max-w-5xl grid-cols-3 px-2 py-6 text-center sm:px-8">
            {[[Truck, "Enlèvement planifié"], [Scale, "Pesée sur place"], [BadgeCheck, "Opérateurs partenaires"]].map(([I, t]) => {
              const Icon = I as typeof Scale;
              return <li key={t as string} className="flex flex-col items-center gap-1.5 px-1 text-[11px] font-semibold opacity-80 sm:flex-row sm:justify-center sm:gap-2 sm:text-sm"><Icon className="h-4 w-4 text-amber" />{t as string}</li>;
            })}
          </ul>
        </div>
      </main>
      </div>

      <main className="flex-1 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {/* Vente / Don */}
        <section data-reveal aria-labelledby="intent-title" className="reveal pt-14 sm:pt-20">
          <div className="grid overflow-hidden rounded-[1.25rem] border border-border/70 bg-secondary/60 md:grid-cols-2">
            <div className="relative">
              <img src={intent === "sale" ? collectorImg : donImg} alt={intent === "sale" ? "Un collecteur pèse un sac de matières devant une habitante" : "Un commerçant donne ses cartons à un collecteur"} loading="lazy" width={830} height={553} className="block aspect-[3/2] h-auto w-full object-contain md:absolute md:inset-0 md:h-full md:aspect-auto md:object-cover [filter:saturate(0.9)_contrast(1.03)]" />
            </div>
            <div className="p-5 sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{intent === "sale" ? "Vendre" : "Donner"}</p>
              <h2 id="intent-title" className="mt-2 text-balance text-2xl font-bold leading-tight sm:text-3xl">Vendre ou donner : c'est vous qui choisissez</h2>
              <ul className="mt-5 grid gap-4">
                {(intent === "sale" ? saleFacts : donFacts).map((f) => (
                  <li key={f.t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-card text-primary shadow-soft"><f.icon className="h-5 w-5" /></span>
                    <span><span className="block text-sm font-bold">{f.t}</span><span className="block text-pretty text-sm leading-snug text-muted-foreground">{f.d}</span></span>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => setIntent(intent === "sale" ? "don" : "sale")} className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Voir l'option {intent === "sale" ? "don" : "vente"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Rôle d'agrégateur */}
        <section id="modele" data-reveal aria-labelledby="role-title" className="reveal -mx-4 mt-14 scroll-mt-24 bg-ink px-4 py-12 text-ink-foreground sm:mx-0 sm:mt-20 sm:rounded-[1.25rem] sm:px-10 sm:py-16">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber">Le modèle</p>
              <h2 id="role-title" className="mt-2 text-balance text-2xl font-bold leading-tight sm:text-4xl">RecycHub n'achète pas vos déchets. Il les agrège.</h2>
              <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed opacity-75 sm:text-base">RecycHub regroupe les volumes déclarés par quartier, planifie les tournées des opérateurs et standardise la pesée. La transaction reste entre vous et le collecteur.</p>
            </div>
            <ol className="relative grid gap-3">
              <span aria-hidden className="absolute bottom-6 left-[1.6rem] top-6 w-px bg-ink-foreground/20" />
              {chain.map((c, i) => (
                <li key={c.t} className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-4 transition-colors hover:bg-ink-foreground/10">
                  <span className="relative flex h-6 w-6 translate-x-1 items-center justify-center rounded-full bg-amber text-[11px] font-bold text-ink">{i + 1}</span>
                  <span><span className="flex items-center gap-2 text-sm font-bold sm:text-base"><c.icon className="h-4 w-4 text-amber" />{c.t}</span><span className="mt-1 block text-pretty text-sm leading-snug opacity-70">{c.d}</span></span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Matières */}
        <section id="matieres" data-reveal aria-labelledby="buy-title" className="reveal scroll-mt-24 pt-14 sm:pt-20">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Matières</p>
              <h2 id="buy-title" className="mt-2 min-w-0 text-balance text-2xl font-bold leading-tight sm:text-4xl">Matières recherchées par les collecteurs</h2>
            </div>
            <div className="flex shrink-0 sm:hidden">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-secondary hover:text-primary" aria-label="Matières précédentes" disabled={!canScrollBack} onClick={() => scrollMaterials(-1)}><ChevronLeft /></Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-secondary hover:text-primary" aria-label="Matières suivantes" disabled={!canScrollForward} onClick={() => scrollMaterials(1)}><ChevronRight /></Button>
            </div>
          </div>
          <ul ref={materialsRef} tabIndex={0} aria-label="Matières recherchées" className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0">
            {materials.map((m, i) => (
              <li key={m.t} className={`group relative w-[clamp(10.5rem,44vw,12rem)] shrink-0 snap-start overflow-hidden rounded-xl ring-1 ring-border/60 sm:w-auto`}>
                <img src={m.img} alt={m.t} loading="lazy" width={480} height={480} className="aspect-[3/4] w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-card/85 text-primary backdrop-blur"><m.icon className="h-5 w-5" /></span>
                <span className="absolute inset-x-3 bottom-3 text-ink-foreground"><span className="block font-display text-base font-bold">{m.t}</span><span className="block text-xs opacity-80">{m.d}</span></span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-xs text-muted-foreground sm:text-sm">Le prix au kilo est fixé par chaque entreprise de collecte et affiché dans l'application avant le passage. Gardez vos matières propres et au sec.</p>
        </section>

        {/* FAQ */}
        <section id="faq" data-reveal aria-labelledby="faq-title" className="reveal grid scroll-mt-24 gap-6 py-14 sm:py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">FAQ</p>
            <h2 id="faq-title" className="mt-2 text-2xl font-bold sm:text-4xl">Questions fréquentes</h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {faq.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold sm:text-base">
                  {f.q}<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform group-open:rotate-180"><ChevronDown className="h-4 w-4" /></span>
                </summary>
                <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        </div>
      </main>

      <footer className="bg-ink px-4 py-10 pb-[calc(2rem+env(safe-area-inset-bottom))] text-ink-foreground sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 text-center sm:grid-cols-[1fr_auto] sm:items-center sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <img src={logo.url} alt="RecycHub Togo" width={44} height={44} className="h-11 w-11 rounded-xl bg-ink-foreground p-1" />
            <p className="max-w-sm text-pretty text-sm opacity-75">RecycHub — plateforme d'agrégation des matières recyclables à Kara, Togo.</p>
          </div>
          <nav aria-label="Liens" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold">
            <Link to="/auth" search={entrySearch("household")} className="hover:text-amber">Espace ménage</Link>
            <Link to="/auth" search={entrySearch("company")} className="hover:text-amber">Espace collecteur</Link>
            <Link to="/auth" className="hover:text-amber">Connexion</Link>
          </nav>
          <p className="text-xs opacity-60 sm:col-span-2">© {new Date().getFullYear()} RecycHub Togo</p>
        </div>
      </footer>
    </div>
  );
}

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
