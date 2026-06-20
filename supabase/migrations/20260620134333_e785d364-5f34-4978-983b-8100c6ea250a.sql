
-- Tighten the permissive INSERT policy on dumps_alerts
DROP POLICY "Anyone can report a dump" ON public.dumps_alerts;
CREATE POLICY "Anon can report anonymous dump" ON public.dumps_alerts
  FOR INSERT TO anon WITH CHECK (user_id IS NULL);
CREATE POLICY "Authenticated can report dump" ON public.dumps_alerts
  FOR INSERT TO authenticated WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

-- Restrict trigger / definer functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;
