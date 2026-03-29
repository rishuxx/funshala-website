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
  const delay = `${index * 150}ms`;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`flex gap-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Step Number */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center">
        {number}
      </div>

      {/* Content */}
      <div>
        <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

/* ------------------ ADMISSIONS SECTION ------------------ */

const Admissions: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="admissions" className="py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* ===== HEADER BOX ===== */}
        <div
          ref={titleRef}
          className={`relative max-w-4xl mx-auto mb-20 transition-all duration-1000 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {/* Dashed Border */}
          <div className="absolute -inset-[3px] border border-dashed border-orange-400/60 rounded-3xl" />

          <div className="relative bg-white rounded-3xl px-8 py-10 md:px-12 md:py-12 shadow-md text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Join the Funshala Family
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Our admission journey is simple, transparent, and thoughtfully
              designed for parents and children.
            </p>
          </div>
        </div>

        {/* ===== CONTENT GRID ===== */}
        <div className="grid lg:grid-cols-5 gap-14 items-start">
          {/* ===== STEPS BOX ===== */}
          <div className="lg:col-span-2 relative">
            {/* Dashed Border */}
            <div className="absolute -inset-[3px] border border-dashed border-orange-400/60 rounded-3xl" />

            <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Our 4-Step Admission Process
              </h3>

              <div className="space-y-6">
                <AdmissionStep
                  number={1}
                  title="Enquiry & Campus Visit"
                  description="Connect with us and visit the campus to experience the Funshala environment."
                  index={0}
                />
                <AdmissionStep
                  number={2}
                  title="Application Submission"
                  description="Fill out the online admission form with your child’s basic details."
                  index={1}
                />
                <AdmissionStep
                  number={3}
                  title="Interaction Session"
                  description="A friendly interaction to understand your child’s learning needs."
                  index={2}
                />
                <AdmissionStep
                  number={4}
                  title="Admission Confirmation"
                  description="Successful confirmation and welcome to the Funshala family."
                  index={3}
                />
              </div>
            </div>
          </div>

          {/* ===== FORM ===== */}
          <div className="lg:col-span-3">
            <AdmissionForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;
