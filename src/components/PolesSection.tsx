import { Truck, Recycle, AlertTriangle, GraduationCap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const poles = [
  {
    icon: Truck,
    title: "Collecte Intelligente",
    desc: "Planifiez la collecte de vos déchets plastiques avec notre réseau de collecteurs certifiés.",
    cta: "Planifier une collecte",
  },
  {
    icon: Recycle,
    title: "Valorisation Plastique",
    desc: "Transformez vos déchets plastiques en matériaux réutilisables et générez des revenus.",
    cta: "En savoir plus",
  },
  {
    icon: AlertTriangle,
    title: "Alerte Dépotoir",
    desc: "Signalez les dépotoirs sauvages dans votre quartier pour une intervention rapide.",
    cta: "Signaler un dépotoir",
  },
  {
    icon: GraduationCap,
    title: "Green Academy",
    desc: "Formez-vous aux métiers verts et à l'entrepreneuriat environnemental.",
    cta: "Voir les formations",
  },
  {
    icon: Calendar,
    title: "Hub Événementiel",
    desc: "Découvrez les opportunités, événements et appels à projets environnementaux.",
    cta: "Explorer le hub",
  },
];

const PolesSection = () => {
  return (
    <section id="poles" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Nos solutions</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Nos Pôles d'Action</h2>
          <p className="mt-4 text-muted-foreground">
            Cinq piliers stratégiques pour un Togo plus propre et plus prospère.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {poles.map(({ icon: Icon, title, desc, cta }, i) => (
            <div
              key={title}
              className="group bg-card rounded-xl p-7 card-shadow hover:card-hover-shadow transition-all duration-300 border border-border hover:border-accent/30"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
                <Icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{desc}</p>
              <Button variant="outline" size="sm">{cta}</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PolesSection;
