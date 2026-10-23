import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, UserCheck, Users, CheckCircle2, RefreshCw, MessageSquare, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitRsvpToFirebase } from '../utils/firebase';

export const HOST_CONTACTS = [
  { name: 'Rashmi', phone: '9945626865' },
  { name: 'Ramya', phone: '7892613750' },
  { name: 'Rathan', phone: '7899359217' },
];

export default function RsvpSection({ eventDetails }) {
  const [name, setName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [status, setStatus] = useState(null); // 'yes', 'maybe', 'no'
  const [submitted, setSubmitted] = useState(false);
  const [selectedHostIndex, setSelectedHostIndex] = useState(0);

  const selectedHost = HOST_CONTACTS[selectedHostIndex] || HOST_CONTACTS[0];

  useEffect(() => {
    const savedRSVP = localStorage.getItem('kanasu_rsvp_data');
    if (savedRSVP) {
      try {
        const parsed = JSON.parse(savedRSVP);
        // Wipe any test data left from testing
        const lowerName = (parsed.name || '').toLowerCase();
        if (lowerName.includes('test') || lowerName.includes('anand') || !parsed.name) {
          localStorage.removeItem('kanasu_rsvp_data');
          return;
        }
        setName(parsed.name || '');
        setGuestCount(parsed.guestCount || 1);
        setStatus(parsed.status || null);
        if (parsed.selectedHostIndex !== undefined) {
          setSelectedHostIndex(Number(parsed.selectedHostIndex) || 0);
        }
        setSubmitted(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C86D51', '#C5A059', '#FDFBF7', '#D4AF37'],
    });
  };

  const handleRSVP = (responseStatus) => {
    if (!name.trim()) {
      alert('Please enter your name so we can record your response.');
      return;
    }

    setStatus(responseStatus);
    setSubmitted(true);

    const rsvpData = {
      name: name.trim(),
      guestCount,
      status: responseStatus,
      sentToHost: selectedHost.name,
      sentToPhone: selectedHost.phone,
      selectedHostIndex,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('kanasu_rsvp_data', JSON.stringify(rsvpData));

    // Submit directly to Firebase Firestore
    submitRsvpToFirebase(rsvpData);

    if (responseStatus === 'yes') {
      triggerConfetti();
    }
  };

  const handleResetRSVP = () => {
    setSubmitted(false);
    setName('');
    setGuestCount(1);
    setStatus(null);
    localStorage.removeItem('kanasu_rsvp_data');
  };

  // Construct message cleanly with guest name (fetches selected host's phone on send)
  const guestDisplay = name.trim() ? ` from ${name.trim()}` : '';
  const partyDisplay = guestCount > 1 ? ` (${guestCount} attendees)` : '';
  const statusDisplay = status === 'yes' ? 'Attending' : 'Tentative';
  const whatsappRsvpMessage = encodeURIComponent(
    `Namaste ${selectedHost.name}!\nI am confirming my RSVP${guestDisplay}${partyDisplay} - ${statusDisplay} for the KANASU Griha Pravesh on 15th November 2026. Looking forward to being there!`
  );

  return (
    <section id="rsvp" className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 bg-[#121110] text-[#FDFBF7] overflow-hidden">
      {/* Background Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#3E2723]/30 via-[#1A1816] to-[#121110]" />

      <div className="z-10 max-w-lg w-full flex flex-col items-center text-center">
        
        {/* Kannada Primary Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-1"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-kannada font-black text-[#FDFBF7] mb-1 flex items-center justify-center gap-2">
            ಬರ್ತೀರಾ? <Heart className="w-8 h-8 text-[#C86D51] fill-[#C86D51] inline-block animate-pulse" />
          </h2>
          <span className="text-lg sm:text-xl font-cinzel tracking-[0.3em] text-[#C5A059] font-bold uppercase block mb-8">
            Will you join us?
          </span>
        </motion.div>

        {/* Form or Confirmation Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="w-full glass-panel rounded-3xl p-6 sm:p-10 border border-[#C5A059]/30 shadow-2xl gold-border-glow"
        >
          {!submitted ? (
            <div className="space-y-6 text-left">
              {/* Guest Name Input */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#9E9182] mb-2">
                  Your Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#121110] border border-[#C5A059]/40 text-[#FDFBF7] placeholder-[#9E9182]/60 focus:outline-none focus:border-[#C86D51] text-sm font-medium transition-colors"
                  />
                  <UserCheck className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9182]" />
                </div>
              </div>

              {/* Number of Guests Counter */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#9E9182] mb-2">
                  Number of Attendees
                </label>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#121110] border border-[#C5A059]/40">
                  <span className="text-xs text-[#D4C9BC] font-medium pl-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#C5A059]" /> Total Guests:
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold text-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold font-mono text-[#FDFBF7] w-6 text-center">
                      {guestCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                      className="w-8 h-8 rounded-lg bg-[#C5A059] text-[#121110] font-bold text-lg flex items-center justify-center hover:bg-[#d4b46c] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Choose Host Contact Dropdown - Names only */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#9E9182] mb-2">
                  Send Confirmation To:
                </label>
                <div className="relative">
                  <select
                    value={selectedHostIndex}
                    onChange={(e) => setSelectedHostIndex(Number(e.target.value))}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#121110] border border-[#C5A059]/40 text-[#FDFBF7] text-sm font-sans font-medium focus:outline-none focus:border-[#C86D51] appearance-none cursor-pointer pr-10"
                  >
                    {HOST_CONTACTS.map((host, idx) => (
                      <option key={host.name} value={idx} className="bg-[#1A1816] text-[#FDFBF7] py-1">
                        {host.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059] pointer-events-none" />
                </div>
              </div>

              {/* Response Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleRSVP('yes')}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#C86D51] to-[#A8533B] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Yes, I'll Be There</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRSVP('maybe')}
                  className="w-full py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-[#FDFBF7] border border-[#C5A059]/40 text-sm font-medium transition-all active:scale-98"
                >
                  I'll Let You Know
                </button>
              </div>
            </div>
          ) : (
            /* Confirmation State */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-4 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#C86D51]/20 border border-[#C86D51] text-[#C86D51] flex items-center justify-center shadow-2xl">
                <CheckCircle2 className="w-8 h-8 text-[#C86D51]" />
              </div>

              {/* Kannada Thank You: ಸಂತೋಷ! */}
              <h3 className="text-4xl sm:text-5xl font-kannada font-black text-[#FDFBF7] mt-2 flex items-center justify-center gap-2">
                <span>ಸಂತೋಷ!</span>
                <Heart className="w-8 h-8 text-[#C86D51] fill-[#C86D51] inline-block" />
              </h3>

              <p className="text-lg font-serif-title italic text-[#C5A059] max-w-xs">
                We can't wait to welcome you to ಕನಸು.
              </p>

              {/* Summary Badge */}
              <div className="w-full p-4 rounded-2xl bg-[#121110]/90 border border-white/10 text-left text-xs font-mono space-y-1.5 mt-2">
                <div className="flex justify-between text-[#9E9182]">
                  <span>Guest Name:</span>
                  <span className="text-[#FDFBF7] font-semibold">{name}</span>
                </div>
                <div className="flex justify-between text-[#9E9182]">
                  <span>Party Count:</span>
                  <span className="text-[#FDFBF7] font-semibold">{guestCount} Guest(s)</span>
                </div>
                <div className="flex justify-between text-[#9E9182]">
                  <span>RSVP Status:</span>
                  <span className="text-[#C86D51] font-semibold uppercase flex items-center gap-1">
                    <span>{status === 'yes' ? 'Attending' : 'Tentative'}</span>
                    {status === 'yes' && <Heart className="w-3.5 h-3.5 fill-[#C86D51]" />}
                  </span>
                </div>
              </div>

              {/* Send Confirm Message Section - Dropdown with names only */}
              <div className="w-full pt-3 space-y-3 text-left border-t border-white/10">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9E9182] mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Send confirmation message to:</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedHostIndex}
                      onChange={(e) => setSelectedHostIndex(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-[#121110] border border-[#C5A059]/40 text-[#FDFBF7] text-sm font-sans font-medium focus:outline-none focus:border-[#C86D51] appearance-none cursor-pointer pr-10"
                    >
                      {HOST_CONTACTS.map((host, idx) => (
                        <option key={host.name} value={idx} className="bg-[#1A1816] text-[#FDFBF7] py-1">
                          {host.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059] pointer-events-none" />
                  </div>
                </div>

                {/* Dynamic WhatsApp Send Button - Number fetched while sending */}
                <a
                  href={`https://wa.me/91${selectedHost.phone}?text=${whatsappRsvpMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                >
                  <MessageSquare className="w-4 h-4 fill-black text-black" />
                  <span>Send Confirmation to {selectedHost.name} on WhatsApp</span>
                </a>
              </div>

              {/* Edit Response Option */}
              <button
                onClick={handleResetRSVP}
                className="text-xs text-[#9E9182] hover:text-[#C5A059] flex items-center gap-1.5 font-mono pt-2 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Change my response
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
