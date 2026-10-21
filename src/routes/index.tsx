import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Truck, Recycle, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RecycHub Togo — Vos déchets recyclables collectés chez vous" },
      { name: "description", content: "Déclarez vos plastiques et métaux recyclables. Les entreprises de recyclage organisent des tournées pour les acheter dans votre quartier." },
      { property: "og:title", content: "RecycHub Togo — Recyclage à domicile" },
      { property: "og:description", content: "Plastique, fer, cuivre, aluminium : déclarez, on passe collecter et acheter." },
    ],
  }),
  component: Landing,
});

const steps = [
  { icon: Home, t: "Déclarez", d: "Indiquez le type de déchets et la quantité estimée, depuis votre téléphone." },
  { icon: Truck, t: "Une tournée est programmée", d: "Les entreprises regroupent les ménages d'un même quartier et fixent une date de passage." },
  { icon: Recycle, t: "Vendez sur place", d: "Le collecteur pèse vos déchets et vous paie au prix affiché par kilo." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <img src="/icons/icon-192.png" alt="" width={36} height={36} className="h-9 w-9 rounded-xl" />
          <span className="font-display text-lg font-bold text-primary">RecycHub</span>
        </div>
        <Link to="/auth" className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary">
          Se connecter
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-16">
        <section className="mt-4 overflow-hidden rounded-3xl bg-primary px-6 py-10 text-primary-foreground sm:px-12 sm:py-16">
          <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">Kara, Togo</span>
          <h1 className="mt-4 max-w-xl text-3xl font-bold leading-tight sm:text-5xl">
            Vos déchets recyclables valent de l'argent. On passe les chercher.
          </h1>
          <p className="mt-4 max-w-lg text-primary-foreground/80">
            Plastique, fer, cuivre, aluminium… Déclarez ce que vous avez à la maison. Les entreprises de recyclage organisent une tournée dans votre quartier.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/auth" search={{ mode: "signup", role: "household" }} className="rounded-full bg-background px-6 py-3.5 text-center font-semibold text-primary">
              Je suis un ménage
            </Link>
            <Link to="/auth" search={{ mode: "signup", role: "company" }} className="rounded-full border border-primary-foreground/30 px-6 py-3.5 text-center font-semibold">
              Je suis une entreprise
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">Comment ça marche</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.t} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-bold text-muted-foreground">ÉTAPE {i + 1}</p>
                <h3 className="mt-1 font-semibold">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 flex items-start gap-3 rounded-2xl bg-secondary p-5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-secondary-foreground">
            Votre vie privée est protégée : les entreprises ne voient que votre quartier, jamais votre numéro. Votre adresse n'est communiquée qu'au collecteur de la tournée confirmée.
          </p>
        </section>
      </main>
    </div>
  );
}
