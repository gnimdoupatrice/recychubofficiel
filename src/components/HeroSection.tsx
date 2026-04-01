import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ShoppingBag, Truck, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import purWater from "@/assets/hero/pur_water.jpg";
import petPlastique from "@/assets/hero/pet_plastique.png";
import ppPlastique from "@/assets/hero/pp_plastique.png";
import chaisesPlastique from "@/assets/hero/chaises_plastique.jpg";
import pvcTuyaux from "@/assets/hero/pvc_tuyaux.jpg";

const slides = [purWater, petPlastique, ppPlastique, chaisesPlastique, pvcTuyaux];

const stats = [
  { value: "2 500+", label: "kg collectés" },
  { value: "150+", label: "ménages servis" },
  { value: "100%", label: "recyclage local" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [goNext]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background slides */}
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1.5s] ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={src}
            alt={`Type de plastique ${i + 1}`}
            className="w-full h-full object-cover scale-105"
          />
        </div>
      ))}

      {/* Dark overlay — Worky-style deep overlay */}
      <div className="absolute inset-0 bg-black/70 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-[2]" />

      {/* Centered content */}
      <div className="relative z-[3] container mx-auto px-4 text-center flex flex-col items-center pt-24">
        {/* Small label */}
        <span className="inline-block px-5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] border border-accent/40 text-accent bg-accent/10 mb-8 animate-slide-up">
          Recyclage · Collecte · Rachat
        </span>

        {/* Main title — uppercase, spaced, Worky architectural style */}
        <h1
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-[0.08em] leading-[1.1] text-white mb-6 animate-slide-up"
          style={{ animationDelay: "0.08s" }}
        >
          Nous construisons
          <br />
          <span className="text-gradient-warm inline-block mt-1">un Kara plus propre</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-sm sm:text-base md:text-lg text-white/60 max-w-xl leading-relaxed mb-10 animate-slide-up font-body"
          style={{ animationDelay: "0.18s" }}
        >
          Faites collecter vos déchets ménagers et vendez vos plastiques au kg.
          <br className="hidden sm:block" />
          Simple, rapide et disponible partout à Kara.
        </p>

        {/* CTAs — Worky style: uppercase, letter-spacing, bordered */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 mb-12 animate-slide-up"
          style={{ animationDelay: "0.28s" }}
        >
          <Link
            to="/vendre"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-none bg-secondary text-secondary-foreground font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-secondary/30 active:scale-[0.98]"
          >
            <ShoppingBag className="w-5 h-5" />
            Vendre mes plastiques
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            to="/enlevement"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-none border-2 border-white/40 text-white font-semibold text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white/10 hover:border-white/70 active:scale-[0.98]"
          >
            <Truck className="w-5 h-5" />
            Demander un enlèvement
          </Link>
        </div>

        {/* Phone */}
        <a
          href="tel:+22897684030"
          className="flex items-center gap-2 text-white/40 hover:text-accent text-xs uppercase tracking-[0.15em] transition-colors mb-10 animate-slide-up"
          style={{ animationDelay: "0.35s" }}
        >
          <Phone className="w-4 h-4" />
          +228 97 68 40 30
        </a>

        {/* Slide indicators */}
        <div className="flex gap-2.5 mb-12 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === current ? "w-10 bg-secondary" : "w-5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom stats bar — like Worky's footer strip */}
      <div className="absolute bottom-0 left-0 right-0 z-[4] bg-black/50 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto px-4 py-5 flex items-center justify-center gap-8 sm:gap-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span className="block text-xl sm:text-2xl md:text-3xl font-display font-black text-white tracking-tight">
                {stat.value}
              </span>
              <span className="block text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
