import { useState } from "react";
import { ArrowRight, Phone, Truck, Smartphone, Leaf, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import stepRegister from "@/assets/step-register.png";
import stepCollect from "@/assets/step-collect.png";
import stepPayment from "@/assets/step-payment.png";
import stepImpact from "@/assets/step-impact.png";

const steps = [
  {
    icon: Phone,
    image: stepRegister,
    step: "01",
    title: "Créez votre compte",
    shortDesc: "Inscription gratuite en 30 secondes",
    details: [
      "Via WhatsApp, appel ou sur notre plateforme",
      "Juste votre nom et numéro de téléphone",
      "Aucun document requis",
    ],
    color: "from-primary to-secondary",
  },
  {
    icon: Truck,
    image: stepCollect,
    step: "02",
    title: "Collecte ou dépôt",
    shortDesc: "On vient chez vous ou vous venez à nous",
    details: [
      "Demandez un enlèvement à domicile via WhatsApp",
      "Ou déposez vos plastiques à notre point de collecte",
      "On pèse tout devant vous, en toute transparence",
    ],
    color: "from-secondary to-accent",
  },
  {
    icon: Smartphone,
    image: stepPayment,
    step: "03",
    title: "Paiement immédiat",
    shortDesc: "Recevez votre argent sur-le-champ",
    details: [
      "Paiement cash ou via Mobile Money (Flooz, T-Money)",
      "Tarif au kilo affiché, pas de surprise",
      "Historique de toutes vos ventes sur votre compte",
    ],
    color: "from-accent to-primary",
  },
  {
    icon: Leaf,
    image: stepImpact,
    step: "04",
    title: "Impact positif",
    shortDesc: "Vos déchets deviennent une ressource",
    details: [
      "Vos plastiques sont recyclés localement",
      "Vous contribuez à un Kara plus propre",
      "Suivez votre impact environnemental en temps réel",
    ],
    color: "from-primary to-neon-light",
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-4">
            Simple & Accessible
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Comment ça{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              marche
            </span>{" "}
            ?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            De vos déchets à votre portefeuille en 4 étapes simples.
            Pas besoin d'internet haut débit — WhatsApp suffit.
          </p>
        </div>

        {/* Steps timeline + content */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop: horizontal timeline dots */}
          <div className="hidden md:flex items-center justify-between mb-12 px-8">
            {steps.map((s, i) => (
              <div key={s.step} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => setActiveStep(i)}
                  className={`relative flex flex-col items-center group cursor-pointer transition-all duration-300 ${
                    activeStep === i ? "scale-110" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                      activeStep === i
                        ? "bg-gradient-to-br " + s.color + " text-primary-foreground shadow-primary/30"
                        : "bg-card border border-border text-muted-foreground group-hover:border-primary/50"
                    }`}
                  >
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`mt-2 text-xs font-bold transition-colors ${
                      activeStep === i ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    Étape {s.step}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className="flex-1 mx-4 h-0.5 relative">
                    <div className="absolute inset-0 bg-border rounded-full" />
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{ width: i < activeStep ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Active step content card */}
          <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left: Image */}
              <div className="relative bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center p-8 md:p-12 min-h-[300px]">
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                  <span className="text-6xl md:text-8xl font-display font-black text-primary/10">
                    {steps[activeStep].step}
                  </span>
                </div>
                <img
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10 transition-all duration-500"
                />
              </div>

              {/* Right: Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${steps[activeStep].color} flex items-center justify-center`}>
                    {(() => {
                      const Icon = steps[activeStep].icon;
                      return <Icon className="w-5 h-5 text-primary-foreground" />;
                    })()}
                  </div>
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Étape {steps[activeStep].step}
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {steps[activeStep].title}
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  {steps[activeStep].shortDesc}
                </p>

                <ul className="space-y-3 mb-8">
                  {steps[activeStep].details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <span className="text-foreground/80">{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Mobile step navigation */}
                <div className="flex md:hidden gap-2 mb-6">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`flex-1 h-2 rounded-full transition-all ${
                        i === activeStep ? "bg-primary" : "bg-border"
                      }`}
                    />
                  ))}
                </div>

                {activeStep === steps.length - 1 ? (
                  <Link
                    to="/inscription"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] w-full sm:w-auto"
                  >
                    Commencer maintenant
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    onClick={() => setActiveStep((prev) => prev + 1)}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] w-full sm:w-auto"
                  >
                    Étape suivante
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
