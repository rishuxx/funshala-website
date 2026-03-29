

import React, { useState, useEffect } from 'react';
import type { SchoolEvent } from '../types';
import useScrollAnimation from '../hooks/useScrollAnimation';
import * as api from '../lib/api';
import { CalendarIcon, PartyIcon, SportsIcon } from './IconComponents';

// Function to get an icon based on event title
const getEventIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('sport')) return SportsIcon;
    if (lowerTitle.includes('diwali') || lowerTitle.includes('gala') || lowerTitle.includes('party') || lowerTitle.includes('celebration')) return PartyIcon;
    return CalendarIcon;
};

const EventCard: React.FC<{ event: SchoolEvent; index: number }> = ({ event, index }) => {
    const { ref, isVisible } = useScrollAnimation();
    const delay = `${index * 200}ms`;

    return (
        <div
            ref={ref}
            className={`flex items-start p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: delay }}
        >
            <div className="flex-shrink-0 mr-6">
                <div className="w-16 h-16 rounded-full bg-brand-violet text-white flex items-center justify-center">
                    <event.icon className="w-8 h-8"/>
                </div>
            </div>
            <div>
                <p className="text-brand-violet font-bold">{event.date}</p>
                <h3 className="text-xl font-baloo font-bold text-dark-text mt-1 mb-2">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
            </div>
        </div>
    );
}

const Events: React.FC = () => {
    const { ref, isVisible } = useScrollAnimation();
    const [events, setEvents] = useState<SchoolEvent[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await api.eventsAPI.get();
            const eventsData = data.map((e: any) => ({
                title: e.title,
                date: new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                description: e.description,
                icon: getEventIcon(e.title)
            }));
            setEvents(eventsData);
        };
        fetchEvents();
    }, []);

  return (
    <section id="events" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         <div ref={ref} className={`text-center mb-16 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-baloo font-bold text-brand-blue mb-4">Upcoming Fun</h2>
            <p className="text-lg text-dark-text max-w-3xl mx-auto">
                Mark your calendars! Here's a look at the exciting events and celebrations happening at Funshala.
            </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-8">
            {events.map((event, index) => (
                <EventCard key={event.title} event={event} index={index}/>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
