import React, { useState, useEffect } from "react";
import { getSiteSettings } from "../lib/api";

interface PageHeroProps {
  title: string;
  pageKey?: string; // e.g. 'about', 'programs', 'admissions', 'gallery', 'franchise', 'contact'
}

const PageHero: React.FC<PageHeroProps> = ({ title, pageKey }) => {
  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    if (!pageKey) return;
    const fetchPageBanner = async () => {
      const data = await getSiteSettings(`page_hero_${pageKey}`);
      if (data && data.image) {
        setBgImage(data.image);
      }
    };
    fetchPageBanner();
  }, [pageKey]);

  return (
    <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 min-h-[200px] flex items-center justify-center text-center overflow-hidden bg-[#0F2A44] px-4">
      {/* Optional Custom Page Background Image */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt={title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A44] via-[#0F2A44]/70 to-transparent" />
        </div>
      )}

      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-outfit font-extrabold text-white tracking-tight drop-shadow-md">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default PageHero;
