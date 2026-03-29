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
    <header className="fixed top-2 left-0 right-0 z-50 py-6 lg:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="lg:translate-x-[-100px] flex-shrink-0 min-w-[140px] md:min-w-[180px]">
            <Link
              to="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="block transition-transform duration-300 hover:scale-105"
            >
              <Logo className="h-12 md:h-14 text-3xl" />
            </Link>
          </div>

          {/* Desktop Nav with Slick Thin Dotted Border */}
          <div className="hidden md:block relative group">
            {/* Slick Thin Dashed Border - Single Layer */}
            <div className="absolute -inset-[2px] border border-dashed border-orange-400/60 rounded-full group-hover:border-orange-500/80 transition-all duration-300" />

            {/* Navigation Box */}
            <nav
              className="relative flex items-center space-x-6 lg:space-x-8 rounded-full px-8 py-3
              bg-white/30 backdrop-blur-xl border border-white/60
              shadow-[0_8px_32px_rgba(31,38,135,0.1)] ring-1 ring-white/30"
            >
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
                    className={`font-baloo font-bold text-[1.1rem] px-2 py-1 relative group/link transition-colors duration-300 ${getLinkColorClass(
                      index,
                      isActive
                    )}`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-1 bg-current rounded-full transition-transform duration-300 origin-left ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover/link:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block min-w-[140px] text-right">
            <Link
              to="/admissions"
              onClick={(e) => handleNavClick(e, "/admissions")}
              className="inline-block px-8 py-3 text-lg bg-gradient-to-r from-[#FF0055] via-[#FF5500] to-[#FF9900]
              text-white font-extrabold font-baloo rounded-full shadow-lg
              hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20"
            >
              Enroll Now 🚀
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-white/30 backdrop-blur-md border border-white/40 rounded-xl text-[#2A0A55]"
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-8 h-8" />
              ) : (
                <MenuIcon className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-t shadow-xl
        transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
          {NAV_LINKS.map((link, index) => {
            const isActive =
              link.page === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.page);

            return (
              <Link
                key={link.name}
                to={link.page}
                onClick={(e) => handleNavClick(e, link.page)}
                className={`text-xl font-baloo font-bold text-center py-3 border-b last:border-0 ${getLinkColorClass(
                  index,
                  isActive
                )}`}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            to="/admissions"
            onClick={(e) => handleNavClick(e, "/admissions")}
            className="w-full text-center px-6 py-4 mt-4 text-xl bg-gradient-to-r from-[#FF0055] via-[#FF5500] to-[#FF9900]
            text-white font-bold font-baloo rounded-full shadow-lg"
          >
            Enroll Now 🚀
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
