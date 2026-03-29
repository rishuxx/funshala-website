import type { NavLink, Testimonial } from "./types";

export const NAV_LINKS: NavLink[] = [
  { name: "Home", page: "/" },
  { name: "About Us", page: "/about" },
  { name: "Programs", page: "/programs" },
  { name: "Admissions", page: "/admissions" },
  { name: "Gallery", page: "/gallery" },
  { name: "Franchise", page: "/franchise" },
  { name: "Contact Us", page: "/contact" },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: "Priya Sharma",
    relation: "Aarav's Mother",
    quote:
      "Funshala is a magical place! My son has blossomed here. The teachers are so caring, and the play-based curriculum is fantastic.",
    avatar: "https://picsum.photos/id/1011/100/100",
  },
  {
    name: "Rohan Mehta",
    relation: "Mira's Father",
    quote:
      "The facilities are top-notch and secure. We get daily updates through the parent portal, which gives us great peace of mind.",
    avatar: "https://picsum.photos/id/1005/100/100",
  },
  {
    name: "Anjali Desai",
    relation: "Kabir's Mother",
    quote:
      "I'm so impressed with the focus on holistic development. It's not just academics; it's about creativity, social skills, and fun!",
    avatar: "https://picsum.photos/id/1027/100/100",
  },
  {
    name: "Vikram Singh",
    relation: "Saanvi's Father",
    quote:
      "Choosing Funshala was the best decision for our daughter. She is excited to go to school every single day. Highly recommended!",
    avatar: "https://picsum.photos/id/64/100/100",
  },
  {
    name: "Sunita Patil",
    relation: "Ria's Mother",
    quote:
      "The virtual tour was amazing and the real experience is even better. The staff is professional and the environment is so joyful.",
    avatar: "https://picsum.photos/id/342/100/100",
  },
  {
    name: "Amit Kumar",
    relation: "Aryan's Father",
    quote:
      "The franchise support has been exceptional. Funshala provided a clear roadmap to success, and our center is thriving.",
    avatar: "https://picsum.photos/id/1074/100/100",
  },
];
