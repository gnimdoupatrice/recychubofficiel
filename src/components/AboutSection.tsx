import { motion } from "framer-motion";
import { Eye, Target, Trophy } from "lucide-react";
import challenge1 from "@/assets/challenge-1.jpg";
import challenge2 from "@/assets/challenge-2.jpg";
import challenge3 from "@/assets/challenge-3.jpg";

const cards = [
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
  },
  {
    number: "03",
    badge: "Valeur cachée",
    title: "Potentiel économique inexploité",
    body: (
      <>
        Les déchets recyclables ont une{" "}
        <span className="text-foreground font-semibold">
          valeur marchande réelle
        </span>
        . Sans circuit de rachat structuré, cette ressource est perdue alors
        qu'elle pourrait générer des revenus pour les ménages et créer des
        emplois verts durables sur tout le territoire.
      </>
    ),
    image: challenge3,
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

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((c, i) => (
            <motion.article
              key={c.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="group relative flex flex-col bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-[0_24px_60px_-30px_hsl(var(--primary)/0.35)]"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute top-5 left-5 inline-flex items-center px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-[0.22em]">
                  {c.badge}
                </span>
                <span className="absolute bottom-4 right-5 font-extrabold text-5xl text-white/90 leading-none tracking-tight">
                  {c.number}
                </span>
              </div>

              {/* Content */}
              <div className="p-7 md:p-8 flex flex-col flex-1">
                <h3 className="font-extrabold text-xl md:text-2xl text-foreground leading-snug mb-3">
                  {c.title}
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {c.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
