import { UserPlus, ShoppingBag, Banknote } from "lucide-react";

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
    desc: "Apportez vos plastiques ou demandez un enlèvement à domicile dans Kozah 1–4.",
  },
  {
    icon: Banknote,
    step: "3",
    title: "Gagnez de l'argent",
    desc: "Recevez votre paiement immédiatement au kilo selon notre barème transparent.",
  },
];

const HowItWorks = () => (
  <section className="py-16 md:py-24 bg-muted/50">
    <div className="container mx-auto px-4 text-center">
      <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2 text-foreground">
        Comment ça <span className="text-primary">marche</span> ?
      </h2>
      <p className="text-muted-foreground mb-12 max-w-md mx-auto">
        3 étapes simples pour transformer vos déchets en revenus.
      </p>

      <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((s) => (
          <div key={s.step} className="relative flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl gradient-bio flex items-center justify-center mb-4 shadow-lg">
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
    </div>
  </section>
);

export default HowItWorks;
