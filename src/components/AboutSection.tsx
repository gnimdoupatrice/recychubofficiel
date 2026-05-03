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
    <section id="pourquoi" className="section-spacing-lg bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary/80 mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
            Pourquoi
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            RECYC<span className="text-primary">HUB</span> TOGO
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Trois défis majeurs freinent la gestion des déchets au Togo. Nous les transformons en opportunités.
          </p>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto mt-5" />
        </div>

        {/* Challenge cards - interactive */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            const isActive = activeChallenge === index;
            return (
              <button
                key={challenge.id}
                onClick={() => setActiveChallenge(index)}
                className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-500 ${
                  isActive
                    ? "ring-2 ring-primary shadow-2xl scale-[1.02]"
                    : "ring-1 ring-border/40 shadow-lg hover:shadow-xl hover:scale-[1.01]"
                }`}
              >
                {/* Image */}
                <div className="relative h-52 sm:h-60 overflow-hidden">
                  <img
                    src={challenge.image}
                    alt={challenge.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${challenge.accent} opacity-70 transition-opacity duration-500 group-hover:opacity-80`} />

                  {/* Number */}
                  <span className="absolute top-4 left-4 text-5xl font-black text-white/20 leading-none select-none">
                    {challenge.number}
                  </span>

                  {/* Icon */}
                  <div className={`absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive ? "bg-white/30 backdrop-blur-md" : "bg-white/15 backdrop-blur-sm"
                  }`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary animate-fade-in" />
                  )}
                </div>

                {/* Content */}
                <div className={`p-5 transition-colors duration-300 ${isActive ? "bg-card" : "bg-card/80"}`}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-1">
                    {challenge.subtitle}
                  </p>
                  <h3 className="font-display text-base font-bold text-foreground mb-2">
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

        {/* Notre réponse — immersive cards */}
        <div className="mt-20 md:mt-28">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent/80 mb-3 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Notre réponse
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
              Transformer les défis en <span className="text-gradient-emerald">opportunités</span>
            </h3>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Une vision claire, une mission concrète, des objectifs mesurables.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Vision */}
            <div className="group relative rounded-2xl overflow-hidden border border-border/30 bg-card shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              {/* Top accent bar */}
              <div className="h-1.5 w-full gradient-bio" />
              <div className="p-6 sm:p-8">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl gradient-bio flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-7 h-7 text-primary-foreground" />
                </div>
                {/* Label */}
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 mb-2">
                  Pilier 01
                </p>
                <h4 className="font-display text-lg sm:text-xl font-bold text-foreground mb-3">
                  Notre Vision
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Un Togo où <strong className="text-foreground">chaque déchet plastique est valorisé</strong>, chaque citoyen est acteur du changement et chaque quartier est propre et durable.
                </p>
                {/* Key points */}
                <div className="space-y-3 pt-4 border-t border-border/30">
                  {["Valorisation universelle des déchets", "Citoyenneté active et responsable", "Quartiers propres et durables"].map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mission — featured/elevated */}
            <div className="group relative rounded-2xl overflow-hidden border-2 border-primary/30 bg-card shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 md:-mt-4 md:mb-[-1rem]">
              {/* Top accent bar */}
              <div className="h-2 w-full gradient-bio" />
              {/* Featured badge */}
              <div className="absolute top-5 right-5">
                <span className="text-[9px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
                  Cœur
                </span>
              </div>
              <div className="p-6 sm:p-8">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl gradient-bio flex items-center justify-center mb-6 shadow-lg glow-emerald group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                {/* Label */}
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 mb-2">
                  Pilier 02
                </p>
                <h4 className="font-display text-lg sm:text-xl font-bold text-foreground mb-3">
                  Notre Mission
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Connecter ménages, collecteurs et recycleurs via une <strong className="text-foreground">plateforme numérique</strong> qui transforme les déchets en revenus, en digitalisant toute la chaîne de collecte et de recyclage.
                </p>
                {/* Key points */}
                <div className="space-y-3 pt-4 border-t border-primary/20">
                  {["Connexion directe ménages ↔ recycleurs", "Digitalisation de la chaîne de valeur", "Revenus pour tous les acteurs", "Économie circulaire inclusive"].map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Objectifs */}
            <div className="group relative rounded-2xl overflow-hidden border border-border/30 bg-card shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              {/* Top accent bar */}
              <div className="h-1.5 w-full gradient-bio" />
              <div className="p-6 sm:p-8">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl gradient-bio flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-7 h-7 text-primary-foreground" />
                </div>
                {/* Label */}
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 mb-2">
                  Pilier 03
                </p>
                <h4 className="font-display text-lg sm:text-xl font-bold text-foreground mb-3">
                  Nos Objectifs
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Des résultats <strong className="text-foreground">concrets et mesurables</strong> pour un impact durable sur l'environnement et l'économie togolaise.
                </p>
                {/* Key points */}
                <div className="space-y-3 pt-4 border-t border-border/30">
                  {["Démocratiser l'accès au recyclage", "Créer des emplois verts durables", "Digitaliser la collecte nationale"].map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
