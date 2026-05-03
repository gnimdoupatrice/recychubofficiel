import { Leaf, Droplets, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const impacts = [
  {
    icon: Leaf,
    value: "2,5 T",
    label: "Plastiques collectés",
    desc: "de déchets détournés des rues et rivières de Kara.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Droplets,
    value: "1,2 T",
    label: "CO₂ évité",
    desc: "grâce au recyclage plutôt qu'à l'incinération sauvage.",
    gradient: "from-accent to-neon-light",
  },
  {
    icon: Users,
    value: "300+",
    label: "Familles impactées",
    desc: "qui gagnent un revenu complémentaire grâce à leurs déchets.",
    gradient: "from-secondary to-orange-alert",
  },
  {
    icon: TrendingUp,
    value: "15",
    label: "Dépotoirs signalés",
    desc: "identifiés et en cours de traitement par nos équipes.",
    gradient: "from-destructive to-secondary",
  },
];

const ImpactSection = () => (
  <section className="section-spacing bg-background relative overflow-hidden">
    {/* Subtle background accent */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center mb-14">
        <span className="section-badge-warm">
          Notre Impact
        </span>
        <h2 className="section-title">
          Un impact <span className="text-gradient-emerald">mesurable</span> à Kara
        </h2>
        <p className="section-subtitle">
          Chaque kilo de plastique vendu contribue à rendre Kara plus propre et à créer des emplois verts.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {impacts.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative p-6 rounded-2xl bg-card border border-border/50 text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Top accent line */}
            <div className={`absolute top-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r ${item.gradient}`} />

            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
              <item.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="font-display text-3xl font-extrabold text-foreground mb-1">
              {item.value}
            </div>
            <div className="font-semibold text-sm text-primary mb-2">{item.label}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;