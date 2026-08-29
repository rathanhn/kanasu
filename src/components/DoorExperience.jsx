import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound } from 'lucide-react';
import { ambientAudio } from '../utils/audioSystem';

export default function DoorExperience({ onDoorOpened }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDoor = () => {
    if (isOpen) return;
    setIsOpen(true);
    ambientAudio.playDoorChime();
    ambientAudio.start();

    // Trigger house reveal transition after door swing animation completes
    setTimeout(() => {
      onDoorOpened();
    }, 1900);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#121110] text-[#FDFBF7] overflow-hidden select-none px-4">
      {/* Background Light */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#3E2723] via-[#1A1816] to-[#121110] transition-opacity duration-1000 ${
          isOpen ? 'opacity-100' : 'opacity-80'
        }`} 
      />

      {/* Clean Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-20 mb-6 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-kannada text-[#FDFBF7] font-bold">
          ನಮ್ಮ ಮನೆಗೆ ಸ್ವಾಗತ
        </h2>
        <p className="text-sm font-serif-title italic text-[#D4C9BC] mt-1">
          Welcome to our home
        </p>
      </motion.div>

      {/* 3D Door Portal Frame Container */}
      <div className="z-20 relative w-full max-w-sm sm:max-w-md h-[460px] sm:h-[540px] rounded-t-full border-4 border-[#3E2723] bg-[#000] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden perspective-1000">
        
        {/* Glow Behind Door */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#C5A059]/40 via-[#FDFBF7]/20 to-transparent flex items-center justify-center overflow-hidden">
          <img 
            src="/IImage.png" 
            alt="Kanasu Property Preview" 
            className={`w-full h-full object-cover transition-transform duration-2000 ${isOpen ? 'scale-100 filter-none' : 'scale-110 blur-sm'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-black/40" />
        </div>

        {/* Door Left Leaf */}
        <div 
          onClick={handleOpenDoor}
          className={`absolute top-0 left-0 w-1/2 h-full z-10 door-left cursor-pointer border-r border-[#C5A059]/30 shadow-2xl overflow-hidden ${
            isOpen ? 'door-open-left' : ''
          }`}
        >
          <div className="relative w-full h-full bg-[#2A1B16] border-l-4 border-t-4 border-[#3E2723]">
            <img 
              src="/assets/front_door.jpg" 
              alt="Door Left" 
              className="absolute left-0 top-0 h-full w-[200%] max-w-none object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/60" />
            
            {/* Left Brass Handle */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20">
              <div className="w-4 h-16 sm:w-5 sm:h-20 rounded-full bg-gradient-to-b from-[#D4AF37] via-[#997A15] to-[#D4AF37] shadow-lg border border-yellow-200/50 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-black/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Door Right Leaf */}
        <div 
          onClick={handleOpenDoor}
          className={`absolute top-0 right-0 w-1/2 h-full z-10 door-right cursor-pointer border-l border-[#C5A059]/30 shadow-2xl overflow-hidden ${
            isOpen ? 'door-open-right' : ''
          }`}
        >
          <div className="relative w-full h-full bg-[#2A1B16] border-r-4 border-t-4 border-[#3E2723]">
            <img 
              src="/assets/front_door.jpg" 
              alt="Door Right" 
              className="absolute right-0 top-0 h-full w-[200%] max-w-none object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/60" />

            {/* Right Brass Handle */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20">
              <div className="w-4 h-16 sm:w-5 sm:h-20 rounded-full bg-gradient-to-b from-[#D4AF37] via-[#997A15] to-[#D4AF37] shadow-lg border border-yellow-200/50 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-black/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Center Key Icon Only (No text) */}
        {!isOpen && (
          <div 
            onClick={handleOpenDoor}
            className="absolute z-30 inset-0 flex items-center justify-center cursor-pointer pointer-events-auto"
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-3.5 rounded-full bg-[#121110]/85 border border-[#C5A059] text-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.4)] backdrop-blur-sm"
              title="Tap key to open door"
            >
              <KeyRound className="w-7 h-7 text-[#C5A059]" />
            </motion.div>
          </div>
        )}
      </div>

      {/* Door Open Status */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="z-30 mt-6 text-center"
          >
            <h3 className="text-2xl font-kannada font-bold text-[#C5A059]">
              ಸ್ವಾಗತ!
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
