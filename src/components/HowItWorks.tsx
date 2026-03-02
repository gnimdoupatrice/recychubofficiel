import { UserPlus, ShoppingBag, Banknote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: UserPlus,
    step: "1",
    title: "Inscrivez-vous",
    desc: "Créez votre compte gratuit en 30 secondes avec votre numéro de téléphone.",
  },
  {
    icon: ShoppingBag,
    step: "2",
    title: "Vendez ou demandez",
    desc: "Apportez vos plastiques à notre point de collecte ou demandez un enlèvement à domicile.",
  },
  {
    icon: Banknote,
    step: "3",
    title: "Recevez votre argent",
    desc: "Paiement immédiat au kilo. Tarif transparent, pas de surprise.",
  },
];

const HowItWorks = () => (
  <section className="py-16 md:py-24 bg-muted/50">
    <div className="container mx-auto px-4 text-center">
      <span className="text-sm font-semibold uppercase tracking-wider text-primary">
        Simple & Rapide
      </span>
      <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-2 text-foreground">
        Comment ça <span className="text-gradient-emerald">marche</span> ?
      </h2>
      <p className="text-muted-foreground mb-12 max-w-md mx-auto">
        3 étapes simples pour transformer vos déchets en revenus.
      </p>

      <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
        {steps.map((s, i) => (
          <div key={s.step} className="relative flex flex-col items-center text-center">
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="hidden sm:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
            )}
            <div className="w-16 h-16 rounded-2xl gradient-bio flex items-center justify-center mb-4 shadow-lg relative z-10">
              <s.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="absolute -top-2 -right-2 sm:right-auto sm:-top-3 sm:-left-1 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow">
              {s.step}
            </span>
            <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <Link
        to="/inscription"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bio text-primary-foreground font-semibold transition-transform hover:scale-105"
      >
        Commencer maintenant
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </section>
);

export default HowItWorks;
