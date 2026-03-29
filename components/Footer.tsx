import React from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../constants";
import { useTransitionTrigger } from "../contexts/TransitionContext";
import {
  Logo,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "./IconComponents";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

/* ------------------ SOCIAL BUTTON ------------------ */
const SocialLink: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="
      w-10 h-10 rounded-full flex items-center justify-center
      bg-white/10 text-white
      hover:bg-white/20 transition-colors
    "
  >
    {children}
  </a>
);

/* ------------------ FOOTER ------------------ */
const Footer: React.FC = () => {
  const triggerTransition = useTransitionTrigger();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    e.preventDefault();
    triggerTransition(path);
  };

  return (
    <footer className="bg-[#0F2A44] text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-14">
        {/* -------- TOP GRID -------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* LOGO + ADDRESS */}
          <div>
            <Link
              to="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="inline-block mb-4"
            >
              <Logo />
            </Link>

            <p className="text-white/80 text-sm leading-relaxed">
              BM-04 Near New Prayag Hospital, <br />
              Viswa Bank Colony, ADA Colony, Naini, Prayagraj – 211008
            </p>

            <p className="mt-4 text-white/80 text-sm">
              <a href="mailto:hello@funshala.com" className="hover:underline">
                funshalakindergarten@gmail.com
              </a>
              <br />
              <a href="tel:+911234567890" className="hover:underline">
                +91 8009767534
              </a>
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-baloo font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/80">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.page}
                    onClick={(e) => handleNavClick(e, link.page)}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin"
                  onClick={(e) => handleNavClick(e, "/admin")}
                  className="hover:text-white"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* PROGRAMS */}
          <div>
            <h3 className="text-lg font-baloo font-bold mb-4">Our Programs</h3>
            <ul className="space-y-2 text-sm text-white/80">
              {["Playgroup", "Nursery", "LKG & UKG", "Daycare"].map((p) => (
                <li key={p}>
                  <Link
                    to="/programs"
                    onClick={(e) => handleNavClick(e, "/programs")}
                    className="hover:text-white"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-lg font-baloo font-bold mb-4">
              Connect With Us
            </h3>
            <div className="flex gap-3 mb-4">
              <SocialLink href="#">
                <FaFacebookF className="w-4 h-4" />
              </SocialLink>

              <SocialLink href="#">
                <FaInstagram className="w-4 h-4" />
              </SocialLink>

              <SocialLink href="#">
                <FaXTwitter className="w-4 h-4" />
              </SocialLink>
            </div>
            <p className="text-sm text-white/80">
              Follow us for school updates and joyful moments.
            </p>
          </div>
        </div>

        {/* -------- BOTTOM BAR -------- */}
        <div className="mt-12 pt-6 border-t border-white/20 text-center text-sm text-white/70">
          <p>
            © {new Date().getFullYear()} Funshala Preschool. All Rights
            Reserved.
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
