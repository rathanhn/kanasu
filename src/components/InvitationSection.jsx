import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Download, Edit3 } from 'lucide-react';
import { downloadCalendarEvent } from '../utils/calendar';

export default function InvitationSection({ eventDetails, onOpenSettings }) {
  const handleAddToCalendar = () => {
    downloadCalendarEvent({
      title: 'Griha Pravesh — ಕನಸು (KANASU)',
      description: `With the blessings of our elders and the love of our family, we warmly invite you to celebrate the Griha Pravesh of our new home, ಕನಸು (KANASU).\n\nHosts: ${eventDetails.hostNames}\nTime: ${eventDetails.time}`,
      location: `${eventDetails.venueName}, ${eventDetails.location}`,
      startDate: `${eventDetails.isoDate}T09:30:00`,
      endDate: `${eventDetails.isoDate}T14:30:00`,
    });
  };

  return (
    <section id="invitation" className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 bg-[#121110] text-[#FDFBF7] overflow-hidden">
      {/* Radial Background Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3E2723]/25 via-[#1A1816] to-[#121110]" />

      <div className="z-10 max-w-xl w-full flex flex-col items-center text-center">
        
        {/* Primary Heading: ಗೃಹ ಪ್ರವೇಶ */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-5xl sm:text-6xl md:text-7xl font-kannada font-black text-[#FDFBF7] leading-tight mb-1 drop-shadow-[0_4px_25px_rgba(200,109,81,0.2)]"
        >
          ಗೃಹ ಪ್ರವೇಶ
        </motion.h1>

        {/* Subheading: Griha Pravesh */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl font-cinzel tracking-[0.35em] text-[#C5A059] font-semibold uppercase mb-8"
        >
          Griha Pravesh
        </motion.span>

        {/* Invitation Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full glass-panel rounded-3xl p-6 sm:p-10 border border-[#C5A059]/30 shadow-2xl relative gold-border-glow"
        >
          {/* Host Edit Badge */}
          <button 
            onClick={onOpenSettings}
            className="absolute top-4 right-4 p-2 rounded-full glass-card-light text-[#9E9182] hover:text-[#C5A059] transition-colors"
            title="Edit Date/Time Details"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {/* Invitation Copy */}
          <p className="text-base sm:text-lg font-serif-title text-[#D4C9BC] font-light leading-relaxed mb-8 max-w-md mx-auto">
            With the blessings of our elders<br />
            and the love of our family,<br />
            we warmly invite you to celebrate<br />
            the Griha Pravesh of our new home.
          </p>

          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent mx-auto mb-8" />

          {/* House Identity Logo in Card */}
          <div className="mb-6 flex flex-col items-center">
            <picture className="flex justify-center">
              <source srcSet="/logo_transparent.webp" type="image/webp" />
              <img 
                src="/logo_transparent.png" 
                alt="ಕನಸು · KANASU Logo" 
                width="1672"
                height="941"
                loading="lazy"
                decoding="async"
                className="w-56 sm:w-64 h-auto object-contain drop-shadow-[0_6px_25px_rgba(197,160,89,0.35)] mb-1"
              />
            </picture>
            <div className="flex items-center gap-1.5 text-xs text-[#9E9182] font-mono mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#C86D51] shrink-0" />
              <span>{eventDetails.venueName || 'KANASU'}, Kanushi Layout, Bylakuppe</span>
            </div>
          </div>

          {/* DATE & TIME HIGHLIGHT BOXES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* Date Box */}
            <div className="p-4 rounded-2xl bg-[#121110]/80 border border-[#C5A059]/30 flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-[#C86D51]/20 text-[#C86D51] flex items-center justify-center mb-2">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-[#9E9182] font-mono font-medium">
                DATE
              </span>
              <span className="text-base sm:text-lg font-semibold text-[#FDFBF7] mt-1 font-serif-title">
                {eventDetails.date || '[Add Date]'}
              </span>
            </div>

            {/* Time Box */}
            <div className="p-4 rounded-2xl bg-[#121110]/80 border border-[#C5A059]/30 flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mb-2">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-[#9E9182] font-mono font-medium">
                TIME
              </span>
              <span className="text-base sm:text-lg font-semibold text-[#FDFBF7] mt-1 font-serif-title">
                {eventDetails.time || '[Add Time]'}
              </span>
            </div>
          </div>

          {/* Add to Calendar CTA */}
          <button
            onClick={handleAddToCalendar}
            className="w-full py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-[#FDFBF7] border border-[#C5A059]/40 text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all duration-300 active:scale-98"
          >
            <Download className="w-4 h-4 text-[#C5A059]" />
            <span>Add Event to Calendar (.ics)</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
