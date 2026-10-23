import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, MessageSquare, Share2, Sparkles } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, eventDetails }) {
  const [copied, setCopied] = useState(false);
  const [guestRecipientName, setGuestRecipientName] = useState('');

  if (!isOpen) return null;

  const currentUrl = window.location.href;
  const personalizedGreeting = guestRecipientName.trim() 
    ? `Dear ${guestRecipientName.trim()},\n\n` 
    : '';

  const shareText = `${personalizedGreeting}*ಗೃಹ ಪ್ರವೇಶ ಆಹ್ವಾನ · GRIHA PRAVESH INVITATION*\n\n"A dream has become a home."\n\nWith the blessings of our elders and the love of our family, we warmly invite you to celebrate the Griha Pravesh of our new home:\n\n*ಕನಸು (KANASU)*\n📅 Date: ${eventDetails.date}\n⏰ Muhurtham: ${eventDetails.time}\n\n📍 Address:\nHouse No. 507/10, Site No. 10, Kanushi Layout, Bylakuppe, Haranahalli Hobli, Mysuru District, Karnataka – 571104\n\n🗺️ Google Maps Location:\n${eventDetails.mapUrl || 'https://maps.app.goo.gl/c3TQwAhQYXHszE5u5'}\n\n📞 Contact: +91 ${eventDetails.contactPhone || '7899359217'}\n\nExperience our digital housewarming invitation here:\n${currentUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-md glass-panel rounded-3xl p-6 border border-[#C5A059]/40 shadow-2xl relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full glass-card-light text-[#9E9182] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Share2 className="w-5 h-5 text-[#C5A059]" />
            <h3 className="text-xl font-serif-title font-bold text-[#FDFBF7]">
              Share Invitation
            </h3>
          </div>
          <p className="text-xs text-[#D4C9BC] font-mono mb-5">
            Send this digital experience directly via WhatsApp or link
          </p>

          {/* Recipient Personalization Input */}
          <div className="mb-4">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9E9182] mb-1">
              Personalize for Guest (Optional)
            </label>
            <input
              type="text"
              value={guestRecipientName}
              onChange={(e) => setGuestRecipientName(e.target.value)}
              placeholder="e.g. Ramesh Uncle & Family"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#C5A059]/30 text-[#FDFBF7] placeholder-[#9E9182]/50 text-xs font-medium focus:outline-none focus:border-[#C86D51]"
            />
          </div>

          {/* Preview Box */}
          <div className="p-3.5 rounded-2xl bg-[#121110] border border-white/10 text-left text-xs font-mono text-[#D4C9BC] max-h-36 overflow-y-auto mb-5 leading-relaxed whitespace-pre-wrap">
            {shareText}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={handleWhatsAppShare}
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all active:scale-98 shadow-lg"
            >
              <MessageSquare className="w-4 h-4 fill-black text-black" />
              <span>Share on WhatsApp</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full py-3 px-4 rounded-xl glass-card-light text-[#D4C9BC] hover:text-white border border-[#C5A059]/30 text-xs font-medium flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#C5A059]" />}
              <span>{copied ? 'Invitation Text & Link Copied!' : 'Copy Invitation Link'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
