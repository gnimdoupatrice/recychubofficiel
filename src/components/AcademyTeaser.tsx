import { Sprout, BookOpen, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { icon: BookOpen, title: "Formations pratiques", desc: "Modules sur le tri, le recyclage et les métiers verts." },
  { icon: Users, title: "Communauté engagée", desc: "Rejoignez un réseau de citoyens et professionnels éco-responsables." },
  { icon: Sprout, title: "Emplois verts", desc: "Préparez-vous aux opportunités de l'économie circulaire." },
];

const AcademyTeaser = () => (
  <section className="section-spacing bg-muted/40">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="wp-eyebrow">Éducation</span>
          <h2 className="wp-section-title">
            Green <span className="text-primary">Academy</span>
          </h2>
          <div className="gb-rule mb-5" />
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
            Parce que le changement durable passe par l'éducation. La Green Academy propose des ressources, des formations et des bonnes pratiques pour sensibiliser le grand public et former la prochaine génération de professionnels aux emplois verts          .    
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mt-5 mb-8 max-w-lg">
            Parce que le changement durable passe par l'éducation. La Green Academy propose des ressources, des formations et des bonnes pratiques pour sensibiliser le grand public et former la prochaine génération de professionnels aux emplois verts.
          </p>

          <div className="space-y-4 mb-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex items-start gap-4 p-4 bg-card border-2 border-foreground/10 hover:border-primary transition-colors">
                  <div className="w-11 h-11 bg-primary text-primary-foreground flex items-center justify-center shrink-0 border-2 border-foreground">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-extrabold text-foreground uppercase tracking-tight mb-0.5">{f.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link to="/academy" className="wp-btn-primary">
            Découvrir la Green Academy
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Visual block */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="wp-card-primary p-8 sm:p-10">
            <div className="w-20 h-20 bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 border-2 border-foreground">
              <Sprout className="w-10 h-10" />
            </div>
            <h3 className="font-display text-xl font-extrabold text-foreground text-center mb-3 uppercase tracking-tight">
              Apprenez. Agissez. Transformez.
            </h3>
            <p className="text-muted-foreground text-sm text-center leading-relaxed mb-8">
              Des modules interactifs conçus pour les étudiants, jeunes professionnels et citoyens engagés dans la transition écologique.
            </p>

            <div className="grid grid-cols-3 border-2 border-foreground/90 divide-x-2 divide-foreground/90">
              {[
                { value: "10+", label: "Modules" },
                { value: "500+", label: "Apprenants" },
                { value: "100%", label: "Gratuit" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 bg-card">
                  <p className="font-display text-2xl font-extrabold text-primary">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold mt-1">{stat.label}</p>
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
