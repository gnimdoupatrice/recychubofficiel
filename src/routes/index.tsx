import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Truck, Scale, ChevronRight } from "lucide-react";
const logo = { url: "/recychub-logo.png" };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RecycHub Togo — Vendez vos déchets recyclables sans vous déplacer" },
      { name: "description", content: "Déclarez vos plastiques et métaux depuis votre téléphone. Les entreprises de recyclage passent les acheter dans votre quartier." },
      { property: "og:title", content: "RecycHub Togo — Recyclage à domicile" },
      { property: "og:description", content: "Plastique, fer, cuivre, aluminium : déclarez, on passe collecter et payer." },
    ],
  }),
  component: Landing,
});

const steps = [
  { icon: Home, t: "Déclarez", short: "En 3 clics", d: "Type de déchet et quantité, en 3 touches." },
  { icon: Truck, t: "On passe", short: "À domicile", d: "Une tournée est fixée dans votre quartier." },
  { icon: Scale, t: "Vous êtes payé", short: "Cash direct", d: "Pesée sur place, prix au kilo affiché." },
];

function Landing() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-10 pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <img src={logo.url} alt="RecycHub Togo — Connecter les acteurs du recyclage" width={176} height={176} className="h-36 w-36 sm:h-44 sm:w-44" />
          <h1 className="mt-2 text-balance text-2xl font-bold leading-tight sm:text-4xl">Vos déchets recyclables valent de l'argent.</h1>
          <p className="mt-3 text-pretty text-sm text-muted-foreground sm:text-base">Plastique, fer, cuivre, aluminium… sans vous déplacer.</p>
        </div>

        <section aria-label="Choisissez votre espace" className="mt-8 grid gap-4 md:grid-cols-2">
          <ActionCard
            to="household"
            icon={Home}
            kicker="Je suis un ménage"
            title="Vendre mes déchets"
            desc="Déclarez vos recyclables, on passe les peser et vous payer chez vous."
            variant="primary"
          />
          <ActionCard
            to="company"
            icon={Truck}
            kicker="Je suis une entreprise"
            title="Espace collecteur"
            desc="Trouvez des déclarations près de vous et organisez vos tournées."
            variant="accent"
          />
        </section>

        <Link to="/auth" className="mx-auto mt-4 rounded-full px-4 py-2 text-center text-sm font-semibold text-primary hover:bg-secondary">
          J'ai déjà un compte · Se connecter
        </Link>

        <ol aria-label="Comment ça marche" className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
          {steps.map((s, i) => (
            <li key={s.t} className="flex min-w-0 flex-col items-center rounded-2xl bg-secondary px-1.5 py-3 text-center sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-sm sm:h-12 sm:w-12">
                <s.icon className="h-5 w-5" />
              </div>
              <p className="mt-2 text-balance text-xs font-bold leading-tight sm:text-sm">
                <span className="text-primary">{i + 1}.</span> {s.t}
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
  to: "household" | "company"; icon: typeof Home; kicker: string; title: string; desc: string; variant: "primary" | "accent";
}) {
  const styles = variant === "primary"
    ? "bg-primary text-primary-foreground focus-visible:ring-primary"
    : "bg-accent text-accent-foreground focus-visible:ring-accent";
  return (
    <Link
      to="/auth"
      search={{ mode: "signup", role: to }}
      className={`group grid min-h-[72px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-4 py-3 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] sm:gap-4 sm:p-5 ${styles}`}
    >
      <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/20 sm:h-12 sm:w-12">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-wide opacity-80">{kicker}</span>
        <span className="block truncate text-base font-bold leading-tight sm:text-lg">{title}</span>
        <span className="mt-1 hidden text-pretty text-sm opacity-85 sm:block">{desc}</span>
      </span>
      <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background/25 transition group-hover:translate-x-1">
        <ChevronRight className="h-5 w-5" />
      </span>
    </Link>
  );
}
