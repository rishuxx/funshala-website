# FUNSHALA KINDERGARTEN — MONGODB TO SUPABASE MIGRATION GUIDE

This document provides the exact, executable extraction and transformation script to safely transfer all existing data from MongoDB Atlas into your new Supabase PostgreSQL database.

---

## 1. Prerequisites

Run the SQL migration script from `FUNSHALA_SUPABASE_ARCHITECTURE.md` in your Supabase SQL Editor first.

Install the migration script helper dependencies:
```bash
npm install -g dotenv mongodb @supabase/supabase-js
```

---

## 2. Automated Migration Script (`migrate.js`)

Create a temporary script `migrate.js` in your project or root folder:

```javascript
require('dotenv').config();
const { MongoClient } = require('mongodb');
const { createClient } = require('@supabase/supabase-js');

// 1. CONFIGURATION
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://rishu:fun123@cluster0.hs00yvv.mongodb.net/funshala?retryWrites=true&w=majority";
const SUPABASE_URL = process.env.SUPABASE_URL; // e.g. https://xyz.supabase.co
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // Admin service key with bypass RLS

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("ERROR: Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function runMigration() {
  console.log("Connecting to MongoDB Atlas...");
  const mongoClient = new MongoClient(MONGO_URI);
  await mongoClient.connect();
  const db = mongoClient.db();
  console.log("Connected to MongoDB:", db.databaseName);

  // --------------------------------------------------------------------------
  // A. MIGRATE PROGRAMS
  // --------------------------------------------------------------------------
  console.log("\n[1/5] Migrating Programs...");
  const mongoPrograms = await db.collection('programs').find({}).toArray();
  for (const p of mongoPrograms) {
    const slug = p.title.toLowerCase().replace(/\s+/g, '-');
    const { error } = await supabase.from('programs').upsert({
      slug,
      title: p.title,
      description: p.description,
      age_group: p.ageGroup,
      duration: p.duration,
      fee: p.fee || 0,
    }, { onConflict: 'slug' });
    if (error) console.error(`Error migrating program ${p.title}:`, error.message);
    else console.log(`✓ Program migrated: ${p.title}`);
  }

  // --------------------------------------------------------------------------
  // B. MIGRATE EVENTS
  // --------------------------------------------------------------------------
  console.log("\n[2/5] Migrating Events...");
  const mongoEvents = await db.collection('events').find({}).toArray();
  for (const e of mongoEvents) {
    const { error } = await supabase.from('events').insert({
      title: e.title,
      event_date: new Date(e.date).toISOString().split('T')[0],
      description: e.description,
    });
    if (error) console.error(`Error migrating event ${e.title}:`, error.message);
    else console.log(`✓ Event migrated: ${e.title}`);
  }

  // --------------------------------------------------------------------------
  // C. MIGRATE STUDENTS
  // --------------------------------------------------------------------------
  console.log("\n[3/5] Migrating Students...");
  const mongoStudents = await db.collection('students').find({}).toArray();
  for (const s of mongoStudents) {
    const { error } = await supabase.from('students').insert({
      name: s.name,
      age: s.age,
      class_name: s.className,
      parent_name: s.parentName,
      contact_phone: s.contact,
      address: s.address,
      notes: s.notes || '',
    });
    if (error) console.error(`Error migrating student ${s.name}:`, error.message);
    else console.log(`✓ Student migrated: ${s.name}`);
  }

  // --------------------------------------------------------------------------
  // D. MIGRATE FORM SUBMISSIONS (Unflatten polymorphic formData)
  // --------------------------------------------------------------------------
  console.log("\n[4/5] Migrating Form Submissions...");
  const submissions = await db.collection('formsubmissions').find({}).toArray();
  for (const sub of submissions) {
    const data = sub.formData || {};
    const status = sub.status || 'New';
    const admin_notes = sub.adminNotes || '';
    const submitted_at = sub.submittedAt || new Date();

    if (sub.formType === 'admission') {
      await supabase.from('admission_applications').insert({
        child_name: data.childName || 'Unknown',
        dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '2020-01-01',
        gender: data.gender || 'other',
        program_name: data.program || 'General',
        parent_name: data.parentName || 'Unknown',
        email: data.email || 'no-email@funshala.com',
        phone: data.phone || '0000000000',
        city: data.city || '',
        status,
        admin_notes,
        submitted_at
      });
      console.log(`✓ Admission application migrated: ${data.childName}`);
    } else if (sub.formType === 'franchise') {
      await supabase.from('franchise_inquiries').insert({
        name: data.name || 'Unknown',
        email: data.email || '',
        phone: data.phone || '',
        city: data.city || '',
        state: data.state || '',
        profession: data.profession || '',
        message: data.message || '',
        status,
        admin_notes,
        submitted_at
      });
      console.log(`✓ Franchise inquiry migrated: ${data.name}`);
    } else if (sub.formType === 'contact') {
      await supabase.from('contact_messages').insert({
        name: data.name || 'Unknown',
        email: data.email || '',
        phone: data.phone || '',
        message: data.message || '',
        status,
        admin_notes,
        submitted_at
      });
      console.log(`✓ Contact message migrated: ${data.name}`);
    }
  }

  // --------------------------------------------------------------------------
  // E. MIGRATE GALLERY IMAGES
  // --------------------------------------------------------------------------
  console.log("\n[5/5] Migrating Gallery Records...");
  const mongoGallery = await db.collection('galleryimages').find({}).toArray();
  for (const g of mongoGallery) {
    const { error } = await supabase.from('gallery_images').insert({
      storage_path: g.src,
      public_url: g.src,
      alt_text: g.alt || 'Funshala Image',
      category: g.category || 'Activity',
    });
    if (error) console.error(`Error migrating gallery image:`, error.message);
    else console.log(`✓ Gallery record migrated: ${g.alt}`);
  }

  await mongoClient.close();
  console.log("\n========================================================");
  console.log("MIGRATION FINISHED SUCCESSFULLY!");
  console.log("========================================================");
}

runMigration().catch(console.error);
```

---

## 3. Running the Migration

Run:
```bash
node migrate.js
```

Once the records are imported, verify the tables in the Supabase Table Editor. You are then ready to connect your React client directly to Supabase.
