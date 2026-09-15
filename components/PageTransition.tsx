import React from "react";
import { useTransitionState } from "../contexts/TransitionContext";
import logo from "../assets/FullLogo.svg";

const PageTransition: React.FC = () => {
  const transitionState = useTransitionState();

  if (transitionState === "idle") {
    return null;
  }

  const isEntering = transitionState === "in";

  return (
    <div
      className={`fixed inset-0 z-[100] pointer-events-none flex items-center justify-center transition-opacity duration-300 ${
        isEntering ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundColor: "rgba(255, 250, 245, 0.95)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className={`transform transition-all duration-300 flex flex-col items-center gap-3 ${
          isEntering ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="bg-white rounded-3xl p-6 shadow-2xl border border-orange-100 flex items-center justify-center w-36 h-36">
          <img
            src={logo}
            alt="Funshala Kindergarten"
            className="w-24 h-24 object-contain"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
