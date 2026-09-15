import React from "react";
import { TESTIMONIALS_DATA } from "../constants";
import type { Testimonial } from "../types";
import { Quote, Sparkles } from "lucide-react";

/* ------------------ CARD ------------------ */
const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => (
  <div className="flex-shrink-0 px-3 sm:px-4">
    <div className="w-[300px] sm:w-[350px] bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[220px]">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Quote size={18} className="text-orange-400 opacity-80" />
          <span className="text-xs font-outfit font-semibold uppercase tracking-wider text-orange-600">
            Verified Parent Feedback
          </span>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed italic line-clamp-4 font-sans">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full border border-orange-200 object-cover"
          loading="lazy"
        />
        <div>
          <p className="font-bold font-fredoka text-sm text-gray-900">
            {testimonial.name}
          </p>
          <p className="text-xs text-gray-500 font-sans">
            {testimonial.relation}
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* ------------------ SECTION ------------------ */
const Testimonials: React.FC = () => {
  const extendedTestimonials = [
    ...TESTIMONIALS_DATA,
    ...TESTIMONIALS_DATA,
    ...TESTIMONIALS_DATA,
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-amber-50/30 via-white to-amber-50/20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* ===== HEADER ===== */}
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 font-fredoka text-xs font-bold tracking-wide mb-3 border border-orange-200">
            <Sparkles size={14} className="text-orange-600" />
            Parent Community
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-gray-950 mb-3 tracking-tight">
            Words From Our Happy Families
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-sans">
            We are more than just a preschool — we are a warm, nurturing community. Hear directly from parents who experienced the Funshala difference.
          </p>
        </div>
      </div>

      {/* ===== FAST SMOOTH MARQUEE ROW (16s cycle) ===== */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="overflow-x-hidden py-3">
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
    </section>
  );
};

export default Testimonials;
