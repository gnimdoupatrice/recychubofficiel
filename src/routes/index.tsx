import { createFileRoute, Link } from "@tanstack/react-router";
import { Recycle, Route as RouteIcon, ClipboardList, Truck, HandCoins, ArrowRight, Milk, Wrench, Package, Cpu, LogIn, ChevronLeft, ChevronRight } from "lucide-react";
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
  { icon: Milk, t: "Plastiques", d: "Bouteilles, bidons" },
  { icon: Wrench, t: "Métaux", d: "Fer, cuivre, alu" },
  { icon: Package, t: "Cartons", d: "Emballages, papier" },
  { icon: Cpu, t: "Électronique", d: "Câbles, appareils" },
];

function Landing() {
  const actionsRef = useRef<HTMLElement>(null);
  const materialsRef = useRef<HTMLUListElement>(null);
  const [showAction, setShowAction] = useState(false);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  useEffect(() => {
    const actions = actionsRef.current;
    const materialsList = materialsRef.current;
    if (!actions || !materialsList) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setShowAction(entry.intersectionRatio < 0.9 && entry.boundingClientRect.top < 56);
    }, { rootMargin: "-56px 0px 0px 0px", threshold: [0, 0.9, 1] });
    const primaryAction = actions.firstElementChild;
    if (primaryAction) observer.observe(primaryAction);
    const updateScroll = () => {
      setCanScrollBack(materialsList.scrollLeft > 2);
      setCanScrollForward(materialsList.scrollLeft + materialsList.clientWidth < materialsList.scrollWidth - 2);
    };
    const resizeObserver = new ResizeObserver(updateScroll);
    resizeObserver.observe(materialsList);
    materialsList.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => {
      observer.disconnect();
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
          <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="RecycHub Togo — accueil">
            <img src={logo.url} alt="" width={40} height={40} className="h-10 w-10 shrink-0" />
            <span className="text-base font-bold"><span className="text-accent">Recyc</span><span className="text-primary">Hub</span></span>
          </Link>
          <Button asChild variant="outline" className="h-12 shrink-0 rounded-full border-border px-4 font-semibold hover:bg-secondary hover:text-foreground">
          <Link to="/auth">
            <LogIn className="h-4 w-4" /> Connexion
          </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-4 sm:px-8 sm:pb-10 sm:pt-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h1 className="text-balance text-2xl font-bold leading-tight sm:text-4xl">Vos déchets recyclables valent de l'argent.</h1>
          <p className="mt-2 text-pretty text-sm text-muted-foreground sm:text-base">Plastique, fer, cuivre, aluminium… sans vous déplacer.</p>
        </div>

        <section ref={actionsRef} aria-label="Choisissez votre espace" className="mt-4 grid gap-2 md:grid-cols-2 md:gap-4">
          <ActionCard to="household" icon={Recycle} kicker="Je suis un ménage" title="Vendre mes déchets" desc="On passe peser et payer chez vous." variant="primary" />
          <ActionCard to="company" icon={RouteIcon} kicker="Je suis une entreprise" title="Espace collecteur" desc="Déclarations proches et tournées." variant="accent" />
        </section>

        <section aria-labelledby="buy-title" className="mt-5 sm:mt-8">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <h2 id="buy-title" className="min-w-0 text-base font-bold sm:text-lg">Ce que nous achetons</h2>
            <div className="flex shrink-0 sm:hidden">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-secondary hover:text-primary" aria-label="Matières précédentes" disabled={!canScrollBack} onClick={() => scrollMaterials(-1)}><ChevronLeft /></Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-secondary hover:text-primary" aria-label="Matières suivantes" disabled={!canScrollForward} onClick={() => scrollMaterials(1)}><ChevronRight /></Button>
            </div>
          </div>
          <ul ref={materialsRef} tabIndex={0} aria-label="Matières achetées" className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:mx-0 sm:mt-3 sm:grid sm:grid-cols-4 sm:px-0">
            {materials.map((m) => (
              <li key={m.t} className="flex w-[8.5rem] shrink-0 snap-start flex-col rounded-2xl border border-border bg-card p-3 sm:w-auto sm:min-w-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                  <m.icon className="h-5 w-5" />
                </span>
                <span className="mt-2 text-sm font-bold">{m.t}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">{m.d}</span>
              </li>
            ))}
          </ul>
        </section>

        <h2 className="mt-5 text-base font-bold sm:mt-8 sm:text-lg">Comment ça marche</h2>
        <ol aria-label="Comment ça marche" className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 sm:gap-4">
          {steps.map((s, i) => (
            <li key={s.t} className="flex min-w-0 flex-col items-center px-1 py-1 text-center sm:p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center text-primary sm:h-10 sm:w-10">
                <s.icon className="h-5 w-5" />
              </div>
              <p className="mt-2 text-balance text-xs font-bold leading-tight sm:text-sm">
                <span className="text-primary">0{i + 1}</span> {s.t}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground sm:hidden">{s.short}</p>
              <p className="mt-1 hidden text-pretty text-xs leading-snug text-muted-foreground sm:block">{s.d}</p>
            </li>
          ))}
        </ol>
      </main>
      {showAction && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-5 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:hidden">
          <Button asChild className="h-12 w-full rounded-full font-bold">
            <Link to="/auth" search={{ mode: "signup", role: "household" }}><Recycle /> Vendre mes déchets <ArrowRight /></Link>
          </Button>
        </div>
      )}
    </div>
  );
}

function ActionCard({ to, icon: Icon, kicker, title, desc, variant }: {
  to: "household" | "company"; icon: typeof Recycle; kicker: string; title: string; desc: string; variant: "primary" | "accent";
}) {
  const primary = variant === "primary";
  const styles = primary
    ? "bg-primary text-primary-foreground focus-visible:ring-primary"
    : "border border-accent/25 bg-collector text-collector-foreground focus-visible:ring-accent";
  return (
    <Button asChild className={`group grid h-auto grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 whitespace-normal rounded-2xl px-4 py-3 transition-colors motion-safe:transition-transform motion-safe:active:scale-[0.98] sm:gap-4 sm:p-5 ${primary ? "min-h-[80px] shadow-sm hover:bg-primary/95" : "min-h-[68px] shadow-none hover:bg-collector/80"} ${styles}`}>
    <Link
      to="/auth"
      search={{ mode: "signup", role: to }}
    >
      <span aria-hidden className={`flex shrink-0 items-center justify-center rounded-xl bg-card ${primary ? "h-12 w-12 text-primary" : "h-10 w-10 text-collector-foreground"}`}>
        <Icon className="!h-6 !w-6" strokeWidth={2} />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-semibold uppercase leading-relaxed">{kicker}</span>
        <span className="block text-base font-bold leading-tight sm:text-lg">{title}</span>
        <span className="mt-0.5 block text-xs leading-snug sm:text-sm">{desc}</span>
      </span>
      <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full motion-safe:transition-transform motion-safe:group-hover:translate-x-1 ${primary ? "bg-background/20" : "bg-card"}`}>
        <ArrowRight className="h-5 w-5" />
      </span>
    </Link>
    </Button>
  );
}
