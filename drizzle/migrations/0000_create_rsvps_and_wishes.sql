CREATE TABLE public.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 80),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 30),
  guests integer NOT NULL DEFAULT 1 CHECK (guests BETWEEN 1 AND 10),
  attending boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.rsvps TO anon, authenticated;
GRANT ALL ON public.rsvps TO service_role;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an RSVP" ON public.rsvps FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 60),
  message text NOT NULL CHECK (char_length(btrim(message)) BETWEEN 1 AND 300),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.wishes TO anon, authenticated;
GRANT ALL ON public.wishes TO service_role;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read wishes" ON public.wishes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can post a wish" ON public.wishes FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.attending_total()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(SUM(guests), 0)::integer FROM public.rsvps WHERE attending = true
$$;
GRANT EXECUTE ON FUNCTION public.attending_total() TO anon, authenticated;

INSERT INTO public.wishes (name, message) VALUES
  ('سارة', 'ألف مبروك، الله يتمم لكم على خير 🤍'),
  ('محمد', 'بارك الله لكما وبارك عليكما وجمع بينكما في خير'),
  ('Lina', 'Can''t wait to celebrate with you 💕');