import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Truck, Scale, ChevronRight } from "lucide-react";
import logo from "@/assets/recychub-logo.png.asset.json";

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
  { icon: Home, t: "Déclarez", d: "Type de déchet et quantité, en 3 touches." },
  { icon: Truck, t: "On passe", d: "Une tournée est fixée dans votre quartier." },
  { icon: Scale, t: "Vous êtes payé", d: "Pesée sur place, prix au kilo affiché." },
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

        <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="flex items-center gap-3 rounded-2xl bg-secondary p-4 sm:flex-col sm:text-center">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold">{i + 1}. {s.t}</p>
                <p className="mt-1 text-pretty text-xs leading-snug text-muted-foreground">{s.d}</p>
              </div>
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
    ? "bg-primary text-primary-foreground"
    : "bg-accent text-accent-foreground";
  return (
    <Link
      to="/auth"
      search={{ mode: "signup", role: to }}
      className={`group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-3xl p-6 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.99] ${styles}`}
    >
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-current opacity-10" />
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background/20">
          <Icon className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-background/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">{kicker}</span>
      </div>
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <p className="text-balance text-xl font-bold leading-tight sm:text-2xl">{title}</p>
          <p className="mt-1 text-pretty text-sm opacity-85">{desc}</p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background/25 transition group-hover:translate-x-1">
          <ChevronRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
