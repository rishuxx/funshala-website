# FUNSHALA KINDERGARTEN — SUPABASE SETUP INSTRUCTIONS

Follow these simple steps in your Supabase Dashboard.

---

## STEP 1 — Create or Open Your Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard) and sign in.
2. Click **New Project**.
3. Name: `funshala` (or `funshala-preschool`).
4. Set a strong Database Password (save this in your password manager).
5. Region: Choose `South Asia (Mumbai)` or the region closest to your visitors.
6. Click **Create new project** and wait ~1-2 minutes for provisioning.

---

## STEP 2 — Locate Your API Keys

In your Supabase project dashboard:
1. Click the **Project Settings** (gear icon) on the bottom left.
2. Click **API** under Configuration.
3. You will see:
   - **Project URL**: Format `https://[your-project-ref].supabase.co`
   - **Project API keys**:
     - `anon` `public`: Safe for browser/client use.
     - `service_role` `secret`: **CONFIDENTIAL / SERVER-ONLY**. Used by migration scripts.

---

## STEP 3 — Run SQL Schema Migration

1. In the left sidebar, click **SQL Editor**.
2. Click **New query**.
3. Copy the entire contents of [supabase/migrations/001_initial_schema.sql](file:///c:/Users/5upvi/OneDrive/Pictures/funshalaWebsite/Fun/supabase/migrations/001_initial_schema.sql) (created in this repo) and paste it into the query editor.
4. Click **Run** (or press Ctrl+Enter).
5. Ensure the message says `Success. No rows returned`.

---

## STEP 4 — Create the Storage Bucket

1. In the left sidebar, click **Storage**.
2. Click **New bucket**.
3. Bucket Name: `gallery`
4. Toggle **Public bucket** to **ON** (checked).
5. Click **Save bucket**.
