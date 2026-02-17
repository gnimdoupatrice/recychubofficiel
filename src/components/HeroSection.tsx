import { ArrowRight, Truck, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-recycling.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG Image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Recyclage à Kara" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Kara, Togo — Kozah 1–4
            </span>
          </div>

          <h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Transformez vos{" "}
            <span className="text-gradient-emerald">déchets</span> en{" "}
            <span className="text-gradient-emerald">revenus</span> à Kara
          </h1>

          <p
            className="text-lg text-muted-foreground mb-8 max-w-lg animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Plateforme phygitale d'enlèvement de déchets ménagers, de vente de
            plastiques et de sensibilisation environnementale dans la préfecture
            de Kozah.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/vendre"
              className="shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gradient-bio text-primary-foreground font-semibold text-lg transition-transform hover:scale-105 glow-emerald"
            >
              <ShoppingBag className="w-5 h-5" />
              Vendre mes plastiques
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/enlevement"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold text-lg transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <Truck className="w-5 h-5" />
              Demander enlèvement
            </Link>
          </div>

          <div
            className="flex gap-8 mt-12 animate-slide-up"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { val: "2,500+", label: "Kg collectés" },
              { val: "300+", label: "Familles servies" },
              { val: "15", label: "Dépotoirs signalés" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-bold text-primary">
                  {s.val}
                </div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
