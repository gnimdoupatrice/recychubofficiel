import { CalendarDays, MapPin, Users, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

const events = [
  {
    title: "Journée de nettoyage communautaire",
    date: "15 Mars 2026",
    lieu: "Marché central, Kozah 1",
    desc: "Grande opération de nettoyage avec tri des déchets et sensibilisation.",
    spots: 50,
  },
  {
    title: "Atelier compostage domestique",
    date: "22 Mars 2026",
    lieu: "Centre culturel de Kara",
    desc: "Apprenez à transformer vos déchets organiques en engrais naturel.",
    spots: 25,
  },
  {
    title: "Forum des métiers verts",
    date: "5 Avril 2026",
    lieu: "Hôtel de ville, Kara",
    desc: "Rencontrez des employeurs et découvrez les opportunités dans l'économie verte.",
    spots: 100,
  },
  {
    title: "Collecte massive de plastiques",
    date: "20 Avril 2026",
    lieu: "Stade municipal, Kozah 2",
    desc: "Participez et vendez vos plastiques au meilleur prix. Bons d'achat offerts !",
    spots: 200,
  },
];

const Evenements = () => {
  return (
    <div className="pt-24 pb-16 min-h-dvh">
      <SEO title="Événements écologiques à Kara" description="Rejoignez nos opérations de nettoyage, ateliers compostage et forums des métiers verts à Kara. Calendrier et inscription en ligne." path="/evenements" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Prochains événements</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">
            Hub <span className="text-gradient-emerald">Événementiel</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Calendrier des événements, jobs verts et opportunités éco à Kara.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-5">
          {events.map((e, i) => (
            <div key={i} className="p-6 rounded-2xl glass hover:glow-emerald transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-24 shrink-0 text-center sm:text-left">
                  <div className="font-display text-sm font-bold text-primary">{e.date.split(" ")[0]}</div>
                  <div className="text-xs text-muted-foreground">{e.date.split(" ").slice(1).join(" ")}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                    {e.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{e.desc}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {e.lieu}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {e.spots} places</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="px-4 py-2 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-1">
                    S'inscrire <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Evenements;
