import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ShoppingBag, Truck, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import purWater from "@/assets/hero/pur_water.jpg";
import petPlastique from "@/assets/hero/pet_plastique.png";
import ppPlastique from "@/assets/hero/pp_plastique.png";
import chaisesPlastique from "@/assets/hero/chaises_plastique.jpg";
import pvcTuyaux from "@/assets/hero/pvc_tuyaux.jpg";

const slides = [purWater, petPlastique, ppPlastique, chaisesPlastique, pvcTuyaux];

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
    <section className="relative min-h-[85vh] md:min-h-[92vh] flex items-center overflow-hidden pt-16 md:pt-20">
      {/* Background slides — start below the navbar */}
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 bottom-0 top-16 md:top-20 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={src}
            alt={`Type de plastique ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-[2]" />

      {/* Content */}
      <div className="relative z-[3] container mx-auto px-4 pb-10 md:pb-16 pt-28 md:pt-32 text-center flex flex-col items-center">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-black/50 text-white border border-white/30 mb-4 animate-slide-up backdrop-blur-md shadow-lg">
            Bienvenue sur RECYC HUB TOGO
          </span>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 text-white animate-slide-up" style={{ animationDelay: "0.05s" }}>
            Faites collecter vos déchets ménagers et{" "}
            <span className="text-accent">vendez vos plastiques</span>{" "}
            en quelques clics
          </h1>

          <p
            className="text-base sm:text-lg text-white/75 leading-relaxed max-w-xl mx-auto mb-8 animate-slide-up"
            style={{ animationDelay: "0.15s" }}
          >
            Demandez un enlèvement ou vendez vos plastiques à{" "}
            <strong className="text-white">  au kg</strong>.
            Simple, rapide et disponible partous à Kara.
          </p>

          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-6 animate-slide-up"
            style={{ animationDelay: "0.25s" }}
          >
            <Link
              to="/vendre"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl gradient-bio text-white font-bold text-base uppercase tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Vendre mes plastiques
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/enlevement"
              className="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/30 text-white font-semibold text-sm uppercase tracking-wide transition-all duration-300 hover:bg-white/10 hover:border-white/50 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <Truck className="w-5 h-5" />
              Demander un enlèvement
            </Link>
          </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-slide-up"
            style={{ animationDelay: "0.35s" }}
          >
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-semibold text-sm shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              2 500+ kg de plastiques collectés
            </span>
            <a
              href="tel:+22897684030"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-semibold text-sm shadow-lg hover:bg-accent/20 hover:border-accent/40 transition-all"
            >
              <Phone className="w-4 h-4 text-accent" />
              +228 97 68 40 30
            </a>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-3 mt-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
<<<<<<< HEAD
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? "w-8 bg-accent" : "w-4   bg-white/30 hover:bg-white/50"
=======
              className={`rounded-full transition-all duration-500 ${
                i === current ? "w-10 h-2.5 bg-accent shadow-lg shadow-accent/40" : "w-6 h-2.5 bg-white/40 hover:bg-white/60"
>>>>>>> 7dfe15e137fff126540d47e8813f30e9590e49fa
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
