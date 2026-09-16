const fs = require('fs');

// 1. Admissions.tsx
let adm = fs.readFileSync('components/Admissions.tsx', 'utf8');
adm = adm.replace(/import React/g, "import { Lightbulb } from 'lucide-react';\nimport React");
adm = adm.replace('💡', '<Lightbulb className="w-5 h-5 text-orange-600" />');
fs.writeFileSync('components/Admissions.tsx', adm);

// 2. AdmissionForm.tsx
let admForm = fs.readFileSync('components/AdmissionForm.tsx', 'utf8');
admForm = admForm.replace(/import React/g, "import { CheckCircle2, User, Users, ShieldCheck } from 'lucide-react';\nimport React");
admForm = admForm.replace(
  '<div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-3xl">\n          ✓\n        </div>',
  '<div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">\n          <CheckCircle2 className="w-10 h-10" />\n        </div>'
);
admForm = admForm.replace('<span>🧒</span>', '<User className="w-4 h-4" />');
admForm = admForm.replace('<span>👨‍👩‍👧</span>', '<Users className="w-4 h-4" />');
admForm = admForm.replace(
  '🔒 Your data is safe',
  '<span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-600 inline" /> Your data is safe</span>'
);
fs.writeFileSync('components/AdmissionForm.tsx', admForm);

// 3. Header.tsx
let hdr = fs.readFileSync('components/Header.tsx', 'utf8');
hdr = hdr.replace('Admissions Open • Apply Now 🚀', 'Admissions Open • Apply Now');
fs.writeFileSync('components/Header.tsx', hdr);

// 4. Events.tsx
let ev = fs.readFileSync('components/Events.tsx', 'utf8');
ev = ev.replace(/import React/g, "import { Bell } from 'lucide-react';\nimport React");
ev = ev.replace('<span className="text-3xl mb-2 block">🎈</span>', '<div className="flex justify-center mb-3"><Bell className="w-8 h-8 text-orange-500" /></div>');
fs.writeFileSync('components/Events.tsx', ev);

// 5. FranchiseForm.tsx
let ff = fs.readFileSync('components/FranchiseForm.tsx', 'utf8');
ff = ff.replace(/import React/g, "import { CheckCircle2 } from 'lucide-react';\nimport React");
ff = ff.replace(
  '<div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-3xl">\n          ✓\n        </div>',
  '<div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">\n          <CheckCircle2 className="w-10 h-10" />\n        </div>'
);
fs.writeFileSync('components/FranchiseForm.tsx', ff);

// 6. EnquiryForm.tsx
let ef = fs.readFileSync('components/EnquiryForm.tsx', 'utf8');
ef = ef.replace(/import React/g, "import { CheckCircle2 } from 'lucide-react';\nimport React");
ef = ef.replace(
  '<div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3 text-2xl font-bold">\n          ✓\n        </div>',
  '<div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">\n          <CheckCircle2 className="w-7 h-7" />\n        </div>'
);
fs.writeFileSync('components/EnquiryForm.tsx', ef);

// 7. Footer.tsx
let ft = fs.readFileSync('components/Footer.tsx', 'utf8');
ft = ft.replace(/import React/g, "import { Phone, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';\nimport React");
ft = ft.replace('🔒 Admin Portal', '<span className="inline-flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-amber-300" /> Admin Portal</span>');
ft = ft.replace('★ Apply for Admission', '<span className="inline-flex items-center gap-1.5"><ArrowRight className="w-3.5 h-3.5 text-amber-300" /> Apply for Admission</span>');
ft = ft.replace('📞 +91 8009767534', '<span className="inline-flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-orange-400" /> +91 8009767534</span>');
ft = ft.replace('✉️ funshalakindergarten@gmail.com', '<span className="inline-flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-orange-400" /> funshalakindergarten@gmail.com</span>');
ft = ft.replace('Redefining Childhood with Love & Joy ✨', 'Redefining Childhood with Love & Joy');
fs.writeFileSync('components/Footer.tsx', ft);

// 8. ProgramDetail.tsx
let pd = fs.readFileSync('components/ProgramDetail.tsx', 'utf8');
pd = pd.replace('Program Not Found 😢', 'Program Not Found');
fs.writeFileSync('components/ProgramDetail.tsx', pd);

console.log('All emojis successfully purged and replaced with clean Lucide react icons!');
