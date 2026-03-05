import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ShoppingBag, Truck, Star, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg1 from "@/assets/hero-recycling.jpg";
import heroImg2 from "@/assets/hero-slide-2.jpg";
import heroImg3 from "@/assets/hero-slide-3.jpg";

const slides = [
  { src: heroImg1, label: "Collecte terrain" },
  { src: heroImg2, label: "Tri des plastiques" },
  { src: heroImg3, label: "Impact communautaire" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (index === current || isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [current, isTransitioning]);

  const goNext = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const id = setInterval(goNext, 6000);
    return () => clearInterval(id);
  }, [goNext]);

  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex items-end overflow-hidden">
      {/* Background images with Ken Burns effect */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1.2s] ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
        >
          <img
            src={slide.src}
            alt={`Recyc Hub Togo – ${slide.label}`}
            className={`w-full h-full object-cover transition-transform duration-[8s] ease-out ${
              i === current ? "scale-105" : "scale-100"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 z-[2]" style={{
        background: "linear-gradient(to top, hsl(160 30% 5% / 0.92) 0%, hsl(160 30% 5% / 0.65) 40%, hsl(160 30% 5% / 0.35) 70%, hsl(160 30% 5% / 0.2) 100%)"
      }} />

      {/* Content */}
      <div className="relative z-[3] container mx-auto px-4 pb-10 md:pb-16 pt-28 md:pt-32">
        <div className="max-w-3xl space-y-5">
          {/* Tagline badge */}
          <div className="animate-slide-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/25 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-accent tracking-wide uppercase">
              Bienvenue sur Recyc Hub Togo
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold leading-[1.1] text-primary-foreground animate-slide-up"
            style={{ animationDelay: "0.08s" }}
          >
            Votre solution pour{" "}
            <span className="text-accent">gérer vos déchets</span>,{" "}
            vendre vos plastiques et{" "}
            <span className="relative inline-block">
              <span className="text-accent">optimiser vos collectes</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M2 6C50 2 150 2 198 6" stroke="hsl(160 84% 39%)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-sm sm:text-base lg:text-lg text-primary-foreground/75 leading-relaxed max-w-xl animate-slide-up"
            style={{ animationDelay: "0.16s" }}
          >
            Chaque déchet collecté et recyclé contribue à un <strong className="text-primary-foreground">Kara plus propre</strong>.
            Transformez vos plastiques en revenus avec <strong className="text-accent">Recyc Hub Togo</strong>.
          </p>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-3 animate-slide-up"
            style={{ animationDelay: "0.22s" }}
          >
            {[
              { value: "2 500+", unit: "Kg collectés" },
              { value: "55", unit: "FCFA / Kg" },
              { value: "300+", unit: "Utilisateurs" },
            ].map((stat) => (
              <div
                key={stat.unit}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-primary-foreground/8 backdrop-blur-sm border border-primary-foreground/10"
              >
                <span className="font-display text-xl sm:text-2xl font-bold text-accent">{stat.value}</span>
                <span className="text-xs text-primary-foreground/60 leading-tight">{stat.unit}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 pt-2 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/vendre"
              className="shimmer inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl gradient-bio text-primary-foreground font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_hsl(160_84%_39%/0.35)] active:scale-[0.98]"
            >
              <ShoppingBag className="w-5 h-5" />
              Vendre mes plastiques
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/enlever"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:bg-primary-foreground/10 hover:border-primary-foreground/50 active:scale-[0.98]"
            >
              <Truck className="w-5 h-5" />
              Demander un enlèvement
            </Link>

            <a
              href="tel:+22897684030"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-primary-foreground/15 text-primary-foreground/70 text-sm transition-all hover:text-primary-foreground hover:border-primary-foreground/30"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Appelez-nous</span>
            </a>
          </div>

          {/* Trust */}
          <div className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: "0.38s" }}>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-accent text-accent" />
              ))}
              <Star className="w-3.5 h-3.5 fill-accent/30 text-accent" />
            </div>
            <span className="text-xs text-primary-foreground/50">
              4,5/5 — basé sur 300 avis
            </span>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center gap-2 mt-8 animate-slide-up" style={{ animationDelay: "0.42s" }}>
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-500 rounded-full ${
                i === current
                  ? "w-10 h-1.5 bg-accent"
                  : "w-3 h-1.5 bg-primary-foreground/25 hover:bg-primary-foreground/40"
              }`}
              aria-label={`Slide ${i + 1}: ${slide.label}`}
            />
          ))}
          <span className="ml-3 text-[11px] text-primary-foreground/30 font-medium tracking-wider">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
