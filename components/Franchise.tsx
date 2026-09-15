import React from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import FranchiseForm from "./FranchiseForm";
import { Coins, Building2, Handshake } from "lucide-react";

/* ------------------ BENEFIT CARD ------------------ */

const BenefitCard: React.FC<{
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}> = ({ title, value, description, icon, index }) => {
  const { ref, isVisible } = useScrollAnimation();
  const delay = `${index * 120}ms`;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-amber-300/50 transition-all duration-500 hover:bg-white/15 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-outfit">
          {title}
        </h3>
      </div>
      <p className="text-3xl font-outfit font-bold text-white mb-2 tracking-tight">
        {value}
      </p>
      <p className="text-white/80 text-sm leading-relaxed font-sans">{description}</p>
    </div>
  );
};

/* ------------------ FRANCHISE SECTION ------------------ */

const Franchise: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="franchise"
      className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-[#1b2b40] via-[#243b55] to-[#141E30]"
    >
      {/* Subtle decorative glow circles */}
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* ===== HERO BANNER ===== */}
        <div
          ref={ref}
          className={`max-w-4xl mx-auto mb-14 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30 font-fredoka text-xs font-bold mb-4 tracking-wide">
            Partnership & Growth Opportunity
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-outfit font-bold text-white mb-4 tracking-tight leading-tight">
            Turn Your Passion Into a <br />
            <span className="text-amber-400">
              Profitable Preschool Business
            </span>
          </h2>

          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-sans">
            Join the Funshala network and launch a trusted early-education center with 360° teacher training, Montessori-aligned curriculum, and operational assistance.
          </p>
        </div>

        {/* ===== MAIN CONTENT GRID ===== */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
          {/* LEFT — 3 BENEFIT CARDS & TRUST HIGHLIGHTS */}
          <div className="lg:col-span-5 space-y-4">
            <BenefitCard
              icon={<Coins className="w-6 h-6 text-amber-300" />}
              title="Investment Range"
              value="₹10–15 Lakhs"
              description="Low initial capital with proven early break-even and sustainable admissions pipeline."
              index={0}
            />
            <BenefitCard
              icon={<Building2 className="w-6 h-6 text-amber-300" />}
              title="Space Requirement"
              value="1500+ Sq. Ft."
              description="Child-safe indoor setup with dedicated active play zone and natural lighting."
              index={1}
            />
            <BenefitCard
              icon={<Handshake className="w-6 h-6 text-amber-300" />}
              title="360° Brand Support"
              value="Complete Handholding"
              description="Teacher recruitment, child curriculum kits, local marketing support, and admissions CRM."
              index={2}
            />

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white/90">
              <h4 className="font-fredoka font-bold text-base text-amber-300 mb-2">
                Why partner with Funshala?
              </h4>
              <ul className="text-xs space-y-2 text-white/80 list-disc list-inside">
                <li>Established Montessori & Playway blended pedagogy</li>
                <li>Comprehensive teacher training manuals & curriculum boxes</li>
                <li>Digital marketing support for new center launch inquiries</li>
              </ul>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="lg:col-span-7">
            <FranchiseForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Franchise;
