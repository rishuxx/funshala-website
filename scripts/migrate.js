import path from 'path';
import fs from 'fs';
import { MongoClient } from 'mongodb';
import { createClient } from '@supabase/supabase-js';

// Configuration
const MONGO_URI = process.env.MONGO_URI;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!MONGO_URI) {
  console.error('❌ Missing MONGO_URI environment variable.');
  process.exit(1);
}

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

const report = {
  startTime: new Date().toISOString(),
  counts: {},
  errors: []
};

async function migrate() {
  console.log('🚀 Starting Funshala MongoDB → Supabase Migration...');
  console.log(`Connecting to MongoDB...`);
  
  const mongoClient = new MongoClient(MONGO_URI);
  await mongoClient.connect();
  const db = mongoClient.db();
  console.log(`✓ Connected to MongoDB database: ${db.databaseName}`);

  // 1. PROGRAMS
  console.log('\n[1/6] Migrating Programs...');
  const programs = await db.collection('programs').find({}).toArray();
  report.counts.mongoPrograms = programs.length;
  let programsMigrated = 0;
  for (const p of programs) {
    const slug = p.title.toLowerCase().replace(/\s+/g, '-');
    const { error } = await supabase.from('programs').upsert({
      slug,
      title: p.title,
      description: p.description,
      age_group: p.ageGroup,
      duration: p.duration,
      fee: p.fee || 0,
      legacy_mongodb_id: p._id.toString()
    }, { onConflict: 'legacy_mongodb_id' });

    if (error) {
      console.error(`  ❌ Error migrating program ${p.title}:`, error.message);
      report.errors.push({ entity: 'program', id: p._id, error: error.message });
    } else {
      programsMigrated++;
    }
  }
  report.counts.supabasePrograms = programsMigrated;
  console.log(`✓ Programs: ${programsMigrated}/${programs.length} migrated.`);

  // 2. EVENTS
  console.log('\n[2/6] Migrating Events...');
  const events = await db.collection('events').find({}).toArray();
  report.counts.mongoEvents = events.length;
  let eventsMigrated = 0;
  for (const e of events) {
    const { error } = await supabase.from('events').upsert({
      title: e.title,
      event_date: new Date(e.date).toISOString().split('T')[0],
      description: e.description,
      legacy_mongodb_id: e._id.toString()
    }, { onConflict: 'legacy_mongodb_id' });

    if (error) {
      console.error(`  ❌ Error migrating event ${e.title}:`, error.message);
      report.errors.push({ entity: 'event', id: e._id, error: error.message });
    } else {
      eventsMigrated++;
    }
  }
  report.counts.supabaseEvents = eventsMigrated;
  console.log(`✓ Events: ${eventsMigrated}/${events.length} migrated.`);

  // 3. STUDENTS
  console.log('\n[3/6] Migrating Students...');
  const students = await db.collection('students').find({}).toArray();
  report.counts.mongoStudents = students.length;
  let studentsMigrated = 0;
  for (const s of students) {
    const { error } = await supabase.from('students').upsert({
      name: s.name,
      age: s.age,
      class_name: s.className,
      parent_name: s.parentName,
      contact_phone: s.contact,
      address: s.address,
      notes: s.notes || '',
      legacy_mongodb_id: s._id.toString()
    }, { onConflict: 'legacy_mongodb_id' });

    if (error) {
      console.error(`  ❌ Error migrating student ${s.name}:`, error.message);
      report.errors.push({ entity: 'student', id: s._id, error: error.message });
    } else {
      studentsMigrated++;
    }
  }
  report.counts.supabaseStudents = studentsMigrated;
  console.log(`✓ Students: ${studentsMigrated}/${students.length} migrated.`);

  // 4. FORM SUBMISSIONS (Unflatten polymorphic data)
  console.log('\n[4/6] Migrating Inquiries & Form Submissions...');
  const submissions = await db.collection('formsubmissions').find({}).toArray();
  report.counts.mongoSubmissions = submissions.length;
  let admissionsMigrated = 0;
  let franchiseMigrated = 0;
  let contactMigrated = 0;

  for (const sub of submissions) {
    const data = sub.formData || {};
    const status = sub.status || 'New';
    const admin_notes = sub.adminNotes || '';
    const submitted_at = sub.submittedAt || new Date();
    const legacy_mongodb_id = sub._id.toString();

    if (sub.formType === 'admission') {
      const { error } = await supabase.from('admission_applications').upsert({
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
        submitted_at,
        legacy_mongodb_id
      }, { onConflict: 'legacy_mongodb_id' });

      if (error) report.errors.push({ entity: 'admission', id: sub._id, error: error.message });
      else admissionsMigrated++;
    } else if (sub.formType === 'franchise') {
      const { error } = await supabase.from('franchise_inquiries').upsert({
        name: data.name || 'Unknown',
        email: data.email || '',
        phone: data.phone || '',
        city: data.city || '',
        state: data.state || '',
        profession: data.profession || '',
        message: data.message || '',
        status,
        admin_notes,
        submitted_at,
        legacy_mongodb_id
      }, { onConflict: 'legacy_mongodb_id' });

      if (error) report.errors.push({ entity: 'franchise', id: sub._id, error: error.message });
      else franchiseMigrated++;
    } else if (sub.formType === 'contact') {
      const { error } = await supabase.from('contact_messages').upsert({
        name: data.name || 'Unknown',
        email: data.email || '',
        phone: data.phone || '',
        message: data.message || '',
        status,
        admin_notes,
        submitted_at,
        legacy_mongodb_id
      }, { onConflict: 'legacy_mongodb_id' });

      if (error) report.errors.push({ entity: 'contact', id: sub._id, error: error.message });
      else contactMigrated++;
    }
  }
  console.log(`✓ Form Submissions Migrated: ${admissionsMigrated} admissions, ${franchiseMigrated} franchise, ${contactMigrated} contacts.`);

  // 5. STORAGE UPLOADS & GALLERY RECORDS
  console.log('\n[5/6] Migrating Local Media Files to Supabase Storage...');
  const uploadsDir = path.resolve('server/uploads');
  let mediaUploaded = 0;
  if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir);
    report.counts.localUploadFiles = files.length;

    for (const file of files) {
      const filePath = path.join(uploadsDir, file);
      const fileBuffer = fs.readFileSync(filePath);
      const mimeType = file.endsWith('.png') ? 'image/png' : 'image/jpeg';

      const { error: uploadErr } = await supabase.storage.from('gallery').upload(file, fileBuffer, {
        contentType: mimeType,
        upsert: true
      });

      if (uploadErr) {
        console.error(`  ❌ Failed to upload image ${file}:`, uploadErr.message);
        report.errors.push({ entity: 'storage', file, error: uploadErr.message });
      } else {
        mediaUploaded++;
        console.log(`  ✓ Uploaded to Supabase Storage: gallery/${file}`);
      }
    }
  }
  report.counts.mediaUploaded = mediaUploaded;

  // 6. GALLERY DATABASE RECORDS
  console.log('\n[6/6] Migrating Gallery Database Records...');
  const galleryImages = await db.collection('galleryimages').find({}).toArray();
  report.counts.mongoGallery = galleryImages.length;
  let galleryMigrated = 0;

  for (const g of galleryImages) {
    // Determine file name from src (e.g. /uploads/image-123.jpg -> image-123.jpg)
    const fileName = path.basename(g.src);
    const { data: publicUrlData } = supabase.storage.from('gallery').getPublicUrl(fileName);
    const publicUrl = publicUrlData ? publicUrlData.publicUrl : g.src;

    const { error } = await supabase.from('gallery_images').upsert({
      storage_path: fileName,
      public_url: publicUrl,
      alt_text: g.alt || 'Funshala Preschool',
      category: g.category || 'Activity',
      file_name: fileName,
      legacy_mongodb_id: g._id.toString()
    }, { onConflict: 'legacy_mongodb_id' });

    if (error) {
      console.error(`  ❌ Error migrating gallery record ${g.alt}:`, error.message);
      report.errors.push({ entity: 'gallery', id: g._id, error: error.message });
    } else {
      galleryMigrated++;
    }
  }
  report.counts.supabaseGallery = galleryMigrated;
  console.log(`✓ Gallery Records Migrated: ${galleryMigrated}/${galleryImages.length}.`);

  await mongoClient.close();
  report.endTime = new Date().toISOString();

  // Write verification report
  fs.writeFileSync('MIGRATION_VERIFICATION.json', JSON.stringify(report, null, 2));
  console.log('\n=============================================================');
  console.log('🎉 MIGRATION COMPLETE! Verification report written to MIGRATION_VERIFICATION.json');
  console.log('=============================================================');
}

migrate().catch((err) => {
  console.error('Fatal migration failure:', err);
  process.exit(1);
});
