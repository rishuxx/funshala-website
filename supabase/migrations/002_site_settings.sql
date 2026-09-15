-- 9. SITE SETTINGS (For dynamic Hero content, admissions badge, phone, address, etc.)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Allow public read on site settings" ON public.site_settings FOR SELECT USING (TRUE);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow admin full access on site settings" ON public.site_settings FOR ALL USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Seed Default Hero & Contact Settings
INSERT INTO public.site_settings (key, value)
VALUES
  ('hero', '{
    "badge": "Admissions Open • 2026–27",
    "headline": "A Joyful Start to Lifelong Learning",
    "subtext": "Funshala is a Montessori-inspired preschool where children learn, explore, and grow in a safe, nurturing, and thoughtfully designed environment.",
    "primaryCtaText": "Explore Programs",
    "primaryCtaLink": "/programs",
    "secondaryCtaText": "Book a School Tour",
    "secondaryCtaLink": "/contact",
    "heroImage": ""
  }'::jsonb),
  ('contact', '{
    "phone": "8009767534",
    "email": "funshalakindergarten@gmail.com",
    "address": "BM-04 Near New Prayag Hospital, Viswa Bank Colony, ADA Colony, Naini, Prayagraj – 211008"
  }'::jsonb)
ON CONFLICT (key) DO NOTHING;
