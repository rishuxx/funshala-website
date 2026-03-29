import React, { useEffect } from "react";

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({
  src,
  alt,
  onClose,
  onPrev,
  onNext,
  hasNext,
  hasPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Only trigger navigation if there are multiple images
      if (e.key === "ArrowRight" && hasNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Hide scrollbar on body when lightbox is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in-up"
      style={{ animationDuration: "0.3s" }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-white text-5xl font-bold hover:text-gray-300 transition-colors z-[110]"
        onClick={onClose}
        aria-label="Close image viewer"
      >
        &times;
      </button>

      {/* Navigation Buttons */}
      {hasPrev && (
        <button
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full w-12 h-12 flex items-center justify-center text-4xl hover:bg-black/50 transition-colors z-[110]"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
        >
          &lsaquo;
        </button>
      )}

      {hasNext && (
        <button
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full w-12 h-12 flex items-center justify-center text-4xl hover:bg-black/50 transition-colors z-[110]"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          &rsaquo;
        </button>
      )}

      {/* Image Container */}
      <div
        className="relative max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-rainbow-swoop"
          style={{ animationDuration: "0.5s" }}
        />
        {alt && (
          <p className="text-center text-white text-sm mt-2 bg-black/50 py-1 px-3 rounded-b-lg absolute bottom-0 left-0 right-0">
            {alt}
          </p>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
