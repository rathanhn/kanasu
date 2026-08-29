import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OpeningScreen({ onEnterHome }) {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between px-6 py-12 bg-[#121110] text-[#FDFBF7] overflow-hidden select-none">
      {/* Ambient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3E2723]/30 via-[#1A1816] to-[#121110] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />

      {/* Hero Typography & Logo Section */}
      <div className="z-10 flex flex-col items-center text-center my-auto py-8 max-w-xl w-full">
        {/* Horizontal Carved Gold Logo Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="w-full flex justify-center mb-6"
        >
          <img 
            src="/logo_transparent.png" 
            alt="ಕನಸು · KANASU Housewarming Logo" 
            className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto object-contain drop-shadow-[0_10px_35px_rgba(197,160,89,0.35)] filter brightness-110"
          />
        </motion.div>

        {/* Location Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col items-center mb-8"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-[#C5A059] font-mono font-medium">
            Bylakuppe, Karnataka
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg sm:text-xl font-serif-title italic text-[#D4C9BC] max-w-xs sm:max-w-md font-light leading-relaxed mb-10"
        >
          “A dream becomes a home.”
        </motion.p>

        {/* CTA Button: Enter Our Home → */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-full flex justify-center"
        >
          <button
            onClick={onEnterHome}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#C86D51] to-[#A8533B] text-[#FDFBF7] font-medium tracking-wide text-base shadow-[0_10px_30px_rgba(200,109,81,0.35)] hover:shadow-[0_15px_40px_rgba(200,109,81,0.5)] transition-all duration-300 transform active:scale-95 flex items-center gap-3 border border-[#FDFBF7]/20"
          >
            <span>Enter Our Home</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300 text-[#FDFBF7]" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
