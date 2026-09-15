import React, { useState, useMemo, useEffect } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import * as api from "../lib/api";
import type { GalleryImage } from "../types";
import Lightbox from "./Lightbox";

const CATEGORIES = ["All", "Classroom", "Events", "Art", "Activity"];

/* ------------------ GALLERY ------------------ */

const Gallery: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const galleryImages = await api.getGalleryImages();
      setImages(galleryImages);
      setLoading(false);
    };
    fetchImages();
  }, []);

  const filteredImages = useMemo(() => {
    // Exclude any accidental hero banners or hero images from gallery displays
    const publicImages = images.filter(
      (img) =>
        !img.alt_text?.toLowerCase().includes("hero") &&
        !img.file_name?.toLowerCase().includes("hero") &&
        !img.public_url?.includes("1789482726171")
    );
    if (activeFilter === "All") return publicImages;
    return publicImages.filter((img) => img.category === activeFilter);
  }, [activeFilter, images]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const showNextImage = () =>
    setCurrentImageIndex((i) => (i + 1) % filteredImages.length);

  const showPrevImage = () =>
    setCurrentImageIndex(
      (i) => (i - 1 + filteredImages.length) % filteredImages.length
    );

  const currentImage = filteredImages[currentImageIndex];

  return (
    <>
      <section id="gallery" className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/20 to-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* ===== HEADER BOX ===== */}
          <div
            ref={ref}
            className={`max-w-3xl mx-auto mb-10 text-center transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 font-fredoka text-xs font-bold tracking-wide mb-3 border border-orange-200">
              Campus Life & Activities
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-gray-950 mb-3 tracking-tight">
              Moments of Joy & Discovery
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-sans">
              A glimpse into our classrooms, creative arts, outdoor playtime, and festive celebrations.
            </p>
          </div>

          {/* ===== FILTER PILLS ===== */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2 rounded-full text-sm font-fredoka font-bold transition-all ${
                  activeFilter === category
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 scale-105"
                    : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* ===== IMAGE GRID ===== */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="aspect-[4/3] rounded-2xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-fredoka">
              No photos found in this category yet.
            </div>
          ) : (
            <div
              key={activeFilter}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {filteredImages.map((image, index) => (
                <ImageCard
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  category={image.category}
                  index={index}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {isLightboxOpen && currentImage && (
        <Lightbox
          src={currentImage.src}
          alt={currentImage.alt}
          onClose={closeLightbox}
          onNext={showNextImage}
          onPrev={showPrevImage}
          hasNext={filteredImages.length > 1}
          hasPrev={filteredImages.length > 1}
        />
      )}
    </>
  );
};

/* ------------------ IMAGE CARD ------------------ */

const ImageCard: React.FC<{
  src: string;
  alt: string;
  category?: string;
  index: number;
  onClick: () => void;
}> = ({ src, alt, category, index, onClick }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLButtonElement>({
    threshold: 0.1,
  });

  const delay = `${(index % 6) * 60}ms`;

  return (
    <button
      ref={ref}
      onClick={onClick}
      aria-label={`View image: ${alt}`}
      style={{ transitionDelay: delay }}
      className={`group relative w-full text-left rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:scale-[1.02] bg-white ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 sm:p-4">
          {category && (
            <span className="inline-block self-start px-2 py-0.5 rounded-full bg-amber-400 text-gray-900 font-chalk text-xs font-bold mb-1">
              {category}
            </span>
          )}
          <p className="text-white text-xs sm:text-sm font-fredoka font-semibold truncate">
            {alt}
          </p>
        </div>
      </div>
    </button>
  );
};

export default Gallery;
