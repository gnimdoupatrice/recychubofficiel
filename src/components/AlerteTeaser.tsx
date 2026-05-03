import { AlertTriangle, MapPin, Camera, ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
  { icon: Camera, text: "Prenez une photo du dépotoir" },
  { icon: MapPin, text: "Localisez-le sur la carte" },
  { icon: Shield, text: "Les autorités sont alertées" },
];

const AlerteTeaser = () => (
  <section className="section-spacing bg-background overflow-hidden">
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
          <div className="bg-card border-2 border-destructive p-8 sm:p-10" style={{ boxShadow: "8px 8px 0 0 hsl(var(--destructive))" }}>
            <div className="flex items-center gap-3 mb-8 pb-5 border-b-2 border-foreground">
              <div className="gb-icon-box-destructive w-14 h-14">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-destructive">Civic Tech</p>
                <h3 className="font-display text-base font-extrabold text-foreground uppercase tracking-wide">Veille Citoyenne</h3>
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
                    className="flex items-center gap-4 p-3 bg-muted/40 border-2 border-foreground"
                  >
                    <div className="w-10 h-10 bg-destructive text-destructive-foreground border-2 border-foreground flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-[10px] font-extrabold text-destructive uppercase tracking-widest">Étape {i + 1}</span>
                      <span className="text-sm font-semibold text-foreground">{step.text}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Impact counter */}
            <div className="flex items-center gap-6 p-4 bg-destructive/5 border-2 border-foreground">
              <div>
                <p className="font-display text-2xl font-extrabold text-destructive">50+</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-extrabold">Alertes traitées</p>
              </div>
              <div className="w-0.5 h-10 bg-foreground" />
              <div>
                <p className="font-display text-2xl font-extrabold text-primary">12</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-extrabold">Quartiers nettoyés</p>
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
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.25em] text-destructive-foreground bg-destructive border-2 border-destructive px-3 py-1 mb-4">
            Alerte Dépotoir
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-4 uppercase">
            Signalez,<br />on <span className="bg-destructive text-destructive-foreground px-2 inline-block border-2 border-destructive">agit</span>.
          </h2>
          <div className="gb-rule mb-5" />
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
            Vous avez repéré un dépotoir sauvage dans votre quartier ? En 3 clics, signalez-le. Notre réseau de collecteurs et les autorités locales sont immédiatement alertés pour intervenir.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-lg">
            Chaque alerte est géolocalisée, horodatée et suivie. Ensemble, rendons nos quartiers plus propres et plus sûrs.
          </p>

          <Link to="/alerte" className="gb-btn-destructive">
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
