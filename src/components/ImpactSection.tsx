import { Leaf, Droplets, Users, TrendingUp } from "lucide-react";

const impacts = [
  {
    icon: Leaf,
    value: "2,5 T",
    label: "Plastiques collectés",
    desc: "de déchets détournés des rues et rivières de Kara.",
  },
  {
    icon: Droplets,
    value: "1,2 T",
    label: "CO₂ évité",
    desc: "grâce au recyclage plutôt qu'à l'incinération sauvage.",
  },
  {
    icon: Users,
    value: "300+",
    label: "Familles impactées",
    desc: "qui gagnent un revenu complémentaire grâce à leurs déchets.",
  },
  {
    icon: TrendingUp,
    value: "15",
    label: "Dépotoirs signalés",
    desc: "identifiés et en cours de traitement par nos équipes.",
  },
];

const ImpactSection = () => (
  <section className="section-spacing bg-background relative overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Notre Impact
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground">
          Un impact <span className="text-gradient-emerald">mesurable</span> à Kara
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Chaque kilo de plastique vendu contribue à rendre Kara plus propre et à créer des emplois verts.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {impacts.map((item) => (
          <div
            key={item.label}
            className="relative p-6 rounded-2xl glass text-center group hover:glow-emerald transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl gradient-bio flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <item.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="font-display text-3xl font-bold text-primary mb-1">
              {item.value}
            </div>
            <div className="font-semibold text-sm text-foreground mb-2">{item.label}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
