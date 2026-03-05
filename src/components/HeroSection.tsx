import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg1 from "@/assets/hero-recycling.jpg";
import heroImg2 from "@/assets/hero-slide-2.jpg";
import heroImg3 from "@/assets/hero-slide-3.jpg";

const slides = [heroImg1, heroImg2, heroImg3];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  const goNext = useCallback(() => {
    setPrev(current);
    setCurrent((c) => (c + 1) % slides.length);
  }, [current]);

  useEffect(() => {
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [goNext]);

  // Clear prev after transition
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 1000);
    return () => clearTimeout(t);
  }, [prev]);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-end overflow-hidden">
      {/* Sliding BG images */}
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/60 to-foreground/30 z-[2]" />

      {/* Content */}
      <div className="relative z-[3] container mx-auto px-4 pb-12 md:pb-20 pt-32">
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-primary-foreground animate-slide-up">
            Recyclez vos déchets,{" "}
            <span className="text-accent">Gagnez de l'argent</span> —{" "}
            Solutions durables pour un Kara plus vert
          </h1>

          {/* Description card */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            {/* Stat card */}
            <div className="glass rounded-2xl px-5 py-4 flex items-center gap-4 shrink-0">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold ring-2 ring-background">RH</div>
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold ring-2 ring-background">TG</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-foreground">2 500+</div>
                <div className="text-xs text-muted-foreground">Kg collectés</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-primary-foreground/80 leading-relaxed max-w-lg">
              Chaque déchet que nous collectons et recyclons contribue à un environnement plus sain.
              Avec <strong className="text-primary-foreground">RECYC HUB TOGO</strong>, adoptez{" "}
              <strong className="text-accent">des pratiques éco-responsables</strong> et transformez
              vos plastiques en revenus…
            </p>
          </div>

          {/* CTA + Trust */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/vendre"
              className="shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg gradient-bio text-primary-foreground font-semibold text-base uppercase tracking-wide transition-transform hover:scale-105 glow-emerald"
            >
              <ShoppingBag className="w-5 h-5" />
              Vendre maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Trust score */}
            <div className="text-right">
              <p className="text-sm font-semibold text-accent">
                Score de confiance 4,5 (basé sur 300 avis)
              </p>
              <div className="flex justify-end gap-0.5 mt-1">
                {[1, 2, 3, 4].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-accent text-accent" />
                ))}
                <Star className="w-4 h-4 fill-accent/40 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPrev(current); setCurrent(i); }}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? "w-8 bg-accent" : "w-4 bg-primary-foreground/40"
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
