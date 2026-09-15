# FUNSHALA KINDERGARTEN — UI/UX REDESIGN AUDIT

| Issue | Current Problem | Recommendation | Priority |
|---|---|---|---|
| **Slow Rendering & Huge Images** | `hero2.webp` (5.8MB) and `about1.jpg` (5.6MB) load uncompressed, blocking mobile rendering for seconds | Implement responsive sizing, lightweight CSS blur placeholders, and optimize image delivery | **P0 (Immediate)** |
| **Forced 1.2s Navigation Delay** | `TransitionContext.tsx` traps every click in a 1200ms artificial animation loop | Replace blocking setTimeout wipe with instant, snappy Framer Motion page fades (<150ms) | **P0 (Immediate)** |
| **Monotonous Orange Dashed Borders** | Nearly every section card has an identical repetitive `border-dashed border-orange-400` border | Upgrade to modern cards with frosted glass (`backdrop-blur-md`), subtle colorful gradients, and refined shadows | **P1 (High)** |
| **Mobile Hero Layout Flaws** | Fixed `h-screen` causes text to overflow and crop awkwardly on phones and small laptops | Switch to fluid `min-h-[85vh]` with responsive flex padding and touch-friendly buttons | **P1 (High)** |
| **Child-friendly & Chalkboard Typography** | Missing playful chalkboard accent typography requested for early-learning identity | Add Google Font `Fredoka` & `Patrick Hand` (chalkboard font) alongside `Baloo Bhai 2` and `Nunito` | **P1 (High)** |
| **Unnecessary White Space Gaps** | Sections have excessive 120px+ vertical blank spaces without visual anchors | Tighten section rhythm to 64px–80px on desktop and 40px on mobile with organic wave dividers | **P1 (High)** |
| **Franchise Section Color Disconnect** | Heavy dark plum `#4B2E5A` background creates a jarring mood break from preschool warmth | Harmonize with warm sunset pastels and cheerful education badge accents | **P2 (Medium)** |
| **Admin Control Limitations** | Admin dashboard lacks controls for dynamic announcements, admissions banner, and inner page headers | Add a comprehensive **Live School CMS** tab in the Admin panel controlling announcements, hero content, banner toggles, and news | **P1 (High)** |
