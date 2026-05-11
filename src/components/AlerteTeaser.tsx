import { AlertTriangle, MapPin, Camera, ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
  { icon: Camera, text: "Prenez une photo du dépotoir" },
  { icon: MapPin, text: "Localisez-le sur la carte" },
  { icon: Shield, text: "Les autorités sont alertées" },
];

const AlerteTeaser = () => (
  <section className="wp-section bg-background">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — visual block */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1"
        >
          <div className="wp-card-destructive overflow-hidden">
            <div className="bg-destructive text-destructive-foreground px-6 py-4 flex items-center gap-3 border-b-2 border-foreground">
              <AlertTriangle className="w-6 h-6" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Civic Tech</p>
                <h3 className="font-display text-base font-extrabold uppercase tracking-tight">Veille Citoyenne</h3>
              </div>
            </div>

            <div className="p-7">
              <div className="space-y-3 mb-7">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 border-2 border-foreground/10 bg-muted/30"
                    >
                      <div className="w-10 h-10 bg-destructive text-destructive-foreground flex items-center justify-center shrink-0 border-2 border-foreground">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-[10px] font-bold text-destructive uppercase tracking-widest">
                          Étape {i + 1}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{step.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 border-2 border-foreground/90 divide-x-2 divide-foreground/90">
                <div className="p-5 text-center">
                  <p className="font-display text-3xl font-extrabold text-destructive">50+</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold mt-1">Alertes traitées</p>
                </div>
                <div className="p-5 text-center">
                  <p className="font-display text-3xl font-extrabold text-primary">12</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold mt-1">Quartiers nettoyés</p>
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
          <span className="wp-eyebrow wp-eyebrow-destructive">Alerte dépotoir</span>
          <h2 className="wp-section-title">
            Signalez, on <span className="text-destructive">agit</span>.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mt-5 mb-5 max-w-lg">
            Vous avez repéré un dépotoir sauvage dans votre quartier ? En 3 clics, signalez-le. Notre réseau de collecteurs et les autorités locales sont immédiatement alertés pour intervenir.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-lg">
            Chaque alerte est géolocalisée, horodatée et suivie. Ensemble, rendons nos quartiers plus propres et plus sûrs.
          </p>

          <Link to="/alerte" className="wp-btn-destructive">
            <AlertTriangle className="w-4 h-4" />
            Signaler un dépotoir
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AlerteTeaser;
