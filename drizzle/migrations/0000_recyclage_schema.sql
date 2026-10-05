CREATE TYPE public.app_role AS ENUM ('household', 'company', 'admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  full_name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  quartier text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT 'Kara',
  address text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE TABLE public.companies (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  city text NOT NULL DEFAULT 'Kara',
  description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.companies TO authenticated;
GRANT ALL ON public.companies TO service_role;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "companies readable" ON public.companies FOR SELECT TO authenticated USING (true);
CREATE POLICY "company updates self" ON public.companies FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE TABLE public.materials (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  sort int NOT NULL DEFAULT 0
);
GRANT SELECT ON public.materials TO anon, authenticated;
GRANT ALL ON public.materials TO service_role;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "materials public" ON public.materials FOR SELECT TO anon, authenticated USING (true);
INSERT INTO public.materials (id, name, category, sort) VALUES
 ('pet', 'Bouteilles plastique (PET)', 'Plastique', 1),
 ('pehd', 'Plastique dur (bidons, seaux)', 'Plastique', 2),
 ('sachets', 'Sachets et films plastique', 'Plastique', 3),
 ('fer', 'Fer et ferraille', 'Métal', 4),
 ('cuivre', 'Cuivre (fils, câbles)', 'Métal', 5),
 ('aluminium', 'Aluminium (canettes, marmites)', 'Métal', 6),
 ('laiton', 'Laiton et bronze', 'Métal', 7),
 ('batteries', 'Batteries usagées', 'Métal', 8);

CREATE TABLE public.company_prices (
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  material_id text NOT NULL REFERENCES public.materials(id),
  price_per_kg numeric NOT NULL CHECK (price_per_kg >= 0),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (company_id, material_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.company_prices TO authenticated;
GRANT ALL ON public.company_prices TO service_role;
ALTER TABLE public.company_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "prices readable" ON public.company_prices FOR SELECT TO authenticated USING (true);
CREATE POLICY "company manages prices ins" ON public.company_prices FOR INSERT TO authenticated WITH CHECK (auth.uid() = company_id AND public.has_role(auth.uid(), 'company'));
CREATE POLICY "company manages prices upd" ON public.company_prices FOR UPDATE TO authenticated USING (auth.uid() = company_id);
CREATE POLICY "company manages prices del" ON public.company_prices FOR DELETE TO authenticated USING (auth.uid() = company_id);

CREATE TABLE public.tours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  tour_date date NOT NULL,
  zone text NOT NULL DEFAULT '',
  note text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'planned' CHECK (status IN ('planned','done','cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tours TO authenticated;
GRANT ALL ON public.tours TO service_role;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.declarations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  material_id text NOT NULL REFERENCES public.materials(id),
  estimated_kg numeric NOT NULL CHECK (estimated_kg > 0),
  quartier text NOT NULL,
  city text NOT NULL DEFAULT 'Kara',
  address text NOT NULL DEFAULT '',
  note text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','scheduled','collected','cancelled')),
  tour_id uuid REFERENCES public.tours(id) ON DELETE SET NULL,
  collected_kg numeric,
  price_per_kg numeric,
  collected_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.declarations TO authenticated;
GRANT ALL ON public.declarations TO service_role;
ALTER TABLE public.declarations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner reads decl" ON public.declarations FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner creates decl" ON public.declarations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND public.has_role(auth.uid(), 'household') AND status = 'pending' AND tour_id IS NULL);
CREATE POLICY "company reads tour decl" ON public.declarations FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.tours t WHERE t.id = tour_id AND t.company_id = auth.uid()));

CREATE POLICY "company manages tours" ON public.tours FOR ALL TO authenticated
  USING (auth.uid() = company_id) WITH CHECK (auth.uid() = company_id AND public.has_role(auth.uid(), 'company'));
CREATE POLICY "household sees its tours" ON public.tours FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.declarations d WHERE d.tour_id = tours.id AND d.user_id = auth.uid()));

-- Signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE r text := coalesce(NEW.raw_user_meta_data->>'role', 'household');
BEGIN
  IF r NOT IN ('household','company') THEN r := 'household'; END IF;
  INSERT INTO public.profiles (id, full_name, phone, quartier, city, address)
  VALUES (NEW.id, coalesce(NEW.raw_user_meta_data->>'full_name',''), coalesce(NEW.raw_user_meta_data->>'phone',''),
          coalesce(NEW.raw_user_meta_data->>'quartier',''), coalesce(NULLIF(NEW.raw_user_meta_data->>'city',''),'Kara'),
          coalesce(NEW.raw_user_meta_data->>'address',''));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, r::app_role);
  IF r = 'company' THEN
    INSERT INTO public.companies (id, name, city) VALUES (NEW.id,
      coalesce(NULLIF(NEW.raw_user_meta_data->>'company_name',''), NEW.raw_user_meta_data->>'full_name', 'Entreprise'),
      coalesce(NULLIF(NEW.raw_user_meta_data->>'city',''),'Kara'));
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Household cancels its pending declaration
CREATE OR REPLACE FUNCTION public.cancel_declaration(_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.declarations SET status = 'cancelled', tour_id = NULL
  WHERE id = _id AND user_id = auth.uid() AND status IN ('pending','scheduled');
END $$;

-- Companies see open declarations without address or identity
CREATE OR REPLACE FUNCTION public.open_declarations()
RETURNS TABLE (id uuid, material_id text, estimated_kg numeric, quartier text, city text, created_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT d.id, d.material_id, d.estimated_kg, d.quartier, d.city, d.created_at
  FROM public.declarations d
  WHERE d.status = 'pending' AND public.has_role(auth.uid(), 'company')
  ORDER BY d.quartier, d.created_at
$$;

CREATE OR REPLACE FUNCTION public.assign_to_tour(_tour uuid, _ids uuid[])
RETURNS int LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE n int;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.tours WHERE id = _tour AND company_id = auth.uid() AND status = 'planned') THEN
    RAISE EXCEPTION 'Tournée introuvable';
  END IF;
  UPDATE public.declarations SET status = 'scheduled', tour_id = _tour
  WHERE id = ANY(_ids) AND status = 'pending';
  GET DIAGNOSTICS n = ROW_COUNT;
  RETURN n;
END $$;

CREATE OR REPLACE FUNCTION public.release_from_tour(_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.declarations d SET status = 'pending', tour_id = NULL
  FROM public.tours t WHERE d.id = _id AND t.id = d.tour_id AND t.company_id = auth.uid() AND d.status = 'scheduled';
END $$;

CREATE OR REPLACE FUNCTION public.complete_stop(_id uuid, _kg numeric, _price numeric)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.declarations d SET status = 'collected', collected_kg = _kg, price_per_kg = _price, collected_at = now()
  FROM public.tours t WHERE d.id = _id AND t.id = d.tour_id AND t.company_id = auth.uid() AND d.status = 'scheduled';
END $$;

-- Cancelling a tour releases its stops
CREATE OR REPLACE FUNCTION public.on_tour_cancel()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.status = 'cancelled' AND OLD.status <> 'cancelled' THEN
    UPDATE public.declarations SET status = 'pending', tour_id = NULL WHERE tour_id = NEW.id AND status = 'scheduled';
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER tour_cancel AFTER UPDATE ON public.tours FOR EACH ROW EXECUTE FUNCTION public.on_tour_cancel();

REVOKE EXECUTE ON FUNCTION public.open_declarations, public.assign_to_tour, public.release_from_tour, public.complete_stop, public.cancel_declaration FROM anon, public;
GRANT EXECUTE ON FUNCTION public.open_declarations, public.assign_to_tour, public.release_from_tour, public.complete_stop, public.cancel_declaration TO authenticated;