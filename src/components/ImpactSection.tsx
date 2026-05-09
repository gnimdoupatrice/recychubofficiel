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
  <section className="section-spacing bg-background">
    <div className="container mx-auto px-4">
      <div className="wp-section-header center">
        <span className="wp-eyebrow">Notre impact</span>
        <h2 className="wp-section-title">
          Un impact <span className="text-primary">mesurable</span> à Kara
        </h2>
        <p className="wp-section-subtitle">
          Chaque kilo de plastique vendu contribue à rendre Kara plus propre et à créer des emplois verts.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {impacts.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="wp-card p-6 relative"
          >
            <span className="absolute top-3 right-4 wp-number">{item.number}</span>
            <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center mb-5 border-2 border-foreground">
              <item.icon className="w-6 h-6" />
            </div>
            <div className="font-display text-4xl font-extrabold text-foreground mb-1 leading-none">
              {item.value}
            </div>
            <div className="text-[11px] uppercase tracking-[0.18em] font-bold text-primary mt-3 mb-2">
              {item.label}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
