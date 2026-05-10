import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ShoppingBag, Truck, Phone, MapPin, AlertTriangle, Coins, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import purWater from "@/assets/hero/pur_water.jpg";
import petPlastique from "@/assets/hero/pet_plastique.png";
import ppPlastique from "@/assets/hero/pp_plastique.png";
import chaisesPlastique from "@/assets/hero/chaises_plastique.jpg";
import pvcTuyaux from "@/assets/hero/pvc_tuyaux.jpg";

const slides = [purWater, petPlastique, ppPlastique, chaisesPlastique, pvcTuyaux];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  // Respect prefers-reduced-motion + pause carrousel sur mobile
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (mq.matches || isMobile) return;
    const id = setInterval(goNext, 6000);
    return () => clearInterval(id);
  }, [goNext]);

  return (
    <section
      className="relative min-h-[92vh] md:min-h-[95vh] flex items-center overflow-hidden pt-16 md:pt-20"
      aria-label="Présentation des services RECYC HUB TOGO"
    >
      {/* Background slides */}
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 bottom-0 top-16 md:top-20 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden="true"
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={i === 0 ? "high" : "low"}
          />
        </div>
      ))}

      {/* Overlay sombre uniforme — contraste WCAG AA */}
      <div className="absolute inset-0 bg-foreground/85 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/60 z-[2]" />

      {/* Content */}
      <div className="relative z-[3] container mx-auto px-4 pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">

          {/* Eyebrow Gutenberg sur fond sombre */}
          <div className="flex justify-center mb-6 animate-slide-up">
            <span className="wp-eyebrow wp-eyebrow-light">
              Bienvenue sur RECYC HUB TOGO
            </span>
          </div>

          {/* Titre principal */}
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight text-center text-white mb-6 animate-slide-up"
            style={{ animationDelay: "0.05s" }}
          >
            Faites collecter vos déchets ménagers
            <br className="hidden sm:block" />
            <span className="text-secondary">
              {" "}et vendez vos plastiques.
            </span>
          </h1>

          <p
            className="text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto mb-12 text-center animate-slide-up"
            style={{ animationDelay: "0.15s" }}
          >
            Choisissez votre parcours : <strong className="text-white">vendez vos plastiques</strong> au kg
            ou <strong className="text-white">faites enlever vos déchets ménagers</strong> en quelques clics.
            Disponible partout à Kara.
          </p>

          {/* ═══ Deux blocs Gutenberg — parcours utilisateurs ═══ */}
          <div
            className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-7 max-w-5xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.25s" }}
          >
            {/* Bloc 1 — RACHAT (3/5) */}
            <Link
              to="/vendre"
              className="group relative md:col-span-3 wp-card-dark-accent p-6 md:p-8 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
              aria-label="Vendre mes plastiques au kg"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-secondary-foreground">
                  <Coins className="w-3.5 h-3.5" />
                  Service phare
                </span>
                <div className="w-12 h-12 bg-secondary-foreground text-secondary flex items-center justify-center border-2 border-secondary-foreground">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-secondary-foreground mb-3 leading-tight uppercase tracking-tight">
                Vendre mes plastiques
              </h2>
              <p className="text-sm md:text-base text-secondary-foreground/85 leading-relaxed mb-6">
                Transformez vos PET, PEHD, PP et sachets Pure Water en revenus.
                <span className="block mt-1 font-bold">
                  Jusqu'à 150 FCFA/kg — Mobile Money ou cash.
                </span>
              </p>

              <div className="flex items-center justify-between border-t-2 border-secondary-foreground/20 pt-4">
                <span className="text-[10px] text-secondary-foreground/70 uppercase tracking-[0.18em] font-bold">
                  Catalogue & prix au kg
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-secondary-foreground group-hover:translate-x-1 transition-transform">
                  Vendre
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Bloc 2 — ENLÈVEMENT (2/5) */}
            <Link
              to="/enlevement"
              className="group relative md:col-span-2 wp-card-dark p-6 md:p-8 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
              aria-label="Demander un enlèvement de déchets ménagers"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white">
                  <Truck className="w-3.5 h-3.5" />
                  Logistique
                </span>
                <div className="w-12 h-12 bg-white text-foreground flex items-center justify-center border-2 border-white">
                  <Truck className="w-6 h-6" />
                </div>
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight uppercase tracking-tight">
                Faire enlever mes déchets
              </h2>
              <p className="text-sm md:text-base text-white/85 leading-relaxed mb-6">
                Service d'enlèvement à domicile pour vos déchets ménagers, organiques et encombrants.
              </p>

              <div className="flex items-center justify-between border-t-2 border-white/20 pt-4">
                <span className="text-[10px] text-white/70 uppercase tracking-[0.18em] font-bold">
                  Domicile · Kara
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white group-hover:translate-x-1 transition-transform">
                  Demander
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>

          {/* CTA tertiaire — Alerte dépotoir, en bouton bloc */}
          <div
            className="flex justify-center mb-10 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/alerte"
              className="wp-btn-outline-light hover:bg-destructive hover:border-destructive hover:text-destructive-foreground"
            >
              <AlertTriangle className="w-4 h-4" />
              Signaler un dépotoir sauvage
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Méta-indicateurs */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.15em] font-semibold text-white/70 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-secondary animate-pulse" />
              2 500+ kg collectés
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <a
              href="tel:+22897684030"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +228 97 68 40 30
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Kara, Togo
            </span>
          </div>

          {/* Slide indicators — barres carrées */}
          {!reduceMotion && (
            <div
              className="flex justify-center gap-2 mt-10 animate-slide-up"
              style={{ animationDelay: "0.5s" }}
              role="tablist"
              aria-label="Visuels d'illustration"
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Visuel ${i + 1} sur ${slides.length}`}
                  className={`h-1 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${
                    i === current ? "w-10 bg-secondary" : "w-3 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
