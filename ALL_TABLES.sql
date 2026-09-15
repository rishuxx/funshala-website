-- ============================================================================
-- FUNSHALA KINDERGARTEN — COMPLETE SUPABASE SQL SCHEMA DDL
-- Run this in your Supabase Dashboard -> SQL Editor
-- Project: zimoxijdvqwnrzqfjlhe
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Staff & Admin Metadata linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'staff')),
  legacy_mongodb_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. PROGRAMS (Playgroup, Nursery, LKG, UKG, Daycare)
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  age_group TEXT NOT NULL,
  duration TEXT NOT NULL,
  fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  features TEXT[] DEFAULT '{}',
  display_order INT DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  legacy_mongodb_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. EVENTS (School celebrations, Sports Day, etc.)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  event_date DATE NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'celebration',
  icon_name TEXT DEFAULT 'Calendar',
  legacy_mongodb_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. GALLERY IMAGES (School photos backed by Supabase Storage bucket 'gallery')
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Activity', 'Classroom', 'Events', 'Art')),
  file_name TEXT,
  display_order INT DEFAULT 0,
  legacy_mongodb_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. STUDENTS ROSTER (Internal student records for school staff)
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INT NOT NULL,
  class_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  legacy_mongodb_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. ADMISSION APPLICATIONS (Direct from website admission form)
CREATE TABLE IF NOT EXISTS public.admission_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_name TEXT NOT NULL,
  dob DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  program_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Enrolled', 'Closed')),
  admin_notes TEXT DEFAULT '',
  legacy_mongodb_id TEXT UNIQUE,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. FRANCHISE INQUIRIES (Direct from franchise form)
CREATE TABLE IF NOT EXISTS public.franchise_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  profession TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Closed')),
  admin_notes TEXT DEFAULT '',
  legacy_mongodb_id TEXT UNIQUE,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. CONTACT MESSAGES (Direct from contact form)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
  admin_notes TEXT DEFAULT '',
  legacy_mongodb_id TEXT UNIQUE,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. SITE SETTINGS (Dynamic Hero section, contact phone/email, admissions badge)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR FAST QUERYING
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_programs_is_active ON public.programs(is_active);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_admissions_status ON public.admission_applications(status);
CREATE INDEX IF NOT EXISTS idx_franchise_status ON public.franchise_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_status ON public.contact_messages(status);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.franchise_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.role() = 'authenticated');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policy
DO $$ BEGIN
  CREATE POLICY "Allow users to view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Programs Policies
DO $$ BEGIN
  CREATE POLICY "Allow public read on active programs" ON public.programs FOR SELECT USING (is_active = TRUE);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow admin full access on programs" ON public.programs FOR ALL USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Events Policies
DO $$ BEGIN
  CREATE POLICY "Allow public read on events" ON public.events FOR SELECT USING (TRUE);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow admin full access on events" ON public.events FOR ALL USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Gallery Policies
DO $$ BEGIN
  CREATE POLICY "Allow public read on gallery images" ON public.gallery_images FOR SELECT USING (TRUE);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow admin full access on gallery images" ON public.gallery_images FOR ALL USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Students Policies
DO $$ BEGIN
  CREATE POLICY "Allow admin full access on students" ON public.students FOR ALL USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Admission Policies
DO $$ BEGIN
  CREATE POLICY "Allow public to submit admission applications" ON public.admission_applications FOR INSERT WITH CHECK (TRUE);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow admin full access on admission applications" ON public.admission_applications FOR ALL USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Franchise Policies
DO $$ BEGIN
  CREATE POLICY "Allow public to submit franchise inquiries" ON public.franchise_inquiries FOR INSERT WITH CHECK (TRUE);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow admin full access on franchise inquiries" ON public.franchise_inquiries FOR ALL USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Contact Messages Policies
DO $$ BEGIN
  CREATE POLICY "Allow public to submit contact messages" ON public.contact_messages FOR INSERT WITH CHECK (TRUE);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow admin full access on contact messages" ON public.contact_messages FOR ALL USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Site Settings Policies
DO $$ BEGIN
  CREATE POLICY "Allow public read on site settings" ON public.site_settings FOR SELECT USING (TRUE);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow admin full access on site settings" ON public.site_settings FOR ALL USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================================
-- INITIAL SEED DATA (Programs, Events & Default Hero Settings)
-- ============================================================================

INSERT INTO public.programs (slug, title, description, age_group, duration, fee, features, display_order)
VALUES
  ('playgroup', 'Playgroup', 'A gentle introduction to learning through sensory play and exploration in a safe, nurturing environment.', '1.8 - 2.5 Years', '3 Hours / Day', 5000, ARRAY['Sensory Play', 'Safe Play Zones', 'Parent Bonding'], 1),
  ('nursery', 'Nursery', 'Building foundational skills with play-based activities that foster social development and creativity.', '2.5 - 3.5 Years', '3 Hours / Day', 6000, ARRAY['Art & Music', 'Social Skills', 'Letters & Numbers'], 2),
  ('lkg', 'LKG', 'Developing pre-academic skills and encouraging creative expression to build independence and confidence.', '3.5 - 4.5 Years', '4 Hours / Day', 7000, ARRAY['Pre-Academics', 'Creative Thinking', 'Independence'], 3),
  ('ukg', 'UKG', 'Preparing children for formal schooling with advanced cognitive activities and leadership skill nurturing.', '4.5 - 5.5 Years', '4 Hours / Day', 7500, ARRAY['School Readiness', 'Cognitive Skills', 'Leadership'], 4),
  ('daycare', 'Daycare', 'Flexible, extended care with engaging activities, nutritious meals, and safe transportation services.', '1 - 10 Years', 'Flexible (Up to 8 hours)', 10000, ARRAY['Flexible Hours', 'Nutritious Meals', 'Engaging Care'], 5)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.events (title, event_date, description, category, icon_name)
VALUES
  ('Diwali Celebration', '2026-10-25', 'A festival of lights where children will create crafts, enjoy stories, and share festive treats.', 'celebration', 'PartyIcon'),
  ('Annual Sports Day', '2026-11-14', 'A fun-filled day of games and friendly competitions for all our little athletes.', 'sports', 'SportsIcon'),
  ('Winter Wonderland Gala', '2026-12-20', 'A magical winter-themed event with music, dance, and a special visit from a festive friend!', 'celebration', 'PartyIcon')
ON CONFLICT DO NOTHING;

INSERT INTO public.site_settings (key, value)
VALUES
  ('hero', '{
    "badge": "Admissions Open • 2026–27",
    "headlineStart": "A Joyful Start to",
    "headlineHighlight": "Lifelong Learning",
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
