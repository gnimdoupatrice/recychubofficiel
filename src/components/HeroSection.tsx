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

      {/* Overlay gradient renforcé pour lisibilité mobile */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/65 to-primary/40 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 z-[2]" />

      {/* Content */}
      <div className="relative z-[3] container mx-auto px-4 pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] bg-white/10 text-white border border-white/20 backdrop-blur-md shadow-lg animate-slide-up">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              Bienvenue sur RECYC HUB TOGO
            </span>
          </div>

          {/* Titre principal — neutre, double promesse */}
          <h1
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-center text-white mb-5 animate-slide-up"
            style={{ animationDelay: "0.05s" }}
          >
            Faites collecter vos déchets ménagers et 
            <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-secondary to-accent">
              {" "}vendez vos plastiques en quelques clics.
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

          {/* ═══ Deux cartes glassmorphism — parcours utilisateurs ═══ */}
          <div
            className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5 max-w-5xl mx-auto mb-8 animate-slide-up"
            style={{ animationDelay: "0.25s" }}
          >
            {/* Carte 1 — RACHAT (mise en avant : 3/5) */}
            <Link
              to="/vendre"
              className="group relative md:col-span-3 rounded-3xl bg-white/12 backdrop-blur-2xl border border-white/25 p-6 md:p-7 shadow-2xl shadow-black/40 hover:bg-white/20 hover:border-secondary/50 hover:scale-[1.015] active:scale-[0.99] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 overflow-hidden"
              aria-label="Vendre mes plastiques au kg"
            >
              {/* Glow accent */}
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-secondary/30 blur-3xl group-hover:bg-secondary/50 transition-colors" />

              <div className="relative flex items-start justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary/90 text-secondary-foreground text-[10px] font-extrabold uppercase tracking-widest">
                  <Coins className="w-3 h-3" />
                  Service phare
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
              </div>

              <h2 className="font-display text-xl md:text-2xl font-extrabold text-white mb-2 leading-tight">
                Vendre mes plastiques
              </h2>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Transformez vos PET, PEHD, PP et sachets Pure Water en revenus.
                <span className="block mt-1 font-semibold text-secondary">
                  Jusqu'à 150 FCFA/kg — Mobile Money ou cash.
                </span>
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60 uppercase tracking-wider font-semibold">
                  Catalogue & prix au kg
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                  Vendre maintenant
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Carte 2 — ENLÈVEMENT (secondaire : 2/5) */}
            <Link
              to="/enlevement"
              className="group relative md:col-span-2 rounded-3xl bg-white/8 backdrop-blur-2xl border border-white/20 p-6 md:p-7 shadow-2xl shadow-black/40 hover:bg-white/15 hover:border-accent/50 hover:scale-[1.015] active:scale-[0.99] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 overflow-hidden"
              aria-label="Demander un enlèvement de déchets ménagers"
            >
              <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-accent/25 blur-3xl group-hover:bg-accent/40 transition-colors" />

              <div className="relative flex items-start justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/25 text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-md">
                  <Truck className="w-3 h-3" />
                  Logistique
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
              </div>

              <h2 className="font-display text-xl md:text-2xl font-extrabold text-white mb-2 leading-tight">
                Faire enlever mes déchets
              </h2>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Service d'enlèvement à domicile pour vos déchets ménagers, organiques et encombrants.
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60 uppercase tracking-wider font-semibold">
                  Domicile · Kara
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                  Demander un enlèvement
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
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-destructive/15 backdrop-blur-md border border-destructive/40 text-white text-sm font-semibold hover:bg-destructive/25 hover:border-destructive/60 transition-all focus-visible:ring-2 focus-visible:ring-destructive"
            >
              <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
              Signaler un dépotoir sauvage
              <span className="hidden sm:inline text-white/70 text-xs font-normal">— ponts, caniveaux, terrains</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Méta-indicateurs (texte discret, pas en pill) */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/65 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              2 500+ kg de plastiques collectés
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

          {/* Slide indicators — accessibles */}
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
                  className={`h-1.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none ${
                    i === current ? "w-8 bg-secondary" : "w-2 bg-white/40 hover:bg-white/60"
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
