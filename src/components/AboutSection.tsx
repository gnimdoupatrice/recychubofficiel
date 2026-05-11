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
    accent: "from-orange-500/80 to-red-600/80",
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
    accent: "from-primary/80 to-emerald-700/80",
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
    accent: "from-blue-600/80 to-indigo-700/80",
    number: "03",
  },
];

const AboutSection = () => {
  const [activeChallenge, setActiveChallenge] = useState(0);

  return (
    <section id="pourquoi" className="wp-section bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="wp-section-header center">
          <span className="wp-eyebrow">Pourquoi</span>
          <h2 className="wp-section-title">
            RECYC<span className="text-secondary">HUB</span> TOGO
          </h2>
          <p className="wp-section-subtitle">
            Trois défis majeurs freinent la gestion des déchets au Togo. Nous les transformons en opportunités.
          </p>
        </div>

        {/* Challenge cards - bloc style */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            const isActive = activeChallenge === index;
            return (
              <button
                key={challenge.id}
                onClick={() => setActiveChallenge(index)}
                className={`group text-left transition-all duration-200 bg-card border-2 ${
                  isActive
                    ? "border-primary -translate-x-1 -translate-y-1"
                    : "border-foreground/90 hover:-translate-x-0.5 hover:-translate-y-0.5"
                }`}
                style={{
                  boxShadow: isActive
                    ? "10px 10px 0 0 hsl(var(--primary))"
                    : "6px 6px 0 0 hsl(var(--foreground))",
                }}
              >
                {/* Image */}
                <div className="relative h-52 sm:h-56 overflow-hidden border-b-2 border-foreground/90">
                  <img
                    src={challenge.image}
                    alt={challenge.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${challenge.accent} opacity-60`} />

                  <span className="absolute top-3 left-4 font-display text-5xl font-black text-white/30 leading-none select-none">
                    {challenge.number}
                  </span>

                  <div className="absolute top-4 right-4 w-10 h-10 bg-primary text-primary-foreground border-2 border-foreground flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                    {challenge.subtitle}
                  </p>
                  <h3 className="font-display text-base font-extrabold text-foreground uppercase tracking-tight mb-3">
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

        {/* Notre réponse */}
        <div className="mt-20 md:mt-24">
          <div className="wp-section-header center">
            <span className="wp-eyebrow">Notre réponse</span>
            <h3 className="wp-section-title">
              Transformer les défis en <span className="text-secondary">opportunités</span>
            </h3>
            <p className="wp-section-subtitle">
              Une vision claire, une mission concrète, des objectifs mesurables.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Vision */}
            <div className="wp-card overflow-hidden">
              <div className="bg-primary text-primary-foreground px-6 py-4 border-b-2 border-foreground flex items-center gap-3">
                <div className="w-10 h-10 bg-background text-primary border-2 border-foreground flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Pilier 01</p>
                  <h4 className="font-display text-base font-extrabold uppercase tracking-tight">Notre Vision</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  Un Togo où <strong className="text-foreground">chaque déchet plastique est valorisé</strong>, chaque citoyen est acteur du changement et chaque quartier est propre et durable.
                </p>
                <ul className="space-y-2.5 pt-4 border-t-2 border-foreground/10">
                  {["Valorisation universelle des déchets", "Citoyenneté active et responsable", "Quartiers propres et durables"].map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mission — featured */}
            <div className="wp-card-primary overflow-hidden md:-mt-4 md:mb-[-1rem] relative">
              <span className="absolute top-3 right-3 z-10 text-[9px] font-extrabold uppercase tracking-widest bg-secondary text-secondary-foreground px-2.5 py-1 border-2 border-foreground">
                Cœur
              </span>
              <div className="bg-primary text-primary-foreground px-6 py-5 border-b-2 border-foreground flex items-center gap-3">
                <div className="w-12 h-12 bg-background text-primary border-2 border-foreground flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Pilier 02</p>
                  <h4 className="font-display text-base font-extrabold uppercase tracking-tight">Notre Mission</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  Connecter ménages, collecteurs et recycleurs via une <strong className="text-foreground">plateforme numérique</strong> qui transforme les déchets en revenus, en digitalisant toute la chaîne de collecte et de recyclage.
                </p>
                <ul className="space-y-2.5 pt-4 border-t-2 border-primary/20">
                  {["Connexion directe ménages ↔ recycleurs", "Digitalisation de la chaîne de valeur", "Revenus pour tous les acteurs", "Économie circulaire inclusive"].map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Objectifs */}
            <div className="wp-card overflow-hidden">
              <div className="bg-primary text-primary-foreground px-6 py-4 border-b-2 border-foreground flex items-center gap-3">
                <div className="w-10 h-10 bg-background text-primary border-2 border-foreground flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Pilier 03</p>
                  <h4 className="font-display text-base font-extrabold uppercase tracking-tight">Nos Objectifs</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  Des résultats <strong className="text-foreground">concrets et mesurables</strong> pour un impact durable sur l'environnement et l'économie togolaise.
                </p>
                <ul className="space-y-2.5 pt-4 border-t-2 border-foreground/10">
                  {["Démocratiser l'accès au recyclage", "Créer des emplois verts durables", "Digitaliser la collecte nationale"].map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
