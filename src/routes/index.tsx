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
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pt-[max(1.5rem,env(safe-area-inset-top))]">
        <div className="flex flex-col items-center text-center">
          <img src={logo.url} alt="RecycHub Togo — Connecter les acteurs du recyclage" width={176} height={176} className="h-44 w-44" />
          <h1 className="mt-2 text-2xl font-bold leading-tight">Vos déchets recyclables valent de l'argent.</h1>
          <p className="mt-2 text-sm text-muted-foreground">Plastique, fer, cuivre, aluminium… sans vous déplacer.</p>
        </div>

        <ol className="mt-6 grid grid-cols-3 gap-2">
          {steps.map((s, i) => (
            <li key={s.t} className="rounded-2xl bg-secondary p-3 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-card text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <p className="mt-2 text-xs font-bold">{i + 1}. {s.t}</p>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </main>

      <div className="sticky bottom-0 mx-auto w-full max-w-md space-y-3 bg-background px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
        <Link to="/auth" search={{ mode: "signup", role: "household" }}
          className="flex min-h-14 items-center justify-between rounded-2xl bg-primary px-5 font-semibold text-primary-foreground active:scale-[0.98] transition">
          <span>Vendre mes déchets <span className="block text-xs font-normal opacity-80">Je suis un ménage</span></span>
          <ChevronRight className="h-5 w-5" />
        </Link>
        <Link to="/auth" search={{ mode: "signup", role: "company" }}
          className="flex min-h-14 items-center justify-between rounded-2xl bg-accent px-5 font-semibold text-accent-foreground active:scale-[0.98] transition">
          <span>Espace collecteur <span className="block text-xs font-normal opacity-80">Je suis une entreprise</span></span>
          <ChevronRight className="h-5 w-5" />
        </Link>
        <Link to="/auth" className="block py-2 text-center text-sm font-semibold text-primary">
          J'ai déjà un compte · Se connecter
        </Link>
      </div>
    </div>
  );
}
