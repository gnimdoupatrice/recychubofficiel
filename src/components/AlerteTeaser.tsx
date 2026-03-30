import { AlertTriangle, MapPin, Camera, ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
  { icon: Camera, text: "Prenez une photo du dépotoir" },
  { icon: MapPin, text: "Localisez-le sur la carte" },
  { icon: Shield, text: "Les autorités sont alertées" },
];

const AlerteTeaser = () => (
  <section className="py-20 md:py-28 bg-background overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — visual */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1"
        >
          <div className="relative rounded-3xl overflow-hidden border-2 border-destructive/20 bg-card shadow-2xl">
            {/* Top alert bar */}
            <div className="h-2 w-full bg-gradient-to-r from-destructive to-orange-400" />
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center glow-orange">
                  <AlertTriangle className="w-7 h-7 text-destructive" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-destructive/70">Civic Tech</p>
                  <h3 className="font-display text-lg font-bold text-foreground">Veille Citoyenne</h3>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4 mb-8">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.4 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/30"
                    >
                      <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-destructive" />
                      </div>
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-xs font-bold text-destructive/50 uppercase">Étape {i + 1}</span>
                        <span className="text-sm font-medium text-foreground">{step.text}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Impact counter */}
              <div className="flex items-center gap-6 p-4 rounded-xl bg-destructive/5 border border-destructive/10">
                <div>
                  <p className="font-display text-2xl font-extrabold text-destructive">50+</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Alertes traitées</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="font-display text-2xl font-extrabold text-primary">12</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Quartiers nettoyés</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="order-1 lg:order-2"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-destructive/80 mb-4 px-4 py-1.5 rounded-full border border-destructive/20 bg-destructive/5">
            Alerte Dépotoir
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            Signalez, on <span className="text-destructive">agit</span>.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
            Vous avez repéré un dépotoir sauvage dans votre quartier ? En 3 clics, signalez-le. Notre réseau de collecteurs et les autorités locales sont immédiatement alertés pour intervenir.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-lg">
            Chaque alerte est géolocalisée, horodatée et suivie. Ensemble, rendons nos quartiers plus propres et plus sûrs.
          </p>

          <Link
            to="/alerte"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-destructive text-destructive-foreground font-bold text-sm uppercase tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-destructive/25 animate-pulse-orange"
          >
            <AlertTriangle className="w-4 h-4" />
            Signaler un dépotoir
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AlerteTeaser;
