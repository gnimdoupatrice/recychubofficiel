import { Eye, Target, Trophy, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: Eye,
    label: "Notre Vision",
    intro:
      "Un Togo où chaque déchet plastique est valorisé, chaque citoyen acteur du changement et chaque quartier propre et durable.",
    points: [
      "Valorisation universelle des déchets",
      "Citoyenneté active et responsable",
      "Quartiers propres et durables",
    ],
  },
  {
    icon: Target,
    label: "Notre Mission",
    intro:
      "Connecter ménages, collecteurs et recycleurs via une plateforme phygitale qui transforme les déchets en revenus, en digitalisant toute la chaîne de collecte et de recyclage.",
    points: [
      "Connexion directe ménages ↔ recycleurs",
      "Digitalisation de la chaîne de valeur",
      "Économie circulaire inclusive",
    ],
    featured: true,
  },
  {
    icon: Trophy,
    label: "Nos Objectifs",
    intro:
      "Des résultats concrets et mesurables pour un impact durable sur l'environnement et l'économie togolaise.",
    points: [
      "Démocratiser l'accès au recyclage",
      "Créer des emplois verts durables",
      "Digitaliser la collecte nationale",
    ],
  },
];

const OurResponseSection = () => (
  <section className="bg-white py-24 md:py-28 px-6 md:px-12 lg:px-24 font-inter border-y border-foreground/10">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
          Notre Réponse
        </span>
        <h2 className="mt-6 font-editorial font-bold text-4xl md:text-5xl text-foreground leading-tight">
          Transformer les défis en{" "}
          <span className="italic text-primary">opportunités</span>
        </h2>
        <p className="mt-6 text-muted-foreground font-light text-lg">
          Une vision claire, une mission concrète, des objectifs mesurables.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.article
              key={p.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className={`relative p-8 md:p-10 rounded-sm border ${
                p.featured
                  ? "bg-foreground text-background border-foreground md:-translate-y-4 shadow-[20px_20px_0_0_hsl(var(--primary)/0.18)]"
                  : "bg-white border-foreground/15 shadow-[10px_10px_0_0_hsl(var(--primary)/0.06)]"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-11 h-11 flex items-center justify-center rounded-sm ${
                    p.featured
                      ? "bg-background/10 text-background"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] font-semibold tracking-[0.22em] uppercase ${
                    p.featured ? "text-background/70" : "text-muted-foreground"
                  }`}
                >
                  Pilier 0{i + 1}
                </span>
              </div>
              <h3
                className={`font-editorial font-bold text-2xl md:text-[1.65rem] leading-snug mb-4 ${
                  p.featured ? "text-background" : "text-foreground"
                }`}
              >
                {p.label}
              </h3>
              <p
                className={`text-[15px] leading-relaxed font-light mb-6 ${
                  p.featured ? "text-background/85" : "text-muted-foreground"
                }`}
              >
                {p.intro}
              </p>
              <ul
                className={`space-y-2.5 pt-5 border-t ${
                  p.featured ? "border-background/20" : "border-foreground/10"
                }`}
              >
                {p.points.map((pt) => (
                  <li
                    key={pt}
                    className={`flex items-start gap-2.5 text-sm ${
                      p.featured ? "text-background/85" : "text-muted-foreground"
                    }`}
                  >
                    <ArrowRight
                      className={`w-3.5 h-3.5 mt-1 shrink-0 ${
                        p.featured ? "text-background" : "text-primary"
                      }`}
                    />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

export default OurResponseSection;
