import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, Target, Trophy, MapPin, ArrowRight } from "lucide-react";
import challenge1 from "@/assets/challenge-1.webp";
import challenge2 from "@/assets/challenge-2.webp";
import challenge3 from "@/assets/challenge-3.webp";

type Card = {
  number: string;
  badge: string;
  title: string;
  body: React.ReactNode;
  image: string;
  stat: { location: string; value: string; label: string };
  cta: { label: string; href: string };
};

const cards: Card[] = [
  {
    number: "01",
    badge: "Déficit logistique",
    title: "Systèmes de collecte défaillants",
    body: (
      <>
        Les entreprises de pré-collecte opèrent aujourd'hui{" "}
        <span className="text-foreground font-semibold">à l'aveugle</span>. Sans
        données précises sur les flux de déchets, les tournées sont
        sous-optimisées, générant un gaspillage critique de carburant et un
        temps d'intervention prolongé pour chaque ménage desservi.
      </>
    ),
    image: challenge1,
    stat: {
      location: "Kara, Togo",
      value: "60%",
      label: "de collette non optimisé",
    },
    cta: { label: "Demander un enlèvement", href: "/demander-enlevement" },
  },
  {
    number: "02",
    badge: "Cécité géographique",
    title: "Dépotoirs invisibles",
    body: (
      <>
        Visibles au quotidien par les citoyens, ces points noirs échappent à
        toute comptabilité institutionnelle.{" "}
        <span className="text-foreground font-semibold">
          L'absence de cartographie dynamique
        </span>{" "}
        empêche les autorités de mesurer l'ampleur réelle du défi et d'allouer
        les ressources nécessaires.
      </>
    ),
    image: challenge2,
    stat: {
      location: "Kara, Togo",
      value: "0",
      label: "registre  des dépotoirs sauvages",
    },
    cta: { label: "Signaler un dépotoir", href: "/alerte-depotoir" },
  },
  {
    index: "03",
    eyebrow: "État des lieux — Économie",
    title: (<>Un potentiel <span className="text-primary">inexploité</span></>),
    body:
      "Les déchets recyclables ont une valeur marchande réelle. Sans circuit de rachat structuré, cette ressource est perdue alors qu'elle pourrait nourrir des familles et créer des emplois verts durables.",
    stat: { value: "+50 F", label: "par kg de plastique racheté" },
    image: challenge3,
    stat: {
      location: "Kara, Togo",
      value: "50 FCFA",
      label: "par kilo de plastique racheté",
    },
    cta: { label: "Vendre mes plastiques", href: "/vendre-plastiques" },
  },
];

const pillars = [
  {
    icon: Eye,
    pilier: "Pilier 01",
    title: "Notre Vision",
    desc: "Un Togo où chaque déchet plastique est valorisé, chaque citoyen est acteur du changement et chaque quartier est propre et durable.",
    points: ["Valorisation universelle des déchets", "Citoyenneté active et responsable", "Quartiers propres et durables"],
    featured: false,
  },
  {
    icon: Target,
    pilier: "Pilier 02",
    title: "Notre Mission",
    desc: "Connecter ménages, collecteurs et recycleurs via une plateforme numérique qui transforme les déchets en revenus, en digitalisant toute la chaîne.",
    points: ["Connexion ménages ↔ recycleurs", "Digitalisation de la chaîne de valeur", "Revenus pour tous les acteurs", "Économie circulaire inclusive"],
    featured: true,
  },
  {
    icon: Trophy,
    pilier: "Pilier 03",
    title: "Nos Objectifs",
    desc: "Des résultats concrets et mesurables pour un impact durable sur l'environnement et l'économie togolaise.",
    points: ["Démocratiser l'accès au recyclage", "Créer des emplois verts durables", "Digitaliser la collecte nationale"],
    featured: false,
  },
];

const AboutSection = () => {
  return (
    <section
      id="pourquoi"
      className="bg-background py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-24 max-w-2xl">
          <span className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.22em] text-[11px] uppercase">
            <span className="w-8 h-px bg-primary" />
            L'État des Lieux
          </span>
          <h2 className="mt-5 font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05]">
            Pourquoi RECYC<span className="text-primary">HUB</span> TOGO ?
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Analyse systémique des défis environnementaux au Togo — trois
            constats qui structurent toute notre démarche.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {cards.map((c, i) => (
            <motion.article
              key={c.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`group grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted border border-border">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={900}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-5 left-5 inline-flex items-center px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-[0.22em]">
                    {c.badge}
                  </span>
                </div>

                {/* Floating stat card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
                  className="absolute -top-5 -right-4 md:-top-6 md:-right-6 z-10 w-[180px] md:w-[200px] rounded-2xl bg-card border border-border px-4 py-3 shadow-[0_18px_40px_-12px_hsl(var(--primary)/0.35)] ring-1 ring-primary/10"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                    <MapPin className="w-3 h-3" strokeWidth={2.5} />
                    {c.stat.location}
                  </div>
                  <div className="mt-1 font-[Space_Grotesk] font-bold text-2xl md:text-3xl text-foreground leading-tight">
                    {c.stat.value}
                  </div>
                  <div className="mt-1 text-[11px] md:text-xs text-muted-foreground leading-snug">
                    {c.stat.label}
                  </div>
                </motion.div>
              </div>


              {/* Content */}
              <div className="flex flex-col">
                <span
                  aria-hidden="true"
                  className="font-extrabold text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight text-primary/15 mb-4"
                >
                  {c.number}
                </span>
                <h3 className="font-extrabold text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight mb-5">
                  {c.title}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                  {c.body}
                </p>
                <Link
                  to={c.cta.href}
                  className="group/cta inline-flex items-center gap-2 mt-6 text-primary font-bold text-sm hover:gap-3 transition-all duration-300 self-start border-b-2 border-primary/30 hover:border-primary pb-1"
                >
                  {c.cta.label}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" strokeWidth={2.5} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
      