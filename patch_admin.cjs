const fs = require('fs');
let adminCode = fs.readFileSync('components/Admin.tsx', 'utf8');

// Add pages to categories
adminCode = adminCode.replace(
  '<option value="Art">Art</option>',
  '<option value="Art">Art</option>\n          <option value="About">About Page</option>\n          <option value="Programs">Programs Page</option>\n          <option value="Admissions">Admissions Page</option>\n          <option value="Franchise">Franchise Page</option>'
);

adminCode = adminCode.replace(
  '{ value: "Art", label: "Art" },',
  '{ value: "Art", label: "Art" },\n        { value: "About", label: "About Page" },\n        { value: "Programs", label: "Programs Page" },\n        { value: "Admissions", label: "Admissions Page" },\n        { value: "Franchise", label: "Franchise Page" },'
);

// Replace font-baloo with font-outfit across Admin
adminCode = adminCode.replace(/font-baloo/g, 'font-outfit');

fs.writeFileSync('components/Admin.tsx', adminCode);
console.log('Admin updated!');
