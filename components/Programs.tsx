import { Check } from "lucide-react";
import React, { useState, useEffect } from "react";
import type { Program } from "../types";
import useScrollAnimation from "../hooks/useScrollAnimation";
import * as api from "../lib/api";
import {
  PlayIcon,
  NurseryIcon,
  LKGIcon,
  UKGIcon,
  DaycareIcon,
} from "./IconComponents";
import { Link } from "react-router-dom";
import { useTransitionTrigger } from "../contexts/TransitionContext";

/* ------------------ ICON MAP ------------------ */
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } =
  {
    Playgroup: PlayIcon,
    Nursery: NurseryIcon,
    LKG: LKGIcon,
    UKG: UKGIcon,
    Daycare: DaycareIcon,
  };

/* ------------------ COLOR SYSTEM (KEPT PER PROGRAM) ------------------ */
const programStyles: {
  [key: string]: {
    ring: string;
    softBg: string;
    text: string;
    gradient: string;
  };
} = {
  Playgroup: {
    ring: "ring-red-400",
    softBg: "bg-red-50",
    text: "text-red-600",
    gradient: "from-red-500 to-pink-500",
  },
  Nursery: {
    ring: "ring-orange-400",
    softBg: "bg-orange-50",
    text: "text-orange-600",
    gradient: "from-orange-500 to-amber-500",
  },
  LKG: {
    ring: "ring-yellow-400",
    softBg: "bg-yellow-50",
    text: "text-yellow-600",
    gradient: "from-yellow-400 to-amber-400",
  },
  UKG: {
    ring: "ring-green-400",
    softBg: "bg-green-50",
    text: "text-green-600",
    gradient: "from-green-500 to-emerald-500",
  },
  Daycare: {
    ring: "ring-blue-400",
    softBg: "bg-blue-50",
    text: "text-blue-600",
    gradient: "from-blue-500 to-indigo-500",
  },
};

const defaultStyles = {
  ring: "ring-gray-300",
  softBg: "bg-gray-50",
  text: "text-gray-500",
  gradient: "from-gray-400 to-gray-500",
};

/* ------------------ FEATURES ------------------ */
const programFeatures: { [key: string]: string[] } = {
  Playgroup: ["Sensory Play", "Safe Play Zones", "Parent Bonding"],
  Nursery: ["Art & Music", "Social Skills", "Letters & Numbers"],
  LKG: ["Pre-Academics", "Creative Thinking", "Independence"],
  UKG: ["School Readiness", "Cognitive Skills", "Leadership"],
  Daycare: ["Flexible Hours", "Nutritious Meals", "Engaging Care"],
};

/* ------------------ PROGRAM CARD ------------------ */
const ProgramCard: React.FC<{
  program: Program;
  index: number;
}> = ({ program, index }) => {
  const { ref, isVisible } = useScrollAnimation();
  const triggerTransition = useTransitionTrigger();
  const delay = `${index * 120}ms`;

  const slug = program.name.toLowerCase().replace(/\s+/g, "-");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerTransition(`/programs/${slug}`);
  };

  const styles = program.styles || defaultStyles;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Link
        to={`/programs/${slug}`}
        onClick={handleClick}
        className="group relative block h-full rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
      >
        {/* Top Accent Strip */}
        <div className={`h-3 w-full bg-gradient-to-r ${styles.gradient}`} />

        <div className="p-6 md:p-7 flex flex-col flex-grow">
          {/* Icon & Age Badge */}
          <div className="flex items-center justify-between mb-5">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center 
              bg-gradient-to-br ${styles.gradient} 
              shadow-md group-hover:rotate-6 transition-transform duration-300`}
            >
              <program.icon className="w-7 h-7 text-white" />
            </div>

            <span className="font-chalk text-base px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
              {program.age}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-outfit font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors">
            {program.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow font-sans">
            {program.description}
          </p>

          {/* Features Checklist */}
          <ul className="space-y-2 mb-6">
            {program.features.map((feature) => (
              <li key={feature} className="flex items-center text-xs sm:text-sm font-medium text-gray-700 font-sans">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mr-2">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          {/* Bottom Action CTA */}
          <div className={`mt-auto pt-4 border-t border-gray-100 font-fredoka font-semibold text-sm flex items-center justify-between ${styles.text}`}>
            <span>View Curriculum</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

/* ------------------ PROGRAMS SECTION ------------------ */
const Programs: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await api.programsAPI.get();
        const programsData = data.map((p: any) => ({
          id: p.id,
          name: p.title,
          age: p.ageGroup,
          description: p.description,
          icon: iconMap[p.title] || PlayIcon,
          features: programFeatures[p.title] || [],
          styles: programStyles[p.title] || defaultStyles,
        }));
        setPrograms(programsData);
      } catch (error) {
        console.error("Failed to fetch programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <section id="programs" className="py-16 md:py-24 bg-[#FFFAF5] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Header */}
        <div
          ref={ref}
          className={`transition-opacity duration-700 max-w-3xl mx-auto text-center mb-12 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-900 font-outfit font-semibold text-sm mb-3">
            Early Learning Stages
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-bold text-gray-900 mb-4">
            Our Learning Programs
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-sans leading-relaxed">
            Thoughtfully structured programs supporting every stage of early
            childhood with joy, warmth, and individualized Montessori care.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
          {programs.map((program, index) => (
            <ProgramCard key={program.name} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
