# FUNSHALA KINDERGARTEN — MONGODB TO SUPABASE MIGRATION PLAN

**Target**: Full zero-downtime, data-preserving migration of Funshala Kindergarten from MongoDB Atlas / Express to Supabase PostgreSQL & Supabase Storage.

---

## 1. Architecture Comparison

```text
CURRENT ARCHITECTURE
┌────────────────────────┐       ┌────────────────────────┐       ┌────────────────────────┐
│  React 19 Frontend     │ ----> │ Node.js Express Server │ ----> │ MongoDB Atlas Database │
│  (Port 3000)           │       │ (Port 5000)            │       │ (6 Collections)        │
└────────────────────────┘       └───────────┬────────────┘       └────────────────────────┘
                                             │
                                             ▼
                                 Local `/server/uploads` (7 image files)

TARGET PRODUCTION ARCHITECTURE
┌────────────────────────────────────────────────────────┐
│               React 19 Frontend (Vite)                 │
│         Direct `@supabase/supabase-js` Client          │
└───────────────────────────┬────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│  Supabase PostgreSQL DB  │  │     Supabase Storage     │
│  - 8 Normalized Tables   │  │   Bucket: `gallery`      │
│  - Row Level Security    │  │   CDN Image Delivery     │
│  - `legacy_mongodb_id`   │  │   Zero Local Disk Needs  │
└──────────────────────────┘  └──────────────────────────┘
```

---

## 2. Inventory of Existing Data Sources

### A. MongoDB Collections
1. `admins`: Admin credentials (`email`, bcrypt `password`).
2. `programs`: Academic courses (`title`, `description`, `ageGroup`, `duration`, `fee`).
3. `events`: School events (`title`, `date`, `description`).
4. `students`: Enrolled student records (`name`, `age`, `className`, `parentName`, `contact`, `address`, `notes`).
5. `galleryimages`: Gallery metadata (`alt`, `category`, `src`).
6. `formsubmissions`: Polymorphic inquiries (`formType`: admission/franchise/contact, `formData`: JSON object, `status`, `adminNotes`, `submittedAt`).

### B. Uploaded Local Media Files
Located in [server/uploads/](file:///c:/Users/5upvi/OneDrive/Pictures/funshalaWebsite/Fun/server/uploads):
- `image-1761332496365.png` (708 KB)
- `image-1761334314386.png` (812 KB)
- `image-1767555010117.jpg` (957 KB)
- `image-1767555057994.jpg` (827 KB)
- `image-1767555107847.jpg` (1.05 MB)
- `image-1767555126601.jpg` (795 KB)
- `image-1768622983472.jpg` (746 KB)

---

## 3. PostgreSQL Table & Field Mapping Matrix

| MongoDB Collection | Proposed Supabase Table | Primary Key Strategy | Mapped Columns |
|---|---|---|---|
| `admins` | `public.profiles` + `auth.users` | UUID (`auth.users.id`) | `email`, `role`, `legacy_mongodb_id` |
| `programs` | `public.programs` | UUID (`id`) | `slug`, `title`, `description`, `age_group`, `duration`, `fee`, `features`, `legacy_mongodb_id` |
| `events` | `public.events` | UUID (`id`) | `title`, `event_date`, `description`, `category`, `icon_name`, `legacy_mongodb_id` |
| `galleryimages` | `public.gallery_images` | UUID (`id`) | `storage_path`, `public_url`, `alt_text`, `category`, `file_name`, `legacy_mongodb_id` |
| `students` | `public.students` | UUID (`id`) | `name`, `age`, `class_name`, `parent_name`, `contact_phone`, `address`, `notes`, `legacy_mongodb_id` |
| `formsubmissions` (`admission`) | `public.admission_applications` | UUID (`id`) | `child_name`, `dob`, `gender`, `program_name`, `parent_name`, `email`, `phone`, `city`, `status`, `admin_notes`, `submitted_at`, `legacy_mongodb_id` |
| `formsubmissions` (`franchise`) | `public.franchise_inquiries` | UUID (`id`) | `name`, `email`, `phone`, `city`, `state`, `profession`, `message`, `status`, `admin_notes`, `submitted_at`, `legacy_mongodb_id` |
| `formsubmissions` (`contact`) | `public.contact_messages` | UUID (`id`) | `name`, `email`, `phone`, `message`, `status`, `admin_notes`, `submitted_at`, `legacy_mongodb_id` |

---

## 4. Idempotent Primary Key & Traceability Strategy

To guarantee **zero data loss and full reversibility**, every PostgreSQL table will feature:
```sql
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
legacy_mongodb_id TEXT UNIQUE
```
- Migration scripts will use `upsert({ ..., legacy_mongodb_id: doc._id.toString() }, { onConflict: 'legacy_mongodb_id' })`.
- This ensures the migration script can be run multiple times safely without generating duplicate rows.
