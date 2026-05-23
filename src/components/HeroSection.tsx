import { ArrowRight, Phone, MapPin, Truck, ShoppingBag, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero/hero_nature.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[80vh] flex items-center overflow-hidden pt-20"
      aria-label="RECYC HUB TOGO — vos spécialistes de l'environnement à Kara"
    >
      {/* Background image — bright, leafy */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={heroImg}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          width={1920}
          height={1280}
        />
        {/* Soft white veil for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/70" />
      </div>

      <div className="relative z-[2] container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-6 animate-slide-up">
            Junk removal made easy · Kara, Togo
          </p>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-foreground mb-6 animate-slide-up"
            style={{ animationDelay: "0.05s" }}
          >
            Your{" "}
            <span className="text-primary">Environmental</span>
            <br />
            Specialists
          </h1>

          <p
            className="text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.15s" }}
          >
            Faites enlever vos déchets ménagers ou vendez vos plastiques au kg.
            Une plateforme simple, locale et engagée pour un Togo plus propre.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 animate-slide-up"
            style={{ animationDelay: "0.25s" }}
          >
            <Link to="/enlevement" className="btn-cta px-7 py-3.5">
              <Truck className="w-4 h-4" />
              Commander un enlèvement
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/vendre" className="btn-outline-green px-7 py-3.5">
              <ShoppingBag className="w-4 h-4" />
              Vendre mes plastiques
            </Link>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-foreground/60 animate-slide-up"
            style={{ animationDelay: "0.35s" }}
          >
            <Link
              to="/alerte"
              className="inline-flex items-center gap-1.5 text-destructive hover:text-destructive/80 font-semibold transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Signaler un dépotoir
            </Link>
            <span className="hidden sm:inline text-foreground/20">·</span>
            <a href="tel:+22897684030" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +228 97 68 40 30
            </a>
            <span className="hidden sm:inline text-foreground/20">·</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Kara, Togo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
