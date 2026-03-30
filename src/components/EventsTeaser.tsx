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
    tagColor: "bg-primary/10 text-primary",
  },
  {
    title: "Collecte Géante de Plastiques",
    date: "05 Avril 2026",
    time: "07h00 — 13h00",
    location: "Quartier Tomdè",
    tag: "Collecte",
    tagColor: "bg-accent/10 text-accent",
  },
  {
    title: "Formation Tri Sélectif",
    date: "22 Avril 2026",
    time: "09h00 — 12h00",
    location: "Green Academy",
    tag: "Formation",
    tagColor: "bg-secondary/10 text-secondary",
  },
];

const EventsTeaser = () => (
  <section className="py-20 md:py-28 bg-muted/40 overflow-hidden">
    <div className="container mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary/80 mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
          Événements
        </span>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
          Prochains <span className="text-gradient-emerald">rendez-vous</span>
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
          Rejoignez-nous sur le terrain. Collectes, formations, sensibilisation — chaque événement est un pas vers un Togo plus propre.
        </p>
      </motion.div>

      {/* Events grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {upcomingEvents.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="group relative rounded-2xl overflow-hidden border border-border/30 bg-card shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
          >
            <div className="h-1.5 w-full gradient-bio" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${event.tagColor}`}>
                  {event.tag}
                </span>
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
              </div>

              <h3 className="font-display text-base font-bold text-foreground mb-4 leading-tight">
                {event.title}
              </h3>

              <div className="space-y-2.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-3.5 h-3.5 text-primary" />
                  <span>{event.date}</span>
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
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/evenements"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-bold text-sm uppercase tracking-wide transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20"
        >
          Voir tous les événements
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  </section>
);

export default EventsTeaser;
