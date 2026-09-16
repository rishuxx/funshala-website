import React, { useState, useEffect } from "react";
import { getSiteSettings } from "../lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHeroSettings = async () => {
      const data = await getSiteSettings("hero");
      if (data) {
        if (Array.isArray(data.heroImages) && data.heroImages.length > 0) {
          setImages(data.heroImages.filter(Boolean));
        } else if (data.heroImage) {
          setImages([data.heroImage]);
        }
      }
    };
    fetchHeroSettings();
  }, []);

  // Autoplay slideshow if multiple images
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <section className="relative w-full pt-24 pb-12 bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-400 text-sm">
            Upload hero banner image(s) in Admin Panel ➔ Hero Settings to display here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full pt-20 md:pt-24 bg-white">
      <div className="relative w-full max-w-[1920px] mx-auto overflow-hidden group">
        <div className="w-full relative">
          <img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`Funshala Kindergarten Hero ${currentIndex + 1}`}
            className="w-full h-auto block object-contain transition-opacity duration-700"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Carousel Navigation Arrows if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-105"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-105"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-white w-6"
                      : "bg-white/60 hover:bg-white/90"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
