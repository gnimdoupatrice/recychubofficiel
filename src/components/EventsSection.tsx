import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const opportunities = [
  { title: "Appel à projets — Recyclage innovant", date: "15 Mars 2026", city: "Lomé" },
  { title: "Financement vert pour startups", date: "22 Mars 2026", city: "Kara" },
  { title: "Partenariat ONG — Gestion des déchets", date: "28 Mars 2026", city: "Sokodé" },
];

const events = [
  { title: "Forum National du Recyclage 2026", date: "10 Avril 2026", city: "Lomé" },
  { title: "Journée Mondiale de la Terre — Togo", date: "22 Avril 2026", city: "Atakpamé" },
];

const EventCard = ({ title, date, city }: { title: string; date: string; city: string }) => (
  <div className="bg-card rounded-xl p-6 card-shadow border border-border hover:border-accent/30 transition-all duration-300 flex flex-col justify-between">
    <div>
      <h4 className="font-bold text-foreground mb-3">{title}</h4>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{date}</span>
        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{city}</span>
      </div>
    </div>
    <Button variant="link" className="self-start mt-4 px-0 gap-1">
      Voir plus <ArrowRight className="h-3.5 w-3.5" />
    </Button>
  </div>
);

const EventsSection = () => {
  return (
    <section id="events" className="py-20 md:py-28 bg-muted">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Hub Événementiel</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Opportunités & Événements</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-5">Opportunités récentes</h3>
            <div className="space-y-4">
              {opportunities.map((o) => <EventCard key={o.title} {...o} />)}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-5">Événements à venir</h3>
            <div className="space-y-4">
              {events.map((e) => <EventCard key={e.title} {...e} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
