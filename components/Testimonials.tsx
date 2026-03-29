import React from "react";
import { TESTIMONIALS_DATA } from "../constants";
import type { Testimonial } from "../types";

/* ------------------ ICON ------------------ */
const QuoteIcon: React.FC = () => (
  <svg
    className="w-14 h-14 text-orange-200 absolute -top-5 -left-4 pointer-events-none"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
  </svg>
);

/* ------------------ CARD ------------------ */
const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => (
  <div className="flex-shrink-0 px-6">
    <div className="group relative w-[340px] md:w-[380px]">
      {/* Brand Dashed Border */}
      <div
        className="absolute -inset-[3px] border border-dashed border-orange-400/60 
        rounded-3xl transition-all duration-300 
        group-hover:border-orange-500/80"
      />

      <div className="relative bg-white rounded-3xl shadow-xl p-8 min-h-[260px]">
        <QuoteIcon />

        <div className="relative z-10">
          <div className="flex items-center mb-5">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-14 h-14 rounded-full mr-4 border-2 border-orange-400 object-cover"
              loading="lazy"
            />
            <div>
              <p className="font-bold text-lg text-gray-900">
                {testimonial.name}
              </p>
              <p className="text-sm text-gray-500">{testimonial.relation}</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed italic text-sm">
            “{testimonial.quote}”
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* ------------------ SECTION ------------------ */
const Testimonials: React.FC = () => {
  const extendedTestimonials = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <section id="testimonials" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* ===== HEADER BOX ===== */}
        <div className="relative max-w-4xl mx-auto mb-20 group">
          {/* Dashed Border */}
          <div
            className="absolute -inset-[3px] border border-dashed 
            border-orange-400/60 rounded-3xl 
            group-hover:border-orange-500/80 transition-all duration-300"
          />

          <div className="relative bg-white rounded-3xl px-8 py-10 md:px-12 md:py-12 shadow-md text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Words from Our Happy Parents
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              We are more than just a school — we are a community. Here’s what
              our families say about their Funshala experience.
            </p>
          </div>
        </div>
      </div>

      {/* ===== SCROLL ZONE ===== */}
      <div className="relative">
        <div className="overflow-x-hidden overflow-y-visible">
          <div className="py-10">
            <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
              {extendedTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.name}-${index}`}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
