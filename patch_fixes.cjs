const fs = require('fs');

// 1. Fix Events.tsx
let eventsCode = fs.readFileSync('components/Events.tsx', 'utf8');
eventsCode = eventsCode.replace(
  /\$\{bgGradients\[index % bgGradients\.length\]\}/g,
  'from-orange-500 to-amber-500 text-white'
);
eventsCode = eventsCode.replace(
  '<IconComponent className="w-7 h-7" />',
  '<IconComponent className="w-7 h-7 text-white stroke-[2.5]" />'
);
fs.writeFileSync('components/Events.tsx', eventsCode);

// 2. Fix Header.tsx (Fix white tab box & make clean Outfit pills)
let headerCode = fs.readFileSync('components/Header.tsx', 'utf8');
headerCode = headerCode.replace(
  'bg-white text-brand-red shadow-sm font-semibold scale-105',
  'bg-orange-500 text-white shadow-sm font-semibold scale-105'
);
headerCode = headerCode.replace(/font-fredoka/g, 'font-outfit');
fs.writeFileSync('components/Header.tsx', headerCode);

// 3. Fix PageHero.tsx (Ensure it doesn't get covered by fixed header on mobile or desktop)
let heroCode = fs.readFileSync('components/PageHero.tsx', 'utf8');
heroCode = heroCode.replace(
  'className="relative h-[40vh] min-h-[260px] flex items-center justify-center text-center overflow-hidden bg-[#0F2A44]"',
  'className="relative pt-24 pb-14 md:pt-32 md:pb-20 min-h-[200px] flex items-center justify-center text-center overflow-hidden bg-[#0F2A44] px-4"'
);
fs.writeFileSync('components/PageHero.tsx', heroCode);

// 4. Ensure Gallery.tsx never renders any hero images even if uploaded
let galleryCode = fs.readFileSync('components/Gallery.tsx', 'utf8');
galleryCode = galleryCode.replace(
  'const publicImages = images.filter(',
  'const publicImages = images.filter((img) => img.category !== "Hero" && !img.alt_text?.toLowerCase().includes("hero") && !img.file_name?.toLowerCase().includes("hero") &&'
);
fs.writeFileSync('components/Gallery.tsx', galleryCode);

console.log('Batch update completed successfully!');
