# FUNSHALA KINDERGARTEN — UI/UX REDESIGN & OPTIMIZATION SPECIFICATION

This document outlines the visual system, responsive behavior, component refactors, and performance optimizations for the modern Funshala Kindergarten experience without losing its warm, playful Montessori identity.

---

## 1. Brand Identity & Design System

### Color Palette (Tailwind Tokens)
- **Brand Primary**: Warm Coral Red (`#FF6B6B`)
- **Brand Secondary**: Playful Sunny Orange (`#FFA500`)
- **Brand Accents**:
  - Growth Green: `#4CAF50`
  - Sky Blue: `#4A90E2`
  - Sunshine Yellow: `#FFD700`
  - Gentle Lilac: `#8A6FE8`
- **Surface Canvas**: `#FFFAF5` (Warm Cream White, avoids cold sterile `#FFFFFF` background glare)
- **Text Hierarchy**:
  - Headlines: `#1E293B` (Slate 800 - high contrast, readable)
  - Body Text: `#475569` (Slate 600 - gentle readability)
  - Muted Captions: `#94A3B8` (Slate 400)

### Typography Hierarchy
- **Headings & Titles**: `Baloo Bhai 2` (Google Font: 600, 700, 800) — friendly, rounded geometry.
- **Body & Controls**: `Nunito` (Google Font: 400, 600, 700) — clean, highly readable at small mobile sizes.

---

## 2. Critical UI/UX & Performance Refactors

### A. Remove Conflicting CDN Script & Compile Tailwind CSS
- **Action**: Remove `<script src="https://cdn.tailwindcss.com"></script>` and the browser importmap from `index.html`.
- **Implementation**: Initialize native Tailwind CSS inside `vite.config.ts` and `index.css` so that only used styles are bundled, reducing initial network load by over 2.5MB.

### B. Image Compression & Responsive Picture Delivery
- **Hero Image**: Convert `assets/hero2.webp` (5.79 MB) down to an optimized WebP under 180 KB using modern compression.
- **About Image**: Convert `assets/about1.jpg` (5.57 MB) down to an optimized WebP under 150 KB.
- **Result**: Cuts total initial download size from **17 MB to under 400 KB**, boosting mobile load times by ~95%.

### C. Remove 1.2-Second Artificial Navigation Delay
- **Action**: Refactor `TransitionContext.tsx`.
- **Change**: Replace the forced 1200ms screen blocking rainbow wipe with instant, fluid React Router navigation enhanced by smooth 200ms Framer Motion fade transitions.

### D. Eliminate Dashed Border Overuse
- **Current Problem**: Every container on the page is wrapped in an identical orange dashed border (`border-dashed border-orange-400/60`), making the page feel repetitive.
- **Solution**: Keep dashed accents only for interactive badges and playful decorative elements; use soft rounded shadows (`rounded-3xl shadow-sm hover:shadow-md transition-shadow`) for primary content cards.

### E. Redesign Franchise Section Color Harmonization
- **Current Problem**: The deep `#4B2E5A` purple background clashes with the rest of the site.
- **Solution**: Modernize with a soft sunset gradient (`bg-gradient-to-br from-amber-50/80 via-orange-50/50 to-pink-50/80`) that fits the joyful school theme.

### F. Modern Mobile Navigation Drawer
- **Current Problem**: Mobile menu pushes page content down abruptly.
- **Solution**: Implement an accessible, animated slide-in mobile navigation drawer with backdrop blur and immediate CTA access to "Enroll Now" and "Call Us".

---

## 3. Component Refactor Map

| Component | Changes Required |
|---|---|
| `Header.tsx` | Fix logo alignment, add animated sticky backdrop blur, accessible mobile drawer |
| `Hero.tsx` | Use compressed picture element, dynamic viewport height (`min-h-[85vh]`), clearer primary CTA |
| `About.tsx` | Replace raw string paths with optimized imports, improve metric cards |
| `Programs.tsx` | Fetch directly from Supabase, retain individual program color identities |
| `Admissions.tsx` | Streamlined 4-step guide, connect `AdmissionForm.tsx` to Supabase `admission_applications` |
| `Gallery.tsx` | Category tabs, connect to Supabase Storage bucket, optimized lightbox with keyboard controls |
| `Contact.tsx` | Clean card grid with responsive Google Maps embed and toast-based message confirmation |
| `Admin.tsx` | Split monolithic file into dedicated sub-views, hook into Supabase Auth with session persistence |
