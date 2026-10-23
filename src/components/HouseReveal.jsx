import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export default function HouseReveal() {
  return (
    <section id="house-reveal" className="relative w-full flex flex-col items-center justify-center px-4 py-12 bg-[#121110] text-[#FDFBF7] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121110] via-[#1A1816] to-[#121110]" />

      <div className="z-10 max-w-xl w-full flex flex-col items-center text-center">
        
        {/* Heading: ನಮ್ಮ ಕನಸು / OUR DREAM */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-kannada font-bold text-[#FDFBF7] mb-1"
        >
          ನಮ್ಮ ಕನಸು
        </motion.h2>

        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl font-cinzel tracking-[0.35em] text-[#C5A059] font-semibold uppercase mb-6"
        >
          OUR DREAM
        </motion.span>

        {/* Large House Photograph Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-full rounded-2xl overflow-hidden glass-panel p-2 sm:p-3 mb-6 gold-border-glow shadow-2xl"
        >
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden group">
            <picture className="w-full h-full">
              <source srcSet="/IImage.webp" type="image/webp" />
              <img 
                src="/IImage.png" 
                alt="Actual Property Photo of Kanasu in Bylakuppe" 
                width="1672"
                height="941"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </picture>
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-black/20" />
            
            {/* Location Tag Badge */}
            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-[#D4C9BC] flex items-center gap-1.5 font-mono">
              <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Bylakuppe, Karnataka</span>
            </div>
          </div>
        </motion.div>

        {/* Story Lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="space-y-3 mb-6 px-4"
        >
          <p className="text-xl sm:text-2xl font-serif-title text-[#FDFBF7] font-medium leading-relaxed">
            A dream we imagined.
          </p>
          <p className="text-xl sm:text-2xl font-serif-title text-[#C5A059] font-medium leading-relaxed">
            A home we built.
          </p>
          <p className="text-xl sm:text-2xl font-serif-title text-[#D4C9BC] font-medium leading-relaxed italic">
            A beginning we want to share with you.
          </p>
        </motion.div>

        {/* Identity Lockup - Larger Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-full max-w-md flex justify-center py-2"
        >
          <picture className="flex justify-center">
            <source srcSet="/logo_transparent.webp" type="image/webp" />
            <img 
              src="/logo_transparent.png" 
              alt="ಕನಸು · KANASU Logo" 
              width="1672"
              height="941"
              loading="lazy"
              decoding="async"
              className="w-64 sm:w-80 md:w-96 h-auto object-contain drop-shadow-[0_8px_30px_rgba(197,160,89,0.35)] filter brightness-110"
            />
          </picture>
        </motion.div>
      </div>
    </section>
  );
}
