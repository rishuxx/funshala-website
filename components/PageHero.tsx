
import React from 'react';

const PageHeroBackground: React.FC = () => (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-sky-100 to-pastel-bg">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-red/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-blue/10 rounded-full filter blur-3xl animate-pulse delay-75"></div>
        <div className="absolute bottom-0 -left-1/4 w-96 h-96 bg-brand-yellow/10 rounded-3xl transform rotate-45 filter blur-3xl animate-pulse delay-150"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-80 h-80 bg-brand-green/10 rounded-full filter blur-3xl animate-pulse delay-200"></div>
    </div>
);

const PageHero: React.FC<{ title: string }> = ({ title }) => {
  return (
    <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 min-h-[200px] flex items-center justify-center text-center overflow-hidden bg-[#0F2A44] px-4">
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-outfit font-extrabold text-white tracking-tight">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default PageHero;
