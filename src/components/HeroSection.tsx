import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Activity,
  ShieldCheck,
  Globe2,
  TrendingUp,
} from "lucide-react";

import slide1 from "@/assets/hero/hero-1-sorting.jpg";
import slide2 from "@/assets/hero/hero-2-pickup.jpg";
import slide3 from "@/assets/hero/hero-3-payment.jpg";
import slide4 from "@/assets/hero/hero-4-depot.jpg";
import slide5 from "@/assets/hero/hero-5-cleanup.jpg";

const SLIDES = [slide1, slide2, slide3, slide4, slide5];

const LIVE_STATS = [
  { icon: TrendingUp, value: "2 540 t", label: "déchets valorisés" },
  { icon: Activity, value: "850+", label: "ménages actifs" },
  { icon: Globe2, value: "12", label: "communes couvertes" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(motionMql.matches);
    update();
    motionMql.addEventListener("change", update);

    if (motionMql.matches) {
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
      aria-label="RECYHUB — Infrastructure numérique de gestion intelligente des déchets"
      className="relative min-h-[94vh] overflow-hidden pt-16"
    >
      {/* Background carousel */}
      <div className="absolute inset-0" aria-hidden="true">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
            className={
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] " +
              (i === current ? "opacity-100" : "opacity-0")
            }
          />
        ))}
      </div>

      {/* Institutional overlay */}
      <div
        className="absolute inset-0 z-[2]"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(115deg, hsl(222 47% 11% / 0.92) 0%, hsl(152 70% 15% / 0.82) 45%, hsl(142 71% 30% / 0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[3] container mx-auto px-6 max-w-7xl py-14 md:py-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left column */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white/90 text-[11px] font-bold uppercase tracking-[0.2em] reveal-up">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
              ClimateTech · GovTech · Smart City
            </span>

            <h1
              className="mt-6 font-display font-black text-white leading-[1.04] tracking-tight text-4xl sm:text-5xl lg:text-6xl reveal-up"
              style={{ animationDelay: "0.05s" }}
            >
              L'infrastructure numérique africaine de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-[hsl(48_95%_60%)]">
                gestion intelligente des déchets
              </span>
            </h1>

            <p
              className="mt-6 text-white/85 text-base md:text-lg max-w-2xl leading-relaxed reveal-up"
              style={{ animationDelay: "0.12s" }}
            >
              Optimisation des tournées, valorisation des déchets, données territoriales,
              engagement citoyen et compétences vertes — une plateforme unique pour des
              villes plus propres et plus intelligentes.
            </p>

            <div
              className="mt-9 flex flex-wrap items-center gap-4 reveal-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Link
                to="/vendre"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-premium transition-all hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Découvrir la plateforme
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/solution-pro#demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md text-white font-bold text-sm transition-all hover:bg-white/20"
              >
                <Play className="w-4 h-4 text-secondary" />
                Demander une démo
              </Link>
            </div>
          </div>

          {/* Right column — live stats panel */}
          <div
            className="lg:col-span-5 reveal-up"
            style={{ animationDelay: "0.28s" }}
          >
            <div className="rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 p-6 md:p-7 shadow-premium">
              <div className="flex items-center gap-2 mb-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
                </span>
                <span className="text-white/70 text-[11px] font-bold uppercase tracking-[0.2em]">
                  Données temps réel
                </span>
              </div>

              <div className="space-y-3">
                {LIVE_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-4 rounded-2xl bg-white/[0.06] border border-white/10 p-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/25 flex items-center justify-center text-white shrink-0">
                      <s.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white font-display font-black text-2xl leading-none">
                        {s.value}
                      </div>
                      <div className="text-white/60 text-xs mt-1">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                <span>Kara · Togo</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Indicateurs consolidés
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        {!reduceMotion && (
          <div
            role="tablist"
            aria-label="Visuels d'arrière-plan"
            className="flex items-center gap-2 mt-12"
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
                    "h-1.5 rounded-full transition-all duration-300 " +
                    (active ? "w-8 bg-secondary" : "w-2 bg-white/40 hover:bg-white/60")
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
