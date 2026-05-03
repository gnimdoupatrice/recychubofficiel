import { Sprout, BookOpen, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { icon: BookOpen, title: "Formations pratiques", desc: "Modules sur le tri, le recyclage et les métiers verts." },
  { icon: Users, title: "Communauté engagée", desc: "Rejoignez un réseau de citoyens et professionnels éco-responsables." },
  { icon: Sprout, title: "Emplois verts", desc: "Préparez-vous aux opportunités de l'économie circulaire." },
];

const AcademyTeaser = () => (
  <section className="section-spacing bg-muted/30 overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="gb-eyebrow-primary mb-4">Éducation</span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mt-4 mb-4 uppercase">
            Green <span className="bg-primary text-primary-foreground px-2 inline-block border-2 border-primary">Academy</span>
          </h2>
          <div className="gb-rule mb-5" />
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
            Parce que le changement durable passe par l'éducation. La Green Academy propose des ressources, des formations et des bonnes pratiques pour sensibiliser le grand public et former la prochaine génération de professionnels aux emplois verts.
          </p>

          <div className="space-y-4 mb-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.4 }}
                  className="flex items-start gap-4 p-3 bg-background border-2 border-foreground"
                >
                  <div className="gb-icon-box w-10 h-10 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-extrabold text-foreground mb-0.5 uppercase tracking-wide">{f.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Link to="/academy" className="gb-btn">
            Découvrir la Green Academy
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Right — visual block */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="bg-card border-2 border-primary p-8 sm:p-10" style={{ boxShadow: "8px 8px 0 0 hsl(var(--primary))" }}>
            <div className="gb-icon-box w-20 h-20 mx-auto mb-6">
              <Sprout className="w-10 h-10" />
            </div>
            <h3 className="font-display text-xl font-extrabold text-foreground text-center mb-3 uppercase tracking-wide">
              Apprenez. Agissez. Transformez.
            </h3>
            <p className="text-muted-foreground text-sm text-center leading-relaxed mb-8">
              Des modules interactifs conçus pour les étudiants, jeunes professionnels et citoyens engagés dans la transition écologique.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "10+", label: "Modules" },
                { value: "500+", label: "Apprenants" },
                { value: "100%", label: "Gratuit" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-3 bg-muted border-2 border-foreground">
                  <p className="font-display text-xl font-extrabold text-primary">{stat.value}</p>
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-extrabold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AcademyTeaser;
