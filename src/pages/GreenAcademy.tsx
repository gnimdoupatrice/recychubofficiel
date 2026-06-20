import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowUpRight, Clock, Play, Award, Users, TrendingUp, GraduationCap, Recycle, Sprout, Briefcase, ExternalLink } from "lucide-react";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { TRACK_LABELS, TRACK_DESCRIPTIONS, LEVEL_LABELS, formatDuration } from "@/lib/academy";

type Course = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  track: "tri" | "circulaire" | "entrepreneuriat";
  level: string;
  source_type: string;
  source_provider: string | null;
  duration_minutes: number | null;
  is_free: boolean;
};

const TRACK_ICONS = { tri: Recycle, circulaire: Sprout, entrepreneuriat: Briefcase } as const;
const TRACKS: Course["track"][] = ["tri", "circulaire", "entrepreneuriat"];

const GreenAcademy = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTrack, setActiveTrack] = useState<"all" | Course["track"]>("all");

  useEffect(() => {
    supabase
      .from("courses")
      .select("id, slug, title, description, cover_url, track, level, source_type, source_provider, duration_minutes, is_free")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setCourses((data ?? []) as Course[]);
        setLoading(false);
      });
  }, []);

  const filtered = activeTrack === "all" ? courses : courses.filter((c) => c.track === activeTrack);

  const stats = [
    { icon: Play, val: String(courses.length), label: "Formations" },
    { icon: BookOpen, val: "3", label: "Parcours" },
    { icon: Award, val: "Certif.", label: "De parcours" },
    { icon: TrendingUp, val: "100%", label: "Sans quitter l'app" },
  ];

  return (
    <div className="min-h-dvh bg-white font-inter">
      <SEO
        title="Green Academy · Toutes les formations en économie circulaire, dans une seule app"
        description="Apprenez le tri, le compostage, les métiers verts et l'économie circulaire au Togo. Vidéos, MOOCs et ateliers — agrégés et suivis depuis RECYC HUB TOGO."
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
              Toutes les formations vertes,{" "}
              <span className="italic text-primary">dans une seule app</span>.
            </h1>
            <p className="mt-8 text-background/75 font-light text-lg md:text-xl max-w-2xl leading-relaxed">
              On ne réinvente pas la roue : on rassemble les meilleurs cours
              vidéo et MOOCs existants, et vous les suivez sans jamais quitter
              RECYC HUB TOGO. Progression sauvegardée, certificat de parcours à
              la clé.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#catalogue"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Explorer le catalogue
                <ArrowUpRight className="w-4 h-4" />
              </a>
              {!user && (
                <Link
                  to="/inscription"
                  className="inline-flex items-center gap-2 border border-background/30 px-6 py-3 rounded-sm font-semibold text-sm hover:bg-background/10 transition-colors"
                >
                  S'inscrire gratuitement
                </Link>
              )}
              {user && (
                <Link
                  to="/academy/mon-parcours"
                  className="inline-flex items-center gap-2 border border-background/30 px-6 py-3 rounded-sm font-semibold text-sm hover:bg-background/10 transition-colors"
                >
                  Mon parcours
                </Link>
              )}
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="border border-background/15 p-5 rounded-sm backdrop-blur-sm">
                <s.icon className="w-5 h-5 text-primary mb-3" />
                <div className="font-editorial text-3xl font-bold">{s.val}</div>
                <div className="text-xs uppercase tracking-wider text-background/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
      </header>

      {/* TRACKS */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[hsl(150_14%_97%)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">Trois parcours</span>
            <h2 className="mt-6 font-editorial font-bold text-4xl md:text-5xl text-foreground leading-tight">
              Choisissez votre <span className="italic text-primary">trajectoire verte</span>.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {TRACKS.map((t) => {
              const Icon = TRACK_ICONS[t];
              const count = courses.filter((c) => c.track === t).length;
              return (
                <article
                  key={t}
                  onClick={() => { setActiveTrack(t); document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="cursor-pointer bg-white border border-foreground/10 p-8 md:p-10 rounded-sm hover:border-primary/40 hover:shadow-[14px_14px_0_0_hsl(var(--primary)/0.10)] transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-primary/10 text-primary mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-editorial font-bold text-2xl text-foreground mb-3">{TRACK_LABELS[t]}</h3>
                  <p className="text-[15px] text-muted-foreground font-light leading-relaxed mb-6">{TRACK_DESCRIPTIONS[t]}</p>
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                    {count} formation{count > 1 ? "s" : ""}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section id="catalogue" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">Catalogue</span>
              <h2 className="mt-6 font-editorial font-bold text-4xl md:text-5xl text-foreground leading-tight">
                Formations disponibles
              </h2>
              <p className="mt-4 text-muted-foreground font-light text-lg">
                Vidéos jouées dans l'app · MOOCs externes ouverts en un clic, progression suivie.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTrack("all")}
                className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider border transition-colors ${activeTrack === "all" ? "bg-foreground text-background border-foreground" : "border-foreground/15 hover:border-foreground/40"}`}
              >Tout</button>
              {TRACKS.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTrack(t)}
                  className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider border transition-colors ${activeTrack === t ? "bg-foreground text-background border-foreground" : "border-foreground/15 hover:border-foreground/40"}`}
                >{TRACK_LABELS[t]}</button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-muted-foreground">Chargement…</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">Aucune formation pour ce parcours pour l'instant.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((c) => (
                <Link
                  key={c.id}
                  to={`/academy/cours/${c.slug}`}
                  className="group block bg-white border border-foreground/10 rounded-sm overflow-hidden hover:border-primary/40 hover:shadow-[14px_14px_0_0_hsl(var(--primary)/0.10)] transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[hsl(150_14%_94%)]">
                    {c.cover_url && (
                      <img src={c.cover_url} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{TRACK_LABELS[c.track]}</span>
                      {c.source_type === "external" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground"><ExternalLink className="w-3 h-3" />{c.source_provider}</span>
                      ) : (
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.source_provider}</span>
                      )}
                    </div>
                    <h3 className="font-editorial font-bold text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                      {c.title}
                    </h3>
                    {c.description && (
                      <p className="mt-3 text-sm text-muted-foreground font-light line-clamp-2">{c.description}</p>
                    )}
                    <div className="mt-5 pt-5 border-t border-foreground/10 flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{formatDuration(c.duration_minutes)}</span>
                        <span>{LEVEL_LABELS[c.level] ?? c.level}</span>
                      </div>
                      {c.is_free ? (
                        <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-primary/10 text-primary font-bold">Gratuit</span>
                      ) : (
                        <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-foreground text-background font-bold">Premium</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="w-10 h-10 text-primary mx-auto mb-6" />
          <h2 className="font-editorial font-bold text-4xl md:text-5xl leading-tight">
            Apprendre, sans jamais <span className="italic text-primary">quitter l'app</span>.
          </h2>
          <p className="mt-6 text-background/75 font-light text-lg max-w-2xl mx-auto">
            Connectez-vous pour suivre votre progression, reprendre où vous vous êtes
            arrêté et recevoir vos certificats de parcours.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            {user ? (
              <Link to="/academy/mon-parcours" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity">
                Voir mon parcours <ArrowUpRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link to="/inscription" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity">
                Créer mon compte <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
            <Link to="/solutions" className="inline-flex items-center gap-2 border border-background/30 px-8 py-4 rounded-sm font-semibold text-sm hover:bg-background/10 transition-colors">
              Nos autres solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GreenAcademy;
