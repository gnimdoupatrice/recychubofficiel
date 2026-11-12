import { createFileRoute, Link } from "@tanstack/react-router";
import { House, Truck, Building2, ClipboardList, HandCoins, ArrowRight, CircleUserRound, ChevronLeft, ChevronRight, ChevronDown, Network, WifiOff, Scale, BadgeCheck, HeartHandshake, Tag, PackageOpen, Users, Leaf } from "lucide-react";
import { PlasticBottleIcon, CanIcon, CardboardIcon, OldPhoneIcon } from "@/components/MaterialIcons";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { entrySearch } from "@/lib/declaration-form";
import heroImg from "@/assets/hero-household.jpg";
import collectorImg from "@/assets/collector-weighing.jpg";
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

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto grid h-14 w-full max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 sm:px-8">
          <Link to="/" className="flex h-12 items-center gap-2" aria-label="RecycHub Togo — accueil">
            <img src={logo.url} alt="" width={40} height={40} className="h-10 w-10 shrink-0" />
          </Link>
          <Button asChild variant="ghost" className="h-12 shrink-0 gap-2 rounded-full pl-2 pr-3 font-semibold hover:bg-secondary hover:text-foreground">
            <Link to="/auth" aria-label="Mon espace — se connecter">
              <CircleUserRound className="!h-7 !w-7 text-primary" strokeWidth={1.75} />
              <span className="text-sm">Connexion</span>
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-8">
        {/* Hero */}
        <section className="grid items-center gap-6 pt-6 md:grid-cols-[1.1fr_1fr] md:gap-10 md:pt-12">
          <div className="text-center md:text-left">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
              <Network className="h-3.5 w-3.5" /> Agrégateur de matières recyclables
            </p>
            <h1 className="mt-3 text-balance text-3xl font-extrabold leading-[1.1] sm:text-5xl">
              Vos déchets ont de la <span className="text-primary">valeur</span>. Vendez-les ou donnez-les.
            </h1>
            <p className="mt-3 text-pretty text-sm text-muted-foreground sm:text-lg">
              RecycHub regroupe les matières recyclables des ménages et commerces et les met en relation avec les entreprises de collecte partenaires, qui passent chez vous.
            </p>
            <section aria-label="Choisissez votre espace" className="mt-5 grid gap-2 sm:gap-3">
              <ActionCard to="household" icon={House} kicker="Ménages et commerces" title="Déclarer un gisement" desc="Vente ou don, en moins d'une minute." variant="primary" />
              <ActionCard to="company" icon={Building2} kicker="Entreprises de collecte" title="Espace collecteur" desc="Gisements par quartier et tournées." variant="accent" />
            </section>
          </div>
          <div className="relative mx-auto w-full max-w-sm md:max-w-none">
            <div className="absolute -inset-3 -z-0 rotate-3 rounded-[2rem] bg-secondary" aria-hidden />
            <img src={heroImg} alt="Une habitante tient un sac de bouteilles plastiques triées" width={850} height={1152} className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-xl" />
            <div className="absolute -left-2 top-6 flex items-center gap-2 rounded-2xl bg-card px-3 py-2 shadow-lg">
              <Scale className="h-5 w-5 text-primary" /><span className="text-xs font-bold">Pesée devant vous</span>
            </div>
            <div className="absolute -right-2 bottom-6 flex items-center gap-2 rounded-2xl bg-card px-3 py-2 shadow-lg">
              <HeartHandshake className="h-5 w-5 text-primary" /><span className="text-xs font-bold">Vente ou don</span>
            </div>
          </div>
        </section>

        <ul className="mt-8 grid grid-cols-3 rounded-2xl bg-secondary/60 py-4 gap-2 text-center text-[11px] font-semibold text-muted-foreground sm:text-sm">
          <li className="flex flex-col items-center gap-1"><WifiOff className="h-4 w-4 text-primary" />Marche hors connexion</li>
          <li className="flex flex-col items-center gap-1"><Scale className="h-4 w-4 text-primary" />Pesée devant vous</li>
          <li className="flex flex-col items-center gap-1"><BadgeCheck className="h-4 w-4 text-primary" />Inscription gratuite</li>
        </ul>

        {/* Vente / Don */}
        <section aria-labelledby="intent-title" className="mt-10 rounded-3xl bg-secondary/60 p-4 sm:p-8">
          <h2 id="intent-title" className="text-balance text-center text-lg font-bold sm:text-2xl">Vendre ou donner : c'est vous qui choisissez</h2>
          <div role="tablist" aria-label="Intention" className="mx-auto mt-4 grid max-w-sm grid-cols-2 gap-1 rounded-full bg-card p-1">
            {([["sale", "Vendre", HandCoins], ["don", "Donner", HeartHandshake]] as const).map(([k, l, I]) => (
              <button key={k} role="tab" type="button" aria-selected={intent === k} onClick={() => setIntent(k)}
                className={`flex min-h-11 items-center justify-center gap-1.5 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${intent === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                <I className="h-4 w-4" />{l}
              </button>
            ))}
          </div>
          <img src={intent === "sale" ? collectorImg : donImg} alt={intent === "sale" ? "Un collecteur pèse les sacs de matières devant une habitante" : "Un commerçant donne ses cartons à un collecteur"} loading="lazy" width={1152} height={864} className="mx-auto mt-5 aspect-[16/9] w-full max-w-3xl rounded-2xl object-cover" />
          <ul className="mx-auto mt-4 grid max-w-3xl gap-3 sm:grid-cols-3">
            {(intent === "sale" ? saleFacts : donFacts).map((f) => (
              <li key={f.t} className="rounded-2xl bg-card p-4 text-center">
                <f.icon className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-2 text-sm font-bold">{f.t}</p>
                <p className="mt-1 text-pretty text-xs leading-snug text-muted-foreground">{f.d}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Rôle d'agrégateur */}
        <section aria-labelledby="role-title" className="mt-10">
          <h2 id="role-title" className="text-balance text-center text-lg font-bold sm:text-2xl">RecycHub n'achète pas vos déchets. Il les agrège.</h2>
          <p className="mx-auto mt-2 max-w-2xl text-pretty text-center text-sm text-muted-foreground">
            Un sac de bouteilles n'intéresse pas un recycleur. Cent sacs regroupés dans un même quartier, si. RecycHub centralise ces petits volumes pour rendre la collecte rentable.
          </p>
          <ol className="mt-5 grid gap-3 sm:grid-cols-3">
            {chain.map((c, i) => (
              <li key={c.t} className="relative rounded-2xl border border-border bg-card p-4">
                <span className="text-xs font-bold text-primary">0{i + 1}</span>
                <c.icon className="mt-1 h-6 w-6 text-primary" />
                <p className="mt-2 text-sm font-bold">{c.t}</p>
                <p className="mt-1 text-pretty text-xs leading-snug text-muted-foreground">{c.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Matières */}
        <section aria-labelledby="buy-title" className="mt-10">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <h2 id="buy-title" className="min-w-0 text-lg font-bold sm:text-2xl">Matières recherchées par les collecteurs</h2>
            <div className="flex shrink-0 sm:hidden">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-secondary hover:text-primary" aria-label="Matières précédentes" disabled={!canScrollBack} onClick={() => scrollMaterials(-1)}><ChevronLeft /></Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-secondary hover:text-primary" aria-label="Matières suivantes" disabled={!canScrollForward} onClick={() => scrollMaterials(1)}><ChevronRight /></Button>
            </div>
          </div>
          <ul ref={materialsRef} tabIndex={0} aria-label="Matières recherchées" className="-mx-4 mt-2 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:mx-0 sm:mt-4 sm:grid sm:grid-cols-4 sm:gap-3 sm:px-0">
            {materials.map((m) => (
              <li key={m.t} className="flex w-[clamp(10.25rem,42vw,11rem)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card text-center sm:w-auto">
                <img src={m.img} alt={m.t} loading="lazy" width={480} height={480} className="aspect-square w-full object-cover" />
                <span className="px-3 pt-2 text-sm font-bold">{m.t}</span>
                <span className="px-3 pb-3 text-xs text-muted-foreground">{m.d}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-pretty text-center text-xs text-muted-foreground">Le prix au kilo est fixé par chaque entreprise de collecte et affiché dans l'application avant le passage. Gardez vos matières propres et au sec.</p>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="mt-10">
          <h2 id="faq-title" className="text-center text-lg font-bold sm:text-2xl">Questions fréquentes</h2>
          <div className="mx-auto mt-4 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-card">
            {faq.map((f) => (
              <details key={f.q} className="group p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold">
                  {f.q}<ChevronDown className="h-4 w-4 shrink-0 text-primary transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-2 text-pretty text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-secondary/40 px-4 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-center sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2">
          <img src={logo.url} alt="RecycHub Togo" width={40} height={40} className="h-10 w-10" />
          <p className="text-pretty text-xs text-muted-foreground">RecycHub — plateforme d'agrégation des matières recyclables à Kara, Togo.</p>
          <nav aria-label="Liens" className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm font-semibold">
            <Link to="/auth" search={entrySearch("household")} className="hover:text-primary">Espace ménage</Link>
            <Link to="/auth" search={entrySearch("company")} className="hover:text-primary">Espace collecteur</Link>
            <Link to="/auth" className="hover:text-primary">Connexion</Link>
          </nav>
          <p className="text-[11px] text-muted-foreground">© {new Date().getFullYear()} RecycHub Togo</p>
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
  { icon: PackageOpen, t: "Enlèvement gratuit", d: "Libérez votre maison ou votre boutique sans frais." },
  { icon: Users, t: "Soutien aux collecteurs", d: "Vos matières font vivre la filière locale de collecte." },
  { icon: Leaf, t: "Kara plus propre", d: "Moins de déchets brûlés ou jetés dans les caniveaux." },
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
  { q: "Et si je n'ai pas de connexion ?", a: "Votre déclaration est enregistrée sur le téléphone et envoyée automatiquement dès le retour du réseau." },
];

function ActionCard({ to, icon: Icon, kicker, title, desc, variant }: {
  to: "household" | "company"; icon: typeof House; kicker: string; title: string; desc: string; variant: "primary" | "accent";
}) {
  const primary = variant === "primary";
  const styles = primary
    ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/95 focus-visible:ring-primary"
    : "border border-accent/25 bg-collector text-collector-foreground shadow-none hover:bg-collector/80 focus-visible:ring-accent";
  return (
    <Button asChild className={`group grid h-auto min-h-14 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 whitespace-normal rounded-2xl px-2 py-2 transition-colors motion-safe:transition-transform motion-safe:active:scale-[0.98] min-[360px]:gap-2.5 min-[360px]:px-3 min-[360px]:py-2.5 sm:gap-4 sm:p-5 ${styles}`}>
    <Link
      to="/auth"
      search={entrySearch(to)}
    >
      <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-card min-[360px]:h-10 min-[360px]:w-10 sm:h-12 sm:w-12 ${primary ? "text-primary" : "text-collector"}`}>
        <Icon className="!h-5 !w-5 sm:!h-6 sm:!w-6" strokeWidth={2} />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-semibold uppercase leading-tight tracking-wide opacity-90">{kicker}</span>
        <span className="block text-[15px] font-bold leading-tight sm:text-lg">{title}</span>
        <span className="mt-0.5 block text-xs leading-snug opacity-90 sm:text-sm">{desc}</span>
      </span>
      <span aria-hidden className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full motion-safe:transition-transform motion-safe:group-hover:translate-x-1 min-[360px]:h-7 min-[360px]:w-7 sm:h-8 sm:w-8 ${primary ? "bg-background/20" : "bg-card text-collector"}`}>
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </span>
    </Link>
    </Button>
  );
}
