import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  Phone,
  MapPin,
  AlertTriangle,
  CheckCircle2,
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
      className="relative w-full overflow-hidden pt-16 md:pt-24 bg-foreground"
    >
      {/* Background carousel */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
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
              (i === current ? "opacity-50" : "opacity-0")
            }
          />
        ))}
        {/* Institutional vignette — sombre bas, lisibilité maximale */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/85 to-foreground/45" />
        {/* Voile vert très léger pour ancrer la marque */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.12),transparent_70%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-6 max-w-7xl py-10 sm:py-14 md:py-20 flex flex-col items-center">
        {/* Alert pill — top accent */}
        <div className="mb-8 sm:mb-10 animate-slide-up">
          <Link
            to="/alerte"
            aria-label="Signaler un dépotoir sauvage"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/90 backdrop-blur-md border border-secondary/40 text-secondary-foreground text-xs sm:text-sm font-semibold shadow-xl transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <AlertTriangle className="w-3.5 h-3.5" />
            Signaler un dépotoir sauvage
            <span className="hidden sm:inline opacity-80 font-normal">(ponts, caniveaux, terrains)</span>
          </Link>
        </div>

        {/* Hero header — editorial center */}
        <div className="text-center max-w-4xl mb-10 sm:mb-12 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <span className="text-primary font-semibold tracking-[0.22em] uppercase text-[11px] sm:text-xs mb-4 block">
            Bienvenue sur {BRAND}
          </span>
          <h1
            className="text-white text-[28px] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] mb-6 font-bold"
            style={{ fontFamily: "'Merriweather', Georgia, serif" }}
          >
            Faites collecter vos déchets ménagers{" "}
            <span className="text-primary">et vendez vos plastiques</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Choisissez votre parcours : <strong className="font-semibold text-white">vendez vos plastiques au kg</strong>{" "}
            ou <strong className="font-semibold text-white">demandez un enlèvement</strong> de vos déchets ménagers en quelques clics.
          </p>
        </div>

        {/* CTA Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full max-w-5xl mb-12 sm:mb-16 animate-slide-up"
          style={{ animationDelay: "0.15s" }}
        >
          {/* Card 1: Vendre */}
          <Link
            to="/vendre"
            aria-label="Vendre mes plastiques au kg"
            className="group relative bg-card/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_-20px_hsl(var(--primary)/0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                Service phare
              </span>
              <div className="p-3 bg-primary rounded-xl text-primary-foreground shadow-lg shadow-primary/30">
                <ShoppingBag className="w-5 h-5" strokeWidth={2} />
              </div>
            </div>
            <h2 className="text-foreground text-xl sm:text-2xl font-extrabold mb-3 leading-tight">
              Vendre mes plastiques
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-8 flex-grow leading-relaxed">
              PET, PEHD, PP, sachets Pure Water transformez vos déchets en revenus immédiats.
            </p>
            <div className="pt-6 border-t border-border flex items-center justify-between gap-4">
              <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider leading-tight">
                Catalogue & prix au kg
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg shadow-md transition-all group-hover:shadow-lg group-hover:gap-3 text-sm">
                Vendre maintenant
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Card 2: Enlèvement */}
          <Link
            to="/enlevement"
            aria-label="Demander un enlèvement de déchets ménagers"
            className="group relative bg-card/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_-20px_hsl(var(--foreground)/0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-muted text-foreground/70 text-[10px] font-bold uppercase tracking-wider rounded-full border border-border">
                Déchets ménagers
              </span>
              <div className="p-3 bg-foreground rounded-xl text-background shadow-lg">
                <Truck className="w-5 h-5" strokeWidth={2} />
              </div>
            </div>
            <h2 className="text-foreground text-xl sm:text-2xl font-extrabold mb-3 leading-tight">
              Faire enlever mes déchets
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-8 flex-grow leading-relaxed">
              Enlèvement à domicile : Déchets ménagers, organiques, encombrants.
            </p>
            <div className="pt-6 border-t border-border flex items-center justify-between gap-4">
              <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider leading-tight">
                Faites enlever vos déchets
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background font-semibold rounded-lg shadow-md transition-all group-hover:shadow-lg group-hover:gap-3 text-sm">
                Demander
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>

        {/* Meta Footer — institutional fiche-pays */}
        <div
          className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-white/10 animate-slide-up"
          style={{ animationDelay: "0.25s" }}
        >
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0">
              <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <div className="text-white text-lg font-bold leading-tight">2 500+ kg</div>
              <div className="text-white/55 text-[10px] uppercase tracking-[0.18em] font-semibold mt-0.5">
                plastiques collectés
              </div>
            </div>
          </div>

          <a
            href="tel:+22897684030"
            className="flex items-center gap-4 justify-center sm:justify-start hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
          >
            <div className="w-11 h-11 rounded-xl bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary shrink-0">
              <Phone className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <div className="text-white text-lg font-bold leading-tight">+228 97 68 40 30</div>
              <div className="text-white/55 text-[10px] uppercase tracking-[0.18em] font-semibold mt-0.5">
                Support direct
              </div>
            </div>
          </a>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white/80 shrink-0">
              <MapPin className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <div className="text-white text-lg font-bold leading-tight">Kara, Togo</div>
              <div className="text-white/55 text-[10px] uppercase tracking-[0.18em] font-semibold mt-0.5">
                Siège opérationnel
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        {!reduceMotion && (
          <div
            role="tablist"
            aria-label="Visuels d'arrière-plan"
            className="flex items-center justify-center gap-2 mt-10"
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
                    "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground " +
                    (active ? "w-8 bg-primary" : "w-2 bg-white/25 hover:bg-white/50")
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
