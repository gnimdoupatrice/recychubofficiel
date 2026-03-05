import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ShoppingBag, Truck, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg1 from "@/assets/hero-recycling.jpg";
import heroImg2 from "@/assets/hero-slide-2.jpg";
import heroImg3 from "@/assets/hero-slide-3.jpg";

const slides = [heroImg1, heroImg2, heroImg3];

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
    <section className="relative min-h-[85vh] md:min-h-screen flex items-end overflow-hidden">
      {/* Background slides */}
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img
            src={src}
            alt={`Recyc Hub Togo – activité terrain ${i + 1}`}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Dark overlay — stronger for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/40 z-[2]" />

      {/* Content */}
      <div className="relative z-[3] container mx-auto px-4 pb-10 md:pb-16 pt-28 md:pt-32">
        <div className="max-w-2xl">
          {/* Subtitle badge */}
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-accent/20 text-accent border border-accent/30 mb-4 animate-slide-up">
            Bienvenue sur Recyc Hub Togo
          </span>

          {/* Main headline — concrete, action-oriented */}
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 text-white animate-slide-up" style={{ animationDelay: "0.05s" }}>
            Faites collecter vos déchets ménagers et{" "}
            <span className="text-accent">vendez vos plastiques</span>{" "}
            en quelques clics
          </h1>

          {/* Sub-description — short, benefit-driven */}
          <p
            className="text-base sm:text-lg text-white/75 leading-relaxed max-w-xl mb-8 animate-slide-up"
            style={{ animationDelay: "0.15s" }}
          >
            Demandez un enlèvement ou vendez vos plastiques à{" "}
            <strong className="text-white">55 FCFA/kg</strong>.
            Simple, rapide et disponible dans toute la commune de Kozah.
          </p>







          

          {/* CTA row — one primary (large), one secondary (outline) */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 animate-slide-up"
            style={{ animationDelay: "0.25s" }}
          >
            {/* Primary CTA — largest, most visible */}
            <Link
              to="/vendre"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl gradient-bio text-white font-bold text-base uppercase tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Vendre mes plastiques
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA — ghost/outline */}
            <Link
              to="/enlevement"
              className="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/30 text-white font-semibold text-sm uppercase tracking-wide transition-all duration-300 hover:bg-white/10 hover:border-white/50 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <Truck className="w-5 h-5" />
              Demander un enlèvement
            </Link>
          </div>

          {/* Trust line + phone */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-white/60 animate-slide-up"
            style={{ animationDelay: "0.35s" }}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              2 500+ kg de plastiques collectés
            </span>
            <a
              href="tel:+22890123456"
              className="flex items-center gap-1.5 text-white/60 hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              +228 90 12 34 56
            </a>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? "w-8 bg-accent" : "w-4 bg-white/30 hover:bg-white/50"
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
