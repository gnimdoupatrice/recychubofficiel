import { createFileRoute, Link } from "@tanstack/react-router";
import { House, Truck, ClipboardList, HandCoins, ArrowRight, CircleUserRound, ChevronLeft, ChevronRight } from "lucide-react";
import { PlasticBottleIcon, CanIcon, CardboardIcon, OldPhoneIcon } from "@/components/MaterialIcons";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
const logo = { url: "/recychub-logo.png" };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RecycHub Togo — Vendez vos déchets recyclables sans vous déplacer" },
      { name: "description", content: "Déclarez vos plastiques et métaux depuis votre téléphone. Les entreprises de recyclage passent les acheter dans votre quartier." },
      { property: "og:title", content: "RecycHub Togo — Recyclage à domicile" },
      { property: "og:description", content: "Plastique, fer, cuivre, aluminium : déclarez, on passe collecter et payer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Landing,
});

const steps = [
  { icon: ClipboardList, t: "Déclarez", short: "En 3 clics", d: "Type de déchet et quantité, en 3 touches." },
  { icon: Truck, t: "On passe", short: "À domicile", d: "Une tournée est fixée dans votre quartier." },
  { icon: HandCoins, t: "Vous êtes payé", short: "Cash direct", d: "Pesée sur place, prix au kilo affiché." },
];

const materials = [
  { icon: PlasticBottleIcon, t: "Plastiques", d: "Bouteilles, bidons" },
  { icon: CanIcon, t: "Métaux", d: "Fer, cuivre, alu" },
  { icon: CardboardIcon, t: "Cartons", d: "Emballages, papier" },
  { icon: OldPhoneIcon, t: "Électronique", d: "Câbles, appareils" },
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

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto grid h-14 w-full max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 sm:px-8">
          <Link to="/" className="flex h-12 w-12 items-center justify-center" aria-label="RecycHub Togo — accueil">
            <img src={logo.url} alt="RecycHub Togo" width={44} height={44} className="h-11 w-11 shrink-0" />
          </Link>
          <Button asChild variant="ghost" className="h-12 shrink-0 gap-2 rounded-full pl-2 pr-3 font-semibold hover:bg-secondary hover:text-foreground">
          <Link to="/auth" aria-label="Mon espace — se connecter">
            <CircleUserRound className="!h-7 !w-7 text-primary" strokeWidth={1.75} />
            <span className="text-sm">Connexion</span>
          </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-between gap-2 px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 min-[360px]:gap-3 min-[360px]:px-5 min-[360px]:pb-[calc(0.75rem+env(safe-area-inset-bottom))] min-[360px]:pt-3 sm:gap-6 sm:px-8 sm:pb-8 sm:pt-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h1 className="text-balance text-xl font-bold leading-tight min-[360px]:text-2xl sm:text-4xl">Vos déchets recyclables valent de l'argent.</h1>
          <p className="mt-1.5 text-pretty text-sm text-muted-foreground sm:text-base">Plastique, fer, cuivre, aluminium… sans vous déplacer.</p>
        </div>

        <section aria-label="Choisissez votre espace" className="grid gap-2 md:grid-cols-2 md:gap-4">
          <ActionCard to="household" icon={House} kicker="Je suis un ménage" title="Vendre mes déchets" desc="On passe peser et payer chez vous." variant="primary" />
          <ActionCard to="company" icon={Truck} kicker="Je suis une entreprise" title="Espace collecteur" desc="Déclarations proches et tournées." variant="accent" />
        </section>

        <section aria-labelledby="buy-title">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <h2 id="buy-title" className="min-w-0 truncate text-[15px] font-bold min-[360px]:text-base sm:text-lg">Ce que nous achetons</h2>
            <div className="flex shrink-0 sm:hidden">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-secondary hover:text-primary" aria-label="Matières précédentes" disabled={!canScrollBack} onClick={() => scrollMaterials(-1)}><ChevronLeft /></Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-secondary hover:text-primary" aria-label="Matières suivantes" disabled={!canScrollForward} onClick={() => scrollMaterials(1)}><ChevronRight /></Button>
            </div>
          </div>
          <ul ref={materialsRef} tabIndex={0} aria-label="Matières achetées" className="-mx-3 flex snap-x snap-mandatory gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-[360px]:-mx-5 min-[360px]:px-5 sm:mx-0 sm:mt-3 sm:grid sm:grid-cols-4 sm:gap-3 sm:px-0">
            {materials.map((m) => (
              <li key={m.t} className="flex w-[clamp(10.25rem,42vw,11rem)] shrink-0 snap-start items-center gap-2 rounded-xl border border-border bg-card px-2 py-1.5 sm:w-auto sm:min-w-0 sm:p-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary sm:h-10 sm:w-10">
                  <m.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-bold leading-tight sm:text-sm">{m.t}</span>
                  <span className="block truncate text-[11px] leading-snug text-muted-foreground sm:text-xs">{m.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="how-title">
          <h2 id="how-title" className="text-[15px] font-bold min-[360px]:text-base sm:text-lg">Comment ça marche</h2>
          <ol className="mt-1 grid grid-cols-3 gap-2 border-t border-border pt-1 min-[360px]:mt-2 min-[360px]:pt-2 sm:gap-4 sm:pt-3">
            {steps.map((s, i) => (
              <li key={s.t} className="flex min-w-0 flex-col items-center px-1 text-center sm:p-3">
                <p className="text-balance text-xs font-bold leading-tight sm:text-sm">
                  <span className="text-primary">0{i + 1}</span> {s.t}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground sm:hidden">{s.short}</p>
                <p className="mt-1 hidden text-pretty text-xs leading-snug text-muted-foreground sm:block">{s.d}</p>
                <div aria-hidden className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary sm:h-12 sm:w-12">
                  <s.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}

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
      search={{ mode: "signup", role: to }}
    >
      <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-card min-[360px]:h-10 min-[360px]:w-10 sm:h-12 sm:w-12 ${primary ? "text-primary" : "text-collector-foreground"}`}>
        <Icon className="!h-5 !w-5 sm:!h-6 sm:!w-6" strokeWidth={2} />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-semibold uppercase leading-tight tracking-wide opacity-90">{kicker}</span>
        <span className="block text-[15px] font-bold leading-tight sm:text-lg">{title}</span>
        <span className="mt-0.5 block text-xs leading-snug opacity-90 sm:text-sm">{desc}</span>
      </span>
      <span aria-hidden className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full motion-safe:transition-transform motion-safe:group-hover:translate-x-1 min-[360px]:h-7 min-[360px]:w-7 sm:h-8 sm:w-8 ${primary ? "bg-background/20" : "bg-card"}`}>
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </span>
    </Link>
    </Button>
  );
}
