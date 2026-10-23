import React, { useState, useEffect } from 'react';
import { ArrowRight, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { ambientAudio } from '../utils/audioSystem';

export default function OpeningScreen({ onEnterHome }) {
  const [isPlaying, setIsPlaying] = useState(ambientAudio.isPlaying);

  useEffect(() => {
    const unsub = ambientAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsub;
  }, []);

  const handleEnter = () => {
    ambientAudio.start();
    onEnterHome();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between px-6 py-12 bg-[#121110] text-[#FDFBF7] overflow-hidden select-none">
      {/* Top Music Control Pill */}
      <button
        onClick={() => ambientAudio.toggle()}
        className={`absolute top-5 right-5 z-30 px-3 py-1.5 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 transition-all glass-panel border border-[#C5A059]/40 ${
          isPlaying ? 'bg-[#C5A059]/20 text-[#C5A059] animate-pulse' : 'bg-white/10 text-[#D4C9BC] hover:bg-white/20'
        }`}
        title="Background Music"
      >
        <Music className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>{isPlaying ? '♫ Music On' : '♫ Music: Tap to Play'}</span>
      </button>

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
          <picture className="w-full flex justify-center">
            <source srcSet="/logo_transparent.webp" type="image/webp" />
            <img 
              src="/logo_transparent.png" 
              alt="ಕನಸು · KANASU Housewarming Logo" 
              width="1672"
              height="941"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto object-contain drop-shadow-[0_10px_35px_rgba(197,160,89,0.35)] filter brightness-110"
            />
          </picture>
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
            onClick={handleEnter}
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
