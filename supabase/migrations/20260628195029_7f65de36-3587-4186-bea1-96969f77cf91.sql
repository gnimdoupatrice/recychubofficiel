
-- Green Academy: courses, modules, enrollments, module_progress, certificates

CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  track TEXT NOT NULL CHECK (track IN ('tri','circulaire','entrepreneuriat')),
  level TEXT NOT NULL DEFAULT 'tous',
  source_type TEXT NOT NULL DEFAULT 'youtube',
  source_url TEXT NOT NULL DEFAULT '',
  source_provider TEXT,
  duration_minutes INT,
  is_free BOOLEAN NOT NULL DEFAULT true,
  legal_notice TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.courses TO anon, authenticated;
GRANT ALL ON public.courses TO service_role;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Courses are publicly readable when published" ON public.courses FOR SELECT USING (published = true);
CREATE POLICY "Admins manage courses" ON public.courses FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  source_type TEXT NOT NULL DEFAULT 'youtube',
  source_url TEXT NOT NULL DEFAULT '',
  video_id TEXT,
  duration_minutes INT,
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX modules_course_idx ON public.modules(course_id, position);
GRANT SELECT ON public.modules TO anon, authenticated;
GRANT ALL ON public.modules TO service_role;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Modules readable" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Admins manage modules" ON public.modules FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  progress_pct INT NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.enrollments TO authenticated;
GRANT ALL ON public.enrollments TO service_role;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own enrollments" ON public.enrollments FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins read all enrollments" ON public.enrollments FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed')),
  watched_seconds INT NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, module_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.module_progress TO authenticated;
GRANT ALL ON public.module_progress TO service_role;
ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own module progress" ON public.module_progress FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  verification_code TEXT NOT NULL DEFAULT upper(substr(replace(gen_random_uuid()::text,'-',''),1,10)),
  UNIQUE(user_id, course_id)
);
GRANT SELECT, INSERT ON public.certificates TO authenticated;
GRANT ALL ON public.certificates TO service_role;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own certificates" ON public.certificates FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own certificates" ON public.certificates FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins read all certificates" ON public.certificates FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
