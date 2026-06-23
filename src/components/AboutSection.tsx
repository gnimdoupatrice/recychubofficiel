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
        Les entreprises de pré-collecte et de collecte opèrent aujourd'hui{" "}
        <span className="text-foreground font-semibold">à l'aveugle</span> sans
        données précises sur les flux de déchets, par consequent les tournées sont
        sous-optimisées, générant un gaspillage critique en carburant et en
        temps d'intervention pour chaque ménage desservi.
      </>
    ),
    image: challenge1,
    stat: {
      location: "Kara, Togo",
      value: "60%",
      label: "de collette non optimisé",
    },
    cta: { label: "Demander un enlèvement", href: "/enlevement" },
  },
  {
    number: "02",
    badge: "Cécité géographique",
    title: "Dépotoirs invisibles",
    body: (
      <>
        La prolifération des dépotires sauvages aujourd'hui est un phénomen de plus en plus galopent de la salubrité publique, malgré les efforts du gouvernement forces est de constater avec amertueme qu'aujourd'hui la bonne volonté  dans la gestion des déchets par les ménages est de plus en plus au  recule au pont ou  les ménagers au lieu de payer un  abonnement de 500Fcfa à 2000fcfa par maison pour l'enlèvement de leurs déchets préfere créer, jetter leurs déhets ménager au enlantour des ponts, dans la rivière ou creer des dépotoire à ciel ouvert. Mais le problème le plus inquitant est la visibilité de ces dépotoire par les autorités et acteurs de la societé civile. On crie de gauche et à droit que la ville est pliene de dépotires mais ou sont situés ces dépotoires il sont combien dans une municipalités aucune reponse{" "}
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
    cta: { label: "Signaler un dépotoir", href: "/alerte" },
  },
  {
    number: "03",
    badge: "État des lieux Économie",
    title: "Un potentiel inexploité",
    body: (
      <>
        Le déchets plastique aujourd'hui est apercu comme  l'énémie numéro un de la salubrité publique alors meme qu'il est apercus comme une mine d'or par les entreprise de recyclge {" "}
        <span className="text-foreground font-semibold"> En realité le plastique à une valeur marchande réelle</span>mais sans circuit de rachat structuré, cette ressource est perdue alors qu'elle
        pourrait nourrir des familles et créer des emplois verts durables.
      </>
    ),
    image: challenge3,
    stat: {
      location: "Kara, Togo",
      value: "50 FCFA",
      label: "par kilo de plastique racheté",
    },
    cta: { label: "Vendre mes plastiques", href: "/vendre" },
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
      className="relative band-plain py-24 md:py-32 px-6 md:px-12 overflow-hidden"
    >
      {/* Soft gradient transitions between sections */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/10 via-primary/[0.04] to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-secondary/10 via-secondary/[0.04] to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-24 max-w-2xl">
          <span className="inline-flex items-center text-primary font-bold tracking-[0.22em] text-[11px] uppercase">
            Pourquoi RECYC HUB TOGO ?
          </span>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            <strong className="text-foreground font-semibold">RECYC HUB TOGO</strong>  est née
            d'une analyse systémique des défis environnementaux au Togo, et trois constats structurent toute notre démarche.
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
              {/* Mobile-only intro (number + title) — keeps image visually attached to its title */}
              <div className="md:hidden flex flex-col">
                <span
                  aria-hidden="true"
                  className="font-extrabold text-5xl sm:text-6xl leading-none tracking-tight text-primary/15 mb-3"
                >
                  {c.number}
                </span>
                <h3 className="font-extrabold text-2xl sm:text-3xl text-foreground leading-tight">
                  {c.title}
                </h3>
              </div>

              {/* Image */}
              <div className="relative w-full">
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

                {/* Stat card — flottante en desktop, en bloc plein dessous en mobile */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
                  className="relative mt-4 w-full md:absolute md:-top-6 md:-right-6 md:mt-0 md:w-[200px] z-10 rounded-2xl bg-card border border-border px-4 py-3 shadow-[0_18px_40px_-12px_hsl(var(--primary)/0.35)] ring-1 ring-primary/10"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                    <MapPin className="w-3 h-3" strokeWidth={2.5} />
                    {c.stat.location}
                  </div>
                  <div className="mt-1 font-display font-bold text-2xl md:text-3xl text-foreground leading-tight">
                    {c.stat.value}
                  </div>
                  <div className="mt-1 text-[11px] md:text-xs text-muted-foreground leading-snug">
                    {c.stat.label}
                  </div>
                </motion.div>
              </div>


              {/* Content */}
              <div className="flex flex-col">
                {/* Desktop-only number + title (mobile shows them above the image) */}
                <span
                  aria-hidden="true"
                  className="hidden md:block font-extrabold text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-none tracking-tight text-primary/15 mb-4"
                >
                  {c.number}
                </span>
                <h3 className="hidden md:block font-extrabold text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight mb-5">
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
      