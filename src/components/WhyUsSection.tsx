import { Lightbulb, BarChart3, Users, Globe } from "lucide-react";

const reasons = [
  {
    icon: Lightbulb,
    title: "Innovation Locale",
    desc: "Des solutions technologiques adaptées aux réalités togolaises.",
  },
  {
    icon: BarChart3,
    title: "Impact Mesurable",
    desc: "Des résultats concrets et transparents sur l'environnement.",
  },
  {
    icon: Users,
    title: "Emplois Verts",
    desc: "Création d'opportunités économiques pour la jeunesse togolaise.",
  },
  {
    icon: Globe,
    title: "Plateforme Citoyenne",
    desc: "Un outil national au service de chaque citoyen engagé.",
  },
];

const WhyUsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Notre différence</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Pourquoi Recyclage Hub Togo ?</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <Icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;          
