import React from "react";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero2.webp";

/* ------------------ CLOUD BORDER ------------------ */
const CloudBorder = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
    <svg
      className="w-full h-24 md:h-32 lg:h-40"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        d="M0,160 Q120,200 240,180 Q360,160 480,200 Q600,240 720,200
           Q840,160 960,200 Q1080,240 1200,200 Q1320,160 1440,180
           L1440,320 L0,320 Z"
        fill="#FFFFFF"
      />
    </svg>
  </div>
);

/* ------------------ HERO ------------------ */
const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Learning Through Play"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/0 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl w-full">
          <div className="relative max-w-2xl">
            {/* Dashed Border */}
            <div className="absolute -inset-[3px] border border-dashed border-orange-400/60 rounded-3xl" />

            {/* Content Box */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-amber-500/90 text-amber-950 rounded-full font-semibold text-sm shadow-sm">
                <Sparkles size={16} />
                Admissions Open • 2025–26
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-4">
                A Joyful Start <br />
                to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500">
                  Lifelong Learning
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
                Funshala is a Montessori-inspired preschool where children
                learn, explore, and grow in a safe, nurturing, and thoughtfully
                designed environment.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/programs"
                  className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition-colors flex items-center gap-3 justify-center"
                >
                  Explore Programs
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-3 justify-center"
                >
                  <Calendar size={18} />
                  Book a School Tour
                </Link>
              </div>

              {/* Trust Line */}
              <div className="flex flex-wrap gap-3 pt-6 text-sm font-medium text-gray-700">
                <span className="px-4 py-2 bg-gray-100 rounded-full">
                  ⭐ 4.9 Parent Rating
                </span>
                <span className="px-4 py-2 bg-gray-100 rounded-full">
                  Certified Educators
                </span>
                <span className="px-4 py-2 bg-gray-100 rounded-full">
                  Safe & Secure Campus
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CloudBorder />
    </section>
  );
};

export default Hero;
