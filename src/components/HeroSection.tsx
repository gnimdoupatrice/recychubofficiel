import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  Phone,
  MapPin,
  AlertTriangle,
  Coins,
  Sparkles,
} from "lucide-react";

import slide1 from "@/assets/hero-recycling.webp";
import slide2 from "@/assets/hero-slide-2.webp";
import slide3 from "@/assets/hero-slide-3.webp";
import slide4 from "@/assets/about-hero.webp";
import slide5 from "@/assets/civictech-hero.webp";

const SLIDES = [slide1, slide2, slide3, slide4, slide5];
const BRAND = "RECYC HUB TOGO";

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMql = window.matchMedia("(max-width: 767px)");

    const update = () => setReduceMotion(motionMql.matches);
    update();
    motionMql.addEventListener("change", update);

    if (motionMql.matches || mobileMql.matches) {
      return () => motionMql.removeEventListener("change", update);
    }

    const id = window.setInterval(goNext, 6000);
    return () => {
      window.clearInterval(id);
      motionMql.removeEventListener("change", update);
    };
  }, [goNext]);

  return (
    <section
      aria-label="RECYC HUB TOGO — Vendez vos plastiques ou faites enlever vos déchets ménagers"
      className="relative min-h-[92vh] md:min-h-[95vh] overflow-hidden pt-16 md:pt-20"
    >
      {/* Background carousel */}
      <div className="absolute left-0 right-0 bottom-0 top-16 md:top-20" aria-hidden="true">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
            className={
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 " +
              (i === current ? "opacity-100" : "opacity-0")
            }
          />
        ))}
      </div>

      {/* Overlays */}
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-br from-black/85 via-black/65 to-primary/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-t from-black/90 via-transparent to-black/40"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-[3] container mx-auto px-6 max-w-6xl py-12 md:py-20">
        {/* Welcome badge */}
        <div className="flex justify-center mb-7 animate-slide-up">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            Bienvenue sur {BRAND}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-center font-display font-extrabold leading-[1.05] tracking-tight text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-5xl mx-auto mb-6 animate-slide-up"
          style={{ animationDelay: "0.05s" }}
        >
          Faites collecter vos déchets ménagers
          <br className="hidden sm:block" />{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-secondary to-accent">
            et vendez vos plastiques
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-center text-white/85 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 animate-slide-up"
          style={{ animationDelay: "0.15s" }}
        >
          Choisissez votre parcours : <strong className="text-white">vendez vos plastiques au kg</strong>{" "}
          ou <strong className="text-white">demandez un enlèvement</strong> de vos déchets ménagers en quelques clics.
        </p>

        {/* Two glass cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5 max-w-5xl mx-auto mb-8 animate-slide-up"
          style={{ animationDelay: "0.25s" }}
        >
          {/* Primary card */}
          <Link
            to="/vendre"
            aria-label="Vendre mes plastiques au kg"
            className="group relative md:col-span-3 overflow-hidden rounded-3xl bg-white/12 backdrop-blur-2xl border border-white/25 p-6 md:p-7 shadow-2xl shadow-black/40 transition-all duration-300 hover:bg-white/20 hover:border-secondary/50 hover:scale-[1.015] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            <div
              aria-hidden="true"
              className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-secondary/30 blur-3xl transition-colors duration-300 group-hover:bg-secondary/50"
            />
            <div className="relative flex items-start justify-between mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/90 text-secondary-foreground text-[10px] font-bold uppercase tracking-[0.2em]">
                <Coins className="w-3 h-3" />
                Service phare
              </span>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white shadow-lg">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="relative">
              <h2 className="font-display font-extrabold text-xl md:text-2xl text-white mb-2 leading-tight">
                Vendre mes plastiques
              </h2>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                PET, PEHD, PP, sachets Pure Water — transformez vos déchets en{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent font-semibold">
                  revenus immédiats
                </span>
                .
              </p>
              <div className="flex items-center justify-between pt-5 border-t border-white/15">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold">
                  Catalogue & prix au kg
                </span>
                <span className="inline-flex items-center gap-2 text-white font-bold text-sm">
                  Vendre maintenant
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>

          {/* Secondary card */}
          <Link
            to="/enlevement"
            aria-label="Demander un enlèvement de déchets ménagers"
            className="group relative md:col-span-2 overflow-hidden rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 p-6 md:p-7 shadow-2xl shadow-black/40 transition-all duration-300 hover:bg-white/15 hover:border-accent/50 hover:scale-[1.015] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <div
              aria-hidden="true"
              className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-accent/25 blur-3xl transition-colors duration-300 group-hover:bg-accent/40"
            />
            <div className="relative flex items-start justify-between mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10">
                Déchets ménagers
              </span>
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white">
                <Truck className="w-5 h-5" />
              </div>
            </div>
            <div className="relative">
              <h2 className="font-display font-extrabold text-xl md:text-2xl text-white mb-2 leading-tight">
                Faire enlever mes déchets
              </h2>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Enlèvement à domicile : ménagers, organiques, encombrants.
              </p>
              <div className="flex items-center justify-between pt-5 border-t border-white/15">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold">
                  À partir de 2 000 FCFA
                </span>
                <span className="inline-flex items-center gap-2 text-white font-bold text-sm">
                  Demander
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Alert pill */}
        <div className="flex justify-center mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Link
            to="/alerte"
            aria-label="Signaler un dépotoir sauvage"
            className="group inline-flex items-center gap-3 px-5 py-3 rounded-full bg-destructive/15 border border-destructive/40 backdrop-blur-md transition-all hover:bg-destructive/25 hover:border-destructive/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
          >
            <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
            <span className="text-white font-bold text-sm">Signaler un dépotoir sauvage</span>
            <span className="hidden sm:inline text-white/60 text-xs">— ponts, caniveaux, terrains</span>
            <ArrowRight className="w-4 h-4 text-white/70 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Meta indicators */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/65 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            2 500+ kg de plastiques collectés
          </span>
          <span className="hidden sm:inline text-white/30">·</span>
          <a
            href="tel:+22897684030"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
          >
            <Phone className="w-3.5 h-3.5" />
            +228 97 68 40 30
          </a>
          <span className="hidden sm:inline text-white/30">·</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Kara, Togo
          </span>
        </div>

        {/* Slide indicators */}
        {!reduceMotion && (
          <div
            role="tablist"
            aria-label="Visuels d'arrière-plan"
            className="flex items-center justify-center gap-2 mt-8 animate-slide-up"
            style={{ animationDelay: "0.5s" }}
          >
            {SLIDES.map((_, i) => {
              const active = i === current;
              return (
                <button
                  key={i}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-label={"Visuel " + (i + 1) + " sur " + SLIDES.length}
                  onClick={() => setCurrent(i)}
                  className={
                    "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 " +
                    (active ? "w-8 bg-secondary" : "w-2 bg-white/40 hover:bg-white/60")
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
