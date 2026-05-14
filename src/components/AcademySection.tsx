import { Button } from "@/components/ui/button";
import { BookOpen, Sprout, Trash2 } from "lucide-react";

const formations = [
  {
    icon: Trash2,
    title: "Recyclage Plastique",
    desc: "Maîtrisez les techniques de collecte, tri et transformation des déchets plastiques.",
  },
  {
    icon: Sprout,
    title: "Entrepreneuriat Vert",
    desc: "Lancez votre entreprise verte et contribuez à l'économie circulaire au Togo.",
  },
  {
    icon: BookOpen,
    title: "Gestion des Déchets",
    desc: "Apprenez les meilleures pratiques de gestion intégrée des déchets solides.",
  },
];

const AcademySection = () => {
  return (
    <section id="academy" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Formation</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Green Academy</h2>
          <p className="mt-4 text-muted-foreground">
            Des formations pratiques pour construire un avenir vert    <div className=""></div>
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {formations.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card rounded-xl p-7 card-shadow border border-border text-center">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-5">
                <Icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="default" size="lg">Découvrir la Green Academy    </Button>
        </div>
      </div>
    </section>
  );
};

export default AcademySection;
