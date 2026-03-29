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
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <Link
        to={`/programs/${slug}`}
        onClick={handleClick}
        className="group relative block h-full"
      >
        {/* BRAND DASHED BORDER (CONSISTENT SYSTEM) */}
        <div
          className="absolute -inset-[2px] border border-dashed border-orange-400/60 
          rounded-3xl group-hover:border-orange-500/80 transition-all duration-300"
        />

        {/* CARD */}
        <div
          className={`relative h-full rounded-3xl p-7 ${styles.softBg} 
          bg-white shadow-md hover:shadow-xl transition-all duration-300 
          flex flex-col`}
        >
          {/* Icon */}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center 
            bg-gradient-to-br ${styles.gradient} 
            ring-4 ${styles.ring} ring-offset-2 mb-6 
            group-hover:scale-110 transition-transform duration-300`}
          >
            <program.icon className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-baloo font-bold text-gray-900 mb-1">
            {program.name}
          </h3>

          {/* Age */}
          <span className={`text-sm font-semibold ${styles.text} mb-4`}>
            {program.age}
          </span>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-grow">
            {program.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {program.features.map((feature) => (
              <li key={feature} className="flex items-center text-sm">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${styles.text} bg-current`}
                />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className={`mt-auto font-semibold ${styles.text}`}>
            View Details →
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
    <section id="programs" className="py-20 md:py-28 bg-pastel-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Header */}
        <div
          ref={ref}
          className={`transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-baloo font-bold text-brand-blue text-center mb-4">
            Our Programs
          </h2>
          <p className="text-lg text-dark-text text-center max-w-3xl mx-auto mb-16">
            Thoughtfully designed programs that support every stage of early
            childhood with joy, care, and structured learning.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {programs.map((program, index) => (
            <ProgramCard key={program.name} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
