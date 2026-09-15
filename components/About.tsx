import React from "react";
import {
  Heart,
  Target,
  Sparkles,
  BookOpen,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import useScrollAnimation from "../hooks/useScrollAnimation";

import aboutImg from "../assets/about1.jpg";

/* ------------------ REUSABLE COMPONENTS ------------------ */

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-gray-900 mb-3 text-center tracking-tight">
    {children}
  </h2>
);

const SectionSubtitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <p className="text-base md:text-lg text-gray-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
    {children}
  </p>
);

const AnimatedBlock: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
};

/* ------------------ ABOUT SECTION ------------------ */

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 relative bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <AnimatedBlock>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-100 text-amber-900 rounded-full font-outfit font-semibold text-sm mb-3">
              Why Funshala?
            </span>
            <SectionTitle>Nurturing Tomorrow&apos;s Thinkers & Leaders</SectionTitle>
            <SectionSubtitle>
              A Montessori-inspired sanctuary where quality early education meets
              warm, individualized care to foster joyful development in every child.
            </SectionSubtitle>
          </div>
        </AnimatedBlock>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12">
          {/* Image */}
          <AnimatedBlock delay={100}>
            <div className="relative">
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <img
                  src={aboutImg}
                  alt="Children learning at Funshala"
                  className="w-full h-auto object-cover max-h-[440px]"
                  loading="lazy"
                  decoding="async"
                />

                {/* Stats Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-orange-100">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-2xl font-outfit font-bold text-brand-blue">100+</p>
                        <p className="text-xs text-gray-600 font-sans font-medium">Happy Children</p>
                      </div>
                      <div className="border-x border-gray-200">
                        <p className="text-2xl font-outfit font-bold text-brand-green">5+</p>
                        <p className="text-xs text-gray-600 font-sans font-medium">Years Experience</p>
                      </div>
                      <div>
                        <p className="text-2xl font-outfit font-bold text-brand-red">98%</p>
                        <p className="text-xs text-gray-600 font-sans font-medium">Parent Trust</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-3 shadow-lg">
                <Award size={28} strokeWidth={2.5} />
              </div>
            </div>
          </AnimatedBlock>

          {/* Mission / Vision / Philosophy */}
          <div className="space-y-5">
            {[
              {
                icon: Heart,
                title: "Our Mission",
                color: "bg-red-500",
                text: "To provide a safe, joyful, and stimulating environment where every child feels loved, respected, and encouraged to develop to their fullest potential.",
              },
              {
                icon: Target,
                title: "Our Vision",
                color: "bg-green-500",
                text: "To be a leading name in early childhood education, known for innovation, nurturing environments, and inspiring lifelong learning.",
              },
              {
                icon: BookOpen,
                title: "Our Philosophy",
                color: "bg-blue-500",
                text: "We believe in learning through play, balancing structured activities with freedom to explore and discover.",
              },
            ].map((item, i) => (
              <AnimatedBlock delay={200 + i * 100} key={item.title}>
                <div className="group relative">
                  {/* Brand Dashed Border */}
                  <div className="absolute -inset-[2px] border border-dashed border-orange-400/60 rounded-xl transition-all duration-300 group-hover:border-orange-500/80" />

                  <div className="relative bg-white p-6 rounded-xl hover:shadow-lg transition">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center shadow-md`}
                      >
                        <item.icon
                          className="text-white"
                          size={24}
                          strokeWidth={2.5}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>

        {/* Bottom Features */}
        <AnimatedBlock delay={500}>
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-md border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
              Why Parents Choose Funshala
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: "Expert Educators",
                  desc: "Certified teachers with specialized early childhood training",
                  color: "bg-purple-500",
                },
                {
                  icon: TrendingUp,
                  title: "Proven Curriculum",
                  desc: "Montessori-inspired programs with measurable outcomes",
                  color: "bg-orange-500",
                },
                {
                  icon: Award,
                  title: "Safe Environment",
                  desc: "State-of-the-art facilities with comprehensive safety measures",
                  color: "bg-teal-500",
                },
              ].map((f) => (
                <div className="group relative" key={f.title}>
                  {/* Brand Dashed Border */}
                  <div className="absolute -inset-[1px] border border-dashed border-orange-400/60 rounded-lg transition-all duration-300 group-hover:border-orange-500/80" />

                  <div className="relative bg-white p-6 rounded-lg text-center hover:shadow-md transition">
                    <div
                      className={`w-14 h-14 ${f.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm`}
                    >
                      <f.icon
                        className="text-white"
                        size={28}
                        strokeWidth={2.5}
                      />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {f.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  );
};

export default About;
