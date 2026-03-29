import React from "react";
import { useTransitionState } from "../contexts/TransitionContext";
import logo from "../assets/FullLogo.svg"; // Adjust the path and filename as needed

const PageTransition: React.FC = () => {
  const transitionState = useTransitionState();

  // Vibrant, saturated rainbow colors
  const colors = [
    "bg-red-500", // Bright red
    "bg-orange-500", // Vivid orange
    "bg-yellow-400", // Sunny yellow
    "bg-green-500", // Fresh green
    "bg-blue-500", // Bold blue
    "bg-purple-500", // Rich purple
  ];

  if (transitionState === "idle") {
    return null;
  }

  const wipeAnimationClass =
    transitionState === "in"
      ? "animate-rainbow-wipe-in"
      : "animate-rainbow-wipe-out";
  const logoAnimationClass =
    transitionState === "in" ? "animate-logo-in" : "animate-logo-out";

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[100] pointer-events-none overflow-hidden">
      <div className="absolute inset-0 flex">
        {colors.map((color, i) => (
          <div
            key={i}
            className={`flex-1 ${color} ${wipeAnimationClass}`}
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`${logoAnimationClass}`}>
          <div className="bg-white rounded-full p-8 shadow-2xl flex items-center justify-center w-48 h-48">
            <img
              src={logo}
              alt="Funshala Logo"
              className="w-32 h-32 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
