

import React from 'react';
import funshalaLogo from '../assets/FullLogo.svg';



// FIX: Add `style` prop to IconProps to allow inline styling of icons.
type IconProps = {
  className?: string;
  style?: React.CSSProperties;
};

// FIX: Pass style prop to the root div element.
export const Logo: React.FC<IconProps> = ({ className, style }) => (
  <div className={`inline-flex items-center ${className}`} style={style}>
    <img
      src={funshalaLogo}
      alt="Funshala Preschool Logo"
      className="h-24 w-auto object-contain"
      draggable={false}
    />
  </div>
);

// Menu (Hamburger) Icon
export const MenuIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

// Close (X) Icon
export const XIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);


// Replaced with more playful icons
// FIX: Pass style prop to the root svg element.
export const PlayIcon: React.FC<IconProps> = ({ className, style }) => ( // Building blocks
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
);
// FIX: Pass style prop to the root svg element.
export const NurseryIcon: React.FC<IconProps> = ({ className, style }) => ( // Crayon
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="m13 1.07-2.82 5.64-6.18.5 4.69 4.28-1.5 6.42L12 15.15l5.81 3.76-1.5-6.42 4.69-4.28-6.18-.5L13 1.07z"/></svg>
);
// FIX: Pass style prop to the root svg element.
export const LKGIcon: React.FC<IconProps> = ({ className, style }) => ( // Open book
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>
);
// FIX: Pass style prop to the root svg element.
export const UKGIcon: React.FC<IconProps> = ({ className, style }) => ( // Graduation cap
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
);
// FIX: Pass style prop to the root svg element.
export const DaycareIcon: React.FC<IconProps> = ({ className, style }) => ( // Teddy bear
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C9.24 2 7 4.24 7 7s.5 3.5 2.5 4.5C9.05 12.57 9 13.79 9 15v1c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-1c0-1.21-.05-2.43-.5-3.5C16.5 10.5 17 8.5 17 7s-2.24-5-5-5zm-3.5 5c-.83 0-1.5-.67-1.5-1.5S7.67 4 8.5 4s1.5.67 1.5 1.5S9.33 7 8.5 7zm7 0c-.83 0-1.5-.67-1.5-1.5S14.67 4 15.5 4s1.5.67 1.5 1.5S16.33 7 15.5 7z"/></svg>
);

// FIX: Pass style prop to the root svg element.
export const CalendarIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
);
// FIX: Pass style prop to the root svg element.
export const PartyIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-2-2h4l-2 2zm-4 4l2-2h-4l2 2zm8 0l2-2h-4l2 2zm2-10h-4l2-2 2 2z"/></svg>
);
// FIX: Pass style prop to the root svg element.
export const SportsIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2v-4zm0 6h2v2h-2v-2z"/></svg>
);
// FIX: Pass style prop to the root svg element.
export const ArrowRight: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
);

// FIX: Pass style prop to the root svg element.
export const StarDoodle: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0L61.22 34.55H97.55L68.16 55.9L79.39 90.45L50 69.1L20.61 90.45L31.84 55.9L2.45 34.55H38.78L50 0Z" />
    </svg>
);
// FIX: Pass style prop to the root svg element.
export const SquiggleDoodle: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5C15 25 30 0 45 20S60 0 75 20S95 5 95 5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 40C15 60 30 35 45 55S60 35 75 55S95 40 95 40" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 75C15 95 30 70 45 90S60 70 75 90S95 75 95 75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
// FIX: Pass style prop to the root svg element.
export const RainbowDoodle: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 90 A 40 40 0 0 1 90 90" stroke="#FF8A8A" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path d="M20 90 A 30 30 0 0 1 80 90" stroke="#FFC47E" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path d="M30 90 A 20 20 0 0 1 70 90" stroke="#FFF78A" strokeWidth="10" fill="none" strokeLinecap="round"/>
    </svg>
);
// FIX: Pass style prop to the root svg element.
export const LetterADoodle: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 90 L50 10 L90 90 M25 60 H75" stroke="currentColor" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
// FIX: Pass style prop to the root svg element.
export const SunDoodle: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25"/>
        <path d="M50 10 V 25 M50 75 V 90 M90 50 H 75 M25 50 H 10 M78.28 21.72 L 67.67 32.33 M32.33 67.67 L 21.72 78.28 M78.28 78.28 L 67.67 67.67 M32.33 32.33 L 21.72 21.72" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
    </svg>
);
// FIX: Pass style prop to the root svg element.
export const CloudDoodle: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 100 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 60 C-10 60, -5 20, 20 25 C25 5, 75 5, 80 25 C105 20, 110 60, 85 60 Z"/>
  </svg>
);
// FIX: Pass style prop to the root svg element.
export const FacebookIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.022A9.953 9.953 0 0 0 22 12z"/></svg>
);
// FIX: Pass style prop to the root svg element.
export const InstagramIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.155 0-3.52.012-4.745.068-2.695.123-3.99 1.423-4.114 4.114-.056 1.225-.068 1.59-.068 4.745s.012 3.52.068 4.745c.124 2.69 1.42 3.99 4.114 4.114 1.225.056 1.59.068 4.745.068s3.52-.012 4.745-.068c2.695-.123 3.99-1.423 4.114-4.114.056-1.225.068-1.59.068-4.745s-.012-3.52-.068-4.745c-.124-2.69-1.42-3.99-4.114-4.114-1.225-.056-1.59-.068-4.745-.068zM12 6.837c-2.846 0-5.163 2.317-5.163 5.163s2.317 5.163 5.163 5.163 5.163-2.317 5.163-5.163S14.846 6.837 12 6.837zm0 8.528c-1.87 0-3.365-1.495-3.365-3.365s1.495-3.365 3.365-3.365 3.365 1.495 3.365 3.365-1.495 3.365-3.365 3.365zm6.406-6.864c-.766 0-1.386.62-1.386 1.386s.62 1.386 1.386 1.386 1.386-.62 1.386-1.386-.62-1.386-1.386-1.386z"/></svg>
);
// FIX: Pass style prop to the root svg element.
export const TwitterIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6.54c-.69.31-1.43.52-2.2.6.8-.48 1.41-1.24 1.7-2.12-.75.45-1.58.77-2.46.94-.71-.75-1.72-1.22-2.84-1.22-2.13 0-3.85 1.72-3.85 3.85 0 .3.04.6.1.88-3.2-.16-6.04-1.69-7.95-4.03-.33.57-.52 1.23-.52 1.94 0 1.33.68 2.5 1.7 3.19-.63-.02-1.23-.19-1.75-.48v.05c0 1.86 1.33 3.42 3.09 3.77-.32.09-.67.13-1.02.13-.25 0-.49-.02-.73-.07.49 1.53 1.91 2.64 3.6 2.67-1.32 1.03-2.98 1.64-4.78 1.64-.31 0-.62-.02-.92-.05 1.7 1.09 3.73 1.73 5.9 1.73 7.08 0 10.96-5.86 10.96-10.96 0-.17 0-.33-.01-.5.75-.54 1.4-1.22 1.91-1.98z"/></svg>
);