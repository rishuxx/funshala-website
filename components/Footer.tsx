import React from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../constants";
import { useTransitionTrigger } from "../contexts/TransitionContext";
import { Logo } from "./IconComponents";
import { FaFacebookF, FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";

/* ------------------ SOCIAL BUTTON ------------------ */
const SocialLink: React.FC<{
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}> = ({ href, ariaLabel, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-orange-500 hover:text-white transition-all duration-300"
  >
    {children}
  </a>
);

/* ------------------ FOOTER ------------------ */
const Footer: React.FC = () => {
  const triggerTransition = useTransitionTrigger();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    triggerTransition(path);
  };

  return (
    <footer className="bg-[#0F2A44] text-white mt-auto pt-14 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* -------- TOP GRID -------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* LOGO + ABOUT */}
          <div className="space-y-4">
            <Link
              to="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="inline-block"
            >
              <Logo className="h-16 w-auto" />
            </Link>

            <p className="text-white/75 text-sm leading-relaxed">
              Funshala Kindergarten is a Montessori-inspired preschool in Prayagraj focused on playful exploration, emotional warmth, and early childhood milestone excellence.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <SocialLink href="https://facebook.com" ariaLabel="Facebook">
                <FaFacebookF size={14} />
              </SocialLink>
              <SocialLink href="https://instagram.com" ariaLabel="Instagram">
                <FaInstagram size={14} />
              </SocialLink>
              <SocialLink href="https://x.com" ariaLabel="Twitter">
                <FaXTwitter size={14} />
              </SocialLink>
              <SocialLink href="https://wa.me/918009767534" ariaLabel="WhatsApp">
                <FaWhatsapp size={15} />
              </SocialLink>
            </div>
          </div>

          {/* QUICK EXPLORE */}
          <div>
            <h3 className="text-base font-fredoka font-bold mb-4 text-amber-300 uppercase tracking-wider">
              Quick Explore
            </h3>
            <ul className="space-y-2 text-sm text-white/75">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.page}
                    onClick={(e) => handleNavClick(e, link.page)}
                    className="hover:text-orange-400 transition-colors inline-block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin"
                  onClick={(e) => handleNavClick(e, "/admin")}
                  className="hover:text-amber-300 font-semibold transition-colors inline-block py-0.5"
                >
                  🔒 Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* EARLY PROGRAMS */}
          <div>
            <h3 className="text-base font-fredoka font-bold mb-4 text-amber-300 uppercase tracking-wider">
              Our Programs
            </h3>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <Link to="/programs" className="hover:text-orange-400 transition-colors">
                  Toddler / Playgroup (1.5 – 2.5 Yrs)
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-orange-400 transition-colors">
                  Nursery (2.5 – 3.5 Yrs)
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-orange-400 transition-colors">
                  Junior KG (3.5 – 4.5 Yrs)
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-orange-400 transition-colors">
                  Senior KG (4.5 – 5.5 Yrs)
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-orange-400 transition-colors font-semibold text-amber-200">
                  ★ Apply for Admission
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT DETAILS */}
          <div>
            <h3 className="text-base font-fredoka font-bold mb-4 text-amber-300 uppercase tracking-wider">
              Campus & Admissions
            </h3>
            <p className="text-white/75 text-sm leading-relaxed mb-3">
              BM-04 Near New Prayag Hospital, Viswa Bank Colony, ADA Colony, Naini, Prayagraj – 211008
            </p>
            <p className="text-sm space-y-1">
              <a
                href="tel:8009767534"
                className="text-white hover:text-orange-400 font-bold block"
              >
                📞 +91 8009767534
              </a>
              <a
                href="mailto:funshalakindergarten@gmail.com"
                className="text-white/75 hover:text-orange-400 text-xs block break-all"
              >
                ✉️ funshalakindergarten@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* -------- BOTTOM BAR -------- */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Funshala Kindergarten. All rights reserved.</p>
          <p className="font-chalk text-sm text-amber-200/70">
            Redefining Childhood with Love & Joy ✨
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
