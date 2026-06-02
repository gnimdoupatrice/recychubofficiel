import { Leaf, Droplets, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const impacts = [
  {
    icon: Leaf,
    value: "2,5 T",
    label: "Plastiques collectés",
    desc: "de déchets détournés des rues et rivières de Kara.",
    number: "01",
  },
  {
    icon: Droplets,
    value: "1,2 T",
    label: "CO₂ évité",
    desc: "grâce au recyclage plutôt qu'à l'incinération sauvage.",
    number: "02",
  },
  {
    icon: Users,
    value: "300+",
    label: "Familles impactées",
    desc: "qui gagnent un revenu complémentaire grâce à leurs déchets.",
    number: "03",
  },
  {
    icon: TrendingUp,
    value: "15",
    label: "Dépotoirs signalés",
    desc: "identifiés et en cours de traitement par nos équipes.",
    number: "04",
  },
];

const ImpactSection = () => (
  <section className="wp-section wp-section-dark">
    {/* Pattern grille subtile — miroir CTA */}
    <div className="absolute inset-0 opacity-[0.08] wp-grid-pattern" />

    <div className="relative container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="wp-section-header center"
      >
        <span className="wp-eyebrow wp-eyebrow-light">Notre impact</span>
        <h2 className="wp-section-title">
          Un impact <span className="text-secondary">mesurable</span> à Kara
        </h2>
        <p className="wp-section-subtitle">
          Chaque kilo de plastique vendu contribue à rendre Kara plus propre et à créer des emplois verts.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {impacts.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="relative bg-primary-foreground/5 border-2 border-primary-foreground/30 backdrop-blur-sm p-6 transition-all duration-200 hover:bg-primary-foreground/10 hover:border-secondary"
            style={{ boxShadow: "6px 6px 0 0 hsl(var(--secondary))" }}
          >
            <span className="absolute top-3 right-4 font-display text-5xl font-black text-primary-foreground/15 leading-none select-none">
              {item.number}
            </span>
            <div className="w-12 h-12 bg-secondary text-secondary-foreground flex items-center justify-center mb-5 border-2 border-primary-foreground">
              <item.icon className="w-6 h-6" />
            </div>
            <div className="font-display text-4xl font-extrabold text-primary-foreground mb-1 leading-none">
              {item.value}
            </div>
            <div className="text-[11px] uppercase tracking-[0.18em] font-bold text-secondary mt-3 mb-2">
              {item.label}
            </div>
            <p className="text-xs text-primary-foreground/75 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
