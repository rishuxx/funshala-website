// FIX: Import React to use React types like React.ComponentType.
import React from 'react';

export interface NavLink {
  name: string;
  page: string;
}

export interface Program {
  name: string;
  age: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface Testimonial {
  name: string;
  relation: string;
  quote: string;
  avatar: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

export interface SchoolEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}