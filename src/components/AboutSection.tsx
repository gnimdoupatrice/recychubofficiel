import { useState } from "react";
import { Eye, Target, Trophy, ArrowRight, Home, Recycle, Truck } from "lucide-react";
import challenge1 from "@/assets/challenge-1.png";
import challenge2 from "@/assets/challenge-2.jpg";
import challenge3 from "@/assets/challenge-3.jpg";

const challenges = [
  {
    id: 1,
    icon: Home,
    title: "Précarité & Négligence",
    subtitle: "Les ménages submergés",
    description:
      "À Kara, à Lomé et dans la plupart des villes togolaises, la majorité des ménages vivent avec environ 3 000 FCFA par jour. Cette précarité contraint les familles à privilégier la survie immédiate, reléguant la gestion des déchets au second plan jusqu'à la rendre quasi inexistante. Les ordures s'accumulent alors dans les cours, saturent les rues, les caniveaux et les rivières, transformant même certains ponts en véritables dépotoirs à ciel ouvert.",
    image: challenge1,
    number: "01",
  },
  {
    id: 2,
    icon: Recycle,
    title: "Charge vs Mine d'or",
    subtitle: "Un paradoxe économique",
    description:
      "Ce qui pèse aujourd'hui comme une charge environnementale et sociale sur les ménages représente, en réalité, une véritable mine d'or pour l'industrie du recyclage. Faute d'une connexion structurée entre ces deux mondes, des tonnes de matières premières à haute valeur ajoutée sont perdues chaque jour, transformant un puissant potentiel économique en pollution urbaine coûteuse.",
    image: challenge2,
    number: "02",
  },
  {
    id: 3,
    icon: Truck,
    title: "Collecte à l'aveugle",
    subtitle: "Des tournées inefficaces",
    description:
      "Les entreprises de collecte opèrent encore largement en aveugle, sans outil numérique de pilotage. Leurs tournées, souvent aléatoires, les conduisent à passer chez des clients sans besoin réel, gaspillant temps, carburant et ressources humaines à chaque trajet. Faute de données, la collecte devient un centre de coûts lourd et inefficace, limitant drastiquement son impact environnemental comme sa rentabilité.",
    image: challenge3,
    number: "03",
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
  const [activeChallenge, setActiveChallenge] = useState(0);

  return (
    <section id="pourquoi" className="section-spacing-lg bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="gb-eyebrow mb-4">Pourquoi</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mt-4 uppercase">
            RECYC<span className="bg-primary text-primary-foreground px-2 inline-block border-2 border-primary mx-1">HUB</span>TOGO
          </h2>
          <div className="gb-rule mx-auto mt-5" />
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Trois défis majeurs freinent la gestion des déchets au Togo. Nous les transformons en opportunités.
          </p>
        </div>

        {/* Challenge blocks */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            const isActive = activeChallenge === index;
            return (
              <button
                key={challenge.id}
                onClick={() => setActiveChallenge(index)}
                className={`group relative bg-card border-2 text-left transition-all duration-200 ${
                  isActive
                    ? "border-primary translate-x-[-3px] translate-y-[-3px]"
                    : "border-foreground hover:translate-x-[-2px] hover:translate-y-[-2px]"
                }`}
                style={{ boxShadow: isActive ? "8px 8px 0 0 hsl(var(--primary))" : "5px 5px 0 0 hsl(var(--foreground))" }}
              >
                <div className="relative h-52 sm:h-60 overflow-hidden border-b-2 border-foreground">
                  <img
                    src={challenge.image}
                    alt={challenge.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-foreground/40" />
                  <span className="absolute top-3 left-3 text-5xl font-black text-white leading-none select-none font-display">
                    {challenge.number}
                  </span>
                  <div className="absolute top-3 right-3 w-10 h-10 bg-background border-2 border-foreground flex items-center justify-center">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />}
                </div>

                <div className="p-5">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary mb-1">
                    {challenge.subtitle}
                  </p>
                  <h3 className="font-display text-base font-extrabold text-foreground mb-2 uppercase tracking-wide">
                    {challenge.title}
                  </h3>
                  <p className={`text-xs leading-relaxed text-muted-foreground text-justify transition-all duration-500 ${
                    isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}>
                    {challenge.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Notre réponse — piliers */}
        <div className="mt-20 md:mt-24">
          <div className="text-center mb-14">
            <span className="gb-eyebrow-primary mb-3">Notre réponse</span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mt-4 uppercase">
              Transformer les défis en opportunités
            </h3>
            <div className="gb-rule mx-auto mt-5" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className={`relative bg-card border-2 transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] ${
                    p.featured ? "border-primary md:-mt-4 md:mb-[-1rem]" : "border-foreground"
                  }`}
                  style={{ boxShadow: p.featured ? "8px 8px 0 0 hsl(var(--primary))" : "5px 5px 0 0 hsl(var(--foreground))" }}
                >
                  <div className={`h-2 w-full ${p.featured ? "bg-primary" : "bg-foreground"}`} />
                  {p.featured && (
                    <div className="absolute top-5 right-5">
                      <span className="gb-tag-primary">Cœur</span>
                    </div>
                  )}
                  <div className="p-6 sm:p-8">
                    <div className={`${p.featured ? "w-16 h-16" : "w-14 h-14"} gb-icon-box mb-6`}>
                      <Icon className={p.featured ? "w-8 h-8" : "w-7 h-7"} />
                    </div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary mb-2">{p.pilier}</p>
                    <h4 className="font-display text-lg sm:text-xl font-extrabold text-foreground mb-3 uppercase tracking-wide">
                      {p.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{p.desc}</p>
                    <div className="space-y-3 pt-4 border-t-2 border-foreground">
                      {p.points.map((point, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <div className="w-5 h-5 bg-primary text-primary-foreground border-2 border-foreground flex items-center justify-center shrink-0 mt-0.5">
                            <ArrowRight className="w-3 h-3" />
                          </div>
                          <span className="text-xs text-muted-foreground leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
