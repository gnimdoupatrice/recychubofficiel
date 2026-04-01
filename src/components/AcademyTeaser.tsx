import { Sprout, BookOpen, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  {
    icon: BookOpen,
    title: "Formations pratiques",
    desc: "Modules sur le tri, le recyclage et les métiers verts.",
  },
  {
    icon: Users,
    title: "Communauté engagée",
    desc: "Rejoignez un réseau de citoyens et professionnels éco-responsables.",
  },
  {
    icon: Sprout,
    title: "Emplois verts",
    desc: "Préparez-vous aux opportunités de l'économie circulaire.",
  },
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
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary/80 mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
            Éducation
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            Green <span className="text-gradient-emerald">Academy</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
            Parce que le changement durable passe par l'éducation. La Green Academy propose des ressources, des formations et des bonnes pratiques pour sensibiliser le grand public et former la prochaine génération de professionnels aux emplois verts.
          </p>

          <div className="space-y-5 mb-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl gradient-bio flex items-center justify-center shrink-0 shadow-md">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-foreground mb-0.5">{f.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Link
            to="/academy"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bio text-primary-foreground font-bold text-sm uppercase tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/25"
          >
            Découvrir la Green Academy
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Right — visual card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-border/30 bg-card shadow-2xl p-8 sm:p-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <div className="w-20 h-20 rounded-2xl gradient-bio flex items-center justify-center mx-auto mb-6 glow-emerald">
                <Sprout className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground text-center mb-3">
                Apprenez. Agissez. Transformez.
              </h3>
              <p className="text-muted-foreground text-sm text-center leading-relaxed mb-8">
                Des modules interactifs conçus pour les étudiants, jeunes professionnels et citoyens engagés dans la transition écologique.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "10+", label: "Modules" },
                  { value: "500+", label: "Apprenants" },
                  { value: "100%", label: "Gratuit" },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-muted/60">
                    <p className="font-display text-xl font-extrabold text-primary">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AcademyTeaser;
