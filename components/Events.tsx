import React, { useState, useEffect } from "react";
import type { SchoolEvent } from "../types";
import useScrollAnimation from "../hooks/useScrollAnimation";
import * as api from "../lib/api";
import { Calendar, PartyPopper, Trophy } from "lucide-react";

// Function to get an icon based on event title
const getEventIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("sport") || lowerTitle.includes("yoga") || lowerTitle.includes("athlet")) return Trophy;
  if (
    lowerTitle.includes("diwali") ||
    lowerTitle.includes("gala") ||
    lowerTitle.includes("party") ||
    lowerTitle.includes("celebration") ||
    lowerTitle.includes("annual")
  )
    return PartyPopper;
  return Calendar;
};

const EventCard: React.FC<{ event: SchoolEvent; index: number }> = ({
  event,
  index,
}) => {
  const { ref, isVisible } = useScrollAnimation();
  const delay = `${index * 120}ms`;
  const IconComponent = event.icon || Calendar;

  const bgGradients = [
    "from-orange-500 to-amber-500 text-white shadow-orange-500/20",
    "from-teal-500 to-emerald-500 text-white shadow-teal-500/20",
    "from-blue-500 to-indigo-500 text-white shadow-blue-500/20",
    "from-purple-500 to-pink-500 text-white shadow-purple-500/20",
  ];

  return (
    <div
      ref={ref}
      className={`group flex items-start gap-5 p-6 bg-white rounded-3xl border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: delay }}
    >
      <div className="flex-shrink-0">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
            bgGradients[index % bgGradients.length]
          } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          <IconComponent className="w-7 h-7 text-white stroke-[2.5]" />
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="inline-block px-3 py-0.5 rounded-full bg-orange-100 text-orange-700 font-chalk text-xs font-bold">
            {event.date}
          </span>
        </div>
        <h3 className="text-xl font-fredoka font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1.5">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
};

const Events: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await api.eventsAPI.get();
        const eventsData = data.map((e: any) => ({
          title: e.title,
          date: new Date(e.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          description: e.description,
          icon: getEventIcon(e.title),
        }));
        setEvents(eventsData);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section id="events" className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/20 to-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 font-fredoka text-xs font-bold tracking-wide mb-3 border border-orange-200">
            School Calendar
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-gray-950 mb-3 tracking-tight">
            Upcoming Fun & Celebrations
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-sans">
            From cultural festivals to sports days and storytelling weeks, there's always something magical taking place at Funshala.
          </p>
        </div>

        {loading ? (
          <div className="max-w-4xl mx-auto space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-28 rounded-3xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-fredoka max-w-md mx-auto bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <span className="text-3xl mb-2 block">🎈</span>
            <h4 className="font-bold text-lg text-gray-800">Stay Tuned!</h4>
            <p className="text-xs text-gray-500 mt-1">
              New exciting events will be announced soon. Check back often!
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
            {events.map((event, index) => (
              <EventCard key={event.title + index} event={event} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
