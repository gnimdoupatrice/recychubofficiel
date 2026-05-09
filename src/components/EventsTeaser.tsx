import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const upcomingEvents = [
  {
    title: "Journée Mondiale du Recyclage",
    date: "18 Mars 2026",
    time: "08h00 — 16h00",
    location: "Kara Centre",
    tag: "Sensibilisation",
  },
  {
    title: "Collecte Géante de Plastiques",
    date: "05 Avril 2026",
    time: "07h00 — 13h00",
    location: "Quartier Tomdè",
    tag: "Collecte",
  },
  {
    title: "Formation Tri Sélectif",
    date: "22 Avril 2026",
    time: "09h00 — 12h00",
    location: "Green Academy",
    tag: "Formation",
  },
];

const EventsTeaser = () => (
  <section className="section-spacing bg-muted/40">
    <div className="container mx-auto px-4">
      <div className="wp-section-header center">
        <span className="wp-eyebrow">Agenda</span>
        <h2 className="wp-section-title">
          Prochains <span className="text-primary">rendez-vous</span>
        </h2>
        <p className="wp-section-subtitle">
          Rejoignez-nous sur le terrain. Collectes, formations, sensibilisation — chaque événement est un pas vers un Togo plus propre.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
        {upcomingEvents.map((event, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="wp-card overflow-hidden flex flex-col"
          >
            <div className="bg-primary text-primary-foreground px-5 py-3 flex items-center justify-between border-b-2 border-foreground">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                {event.tag}
              </span>
              <CalendarDays className="w-4 h-4" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-display text-lg font-extrabold text-foreground mb-5 leading-tight uppercase tracking-tight">
                {event.title}
              </h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground flex-1">
                <li className="flex items-center gap-2.5">
                  <CalendarDays className="w-4 h-4 text-primary shrink-0" />
                  <span>{event.date}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>{event.time}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{event.location}</span>
                </li>
              </ul>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="text-center">
        <Link to="/evenements" className="wp-btn-outline">
          Voir tous les événements
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default EventsTeaser;
