import { Eye, Target, Trophy, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import aboutConstat from "@/assets/about-constat.jpg";

const AboutSection = () => {
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
          <div className="w-16 h-1 bg-primary rounded-full mx-auto mt-5" />
        </div>

        {/* 2-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          {/* Left: Image */}
          <div className="relative group">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-full">
              <img
                src={aboutConstat}
                alt="Scène de rue dans un quartier au Togo — réalité quotidienne"
                className="w-full h-full min-h-[340px] sm:min-h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={800}
                height={600}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent rounded-2xl" />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-5 left-5 bg-card/95 backdrop-blur-md rounded-xl shadow-xl px-5 py-3.5 border border-border/30">
              <span className="text-2xl font-extrabold text-primary leading-none">3</span>
              <span className="text-xs font-semibold text-muted-foreground ml-2 uppercase tracking-wide">
                Défis majeurs
              </span>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl border-[3px] border-primary/15 -z-10" />
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-xl bg-primary/8 -z-10" />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center">
            {/* Intro text */}
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-8">
              Au Togo, la majorité des ménages vivent dans une situation de{" "}
              <strong className="text-foreground font-semibold">précarité économique</strong>, une
              réalité qui marque leur quotidien. Ils n'ont pas la capacité de souscrire aux
              services de collecte de déchets. Par conséquent, les déchets finissent dans les
              rues — alors même que ces déchets sont{" "}
              <strong className="text-primary font-semibold">
                une mine d'or pour les entreprises de recyclage
              </strong>
              . De l'autre côté, les services de collecte manquent d'outils efficaces pour
              organiser leurs tournées.
            </p>

            {/* Tabs */}
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
                    <h3 className="font-display text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
                      Notre Vision
                    </h3>
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
                    <h3 className="font-display text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
                      Notre Mission
                    </h3>
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
                    <h3 className="font-display text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
                      Nos Objectifs
                    </h3>
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
      </div>
    </section>
  );
};

export default AboutSection;
