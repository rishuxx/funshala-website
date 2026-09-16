import { Lightbulb } from 'lucide-react';
import React from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import AdmissionForm from "./AdmissionForm";

/* ------------------ STEP CARD ------------------ */

const AdmissionStep: React.FC<{
  number: number;
  title: string;
  description: string;
  index: number;
}> = ({ number, title, description, index }) => {
  const { ref, isVisible } = useScrollAnimation();
  const delay = `${index * 120}ms`;

  const colors = [
    "from-orange-500 to-amber-500 text-white shadow-orange-200",
    "from-teal-500 to-emerald-500 text-white shadow-teal-200",
    "from-blue-500 to-indigo-500 text-white shadow-blue-200",
    "from-pink-500 to-rose-500 text-white shadow-pink-200",
  ];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`flex items-start gap-4 p-4 rounded-2xl bg-white/80 hover:bg-white border border-orange-100/60 hover:border-orange-200 shadow-sm hover:shadow-md transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Step Number */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br ${colors[index % colors.length]} font-bold font-fredoka text-lg flex items-center justify-center shadow-md`}
      >
        {number}
      </div>

      {/* Content */}
      <div>
        <h4 className="text-base font-bold font-fredoka text-gray-900 mb-0.5">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

/* ------------------ ADMISSIONS SECTION ------------------ */

const Admissions: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="admissions" className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/20 to-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* ===== HEADER BOX ===== */}
        <div
          ref={titleRef}
          className={`max-w-3xl mx-auto mb-12 text-center transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 font-fredoka text-xs font-bold tracking-wide mb-3 border border-orange-200">
            Easy 4-Step Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-gray-950 mb-3 tracking-tight">
            Join the Funshala Family
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-sans">
            Our admission journey is simple, transparent, and thoughtfully designed for parents and children.
          </p>
        </div>

        {/* ===== CONTENT GRID ===== */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
          {/* ===== STEPS BOX ===== */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-pink-500/5 border border-orange-100/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-fredoka">Step by Step</span>
              <h3 className="text-2xl font-bold font-fredoka text-gray-900 mt-1">
                How Admissions Work
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Experience Funshala before making a commitment. We welcome parents to tour our campus anytime.
              </p>
            </div>

            <div className="space-y-3">
              <AdmissionStep
                number={1}
                title="Enquiry & Campus Visit"
                description="Connect with us and visit our child-friendly campus to feel the environment."
                index={0}
              />
              <AdmissionStep
                number={2}
                title="Application Submission"
                description="Fill out the online admission form with your child's basic details."
                index={1}
              />
              <AdmissionStep
                number={3}
                title="Friendly Interaction"
                description="A gentle, joyful conversation to understand your child's learning style."
                index={2}
              />
              <AdmissionStep
                number={4}
                title="Admission Welcome"
                description="Welcome kit, class schedule, and onboarding to the Funshala family!"
                index={3}
              />
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-white border border-amber-200/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                <Lightbulb className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-xs text-gray-600 leading-snug">
                Need quick answers? Call admissions directly at{" "}
                <a href="tel:8009767534" className="font-bold text-orange-600 hover:underline">
                  +91 8009767534
                </a>
              </p>
            </div>
          </div>

          {/* ===== FORM ===== */}
          <div className="lg:col-span-7">
            <AdmissionForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;
