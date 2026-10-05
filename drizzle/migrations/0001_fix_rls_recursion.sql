CREATE OR REPLACE FUNCTION public.owns_tour(_tour uuid, _user uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.tours WHERE id = _tour AND company_id = _user)
$$;
CREATE OR REPLACE FUNCTION public.has_decl_in_tour(_tour uuid, _user uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.declarations WHERE tour_id = _tour AND user_id = _user)
$$;
DROP POLICY "company reads tour decl" ON public.declarations;
CREATE POLICY "company reads tour decl" ON public.declarations FOR SELECT TO authenticated
  USING (tour_id IS NOT NULL AND public.owns_tour(tour_id, auth.uid()));
DROP POLICY "household sees its tours" ON public.tours;
CREATE POLICY "household sees its tours" ON public.tours FOR SELECT TO authenticated
  USING (public.has_decl_in_tour(id, auth.uid()));