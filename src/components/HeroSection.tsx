import { Button } from "@/components/ui/button";
import { Truck, DollarSign, AlertTriangle, GraduationCap, Calendar } from "lucide-react";
import heroImg from "@/assets/hero-recycling.jpg";

const heroButtons = [
  { label: "Demander un enlèvement", icon: Truck },
  { label: "Vendre mes plastiques", icon: DollarSign },
  { label: "Alerte Dépotoir", icon: AlertTriangle },
  { label: "Green Academy", icon: GraduationCap },
  { label: "Hub Événementiel", icon: Calendar },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden pt-16">
      {/* Background image overlay */}
      <div className="absolute inset-0 opacity-15">
        <img src={heroImg} alt="Recyclage au Togo" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 hero-gradient opacity-85" />

      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-3xl space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-1.5 text-sm font-medium text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Plateforme nationale de recyclage
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-primary-foreground">
            Transformons les déchets en{" "}
            <span className="text-accent">richesse durable</span>{" "}
            pour le Togo
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl">
            Plateforme nationale de collecte, valorisation, alerte citoyenne, formation verte et opportunités environnementales.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            {heroButtons.map(({ label, icon: Icon }) => (
              <Button key={label} variant="hero" size="lg" className="gap-2">
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
