import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Truck, Scale, ChevronRight } from "lucide-react";
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
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const steps = [
  { icon: Home, t: "Déclarez", short: "En 3 clics", d: "Indiquez le type de déchet et la quantité." },
  { icon: Truck, t: "On passe", short: "À domicile", d: "Une tournée est fixée dans votre quartier." },
  { icon: Scale, t: "Vous êtes payé", short: "Cash direct", d: "Pesée sur place, prix au kilo affiché." },
];

function Landing() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-2.5 sm:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <img src={logo.url} alt="" width={36} height={36} className="h-9 w-9 shrink-0" />
            <span className="truncate font-display text-lg font-bold text-primary">RecycHub</span>
          </Link>
          <Button asChild variant="outline" className="min-h-11 shrink-0 rounded-full border-border px-4 text-sm font-semibold text-primary shadow-none hover:bg-secondary hover:text-primary">
            <Link to="/auth">Se connecter</Link>
          </Button>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-10 pt-8 sm:px-8 sm:pt-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h1 className="text-balance text-2xl font-bold leading-tight [letter-spacing:0] sm:text-4xl">Vendez vos déchets recyclables à Kara.</h1>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">Plastique, fer, cuivre, aluminium… collectés et payés chez vous.</p>
        </div>

        <section aria-label="Choisissez votre espace" className="mt-6 grid gap-4 md:grid-cols-2">
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

        <section className="mt-8 border-t border-border pt-6" aria-labelledby="steps-title">
        <h2 id="steps-title" className="text-base font-bold [letter-spacing:0]">De la déclaration au paiement</h2>
        <ol className="mt-5 grid gap-5 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <li key={s.t} className="flex min-w-0 items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
              <p className="text-sm font-bold leading-tight">
                <span className="text-primary">{i + 1}.</span> {s.t}
              </p>
              <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">{s.d}</p>
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
  to: "household" | "company"; icon: typeof Home; kicker: string; title: string; desc: string; variant: "primary" | "accent";
}) {
  const styles = variant === "primary"
    ? "bg-primary text-primary-foreground focus-visible:ring-primary"
    : "border border-collector/40 bg-card text-collector focus-visible:ring-collector hover:bg-secondary";
  return (
    <Button asChild variant="ghost" className={`group h-auto min-h-[112px] w-full justify-start whitespace-normal rounded-lg px-4 py-4 text-left shadow-none transition-colors focus-visible:ring-2 sm:p-5 ${styles}`}>
    <Link
      to="/auth"
      search={{ mode: "signup", role: to }}
    >
      <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center [&_svg]:size-6 sm:h-12 sm:w-12">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium">{kicker}</span>
        <span className="mt-1 block text-base font-bold leading-tight sm:text-lg">{title}</span>
        <span className="mt-1.5 block text-pretty text-sm font-normal leading-relaxed">{desc}</span>
      </span>
      <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center">
        <ChevronRight className="h-5 w-5" />
      </span>
    </Link>
    </Button>
  );
}
