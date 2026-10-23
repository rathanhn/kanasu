import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function CountdownSection({ eventIsoDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(eventIsoDate ? `${eventIsoDate}T09:33:00` : '2026-11-15T09:33:00');
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [eventIsoDate]);

  const padZero = (num) => String(num).padStart(2, '0');

  return (
    <section className="relative w-full py-20 px-4 bg-[#121110] text-[#FDFBF7] overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C86D51]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="z-10 max-w-xl mx-auto flex flex-col items-center text-center">
        {/* Kannada Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
          <h2 className="text-4xl sm:text-5xl font-kannada font-black text-[#FDFBF7] mb-1">
            ಇನ್ನೆಷ್ಟು ದಿನ?
          </h2>
          <p className="text-sm font-serif-title italic text-[#C5A059] flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Until we open our doors…
          </p>
        </motion.div>

        {/* Countdown Timer Display Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="w-full mt-8 p-6 sm:p-8 glass-panel rounded-3xl border border-[#C5A059]/30 shadow-2xl gold-border-glow"
        >
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {/* Days */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-[#121110]/90 border border-white/5">
              <span className="text-3xl sm:text-5xl font-mono font-bold text-[#FDFBF7] tracking-tight">
                {padZero(timeLeft.days)}
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-[#C5A059] mt-2">
                DAYS
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-[#121110]/90 border border-white/5">
              <span className="text-3xl sm:text-5xl font-mono font-bold text-[#FDFBF7] tracking-tight">
                {padZero(timeLeft.hours)}
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-[#C5A059] mt-2">
                HOURS
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-[#121110]/90 border border-white/5">
              <span className="text-3xl sm:text-5xl font-mono font-bold text-[#FDFBF7] tracking-tight">
                {padZero(timeLeft.minutes)}
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-[#C5A059] mt-2">
                MINUTES
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-[#121110]/90 border border-white/5">
              <span className="text-3xl sm:text-5xl font-mono font-bold text-[#C86D51] tracking-tight animate-pulse">
                {padZero(timeLeft.seconds)}
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-[#C86D51] mt-2">
                SECONDS
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
