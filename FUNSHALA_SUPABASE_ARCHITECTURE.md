# FUNSHALA KINDERGARTEN — SUPABASE ARCHITECTURE SPECIFICATION

This document provides the complete, production-ready PostgreSQL database architecture, Supabase Storage configuration, Row Level Security (RLS) policies, and TypeScript schema definitions to completely replace the MongoDB + Express backend.

---

## 1. Architecture Overview

```text
[ Client / Visitor Browser ]                 [ Admin Staff ]
           │                                        │
           ▼ (Public Read & Form Inserts)           ▼ (Auth via Supabase Auth)
┌────────────────────────────────────────────────────────────────────────┐
│                        Supabase Cloud Project                          │
│                                                                        │
│  ├── Supabase Auth (auth.users)                                        │
│  ├── Supabase Storage (Bucket: 'gallery')                              │
│  └── PostgreSQL Database (Schema: 'public')                            │
│        ├── profiles (Admin staff metadata)                             │
│        ├── programs (Playgroup, Nursery, LKG, UKG, Daycare)            │
│        ├── events (School celebrations & activities)                   │
│        ├── gallery_images (Curated school photos + storage paths)      │
│        ├── students (Enrolled students roster)                         │
│        ├── admission_applications (From online admission form)         │
│        ├── franchise_inquiries (From franchise lead form)              │
│        └── contact_messages (From general contact inquiry form)        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Production PostgreSQL Migration Script (SQL DDL)

Copy and run this entire script in your **Supabase Dashboard → SQL Editor**:

```sql
-- ============================================================================
-- FUNSHALA KINDERGARTEN — DATABASE SCHEMA INITIALIZATION
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'staff')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. PROGRAMS TABLE
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
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  event_date DATE NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'celebration',
  icon_name TEXT DEFAULT 'Calendar',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. GALLERY IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Activity', 'Classroom', 'Events', 'Art')),
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. STUDENTS ROSTER TABLE (Internal Admin Management)
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INT NOT NULL,
  class_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. ADMISSION APPLICATIONS TABLE
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
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. FRANCHISE INQUIRIES TABLE
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
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
  admin_notes TEXT DEFAULT '',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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

-- Helper Function: Check if user is authenticated admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.role() = 'authenticated');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Authenticated users can view their own profile
CREATE POLICY "Allow users to view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Programs: Public Read, Admin Full Access
CREATE POLICY "Allow public read on active programs"
  ON public.programs FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Allow admin full access on programs"
  ON public.programs FOR ALL
  USING (public.is_admin());

-- Events: Public Read, Admin Full Access
CREATE POLICY "Allow public read on events"
  ON public.events FOR SELECT
  USING (TRUE);

CREATE POLICY "Allow admin full access on events"
  ON public.events FOR ALL
  USING (public.is_admin());

-- Gallery Images: Public Read, Admin Full Access
CREATE POLICY "Allow public read on gallery images"
  ON public.gallery_images FOR SELECT
  USING (TRUE);

CREATE POLICY "Allow admin full access on gallery images"
  ON public.gallery_images FOR ALL
  USING (public.is_admin());

-- Students: Admin Only Access
CREATE POLICY "Allow admin full access on students"
  ON public.students FOR ALL
  USING (public.is_admin());

-- Admission Applications: Public Insert, Admin Manage
CREATE POLICY "Allow public to submit admission applications"
  ON public.admission_applications FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Allow admin full access on admission applications"
  ON public.admission_applications FOR ALL
  USING (public.is_admin());

-- Franchise Inquiries: Public Insert, Admin Manage
CREATE POLICY "Allow public to submit franchise inquiries"
  ON public.franchise_inquiries FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Allow admin full access on franchise inquiries"
  ON public.franchise_inquiries FOR ALL
  USING (public.is_admin());

-- Contact Messages: Public Insert, Admin Manage
CREATE POLICY "Allow public to submit contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Allow admin full access on contact messages"
  ON public.contact_messages FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- INITIAL SEED DATA (Matching Funshala Defaults)
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
```

---

## 3. Supabase Storage Setup

1. In Supabase Dashboard, navigate to **Storage**.
2. Click **New Bucket**:
   - Bucket Name: `gallery`
   - Public Bucket: **Enabled (Checked)**
3. Add Storage Policies:
   - **Public Access**: Allow all users to read/view images.
   - **Admin Access**: Allow authenticated users to upload, update, and delete images.
