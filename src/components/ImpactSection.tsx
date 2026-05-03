import { Leaf, Droplets, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const impacts = [
  {
    icon: Leaf,
    value: "2,5 T",
    label: "Plastiques collectés",
    desc: "de déchets détournés des rues et rivières de Kara.",
    variant: "primary" as const,
  },
  {
    icon: Droplets,
    value: "1,2 T",
    label: "CO₂ évité",
    desc: "grâce au recyclage plutôt qu'à l'incinération sauvage.",
    variant: "primary" as const,
  },
  {
    icon: Users,
    value: "300+",
    label: "Familles impactées",
    desc: "qui gagnent un revenu complémentaire grâce à leurs déchets.",
    variant: "secondary" as const,
  },
  {
    icon: TrendingUp,
    value: "15",
    label: "Dépotoirs signalés",
    desc: "identifiés et en cours de traitement par nos équipes.",
    variant: "destructive" as const,
  },
];

const ImpactSection = () => (
  <section className="section-spacing bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <span className="gb-eyebrow mb-4">Notre Impact</span>
        <h2 className="gb-title mt-4">Un impact mesurable à Kara</h2>
        <div className="gb-rule mx-auto mt-5" />
        <p className="text-muted-foreground max-w-2xl mx-auto mt-5 text-sm sm:text-base leading-relaxed">
          Chaque kilo de plastique vendu contribue à rendre Kara plus propre et à créer des emplois verts.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {impacts.map((item, i) => {
          const iconClass =
            item.variant === "primary"
              ? "gb-icon-box"
              : item.variant === "secondary"
              ? "gb-icon-box-secondary"
              : "gb-icon-box-destructive";
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="gb-block gb-block-hover p-6 text-center"
            >
              <div className={`${iconClass} w-14 h-14 mx-auto mb-4`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="font-display text-3xl font-extrabold text-foreground mb-1">
                {item.value}
              </div>
              <div className="font-extrabold text-xs text-foreground uppercase tracking-[0.18em] mb-2 border-t-2 border-foreground pt-2">
                {item.label}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ImpactSection;
