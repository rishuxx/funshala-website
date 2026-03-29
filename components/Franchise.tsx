import React from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import FranchiseForm from "./FranchiseForm";

/* ------------------ BENEFIT CARD ------------------ */

const BenefitCard: React.FC<{
  title: string;
  value: string;
  description: string;
  index: number;
}> = ({ title, value, description, index }) => {
  const { ref, isVisible } = useScrollAnimation();
  const delay = `${index * 150}ms`;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Brand Dashed Border */}
      <div className="absolute -inset-[3px] border border-dashed border-orange-400/60 rounded-2xl" />

      <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg">
        <h3 className="text-sm font-bold text-orange-600 mb-1">{title}</h3>
        <p className="text-4xl font-baloo font-bold text-gray-900 my-2">
          {value}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

/* ------------------ FRANCHISE SECTION ------------------ */

const Franchise: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="franchise"
      className="py-28 md:py-36 relative"
      style={{ backgroundColor: "#4B2E5A" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* ===== ATTENTION HERO BLOCK ===== */}
        <div
          ref={ref}
          className={`relative mb-24 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Dashed Border */}
          <div className="absolute -inset-[4px] border border-dashed border-orange-400/70 rounded-[2.5rem]" />

          <div className="relative bg-white rounded-[2.5rem] px-10 py-14 text-center shadow-2xl">
            <span className="inline-block mb-4 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-sm">
              Franchise Opportunity
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-baloo font-bold text-gray-900 mb-6">
              Turn Your Passion Into a
              <br />
              <span className="text-orange-500">
                Profitable Preschool Business
              </span>
            </h2>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join Funshala and build a trusted preschool brand in your city —
              with complete training, curriculum, and operational support.
            </p>
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — BENEFITS */}
          <div className="space-y-8">
            <BenefitCard
              title="Investment Range"
              value="₹10–15 L"
              description="Low-risk entry with strong ROI and scalable growth."
              index={0}
            />
            <BenefitCard
              title="Space Requirement"
              value="1500+ sq ft"
              description="Child-safe infrastructure with a dedicated play zone."
              index={1}
            />
            <BenefitCard
              title="Complete Support"
              value="360°"
              description="Training, branding, curriculum & marketing assistance."
              index={2}
            />
          </div>

          {/* RIGHT — FORM */}
          <div className="relative">
            {/* Dashed Border */}
            <div className="absolute -inset-[4px] border border-dashed border-orange-400/60 rounded-3xl" />

            <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-baloo font-bold text-gray-900 mb-4">
                Start Your Franchise Journey
              </h3>
              <p className="text-gray-600 mb-6">
                Share your details and our franchise team will connect with you.
              </p>

              <FranchiseForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Franchise;
