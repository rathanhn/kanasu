import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin } from 'lucide-react';

export default function FinalReveal() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between px-6 py-16 bg-[#121110] text-[#FDFBF7] overflow-hidden select-none">
      {/* Background Property Photography */}
      <div className="absolute inset-0 z-0">
        <picture className="w-full h-full">
          <source srcSet="/IImage.webp" type="image/webp" />
          <img 
            src="/IImage.png" 
            alt="Original Kanasu Property Silhouette" 
            width="1200"
            height="675"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-40 filter contrast-125"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/75 to-[#121110]/90" />
      </div>

      {/* Center Emotional Lockup */}
      <div className="z-10 max-w-lg w-full flex flex-col items-center text-center my-auto py-8">
        
        {/* Horizontal Gold Logo Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="w-full flex justify-center mb-8"
        >
          <picture className="w-full flex justify-center">
            <source srcSet="/logo_transparent.webp" type="image/webp" />
            <img 
              src="/logo_transparent.png" 
              alt="ಕನಸು · KANASU Logo" 
              width="800"
              height="450"
              loading="lazy"
              decoding="async"
              className="w-full max-w-sm sm:max-w-md h-auto object-contain drop-shadow-[0_10px_35px_rgba(197,160,89,0.35)] filter brightness-110"
            />
          </picture>
        </motion.div>

        {/* Story Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="space-y-2 mb-8 font-serif-title"
        >
          <p className="text-xl sm:text-2xl text-[#D4C9BC] font-light leading-relaxed">
            Every home has a story.
          </p>
          <p className="text-2xl sm:text-3xl text-[#FDFBF7] font-semibold italic">
            Ours begins here.
          </p>
        </motion.div>

        <div className="h-[1px] w-20 bg-[#C5A059]/40 mx-auto mb-8" />

        {/* Main Welcome Invitation Line */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="space-y-2"
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-kannada font-bold text-[#FDFBF7] flex items-center justify-center gap-2">
            ನಮ್ಮ ಕನಸಿಗೆ ನಿಮಗೆ ಸ್ವಾಗತ <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#C86D51] fill-[#C86D51] inline-block" />
          </h3>
          <p className="text-sm sm:text-base font-serif-title italic text-[#C5A059]">
            Welcome to our dream.
          </p>
        </motion.div>

        {/* Location Tag */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex items-center gap-1.5 text-xs text-[#9E9182] font-mono"
        >
          <MapPin className="w-3.5 h-3.5 text-[#C86D51]" />
          <span>Bylakuppe</span>
        </motion.div>
      </div>

      {/* Footer Cultural Farewell Note: ಮತ್ತೆ ಬನ್ನಿ */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
        className="z-10 pb-4 text-center flex items-center justify-center gap-2"
      >
        <span className="text-2xl font-kannada font-bold text-[#C5A059]">
          ಮತ್ತೆ ಬನ್ನಿ
        </span>
        <Heart className="w-5 h-5 text-[#C86D51] fill-[#C86D51] inline-block" />
      </motion.div>
    </section>
  );
}
