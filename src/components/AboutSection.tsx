import { Eye, Target, Trophy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import aboutConstat from "@/assets/about-constat.jpg";

const AboutSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-14">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-primary rounded-full" />
            À propos
            <span className="w-8 h-[2px] bg-primary rounded-full" />
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            LE <span className="text-primary">CONSTAT</span>
          </h2>
        </div>

        {/* 2-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={aboutConstat}
                alt="Scène de rue dans un quartier au Togo — réalité quotidienne"
                className="w-full h-[340px] sm:h-[420px] lg:h-[480px] object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-2xl border-4 border-primary/20 -z-10" />
            <div className="absolute -top-3 -left-3 w-16 h-16 rounded-xl bg-primary/10 -z-10" />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col">
            {/* Intro text */}
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-8">
              Au Togo, la majorité des ménages vivent dans une situation de{" "}
              <strong className="text-foreground">précarité économique</strong>, une réalité qui
              marque leur quotidien. Ils n'ont pas la capacité de souscrire aux services de
              collecte de déchets. Par conséquent, les déchets finissent dans les rues — alors même
              que ces déchets sont{" "}
              <strong className="text-primary">une mine d'or pour les entreprises de recyclage</strong>.
              De l'autre côté, les services de collecte manquent d'outils efficaces pour organiser
              leurs tournées.
            </p>

            {/* Tabs: Vision / Mission / Objectifs */}
            <Tabs defaultValue="vision" className="w-full">
              <TabsList className="w-full bg-muted/60 p-1.5 rounded-xl h-auto flex-wrap gap-1">
                <TabsTrigger
                  value="vision"
                  className="flex-1 min-w-[120px] rounded-lg py-2.5 px-4 text-sm font-semibold gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
                >
                  <Eye className="w-4 h-4" />
                  Notre Vision
                </TabsTrigger>
                <TabsTrigger
                  value="mission"
                  className="flex-1 min-w-[120px] rounded-lg py-2.5 px-4 text-sm font-semibold gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
                >
                  <Target className="w-4 h-4" />
                  Notre Mission
                </TabsTrigger>
                <TabsTrigger
                  value="objectifs"
                  className="flex-1 min-w-[120px] rounded-lg py-2.5 px-4 text-sm font-semibold gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
                >
                  <Trophy className="w-4 h-4" />
                  Nos Objectifs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="vision" className="mt-5">
                <div className="bg-card rounded-xl shadow-lg border border-border/40 p-6 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Créer un avenir où chaque habitant du Togo s'épanouit grâce à des solutions
                    économiques inclusives et durables, où{" "}
                    <strong className="text-foreground">chaque déchet plastique est valorisé</strong>,
                    chaque citoyen est acteur du changement et chaque quartier est propre et durable.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="mission" className="mt-5">
                <div className="bg-card rounded-xl shadow-lg border border-border/40 p-6 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Connecter ménages, collecteurs et recycleurs via une{" "}
                    <strong className="text-foreground">plateforme numérique</strong> qui transforme
                    les déchets plastiques en revenus pour tous, en digitalisant la chaîne de collecte
                    et de recyclage au Togo.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="objectifs" className="mt-5">
                <div className="bg-card rounded-xl shadow-lg border border-border/40 p-6 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-muted-foreground text-sm leading-relaxed space-y-2">
                    <p>
                      <strong className="text-foreground">Démocratiser</strong> l'accès au recyclage
                      pour tous les ménages togolais.
                    </p>
                    <p>
                      <strong className="text-foreground">Créer des emplois verts</strong> et
                      valoriser le travail des collecteurs informels.
                    </p>
                    <p>
                      <strong className="text-foreground">Digitaliser la collecte</strong> et bâtir
                      une économie circulaire inclusive et durable.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
