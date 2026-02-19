
-- 1. Role enum & user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 2. has_role helper function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 3. Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  pseudo TEXT UNIQUE NOT NULL,
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  tel TEXT UNIQUE NOT NULL,
  commune TEXT NOT NULL,
  quartier TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. pickup_requests
CREATE TABLE public.pickup_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  repere TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.pickup_requests ENABLE ROW LEVEL SECURITY;

-- 5. plastic_sales
CREATE TABLE public.plastic_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  repere TEXT NOT NULL,
  kilos NUMERIC NOT NULL DEFAULT 1,
  photo_url TEXT,
  status TEXT NOT NULL DEFAULT 'offered',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.plastic_sales ENABLE ROW LEVEL SECURITY;

-- 6. dumps_alerts
CREATE TABLE public.dumps_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  photo_url TEXT,
  repere TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'reported',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.dumps_alerts ENABLE ROW LEVEL SECURITY;

-- 7. events
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  lieu TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 8. Storage bucket for photos
INSERT INTO storage.buckets (id, name, public) VALUES ('recychub-photos', 'recychub-photos', true);

-- 9. updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 10. Auto-create profile trigger (on signup, profile created via app)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, pseudo, prenom, nom, tel, commune, quartier)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'pseudo', ''),
    COALESCE(NEW.raw_user_meta_data->>'prenom', ''),
    COALESCE(NEW.raw_user_meta_data->>'nom', ''),
    COALESCE(NEW.raw_user_meta_data->>'tel', ''),
    COALESCE(NEW.raw_user_meta_data->>'commune', ''),
    COALESCE(NEW.raw_user_meta_data->>'quartier', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========== RLS POLICIES ==========

-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- pickup_requests
CREATE POLICY "Users can view own requests" ON public.pickup_requests
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all requests" ON public.pickup_requests
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can create own requests" ON public.pickup_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own requests" ON public.pickup_requests
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can update all requests" ON public.pickup_requests
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can delete own requests" ON public.pickup_requests
  FOR DELETE USING (auth.uid() = user_id);

-- plastic_sales
CREATE POLICY "Users can view own sales" ON public.plastic_sales
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all sales" ON public.plastic_sales
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can create own sales" ON public.plastic_sales
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sales" ON public.plastic_sales
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sales" ON public.plastic_sales
  FOR DELETE USING (auth.uid() = user_id);

-- dumps_alerts
CREATE POLICY "Anyone can create alerts" ON public.dumps_alerts
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own alerts" ON public.dumps_alerts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all alerts" ON public.dumps_alerts
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can update own alerts" ON public.dumps_alerts
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can update all alerts" ON public.dumps_alerts
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- events (public read, admin write)
CREATE POLICY "Anyone can view events" ON public.events
  FOR SELECT USING (true);
CREATE POLICY "Admins can create events" ON public.events
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update events" ON public.events
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete events" ON public.events
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- user_roles (admin only)
CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can assign roles" ON public.user_roles
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can remove roles" ON public.user_roles
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Storage policies for recychub-photos
CREATE POLICY "Anyone can view photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'recychub-photos');
CREATE POLICY "Authenticated users can upload photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'recychub-photos' AND auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete own photos" ON storage.objects
  FOR DELETE USING (bucket_id = 'recychub-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
