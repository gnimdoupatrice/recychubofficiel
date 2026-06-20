import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, Clock, ExternalLink, AlertTriangle, PlayCircle, GraduationCap, Loader2 } from "lucide-react";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useYouTubeProgress } from "@/hooks/useYouTubeProgress";
import { TRACK_LABELS, LEVEL_LABELS, formatDuration, extractYouTubeId } from "@/lib/academy";
import { toast } from "@/components/ui/sonner";

type Course = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  track: "tri" | "circulaire" | "entrepreneuriat";
  level: string;
  source_type: string;
  source_url: string;
  source_provider: string | null;
  duration_minutes: number | null;
  legal_notice: string | null;
};
type Module = {
  id: string;
  course_id: string;
  title: string;
  source_type: string;
  source_url: string;
  video_id: string | null;
  duration_minutes: number | null;
  position: number;
};
type Progress = { module_id: string; status: "not_started" | "in_progress" | "completed"; watched_seconds: number };

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<Record<string, Progress>>({});
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth required
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Connectez-vous pour suivre cette formation");
      navigate(`/connexion?next=/academy/cours/${slug}`);
    }
  }, [user, authLoading, navigate, slug]);

  // Load course + modules + progress
  useEffect(() => {
    if (!user || !slug) return;
    (async () => {
      setLoading(true);
      const { data: c } = await supabase.from("courses").select("*").eq("slug", slug).maybeSingle();
      if (!c) { setLoading(false); return; }
      setCourse(c as Course);

      const { data: m } = await supabase.from("modules").select("*").eq("course_id", c.id).order("position", { ascending: true });
      const mods = (m ?? []) as Module[];
      setModules(mods);
      setActiveModuleId(mods[0]?.id ?? null);

      if (mods.length > 0) {
        const { data: p } = await supabase
          .from("module_progress")
          .select("module_id, status, watched_seconds")
          .eq("user_id", user.id)
          .in("module_id", mods.map((x) => x.id));
        const map: Record<string, Progress> = {};
        (p ?? []).forEach((row: any) => { map[row.module_id] = row; });
        setProgress(map);
      }

      // Upsert enrollment
      await supabase.from("enrollments").upsert(
        { user_id: user.id, course_id: c.id },
        { onConflict: "user_id,course_id", ignoreDuplicates: true }
      );

      setLoading(false);
    })();
  }, [user, slug]);

  const activeModule = useMemo(() => modules.find((m) => m.id === activeModuleId) ?? null, [modules, activeModuleId]);
  const completedCount = useMemo(() => Object.values(progress).filter((p) => p.status === "completed").length, [progress]);
  const totalCount = modules.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Update overall enrollment progress + certificate when 100%
  useEffect(() => {
    if (!user || !course || totalCount === 0) return;
    (async () => {
      await supabase.from("enrollments").update({
        progress_pct: pct,
        completed_at: pct === 100 ? new Date().toISOString() : null,
      }).eq("user_id", user.id).eq("course_id", course.id);

      if (pct === 100) {
        // Issue certificate (idempotent via unique constraint)
        await supabase.from("certificates").upsert(
          { user_id: user.id, course_id: course.id },
          { onConflict: "user_id,course_id", ignoreDuplicates: true }
        );
      }
    })();
  }, [pct, user, course, totalCount]);

  const markCompleted = useCallback(async (moduleId: string) => {
    if (!user) return;
    setProgress((prev) => ({ ...prev, [moduleId]: { module_id: moduleId, status: "completed", watched_seconds: prev[moduleId]?.watched_seconds ?? 0 } }));
    await supabase.from("module_progress").upsert(
      { user_id: user.id, module_id: moduleId, status: "completed", completed_at: new Date().toISOString() },
      { onConflict: "user_id,module_id" }
    );
    toast.success("Module marqué comme terminé ✓");
  }, [user]);

  const tickProgress = useCallback(async (moduleId: string, watched: number) => {
    if (!user) return;
    await supabase.from("module_progress").upsert(
      { user_id: user.id, module_id: moduleId, status: "in_progress", watched_seconds: watched },
      { onConflict: "user_id,module_id" }
    );
  }, [user]);

  if (authLoading || loading) {
    return <div className="min-h-dvh flex items-center justify-center pt-24"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }
  if (!course) {
    return (
      <div className="min-h-dvh pt-32 px-6 max-w-3xl mx-auto text-center">
        <h1 className="font-editorial text-3xl font-bold mb-4">Formation introuvable</h1>
        <Link to="/academy" className="text-primary underline">Retour au catalogue</Link>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-white font-inter pt-24 pb-20">
      <SEO title={`${course.title} · Green Academy`} description={course.description ?? undefined} path={`/academy/cours/${slug}`} />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Link to="/academy" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Catalogue
        </Link>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          {/* MAIN */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{TRACK_LABELS[course.track]}</span>
            <h1 className="mt-3 font-editorial font-bold text-3xl md:text-5xl text-foreground leading-tight">{course.title}</h1>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{formatDuration(course.duration_minutes)}</span>
              <span>{LEVEL_LABELS[course.level] ?? course.level}</span>
              <span>Source : {course.source_provider}</span>
            </div>

            {/* PLAYER */}
            <div className="mt-8">
              {activeModule && <ModuleViewer
                key={activeModule.id}
                module={activeModule}
                onTick={(sec) => tickProgress(activeModule.id, sec)}
                onComplete={() => markCompleted(activeModule.id)}
                onManualComplete={() => markCompleted(activeModule.id)}
                isCompleted={progress[activeModule.id]?.status === "completed"}
              />}
            </div>

            {course.description && (
              <div className="mt-10">
                <h2 className="font-editorial font-bold text-2xl text-foreground mb-3">À propos</h2>
                <p className="text-muted-foreground font-light leading-relaxed">{course.description}</p>
              </div>
            )}

            {course.legal_notice && (
              <div className="mt-8 p-5 bg-[hsl(150_14%_97%)] border-l-2 border-primary/40 text-sm text-muted-foreground flex gap-3">
                <AlertTriangle className="w-4 h-4 text-primary/70 shrink-0 mt-0.5" />
                <p>{course.legal_notice}</p>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="border border-foreground/10 rounded-sm overflow-hidden">
              <div className="p-5 bg-[hsl(150_14%_97%)] border-b border-foreground/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Progression</span>
                  <span className="font-editorial font-bold text-primary">{pct}%</span>
                </div>
                <div className="h-1.5 bg-foreground/10 overflow-hidden rounded-full">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{completedCount} / {totalCount} module{totalCount > 1 ? "s" : ""}</p>
              </div>

              <ul className="divide-y divide-foreground/10">
                {modules.map((m, i) => {
                  const done = progress[m.id]?.status === "completed";
                  const active = m.id === activeModuleId;
                  return (
                    <li key={m.id}>
                      <button
                        onClick={() => setActiveModuleId(m.id)}
                        className={`w-full text-left p-4 flex items-start gap-3 transition-colors ${active ? "bg-primary/5" : "hover:bg-[hsl(150_14%_97%)]"}`}
                      >
                        {done ? <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /> : <Circle className="w-5 h-5 text-foreground/30 shrink-0 mt-0.5" />}
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-semibold ${active ? "text-primary" : "text-foreground"} truncate`}>
                            {String(i + 1).padStart(2, "0")} · {m.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{formatDuration(m.duration_minutes)} · {m.source_type === "external" ? "Externe" : "Vidéo"}</p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {pct === 100 && (
                <div className="p-5 bg-primary/5 border-t border-primary/20 text-center">
                  <GraduationCap className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold text-foreground">Parcours terminé !</p>
                  <Link to="/academy/mon-parcours" className="mt-2 inline-block text-xs text-primary underline">Voir mon certificat</Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

interface ModuleViewerProps {
  module: Module;
  onTick: (seconds: number) => void;
  onComplete: () => void;
  onManualComplete: () => void;
  isCompleted: boolean;
}
const ModuleViewer = ({ module, onTick, onComplete, onManualComplete, isCompleted }: ModuleViewerProps) => {
  const videoId = module.video_id ?? extractYouTubeId(module.source_url);
  const containerId = `yt-player-${module.id}`;

  useYouTubeProgress(
    containerId,
    module.source_type === "youtube" ? videoId : null,
    { onTick, onComplete }
  );

  if (module.source_type === "youtube" && videoId) {
    return (
      <div>
        <div className="aspect-video w-full bg-black overflow-hidden rounded-sm">
          <div id={containerId} className="w-full h-full" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Le module se marque automatiquement terminé à 90 % de visionnage.</p>
          {!isCompleted && (
            <button onClick={onManualComplete} className="text-xs uppercase tracking-widest text-primary font-bold hover:underline">
              Marquer terminé
            </button>
          )}
        </div>
      </div>
    );
  }

  if (module.source_type === "external") {
    return (
      <div className="p-8 md:p-12 bg-[hsl(150_14%_97%)] border border-foreground/10 rounded-sm text-center">
        <ExternalLink className="w-10 h-10 text-primary mx-auto mb-4" />
        <h3 className="font-editorial font-bold text-2xl text-foreground mb-3">Formation externe</h3>
        <p className="text-muted-foreground font-light mb-6 max-w-lg mx-auto">
          Cette formation est hébergée par un partenaire. Cliquez pour l'ouvrir dans un nouvel onglet, puis revenez ici pour valider votre progression.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href={module.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-semibold text-sm hover:opacity-90"
          >
            <PlayCircle className="w-4 h-4" /> Suivre la formation
          </a>
          {!isCompleted && (
            <button onClick={onManualComplete} className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 rounded-sm font-semibold text-sm hover:bg-foreground/5">
              <CheckCircle2 className="w-4 h-4" /> J'ai terminé
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <a href={module.source_url} target="_blank" rel="noopener noreferrer" className="block p-6 border rounded-sm hover:border-primary">
      Ouvrir : {module.title}
    </a>
  );
};

export default CourseDetail;
