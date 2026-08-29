import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function StorySection() {
  return (
    <section id="story" className="relative w-full flex flex-col items-center justify-center px-4 py-12 sm:py-16 bg-[#121110] text-[#FDFBF7] overflow-hidden">
      {/* Background Image Parallax Overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img 
          src="/IImage.png" 
          alt="Original Kanasu Property Background" 
          className="w-full h-full object-cover filter contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121110] via-[#121110]/85 to-[#121110]" />
      </div>

      <div className="z-10 max-w-lg w-full flex flex-col items-center text-center">
        {/* Top Kannada Headline Moment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex flex-col items-center"
        >
          <span className="text-xl sm:text-2xl font-kannada font-semibold text-[#C86D51]">
            ಒಂದು ಕನಸು...
          </span>
          <span className="text-xs font-serif-title italic text-[#9E9182] mt-1 tracking-wider">
            A dream...
          </span>
        </motion.div>

        {/* Large Identity Typography */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-6xl sm:text-7xl font-kannada font-black text-[#FDFBF7] tracking-normal mb-2 mt-2 leading-relaxed"
        >
          ಕನಸು
        </motion.h2>

        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg font-cinzel tracking-[0.4em] text-[#C5A059] font-bold uppercase mb-10"
        >
          KANASU
        </motion.span>

        {/* Story Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full glass-panel rounded-2xl p-6 sm:p-8 border border-[#C5A059]/20 shadow-2xl relative"
        >
          {/* Main Story Header */}
          <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#FDFBF7] mb-6 leading-tight">
            Every home begins with a dream.
          </h3>

          <div className="h-[1px] w-16 bg-[#C5A059]/40 mx-auto mb-6" />

          {/* Story Verse lines */}
          <div className="space-y-4 text-base sm:text-lg font-serif-title text-[#D4C9BC] font-light leading-relaxed">
            <p>A thought.</p>
            <p>A hope.</p>
            <p className="text-[#C5A059] font-medium">A dream.</p>
            <p className="pt-2 text-sm sm:text-base leading-relaxed text-[#D4C9BC]">
              And one day, that dream gets walls, windows, a door…
            </p>
            <p className="text-xl sm:text-2xl font-serif-title font-semibold text-[#FDFBF7] italic pt-1">
              and becomes home.
            </p>
          </div>
        </motion.div>

        {/* Ending Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-10 flex flex-col items-center gap-1"
        >
          <span className="text-4xl font-kannada font-bold text-[#FDFBF7]">
            ಕನಸು
          </span>
          <p className="text-base font-serif-title italic text-[#C5A059] flex items-center gap-1.5">
            Our dream, now our home. <Heart className="w-4 h-4 text-[#C86D51] fill-[#C86D51]" />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
