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

import slide1 from "@/assets/hero/hero-1-sorting.webp";
import slide2 from "@/assets/hero/hero-2-pickup.webp";
import slide4 from "@/assets/hero/hero-4-depot.webp";
import slide5 from "@/assets/hero/hero-5-cleanup.webp";

const SLIDES = [slide1, slide2, slide4, slide5];
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
      aria-label="RECYC HUB TOGO. Vendez vos plastiques ou faites enlever vos déchets ménagers"
      className="relative min-h-[88dvh] md:min-h-[95vh] overflow-hidden pt-16 md:pt-32 bg-background"
    >
      {/* Background carousel */}
      <div className="absolute left-0 right-0 bottom-0 top-16 md:top-[120px]" aria-hidden="true">
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

      {/* Voile vert signature — moins blanc, lisibilité préservée */}
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-b from-primary/30 via-primary/15 to-primary/35"
        aria-hidden="true"
      />
      {/* Halo central pour le contraste du texte */}
      <div
        className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,hsl(var(--background)/0.55),transparent_70%)]"
        aria-hidden="true"
      />

      {/* Content — alignement gauche éditorial (style ONU / PNUD) */}
      <div className="relative z-[3] container mx-auto px-5 sm:px-6 max-w-6xl py-10 sm:py-12 md:py-20">
        {/* Eyebrow */}
        <div className="mb-5 sm:mb-6 animate-slide-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            Bienvenue sur {BRAND}
          </span>
        </div>

        {/* Headline — centered */}
        <h1
          className="text-center font-display font-extrabold leading-[1.08] tracking-tight text-foreground text-[28px] sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto mb-5 sm:mb-6 animate-slide-up break-words"
          style={{ animationDelay: "0.05s" }}
        >
          Faites collecter vos déchets ménagers{" "}
          <span className="text-primary">
            et vendez vos plastiques
          </span>
        </h1>


        {/* Subtitle — centered, white for contrast */}
        <p
          className="text-center text-white mx-auto text-sm sm:text-base md:text-lg max-w-2xl mb-10 animate-slide-up"
          style={{ animationDelay: "0.15s" }}
        >
          Choisissez votre parcours : <strong className="text-white">vendez vos plastiques au kg</strong>{" "}
          ou <strong className="text-white">demandez un enlèvement</strong> de vos déchets ménagers en quelques clics.
        </p>


        {/* Two cards — light Waste Heroes style */}
        {/* Two cards — light Waste Heroes style */}
        <div
          className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5 mb-8 animate-slide-up"
          style={{ animationDelay: "0.25s" }}
        >
          {/* Primary card */}
          <Link
            to="/vendre"
            aria-label="Vendre mes plastiques au kg"
            className="group relative md:col-span-3 overflow-hidden rounded-3xl bg-card border border-border p-6 md:p-7 shadow-[0_18px_44px_-20px_hsl(var(--primary)/0.35),0_2px_6px_hsl(216_16%_19%/0.05)] transition-all duration-300 hover:border-primary/40 hover:shadow-[0_24px_56px_-20px_hsl(var(--primary)/0.45)] hover:scale-[1.015] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <div
              aria-hidden="true"
              className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/15 blur-3xl transition-colors duration-300 group-hover:bg-primary/25"
            />
            <div className="relative flex items-start justify-between mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-[0.2em]">
                <Coins className="w-3 h-3" />
                Service phare
              </span>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="relative">
              <h2 className="font-display font-extrabold text-xl md:text-2xl text-foreground mb-2 leading-tight">
                Vendre mes plastiques
              </h2>
              <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                PET, PEHD, PP, sachets Pure Water transformez vos déchets en{" "}
                <span className="text-secondary font-semibold">
                  revenus immédiats
                </span>
                .
              </p>
              <div className="flex items-center justify-between pt-5 border-t border-border">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                  Catalogue & prix au kg
                </span>
                <span className="inline-flex items-center gap-2 text-primary font-bold text-sm">
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
            className="group relative md:col-span-2 overflow-hidden rounded-3xl bg-card border border-border p-6 md:p-7 shadow-[0_18px_44px_-20px_hsl(var(--secondary)/0.3),0_2px_6px_hsl(216_16%_19%/0.05)] transition-all duration-300 hover:border-secondary/40 hover:shadow-[0_24px_56px_-20px_hsl(var(--secondary)/0.45)] hover:scale-[1.015] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            <div
              aria-hidden="true"
              className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-secondary/15 blur-3xl transition-colors duration-300 group-hover:bg-secondary/25"
            />
            <div className="relative flex items-start justify-between mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-foreground/70 text-[10px] font-bold uppercase tracking-[0.2em] border border-border">
                Déchets ménagers
              </span>
              <div className="w-12 h-12 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary">
                <Truck className="w-5 h-5" />
              </div>
            </div>
            <div className="relative">
              <h2 className="font-display font-extrabold text-xl md:text-2xl text-foreground mb-2 leading-tight">
                Faire enlever mes déchets
              </h2>
              <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                Enlèvement à domicile : Déchets ménagers, organiques, encombrants.
              </p>
              <div className="flex items-center justify-between pt-5 border-t border-border">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                  Faites enlever vos déchets
                </span>
                <span className="inline-flex items-center gap-2 text-secondary font-bold text-sm">
                  Demander
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Alert pill — left aligned */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Link
            to="/alerte"
            aria-label="Signaler un dépotoir sauvage"
            className="group inline-flex items-center gap-3 px-5 py-3 rounded-full bg-destructive/10 border border-destructive/30 backdrop-blur-md transition-all hover:bg-destructive/15 hover:border-destructive/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
          >
            <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
            <span className="text-foreground font-bold text-sm">Signaler un dépotoir sauvage</span>
            <span className="hidden sm:inline text-muted-foreground text-xs">(ponts, caniveaux, terrains)</span>
            <ArrowRight className="w-4 h-4 text-foreground/60 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Meta indicators — left aligned */}
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/65 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            2 500+ kg de plastiques collectés
          </span>
          <span className="hidden sm:inline text-foreground/30">·</span>
          <a
            href="tel:+22897684030"
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
          >
            <Phone className="w-3.5 h-3.5" />
            +228 97 68 40 30
          </a>
          <span className="hidden sm:inline text-foreground/30">·</span>
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
                    "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 " +
                    (active ? "w-8 bg-primary" : "w-2 bg-foreground/20 hover:bg-foreground/40")
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
