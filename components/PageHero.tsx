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
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-28 min-h-[300px] md:min-h-[360px] flex items-center justify-center text-center overflow-hidden bg-[#0F2A44] px-4">
      {/* Background Image: Full clarity, no darkening filter */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-outfit font-extrabold text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default PageHero;
