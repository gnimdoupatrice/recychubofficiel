import { ArrowRight, Truck, ShoppingBag, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-recycling.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* BG Image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Équipe RecycHub collectant des plastiques à Kara"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/98 via-background/85 to-background/50" />
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Badge local */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              🇹🇬 Actif à Kara — Kozah 1, 2, 3 & 4
            </span>
          </div>

          <h1
            className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-5 animate-slide-up text-foreground"
            style={{ animationDelay: "0.1s" }}
          >
            Vendez vos <span className="text-gradient-emerald">plastiques</span>,{" "}
            gagnez de l'<span className="text-gradient-emerald">argent</span>,{" "}
            protégez <span className="text-gradient-emerald">Kara</span>
          </h1>

          <p
            className="text-base sm:text-lg text-muted-foreground mb-4 max-w-lg animate-slide-up leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            RECYC HUB TOGO rachète vos déchets plastiques au kilo et collecte vos ordures
            ménagères à domicile dans toute la préfecture de Kozah.
          </p>

          {/* Tarif accroche */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 mb-8 animate-slide-up"
            style={{ animationDelay: "0.25s" }}
          >
            <span className="text-sm font-semibold text-primary">
              💰 À partir de 55 FCFA/kg — Paiement immédiat
            </span>
          </div>

          {/* CTA */}
          <div
            className="flex flex-col sm:flex-row gap-3 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/vendre"
              className="shimmer inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full gradient-bio text-primary-foreground font-semibold text-base transition-transform hover:scale-105 glow-emerald"
            >
              <ShoppingBag className="w-5 h-5" />
              Vendre mes plastiques
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/enlevement"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-primary text-primary font-semibold text-base transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <Truck className="w-5 h-5" />
              Demander un enlèvement
            </Link>
          </div>

          {/* Contact rapide */}
          <div
            className="flex items-center gap-2 mt-6 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Phone className="w-4 h-4 text-muted-foreground" />
            <a
              href="tel:+22897684030"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Appelez-nous : +228 97 68 40 30
            </a>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-6 mt-10 animate-slide-up"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { val: "2 500+", label: "Kg collectés" },
              { val: "300+", label: "Familles servies" },
              { val: "15", label: "Dépotoirs signalés" },
            ].map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="font-display text-xl sm:text-2xl font-bold text-primary">
                  {s.val}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
