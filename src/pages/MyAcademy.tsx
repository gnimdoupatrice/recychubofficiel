import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Award, BookOpen, Clock, Loader2, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { TRACK_LABELS } from "@/lib/academy";

type Row = {
  course_id: string;
  progress_pct: number;
  completed_at: string | null;
  started_at: string;
  courses: { id: string; slug: string; title: string; cover_url: string | null; track: string };
};
type Cert = { id: string; issued_at: string; verification_code: string; courses: { slug: string; title: string } };

const MyAcademy = () => {
  const { user, loading: authLoading, profile } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [certs, setCerts] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) { navigate("/connexion?next=/academy/mon-parcours"); return; }
    if (!user) return;
    (async () => {
      const [{ data: enrolls }, { data: certificates }] = await Promise.all([
        supabase
          .from("enrollments")
          .select("course_id, progress_pct, completed_at, started_at, courses(id, slug, title, cover_url, track)")
          .eq("user_id", user.id)
          .order("started_at", { ascending: false }),
        supabase
          .from("certificates")
          .select("id, issued_at, verification_code, courses(slug, title)")
          .eq("user_id", user.id)
          .order("issued_at", { ascending: false }),
      ]);
      setRows((enrolls ?? []) as unknown as Row[]);
      setCerts((certificates ?? []) as unknown as Cert[]);
      setLoading(false);
    })();
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return <div className="min-h-dvh flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const inProgress = rows.filter((r) => !r.completed_at);
  const completed = rows.filter((r) => r.completed_at);

  return (
    <div className="min-h-dvh bg-white font-inter pt-28 pb-20">
      <SEO title="Mon parcours · Green Academy" description="Suivez votre progression et vos certificats de la Green Academy." path="/academy/mon-parcours" />
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">Mon parcours</span>
        <h1 className="mt-3 font-editorial font-bold text-4xl md:text-5xl text-foreground">
          Bonjour {profile?.prenom ?? ""}
        </h1>
        <p className="mt-3 text-muted-foreground font-light">
          Reprenez vos formations en cours, retrouvez vos certificats de parcours.
        </p>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          <Stat icon={BookOpen} val={String(rows.length)} label="Formations démarrées" />
          <Stat icon={Clock} val={String(inProgress.length)} label="En cours" />
          <Stat icon={Award} val={String(certs.length)} label="Certificats" />
        </div>

        <Section title="À reprendre" empty="Aucune formation en cours. Explorez le catalogue." emptyAction>
          {inProgress.map((r) => <CourseRow key={r.course_id} row={r} />)}
        </Section>

        <Section title="Terminées" empty="Aucune formation terminée pour le moment.">
          {completed.map((r) => <CourseRow key={r.course_id} row={r} />)}
        </Section>

        <Section title="Mes certificats de parcours" empty="Vos certificats apparaîtront ici à 100 % d'un parcours.">
          {certs.map((c) => (
            <div key={c.id} className="flex items-center justify-between gap-4 p-5 border border-foreground/10 rounded-sm">
              <div className="flex items-center gap-4 min-w-0">
                <Award className="w-6 h-6 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="font-editorial font-bold text-foreground truncate">{c.courses.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Délivré le {new Date(c.issued_at).toLocaleDateString("fr-FR")} · Code {c.verification_code}
                  </p>
                </div>
              </div>
              <Link to={`/academy/cours/${c.courses.slug}`} className="text-xs uppercase tracking-widest text-primary font-bold hover:underline shrink-0">
                Revoir
              </Link>
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
};

const Stat = ({ icon: Icon, val, label }: { icon: any; val: string; label: string }) => (
  <div className="border border-foreground/10 p-5 rounded-sm">
    <Icon className="w-5 h-5 text-primary mb-3" />
    <div className="font-editorial text-3xl font-bold text-foreground">{val}</div>
    <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{label}</div>
  </div>
);

const Section = ({ title, children, empty, emptyAction }: { title: string; children: React.ReactNode; empty: string; emptyAction?: boolean }) => {
  const arr = Array.isArray(children) ? children : [children];
  const hasContent = arr.filter(Boolean).length > 0;
  return (
    <section className="mt-12">
      <h2 className="font-editorial font-bold text-2xl text-foreground mb-5">{title}</h2>
      {hasContent ? (
        <div className="space-y-3">{children}</div>
      ) : (
        <div className="p-8 border border-dashed border-foreground/15 rounded-sm text-center text-muted-foreground">
          <p>{empty}</p>
          {emptyAction && (
            <Link to="/academy" className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-primary font-bold">
              Voir le catalogue <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      )}
    </section>
  );
};

const CourseRow = ({ row }: { row: Row }) => (
  <Link
    to={`/academy/cours/${row.courses.slug}`}
    className="flex items-center gap-4 p-4 border border-foreground/10 rounded-sm hover:border-primary/40 transition-colors group"
  >
    <div className="w-20 h-14 bg-[hsl(150_14%_94%)] overflow-hidden rounded-sm shrink-0">
      {row.courses.cover_url && <img src={row.courses.cover_url} alt="" className="w-full h-full object-cover" />}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] uppercase tracking-widest text-primary font-bold">{TRACK_LABELS[row.courses.track]}</p>
      <p className="font-editorial font-bold text-foreground truncate group-hover:text-primary transition-colors">{row.courses.title}</p>
      <div className="mt-2 h-1 bg-foreground/10 rounded-full overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${row.progress_pct}%` }} />
      </div>
    </div>
    <span className="text-sm font-editorial font-bold text-primary tabular-nums shrink-0">{row.progress_pct}%</span>
  </Link>
);

export default MyAcademy;
