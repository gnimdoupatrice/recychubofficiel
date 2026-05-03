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

      {/* Overlay — solid noir éditorial */}
      <div className="absolute inset-0 bg-black/75 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[2]" />

      {/* Content */}
      <div className="relative z-[3] container mx-auto px-4 pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">

          {/* Eyebrow Gutenberg */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.25em] bg-secondary text-secondary-foreground border-2 border-secondary animate-slide-up">
              <Sparkles className="w-3.5 h-3.5" />
              Bienvenue sur RECYC HUB TOGO
            </span>
          </div>

          {/* Titre principal */}
          <h1
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-center text-white mb-5 animate-slide-up uppercase"
            style={{ animationDelay: "0.05s" }}
          >
            Faites collecter vos déchets ménagers et
            <br className="hidden sm:block" />
            <span className="bg-secondary text-secondary-foreground px-2 inline-block mt-2 border-2 border-secondary">
              vendez vos plastiques en quelques clics.
            </span>
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto mb-10 text-center animate-slide-up"
            style={{ animationDelay: "0.15s" }}
          >
            Choisissez votre parcours : <strong className="text-white">vendez vos plastiques</strong> au kg
            ou <strong className="text-white">faites enlever vos déchets ménagers</strong> en quelques clics.
            Disponible partout à Kara.
          </p>

          {/* ═══ Deux cartes BLOC GUTENBERG ═══ */}
          <div
            className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-6 max-w-5xl mx-auto mb-8 animate-slide-up"
            style={{ animationDelay: "0.25s" }}
          >
            {/* Carte 1 — RACHAT (3/5) */}
            <Link
              to="/vendre"
              className="group relative md:col-span-3 bg-background border-2 border-white p-6 md:p-7 transition-all duration-200 hover:translate-x-[-3px] hover:translate-y-[-3px] focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{ boxShadow: "8px 8px 0 0 hsl(var(--secondary))" }}
              aria-label="Vendre mes plastiques au kg"
            >
              <div className="relative flex items-start justify-between mb-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary text-secondary-foreground border-2 border-foreground text-[10px] font-extrabold uppercase tracking-[0.2em]">
                  <Coins className="w-3 h-3" />
                  Service phare
                </div>
                <div className="w-12 h-12 bg-primary text-primary-foreground border-2 border-foreground flex items-center justify-center" style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground mb-2 leading-tight uppercase">
                Vendre mes plastiques
              </h2>
              <p className="text-sm text-foreground/75 leading-relaxed mb-5">
                Transformez vos PET, PEHD, PP et sachets Pure Water en revenus.
                <span className="block mt-1 font-extrabold text-primary">
                  Jusqu'à 150 FCFA/kg — Mobile Money ou cash.
                </span>
              </p>

              <div className="flex items-center justify-between border-t-2 border-foreground pt-4">
                <span className="text-[10px] text-foreground/60 uppercase tracking-[0.2em] font-extrabold">
                  Catalogue & prix au kg
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.15em] text-primary group-hover:translate-x-1 transition-transform">
                  Vendre
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Carte 2 — ENLÈVEMENT (2/5) */}
            <Link
              to="/enlevement"
              className="group relative md:col-span-2 bg-background border-2 border-white p-6 md:p-7 transition-all duration-200 hover:translate-x-[-3px] hover:translate-y-[-3px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{ boxShadow: "8px 8px 0 0 hsl(var(--accent))" }}
              aria-label="Demander un enlèvement de déchets ménagers"
            >
              <div className="relative flex items-start justify-between mb-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-background text-foreground border-2 border-foreground text-[10px] font-extrabold uppercase tracking-[0.2em]">
                  <Truck className="w-3 h-3" />
                  Logistique
                </div>
                <div className="w-12 h-12 bg-accent text-accent-foreground border-2 border-foreground flex items-center justify-center" style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
                  <Truck className="w-6 h-6" />
                </div>
              </div>

              <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground mb-2 leading-tight uppercase">
                Faire enlever mes déchets
              </h2>
              <p className="text-sm text-foreground/75 leading-relaxed mb-5">
                Service d'enlèvement à domicile pour vos déchets ménagers, organiques et encombrants.
              </p>

              <div className="flex items-center justify-between border-t-2 border-foreground pt-4">
                <span className="text-[10px] text-foreground/60 uppercase tracking-[0.2em] font-extrabold">
                  Domicile · Kara
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.15em] text-accent group-hover:translate-x-1 transition-transform">
                  Demander
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>

          {/* Lien tertiaire — Alerte dépotoir */}
          <div
            className="flex justify-center mb-8 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/alerte"
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-destructive text-destructive-foreground border-2 border-white text-xs font-extrabold uppercase tracking-[0.18em] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]"
              style={{ boxShadow: "4px 4px 0 0 hsl(0 0% 100%)" }}
            >
              <AlertTriangle className="w-4 h-4 animate-pulse" />
              Signaler un dépotoir sauvage
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Méta-indicateurs */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/70 uppercase tracking-wider font-semibold animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 bg-secondary animate-pulse" />
              2 500+ kg collectés
            </span>
            <span className="hidden sm:inline text-white/30">·</span>
            <a
              href="tel:+22897684030"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
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
              className="flex justify-center gap-2 mt-8 animate-slide-up"
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
                  className={`h-2 transition-all duration-300 border-2 border-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none ${
                    i === current ? "w-10 bg-secondary" : "w-4 bg-transparent hover:bg-white/30"
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
