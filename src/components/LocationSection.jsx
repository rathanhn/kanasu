import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Copy, Check, Car, Phone, MessageSquare } from 'lucide-react';

export default function LocationSection({ eventDetails }) {
  const [copied, setCopied] = useState(false);

  const googleMapsUrl = eventDetails?.mapUrl || 'https://maps.app.goo.gl/c3TQwAhQYXHszE5u5';
  const contactPhone = eventDetails?.contactPhone || '7899359217';

  const addressLines = [
    'House No. 507/10, Site No. 10',
    'Kanushi Layout, Bylakuppe',
    'Haranahalli Hobli, Mysuru District',
    'Karnataka – 571104, India'
  ];

  const fullAddress = eventDetails?.address || addressLines.join('\n');
  const landmark = eventDetails?.landmark || 'Kanushi Layout, Bylakuppe (Haranahalli Hobli)';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 bg-[#121110] text-[#FDFBF7] overflow-hidden">
      {/* Background Soft Lights */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121110] via-[#1A1816] to-[#121110]" />

      <div className="z-10 max-w-xl w-full flex flex-col items-center text-center">
        {/* Kannada Moment Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-1"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-kannada font-black text-[#FDFBF7] mb-1">
            ನಮ್ಮ ಮನೆಗೆ ಬನ್ನಿ
          </h2>
          <span className="text-lg sm:text-xl font-cinzel tracking-[0.35em] text-[#C5A059] font-bold uppercase block mb-8">
            COME HOME
          </span>
        </motion.div>

        {/* Identity & Location Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="w-full glass-panel rounded-3xl p-6 sm:p-8 border border-[#C5A059]/30 shadow-2xl gold-border-glow mb-8"
        >
          <div className="flex flex-col items-center mb-6">
            <span className="text-3xl font-kannada font-bold text-[#FDFBF7]">ಕನಸು</span>
            <span className="text-sm font-cinzel font-semibold tracking-widest text-[#C5A059] mt-0.5">KANASU</span>
            <span className="text-xs font-mono text-[#D4C9BC] mt-1">Bylakuppe, Karnataka</span>
          </div>

          {/* Interactive Map Visual Card */}
          <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-white/10 mb-6 group">
            <iframe
              title="Kanasu Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
              src="https://maps.google.com/maps?q=Kanushi+Layout,Bylakuppe,Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
            />
            {/* Map Custom Pin Overlay */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none flex items-center justify-center">
              <div className="px-4 py-2 rounded-full glass-panel border border-[#C86D51] text-[#FDFBF7] shadow-2xl flex items-center gap-2 animate-bounce">
                <MapPin className="w-5 h-5 text-[#C86D51] fill-[#C86D51]" />
                <span className="text-xs font-semibold font-serif-title">ಕನಸು (KANASU) Home</span>
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#121110]/90 border border-white/5 mb-6 text-left space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#C86D51] shrink-0 mt-1" />
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#9E9182] block mb-1">
                  Destination Address
                </span>
                <div className="text-sm font-medium text-[#FDFBF7] leading-relaxed space-y-0.5">
                  <p className="font-semibold text-[#FDFBF7]">House No. 507/10, Site No. 10</p>
                  <p className="text-[#D4C9BC]">Kanushi Layout, Bylakuppe</p>
                  <p className="text-[#D4C9BC]">Haranahalli Hobli, Mysuru District</p>
                  <p className="text-[#9E9182] text-xs">Karnataka – 571104, India</p>
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-white/5 my-2" />

            <div className="flex items-center gap-2 text-xs text-[#D4C9BC] font-mono">
              <Car className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>Landmark: <span className="text-[#FDFBF7]">{landmark}</span></span>
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Take Me There CTA */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C86D51] to-[#A8533B] text-white font-medium text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group active:scale-98"
            >
              <span>Take Me There</span>
              <Navigation className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Copy Address Button */}
            <button
              onClick={handleCopyAddress}
              className="py-3.5 px-6 rounded-xl glass-card-light text-[#D4C9BC] hover:text-white border border-[#C5A059]/30 text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#C5A059]" />}
              <span>{copied ? 'Address Copied!' : 'Copy Address'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
