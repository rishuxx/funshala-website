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

  // Lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const galleryImages = await api.getGalleryImages();
      setImages(galleryImages);
    };
    fetchImages();
  }, []);

  const filteredImages = useMemo(() => {
    if (activeFilter === "All") return images;
    return images.filter((img) => img.category === activeFilter);
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
      <section id="gallery" className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* ===== HEADER BOX ===== */}
          <div
            ref={ref}
            className={`relative max-w-4xl mx-auto mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="absolute -inset-[3px] border border-dashed border-orange-400/60 rounded-3xl" />

            <div className="relative bg-white rounded-3xl px-8 py-10 text-center shadow-md">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Moments of Joy
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                A glimpse into our joyful classrooms, activities, celebrations,
                and everyday learning moments.
              </p>
            </div>
          </div>

          {/* ===== FILTER BOX ===== */}
          <div className="relative max-w-3xl mx-auto mb-14">
            <div className="absolute -inset-[2px] border border-dashed border-orange-400/50 rounded-2xl" />
            <div className="relative bg-white rounded-2xl p-4 flex flex-wrap justify-center gap-3 shadow-sm">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeFilter === category
                      ? "bg-orange-500 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* ===== IMAGE GRID ===== */}
          <div
            key={activeFilter}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {filteredImages.map((image, index) => (
              <ImageCard
                key={image.id}
                src={image.src}
                alt={image.alt}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
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
  index: number;
  onClick: () => void;
}> = ({ src, alt, index, onClick }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLButtonElement>({
    threshold: 0.1,
  });

  const delay = `${(index % 4) * 100}ms`;

  return (
    <button
      ref={ref}
      onClick={onClick}
      aria-label={`View image: ${alt}`}
      style={{ transitionDelay: delay }}
      className={`relative w-full transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Dashed Border */}
      <div className="absolute -inset-[2px] border border-dashed border-orange-400/60 rounded-2xl" />

      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg group">
        <div className="aspect-square overflow-hidden">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </button>
  );
};

export default Gallery;
