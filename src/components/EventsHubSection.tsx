import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import event1 from "@/assets/event-1.webp";
import event2 from "@/assets/event-2.webp";
import event3 from "@/assets/event-3.webp";

const posts = [
  {
    category: "Opportunité",
    date: "18 Mars 2026",
    location: "Kara Centre",
    title: "Journée Mondiale du Recyclage : appel à bénévoles",
    excerpt:
      "Rejoignez 200 collecteurs et citoyens pour une journée d'action dans les quartiers de Kara. Inscriptions ouvertes.",
    image: event1,
    href: "/evenements",
  },
  {
    category: "Appel à projets",
    date: "05 Avril 2026",
    location: "Tomdè",
    title: "Collecte géante de plastiques — partenaires recherchés",
    excerpt:
      "Nous recrutons entreprises locales, écoles et associations pour co-organiser la plus grande collecte de l'année.",
    image: event2,
    href: "/evenements",
  },
  {
    category: "Formation",
    date: "22 Avril 2026",
    location: "Green Academy",
    title: "Tri sélectif : session intensive certifiante",
    excerpt:
      "Trois jours pour maîtriser les standards de tri et obtenir la certification RECYC HUB TOGO.",
    image: event3,
    href: "/academy",
  },
];

const EventsHubSection = () => (
  <section
    id="hub"
    className="band-mint py-24 md:py-32 px-6 md:px-12 lg:px-24 font-inter"
  >
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
        <div className="max-w-2xl">
          <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
            Hub Événementiel
          </span>
          <h2 className="mt-6 font-editorial font-bold text-4xl md:text-5xl text-foreground leading-tight">
            Opportunités &{" "}
            <span className="italic text-primary">actualités</span>
          </h2>
          <p className="mt-6 text-muted-foreground font-light text-lg">
            Le journal vivant de l'écosystème : événements, appels à projets,
            formations et histoires d'impact à travers le Togo.
          </p>
        </div>
        <Link
          to="/evenements"
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors self-end"
        >
          Toutes les opportunités
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            className="group flex flex-col"
          >
            <Link to={post.href} className="block overflow-hidden rounded-sm mb-5">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
            <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] uppercase text-primary mb-3">
              <span>{post.category}</span>
              <span className="w-1 h-1 rounded-full bg-foreground/30" />
              <span className="text-muted-foreground tracking-normal font-normal flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                {post.date}
              </span>
            </div>
            <h3 className="font-editorial font-bold text-xl md:text-2xl text-foreground leading-snug mb-3">
              <Link to={post.href} className="hover:text-primary transition-colors">
                {post.title}
              </Link>
            </h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed font-light mb-5 flex-1">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-foreground/10 pt-4">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {post.location}
              </span>
              <Link
                to={post.href}
                className="inline-flex items-center gap-1 font-semibold text-primary hover:gap-2 transition-all"
              >
                Lire <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-12 text-center md:hidden">
        <Link
          to="/evenements"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary border-b border-primary/30 pb-1"
        >
          Toutes les opportunités
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default EventsHubSection;
