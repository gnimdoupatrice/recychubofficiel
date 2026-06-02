import { ArrowRight, Sparkles, Phone, MapPin, ShoppingBag, Truck, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero/hero_dark.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[100vh] flex items-center overflow-hidden pt-28 pb-16"
      aria-label="RECYC HUB TOGO — Faites collecter vos déchets et vendez vos plastiques"
    >
      {/* Background — dramatic dark dump scene */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={heroImg}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        {/* Layered dark veils for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-[2] container mx-auto px-6">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-slide-up">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/8 backdrop-blur-md border border-white/15 text-white/95 text-[11px] font-bold uppercase tracking-[0.22em]">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            Bienvenue sur RECYC HUB TOGO
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-center font-extrabold tracking-tight leading-[1.02] text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl mx-auto mb-8 animate-slide-up"
          style={{ animationDelay: "0.05s" }}
        >
          Faites collecter vos déchets ménagers et{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-amber-300 to-secondary">
            vendez vos plastiques
          </span>{" "}
          en quelques clics
        </h1>

        <p
          className="text-center text-white/75 text-base md:text-lg max-w-2xl mx-auto mb-14 animate-slide-up"
          style={{ animationDelay: "0.15s" }}
        >
          Une plateforme phygitale, locale et engagée pour un Kara plus propre — paiement immédiat en Mobile Money ou cash.
        </p>

        {/* Two action cards */}
        <div
          className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto mb-8 animate-slide-up"
          style={{ animationDelay: "0.25s" }}
        >
          {/* Sell plastics */}
          <Link
            to="/vendre"
            className="group relative p-7 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 hover:border-secondary/60 hover:bg-white/[0.12] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">
                Catalogue & prix au kg
              </span>
              <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <h2 className="font-extrabold text-2xl md:text-[1.7rem] text-white mb-2 leading-tight">
              Vendre mes plastiques
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              Transformez vos PET, PEHD, PP et sachets Pure Water en revenus.
            </p>
            <p className="text-secondary text-sm font-semibold mb-6">
              Jusqu'à 150 FCFA/kg — Mobile Money ou cash.
            </p>
            <div className="flex items-center justify-between pt-5 border-t border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
                Catalogue & prix au kg
              </span>
              <span className="inline-flex items-center gap-2 text-white font-bold text-sm group-hover:text-secondary transition-colors">
                Vendre maintenant <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Pickup */}
          <Link
            to="/enlevement"
            className="group relative p-7 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 hover:border-primary/60 hover:bg-white/[0.12] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground/95 text-[10px] font-bold uppercase tracking-[0.2em]">
                Domicile · Kara
              </span>
              <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center text-white">
                <Truck className="w-5 h-5" />
              </div>
            </div>
            <h2 className="font-extrabold text-2xl md:text-[1.7rem] text-white mb-2 leading-tight">
              Faire enlever mes déchets
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              Service d'enlèvement à domicile pour vos déchets ménagers, organiques et encombrants.
            </p>
            <p className="text-primary-foreground/90 text-sm font-semibold mb-6">
              Réservation rapide, équipe locale, paiement à la collecte.
            </p>
            <div className="flex items-center justify-between pt-5 border-t border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
                Domicile · Kara
              </span>
              <span className="inline-flex items-center gap-2 text-white font-bold text-sm group-hover:text-primary transition-colors">
                Demander <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>

        {/* Alert pill */}
        <div className="flex justify-center mb-10 animate-slide-up" style={{ animationDelay: "0.35s" }}>
          <Link
            to="/alerte"
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-destructive/15 border border-destructive/30 backdrop-blur-md hover:bg-destructive/25 transition-all"
          >
            <span className="inline-flex items-center gap-2 text-destructive-foreground font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              Signaler un dépotoir sauvage
            </span>
            <span className="hidden sm:inline text-white/60 text-xs">
              — ponts, caniveaux, terrains
            </span>
            <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Info row */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-white/60 animate-slide-up"
          style={{ animationDelay: "0.45s" }}
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            2 500+ kg de plastiques collectés
          </span>
          <span className="hidden sm:inline text-white/20">·</span>
          <a href="tel:+22897684030" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5" />
            +228 97 68 40 30
          </a>
          <span className="hidden sm:inline text-white/20">·</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Kara, Togo
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
