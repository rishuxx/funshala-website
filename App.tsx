import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Programs from "./components/Programs";
import ProgramDetail from "./components/ProgramDetail";
import Admissions from "./components/Admissions";
import Franchise from "./components/Franchise";
import Gallery from "./components/Gallery";
import Events from "./components/Events";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { TransitionProvider } from "./contexts/TransitionContext";
import PageTransition from "./components/PageTransition";
import DoodleBackground from "./components/DoodleBackground";
import PageHero from "./components/PageHero";
import Admin from "./components/Admin";
import BrandBorders from "./components/BrandBorders";

// The "Layout" component renders the persistent parts of the app
const Layout: React.FC = () => {
  return (
    <div className="font-outfit font-sans text-dark-text overflow-x-hidden relative min-h-screen flex flex-col">
      <BrandBorders />
      <DoodleBackground />
      <PageTransition />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

// Landing Page: Renders all main sections to maintain the original landing page feel
const HomePage: React.FC = () => (
  <main className="flex-grow">
    <Hero />
    <About />
    <Programs />
    <Testimonials />
    <Admissions />
    <Gallery />
    <Events />
    <Franchise />
    <Contact />
  </main>
);

// Individual Page Wrappers for Routing
const AboutPage: React.FC = () => (
  <main className="flex-grow">
    <PageHero title="About Us" pageKey="about" />
    <About />
  </main>
);
const ProgramsPage: React.FC = () => (
  <main className="flex-grow">
    <PageHero title="Our Programs" pageKey="programs" />
    <Programs />
  </main>
);
const AdmissionsPage: React.FC = () => (
  <main className="flex-grow">
    <PageHero title="Admissions" pageKey="admissions" />
    <Admissions />
  </main>
);
const GalleryPage: React.FC = () => (
  <main className="flex-grow">
    <PageHero title="Gallery" pageKey="gallery" />
    <Gallery />
  </main>
);
const FranchisePage: React.FC = () => (
  <main className="flex-grow">
    <PageHero title="Franchise" pageKey="franchise" />
    <Franchise />
  </main>
);
const ContactPage: React.FC = () => (
  <main className="flex-grow">
    <PageHero title="Contact Us" pageKey="contact" />
    <Contact />
  </main>
);

// Admin Routes Layout
const AdminLayout: React.FC = () => (
  <div className="font-nunito text-dark-text min-h-screen flex flex-col">
    <BrandBorders />
    <div className="flex-grow">
      <Outlet />
    </div>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <TransitionProvider>
      <Routes>
        {/* Main Public Routes wrapped in standard layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="programs/:id" element={<ProgramDetail />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="franchise" element={<FranchisePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Admin Nested Routes (Layout without header/doodles) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          {/* Can add more nested admin routes here, e.g. /admin/dashboard */}
        </Route>

        {/* Fallback for 404 */}
        <Route
          path="*"
          element={
            <Layout>
              <main className="flex-grow flex items-center justify-center h-[50vh]">
                <div className="text-center">
                  <h1 className="text-6xl font-baloo font-bold text-brand-blue">
                    404
                  </h1>
                  <p className="text-xl">
                    Oops! This page seems to be playing hide and seek.
                  </p>
                </div>
              </main>
            </Layout>
          }
        />
      </Routes>
    </TransitionProvider>
  );
};

export default App;
