import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const upcomingEvents = [
  { title: "Journée Mondiale du Recyclage", date: "18 Mars 2026", time: "08h00 — 16h00", location: "Kara Centre", tag: "Sensibilisation", variant: "primary" as const },
  { title: "Collecte Géante de Plastiques", date: "05 Avril 2026", time: "07h00 — 13h00", location: "Quartier Tomdè", tag: "Collecte", variant: "secondary" as const },
  { title: "Formation Tri Sélectif", date: "22 Avril 2026", time: "09h00 — 12h00", location: "Green Academy", tag: "Formation", variant: "primary" as const },
];

const EventsTeaser = () => (
  <section className="section-spacing bg-muted/30 overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <span className="gb-eyebrow mb-4">Événements</span>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mt-4 uppercase">
          Prochains rendez-vous
        </h2>
        <div className="gb-rule mx-auto mt-5" />
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
          Rejoignez-nous sur le terrain. Collectes, formations, sensibilisation — chaque événement est un pas vers un Togo plus propre.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {upcomingEvents.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="gb-block gb-block-hover p-6"
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-foreground">
              <span className={event.variant === "primary" ? "gb-tag-primary" : "gb-tag-secondary"}>
                {event.tag}
              </span>
              <CalendarDays className="w-4 h-4 text-foreground" />
            </div>

            <h3 className="font-display text-base font-extrabold text-foreground mb-4 leading-tight uppercase">
              {event.title}
            </h3>

            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5 text-primary" />
                <span className="font-semibold uppercase tracking-wide">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>{event.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/evenements" className="gb-btn-outline">
          Voir tous les événements
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default EventsTeaser;
