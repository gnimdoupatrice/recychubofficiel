
CREATE POLICY "Authenticated upload to own folder" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'recychub-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Anonymous folder upload for alerts" ON storage.objects
  FOR INSERT TO anon
  WITH CHECK (bucket_id = 'recychub-photos' AND (storage.foldername(name))[1] = 'anonymous');

CREATE POLICY "Owners read own photos" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'recychub-photos' AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.has_role(auth.uid(), 'admin')
  ));
