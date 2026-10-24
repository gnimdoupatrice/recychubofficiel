import { createFileRoute, Link } from "@tanstack/react-router";
import { Recycle, Route as RouteIcon, ClipboardList, Truck, HandCoins, ArrowRight, Milk, Wrench, Package, Cpu, LogIn } from "lucide-react";
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
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2" aria-label="RecycHub Togo — accueil">
            <img src={logo.url} alt="" width={40} height={40} className="h-10 w-10" />
            <span className="text-base font-bold"><span className="text-accent">Recyc</span><span className="text-primary">Hub</span></span>
          </Link>
          <Link to="/auth" className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-semibold text-foreground transition hover:bg-secondary active:scale-95">
            <LogIn className="h-4 w-4" /> Connexion
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-10 pt-6 sm:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h1 className="text-balance text-2xl font-bold leading-tight sm:text-4xl">Vos déchets recyclables valent de l'argent.</h1>
          <p className="mt-2 text-pretty text-sm text-muted-foreground sm:text-base">Plastique, fer, cuivre, aluminium… sans vous déplacer.</p>
        </div>

        <section aria-label="Choisissez votre espace" className="mt-6 grid gap-3 md:grid-cols-2 md:gap-4">
          <ActionCard to="household" icon={Recycle} kicker="Je suis un ménage" title="Vendre mes déchets" desc="On passe peser et payer chez vous." variant="primary" />
          <ActionCard to="company" icon={RouteIcon} kicker="Je suis une entreprise" title="Espace collecteur" desc="Déclarations proches et tournées." variant="accent" />
        </section>

        <section aria-labelledby="buy-title" className="mt-8">
          <h2 id="buy-title" className="text-base font-bold sm:text-lg">Ce que nous achetons</h2>
          <ul className="-mx-5 mt-3 flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0">
            {materials.map((m) => (
              <li key={m.t} className="flex min-w-[8.5rem] snap-start flex-col rounded-2xl border border-border bg-card p-3 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                  <m.icon className="h-5 w-5" />
                </span>
                <span className="mt-2 text-sm font-bold">{m.t}</span>
                <span className="text-xs text-muted-foreground">{m.d}</span>
              </li>
            ))}
          </ul>
        </section>

        <h2 className="mt-8 text-base font-bold sm:text-lg">Comment ça marche</h2>
        <ol aria-label="Comment ça marche" className="mt-3 grid grid-cols-3 gap-2 sm:gap-4">
          {steps.map((s, i) => (
            <li key={s.t} className="flex min-w-0 flex-col items-center rounded-2xl bg-secondary px-1.5 py-3 text-center sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-sm sm:h-12 sm:w-12">
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
    </div>
  );
}

function ActionCard({ to, icon: Icon, kicker, title, desc, variant }: {
  to: "household" | "company"; icon: typeof Recycle; kicker: string; title: string; desc: string; variant: "primary" | "accent";
}) {
  const primary = variant === "primary";
  const styles = primary
    ? "bg-primary text-primary-foreground focus-visible:ring-primary"
    : "bg-accent text-accent-foreground focus-visible:ring-accent";
  return (
    <Link
      to="/auth"
      search={{ mode: "signup", role: to }}
      className={`group grid min-h-[76px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-4 py-3 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] sm:gap-4 sm:p-5 ${styles}`}
    >
      <span aria-hidden className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-card shadow-sm ${primary ? "text-primary" : "text-accent"}`}>
        <Icon className="h-6 w-6" strokeWidth={2.25} />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-wider opacity-85">{kicker}</span>
        <span className="block truncate text-base font-bold leading-tight sm:text-lg">{title}</span>
        <span className="mt-0.5 block truncate text-xs opacity-90 sm:text-sm">{desc}</span>
      </span>
      <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background/25 transition group-hover:translate-x-1">
        <ArrowRight className="h-5 w-5" />
      </span>
    </Link>
  );
}
