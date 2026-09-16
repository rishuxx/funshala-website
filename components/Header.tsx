import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../constants";
import type { NavLink } from "../types";
import { useTransitionTrigger } from "../contexts/TransitionContext";
import { Logo, MenuIcon, XIcon } from "./IconComponents";

const Header: React.FC<{ currentPage?: string }> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const triggerTransition = useTransitionTrigger();
  const location = useLocation();

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    if (location.pathname === path) return;
    setIsMobileMenuOpen(false);
    triggerTransition(path);
  };

  // Color helper
  const getLinkColorClass = (index: number, isActive: boolean) => {
    const colors = [
      "hover:text-[#FF0000]",
      "hover:text-[#FF8800]",
      "hover:text-[#FFD700]",
      "hover:text-[#00CC00]",
      "hover:text-[#0099FF]",
      "hover:text-[#6600FF]",
      "hover:text-[#FF00CC]",
    ];

    if (isActive) {
      const activeColors = [
        "text-[#FF0000]",
        "text-[#FF8800]",
        "text-[#E6C200]",
        "text-[#00CC00]",
        "text-[#0099FF]",
        "text-[#6600FF]",
        "text-[#FF00CC]",
      ];
      return activeColors[index % activeColors.length];
    }

    return `text-[#2A0A55] ${colors[index % colors.length]}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/95 border-b border-orange-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo with proper spacious container */}
          <div className="flex-shrink-0 py-1">
            <Link
              to="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="flex items-center transition-transform duration-200 hover:opacity-95"
            >
              <Logo className="h-14 sm:h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop Nav - Clean Modern Pills */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 bg-amber-50/70 p-1.5 rounded-full border border-orange-200/60 shadow-inner">
            {NAV_LINKS.map((link: NavLink, index: number) => {
              const isActive =
                link.page === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.page);

              return (
                <Link
                  key={link.name}
                  to={link.page}
                  onClick={(e) => handleNavClick(e, link.page)}
                  className={`font-outfit font-medium text-[0.95rem] px-4 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-sm font-semibold scale-105"
                      : "text-gray-700 hover:text-brand-orange hover:bg-white/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA without emojis */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/admissions"
              onClick={(e) => handleNavClick(e, "/admissions")}
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-outfit font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 text-sm"
            >
              <span>Enroll Now</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 bg-orange-50 hover:bg-orange-100 rounded-xl text-gray-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-6 h-6 text-brand-red" />
              ) : (
                <MenuIcon className="w-6 h-6 text-brand-blue" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Over Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-orange-100 shadow-2xl px-6 py-6 transition-all duration-300 animate-fade-in-up">
          <div className="flex flex-col space-y-2 mb-6">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.page === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.page);

              return (
                <Link
                  key={link.name}
                  to={link.page}
                  onClick={(e) => handleNavClick(e, link.page)}
                  className={`text-lg font-outfit font-medium px-4 py-2.5 rounded-xl transition-colors ${
                    isActive
                      ? "bg-orange-100 text-brand-red font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <Link
            to="/admissions"
            onClick={(e) => handleNavClick(e, "/admissions")}
            className="w-full text-center py-3.5 bg-gradient-to-r from-brand-red to-brand-orange text-white font-outfit font-semibold text-lg rounded-xl shadow-md block"
          >
            Admissions Open • Apply Now
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
