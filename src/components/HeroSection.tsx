import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ShoppingBag, Truck, Phone, Recycle, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import purWater from "@/assets/hero/pur_water.jpg";
import petPlastique from "@/assets/hero/pet_plastique.png";
import ppPlastique from "@/assets/hero/pp_plastique.png";
import chaisesPlastique from "@/assets/hero/chaises_plastique.jpg";
import pvcTuyaux from "@/assets/hero/pvc_tuyaux.jpg";

const slides = [
  { src: purWater, label: "Bouteilles PUR Water" },
  { src: petPlastique, label: "Plastique PET" },
  { src: ppPlastique, label: "Plastique PP" },
  { src: chaisesPlastique, label: "Chaises plastique" },
  { src: pvcTuyaux, label: "Tuyaux PVC" },
];

const stats = [
  { value: "2 500+", label: "kg collectés", icon: Recycle },
  { value: "150+", label: "ménages servis", icon: MapPin },
  { value: "100%", label: "recyclé localement", icon: Recycle },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(goNext, 6000);
    return () => clearInterval(id);
  }, [goNext]);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col overflow-hidden pt-16 md:pt-20 bg-foreground">
      {/* Main split layout */}
      <div className="flex-1 flex flex-col lg:flex-row items-center container mx-auto px-4 py-8 md:py-12 lg:py-0 gap-8 lg:gap-12">
        {/* Left — Text content */}
        <motion.div
          className="flex-1 flex flex-col justify-center z-10 max-w-xl lg:max-w-none"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-accent/15 text-accent border border-accent/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Disponible à Kara
          </span>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-extrabold leading-[1.1] mb-5 text-primary-foreground">
            Faites collecter vos déchets &{" "}
            <span className="text-accent">vendez vos plastiques</span>{" "}
            <span className="text-primary-foreground/60">en quelques clics</span>
          </h1>

          <p className="text-base sm:text-lg text-primary-foreground/50 leading-relaxed max-w-lg mb-8">
            Demandez un enlèvement de déchets ménagers ou vendez vos plastiques triés au kilogramme.
            Simple, rapide, écologique.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            <Link
              to="/vendre"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl gradient-bio text-primary-foreground font-bold text-sm uppercase tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-accent/25 active:scale-[0.98]"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              Vendre mes plastiques
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/enlevement"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-primary-foreground/20 text-primary-foreground/80 font-semibold text-sm uppercase tracking-wide transition-all duration-300 hover:bg-primary-foreground/5 hover:border-primary-foreground/40 active:scale-[0.98]"
            >
              <Truck className="w-4 h-4" />
              Demander un enlèvement
            </Link>
          </div>

          <a
            href="tel:+22897684030"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/40 hover:text-accent transition-colors w-fit"
          >
            <Phone className="w-4 h-4" />
            +228 97 68 40 30
          </a>
        </motion.div>

        {/* Right — Image showcase */}
        <motion.div
          className="flex-1 relative w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/5]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Decorative frame */}
          <div className="absolute -inset-3 rounded-2xl border border-accent/15 z-0" />
          <div className="absolute -inset-6 rounded-3xl border border-accent/5 z-0 hidden lg:block" />

          {/* Image container */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-muted/10">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={slides[current].src}
                alt={slides[current].label}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>

            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

            {/* Current slide label */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="text-xs font-semibold text-primary-foreground/90 bg-foreground/50 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                {slides[current].label}
              </span>

              {/* Dots */}
              <div className="flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-400 ${
                      i === current
                        ? "w-6 h-2 bg-accent"
                        : "w-2 h-2 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats banner */}
      <div className="relative z-10 border-t border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-primary-foreground/10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center py-5 md:py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              >
                <span className="font-display text-lg sm:text-xl md:text-2xl font-extrabold text-accent">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs text-primary-foreground/40 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
