import { motion } from "framer-motion";
import challenge1 from "@/assets/challenge-1.jpg";
import challenge2 from "@/assets/challenge-2.jpg";
import challenge3 from "@/assets/challenge-3.jpg";

const cards = [
  {
    number: "01",
    badge: "DÉFICIT LOGISTIQUE",
    title: "Systèmes de collecte défaillants",
    body: (
      <>
        Les entreprises de pré-collecte opèrent aujourd'hui{" "}
        <span className="text-foreground font-medium">à l'aveugle</span>. Sans
        données précises sur les flux de déchets, les tournées sont
        sous-optimisées, générant un gaspillage critique de carburant et un
        temps d'intervention prolongé pour chaque ménage desservi.
      </>
    ),
    image: challenge1,
    align: "left" as const,
  },
  {
    number: "02",
    badge: "CÉCITÉ GÉOGRAPHIQUE",
    title: "Dépotoirs invisibles",
    body: (
      <>
        Visibles au quotidien par les citoyens, ces points noirs échappent à
        toute comptabilité institutionnelle.{" "}
        <span className="text-foreground font-medium">
          L'absence de cartographie dynamique
        </span>{" "}
        empêche les autorités de mesurer l'ampleur réelle du défi et d'allouer
        les ressources nécessaires.
      </>
    ),
    image: challenge2,
    align: "right" as const,
  },
  {
    number: "03",
    badge: "VALEUR CACHÉE",
    title: "Potentiel économique inexploité",
    body: (
      <>
        Les déchets recyclables ont une{" "}
        <span className="text-foreground font-medium">
          valeur marchande réelle
        </span>
        . Sans circuit de rachat structuré, cette ressource est perdue alors
        qu'elle pourrait générer des revenus pour les ménages et créer des
        emplois verts durables sur tout le territoire.
      </>
    ),
    image: challenge3,
    align: "left" as const,
  },
];

const AboutSection = () => {
  return (
    <section
      id="pourquoi"
      className="bg-[hsl(150_14%_97%)] py-24 md:py-32 px-6 md:px-12 lg:px-24 font-inter"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-24 md:mb-32 text-center max-w-2xl mx-auto">
          <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
            L'État des Lieux
          </span>
          <h2 className="mt-6 font-editorial font-bold text-4xl md:text-5xl text-foreground leading-tight">
            Pourquoi RECYC<span className="italic text-primary">HUB</span> TOGO ?
          </h2>
          <p className="mt-6 text-muted-foreground font-light text-lg italic">
            Analyse systémique des défis environnementaux au Togo.
          </p>
        </div>

        <div className="space-y-32 md:space-y-48">
          {cards.map((c, i) => (
            <motion.section
              key={c.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`flex flex-col ${
                c.align === "right" ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-12 lg:gap-24`}
            >
              {/* Texte */}
              <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="font-editorial font-bold text-7xl md:text-8xl text-primary/15 leading-none">
                    {c.number}
                  </span>
                  <div className="h-px flex-1 bg-foreground/15" />
                </div>
                <h3 className="font-editorial font-bold text-3xl md:text-[2rem] text-foreground leading-snug">
                  {c.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  {c.body}
                </p>
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-[0.18em] border-b border-primary/30 pb-1">
                    {c.badge}
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="w-full md:w-1/2">
                <div
                  className={`overflow-hidden rounded-sm ${
                    c.align === "right"
                      ? "shadow-[-18px_18px_0_0_hsl(var(--primary)/0.10)]"
                      : "shadow-[18px_18px_0_0_hsl(var(--primary)/0.10)]"
                  }`}
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="w-full h-[280px] md:h-[420px] object-cover"
                  />
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
