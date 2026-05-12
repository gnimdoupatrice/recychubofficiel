import { BookOpen, Play, Award, TrendingUp, GraduationCap, Sprout, Recycle, Briefcase, ArrowUpRight, CheckCircle2, Clock, Users } from "lucide-react";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const tracks = [
  {
    icon: Recycle,
    label: "Tri & recyclage",
    desc: "Maîtriser l'identification des plastiques, les chaînes de tri et les process de valorisation.",
    modules: 4,
  },
  {
    icon: Sprout,
    label: "Économie circulaire",
    desc: "Comprendre les cycles de la matière, les modèles régénératifs et les politiques publiques.",
    modules: 3,
  },
  {
    icon: Briefcase,
    label: "Entrepreneuriat vert",
    desc: "Lancer son activité dans la collecte, le recyclage ou la sensibilisation au Togo.",
    modules: 5,
  },
];

const modules = [
  { title: "Introduction à l'économie circulaire", duration: "15 min", type: "Vidéo", free: true, level: "Débutant" },
  { title: "Tri des déchets ménagers", duration: "20 min", type: "Texte", free: true, level: "Débutant" },
  { title: "Identifier les six familles de plastiques", duration: "25 min", type: "Vidéo", free: true, level: "Débutant" },
  { title: "Métiers verts au Togo", duration: "25 min", type: "Vidéo", free: true, level: "Tous" },
  { title: "Compostage domestique", duration: "30 min", type: "Vidéo", free: false, level: "Intermédiaire" },
  { title: "Monter une micro-collecte rentable", duration: "40 min", type: "Cours", free: false, level: "Avancé" },
  { title: "Entrepreneuriat vert : du projet au financement", duration: "45 min", type: "Cours", free: false, level: "Avancé" },
  { title: "Sensibilisation communautaire & terrain", duration: "30 min", type: "Atelier", free: false, level: "Intermédiaire" },
];

const stats = [
  { icon: Play, val: "12", label: "Modules" },
  { icon: Award, val: "3", label: "Certifications" },
  { icon: Users, val: "150+", label: "Apprenants" },
  { icon: TrendingUp, val: "92%", label: "Taux de réussite" },
];

const GreenAcademy = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      <SEO
        title="Green Academy — Formations économie circulaire au Togo"
        description="Apprenez le tri, le compostage, les métiers verts et l'entrepreneuriat durable au Togo. Modules vidéo, ateliers terrain et certifications via la Green Academy de RECYC HUB TOGO."
        path="/academy"
      />

      {/* HERO */}
      <header className="relative bg-foreground text-background pt-36 pb-24 md:pt-44 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-5 gap-12 items-end">
          <div className="md:col-span-3">
            <span className="inline-flex items-center gap-2 text-primary font-semibold tracking-[0.2em] text-xs uppercase">
              <GraduationCap className="w-4 h-4" /> Green Academy
            </span>
            <h1 className="mt-6 font-editorial font-bold text-5xl md:text-7xl leading-[1.05]">
              Apprendre le vert,{" "}
              <span className="italic text-primary">construire l'avenir</span>.
            </h1>
            <p className="mt-8 text-background/75 font-light text-lg md:text-xl max-w-2xl leading-relaxed">
              Une académie pratique et certifiante pour former la nouvelle
              génération d'acteurs du recyclage, du tri et de l'économie
              circulaire au Togo.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#modules"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Explorer les modules
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                to="/inscription"
                className="inline-flex items-center gap-2 border border-background/30 px-6 py-3 rounded-sm font-semibold text-sm hover:bg-background/10 transition-colors"
              >
                S'inscrire gratuitement
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="border border-background/15 p-5 rounded-sm backdrop-blur-sm"
              >
                <s.icon className="w-5 h-5 text-primary mb-3" />
                <div className="font-editorial text-3xl font-bold">{s.val}</div>
                <div className="text-xs uppercase tracking-wider text-background/60 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </header>

      {/* TRACKS */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[hsl(150_14%_97%)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
              Trois parcours
            </span>
            <h2 className="mt-6 font-editorial font-bold text-4xl md:text-5xl text-foreground leading-tight">
              Choisissez votre{" "}
              <span className="italic text-primary">trajectoire verte</span>.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {tracks.map((t) => (
              <article
                key={t.label}
                className="bg-white border border-foreground/10 p-8 md:p-10 rounded-sm hover:border-primary/40 hover:shadow-[14px_14px_0_0_hsl(var(--primary)/0.10)] transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-primary/10 text-primary mb-6">
                  <t.icon className="w-6 h-6" />
                </div>
                <h3 className="font-editorial font-bold text-2xl text-foreground mb-3">
                  {t.label}
                </h3>
                <p className="text-[15px] text-muted-foreground font-light leading-relaxed mb-6">
                  {t.desc}
                </p>
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                  {t.modules} modules
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
              Catalogue
            </span>
            <h2 className="mt-6 font-editorial font-bold text-4xl md:text-5xl text-foreground leading-tight">
              Modules disponibles
            </h2>
            <p className="mt-6 text-muted-foreground font-light text-lg">
              Vidéos, ateliers et cours certifiants — accessibles depuis
              n'importe quel téléphone, même en zone à faible débit.
            </p>
          </div>

          <div className="border-y border-foreground/10 divide-y divide-foreground/10">
            {modules.map((m, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-6 group cursor-pointer hover:bg-[hsl(150_14%_97%)] transition-colors px-2"
              >
                <span className="font-editorial font-bold text-primary/40 text-lg tabular-nums w-10 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-editorial font-bold text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
                    {m.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {m.duration}
                    </span>
                    <span>{m.type}</span>
                    <span>{m.level}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {m.free ? (
                    <span className="text-[11px] uppercase tracking-widest px-3 py-1 bg-primary/10 text-primary font-bold">
                      Gratuit
                    </span>
                  ) : (
                    <span className="text-[11px] uppercase tracking-widest px-3 py-1 bg-foreground text-background font-bold">
                      Premium
                    </span>
                  )}
                  <ArrowUpRight className="w-5 h-5 text-foreground/40 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="w-10 h-10 text-primary mx-auto mb-6" />
          <h2 className="font-editorial font-bold text-4xl md:text-5xl leading-tight">
            Prêt à rejoindre la{" "}
            <span className="italic text-primary">Green Academy</span> ?
          </h2>
          <p className="mt-6 text-background/75 font-light text-lg max-w-xl mx-auto">
            Inscription gratuite, accès immédiat aux modules d'introduction et
            communauté d'apprenants engagés.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              to="/inscription"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Créer mon compte
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 border border-background/30 px-8 py-4 rounded-sm font-semibold text-sm hover:bg-background/10 transition-colors"
            >
              Découvrir nos solutions
            </Link>
          </div>
          <ul className="mt-12 grid sm:grid-cols-3 gap-4 text-sm text-background/80">
            {["Accessible sur mobile", "Certifications reconnues", "Ateliers terrain à Kara"].map((b) => (
              <li key={b} className="inline-flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default GreenAcademy;
