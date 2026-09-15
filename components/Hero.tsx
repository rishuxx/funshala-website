import React, { useState, useEffect } from "react";
import { getSiteSettings } from "../lib/api";

const Hero: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    heroImage: "",
  });

  useEffect(() => {
    const fetchHeroSettings = async () => {
      const data = await getSiteSettings("hero");
      if (data) {
        setSettings((prev: any) => ({ ...prev, ...data }));
      }
    };
    fetchHeroSettings();
  }, []);

  const currentHeroImg = settings.heroImage || "";

  // If no custom hero image is uploaded yet, render a clean lightweight placeholder banner
  if (!currentHeroImg) {
    return (
      <section className="relative w-full pt-20 pb-10 bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-400 text-sm">
            Upload your full banner image in the Admin Panel (Hero Settings) to display here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full pt-20 md:pt-24 bg-white">
      {/* 
        Full Uncropped Hero Banner:
        - Displays the image in its natural aspect ratio
        - Never cropped with object-cover
        - Zero overlay text or overlapping boxes
      */}
      <div className="w-full max-w-[1920px] mx-auto overflow-hidden">
        <img
          src={currentHeroImg}
          alt="Funshala Kindergarten"
          className="w-full h-auto block object-contain"
          loading="eager"
          decoding="async"
        />
      </div>
    </section>
  );
};

export default Hero;
