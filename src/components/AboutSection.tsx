import { useState } from "react";
import { Eye, Target, Trophy, ArrowRight, Home, Recycle, Truck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import challenge1 from "@/assets/challenge-1.jpg";
import challenge2 from "@/assets/challenge-2.jpg";
import challenge3 from "@/assets/challenge-3.jpg";

const challenges = [
  {
    id: 1,
    icon: Home,
    title: "Précarité & Négligence",
    subtitle: "Les ménages submergés",
    description:
      "La majorité des ménages vivent dans une précarité financière qui relègue la gestion des déchets au second plan. Les déchets s'accumulent dans les cours et finissent dans les rues, les rivières et les caniveaux.",
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
      "Ce qui est une charge insupportable pour les ménages est une véritable mine d'or pour les entreprises de recyclage. Des tonnes de matières premières se perdent chaque jour faute de connexion entre ces deux mondes.",
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
      "Les entreprises de collecte travaillent sans outils numériques : elles passent chez des clients sans savoir s'il y a un besoin réel, gaspillant temps, carburant et ressources à chaque tournée.",
    image: challenge3,
    accent: "from-blue-600/80 to-indigo-700/80",
    number: "03",
  },
];

const AboutSection = () => {
  const [activeChallenge, setActiveChallenge] = useState(0);

  return (
    <section id="pourquoi" className="py-20 md:py-28 bg-background overflow-hidden">
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
                  <p className={`text-xs leading-relaxed text-muted-foreground transition-all duration-500 ${
                    isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}>
                    {challenge.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Vision / Mission / Objectifs tabs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
              Notre réponse à ces défis
            </h3>
          </div>

          <Tabs defaultValue="vision" className="w-full">
            <TabsList className="w-full bg-muted/50 p-1 rounded-xl h-auto gap-1 border border-border/30">
              <TabsTrigger
                value="vision"
                className="flex-1 min-w-[100px] rounded-lg py-2.5 px-3 text-xs sm:text-sm font-semibold gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-200"
              >
                <Eye className="w-3.5 h-3.5" />
                Notre Vision
              </TabsTrigger>
              <TabsTrigger
                value="mission"
                className="flex-1 min-w-[100px] rounded-lg py-2.5 px-3 text-xs sm:text-sm font-semibold gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-200"
              >
                <Target className="w-3.5 h-3.5" />
                Notre Mission
              </TabsTrigger>
              <TabsTrigger
                value="objectifs"
                className="flex-1 min-w-[100px] rounded-lg py-2.5 px-3 text-xs sm:text-sm font-semibold gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-200"
              >
                <Trophy className="w-3.5 h-3.5" />
                Nos Objectifs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vision" className="mt-5 animate-in fade-in-50 duration-300">
              <div className="bg-card rounded-xl shadow-lg border border-border/30 p-6 flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
                    Notre Vision
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Un Togo où{" "}
                    <strong className="text-foreground">chaque déchet plastique est valorisé</strong>,
                    chaque citoyen est acteur du changement et chaque quartier est propre et
                    durable. Nous croyons en des solutions économiques inclusives qui élèvent
                    les standards de vie de manière significative.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mission" className="mt-5 animate-in fade-in-50 duration-300">
              <div className="bg-card rounded-xl shadow-lg border border-border/30 p-6 flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
                    Notre Mission
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Connecter ménages, collecteurs et recycleurs via une{" "}
                    <strong className="text-foreground">plateforme numérique</strong> qui
                    transforme les déchets plastiques en revenus pour tous, en digitalisant
                    la chaîne de collecte et de recyclage au Togo.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="objectifs" className="mt-5 animate-in fade-in-50 duration-300">
              <div className="bg-card rounded-xl shadow-lg border border-border/30 p-6 flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
                    Nos Objectifs
                  </h4>
                  <div className="text-muted-foreground text-sm leading-relaxed space-y-2.5">
                    <p className="flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                      <span><strong className="text-foreground">Démocratiser</strong> l'accès au recyclage pour tous les ménages togolais.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                      <span><strong className="text-foreground">Créer des emplois verts</strong> et valoriser le travail des collecteurs informels.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                      <span><strong className="text-foreground">Digitaliser la collecte</strong> et bâtir une économie circulaire inclusive.</span>
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
