import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check, MessageSquare, ChevronDown, Sparkles, Send, Share2, Link as LinkIcon, User } from 'lucide-react';
import { HOST_CONTACTS } from './RsvpSection';

export default function SharePage({ onBackToInvitation, eventDetails }) {
  const [selectedHostIndex, setSelectedHostIndex] = useState(0);
  const [recipientName, setRecipientName] = useState('');
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const selectedHost = HOST_CONTACTS[selectedHostIndex] || HOST_CONTACTS[0];

  // Base URL for digital invitation (strips /share if present)
  const invitationUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/`
    : 'https://kanasu-invitation.web.app/';

  const personalizedGreeting = recipientName.trim()
    ? `Dear ${recipientName.trim()},\n\n`
    : '';

  // Exact template requested by user
  const invitationMessage = `${personalizedGreeting}*ಗೃಹ ಪ್ರವೇಶ ಆಹ್ವಾನ | GRIHA PRAVESH INVITATION*
"A dream has become a home."

We are delighted to invite you to celebrate the Griha Pravesh of our new home.

*ಕನಸು (KANASU)*
Date: Sunday, 15th November 2026
Muhurtham: 9:00 AM onwards
Exact Muhurtham: 9:33 AM

Address:
House No. 507/10, Site No. 10, Kanushi Layout, Bylakuppe, Haranahalli Hobli, Mysuru District, Karnataka – 571104

Google Maps Location:
https://maps.app.goo.gl/c3TQwAhQYXHszE5u5

Contact: +91 ${selectedHost.phone} (${selectedHost.name})

Digital Invitation:
${invitationUrl}`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(invitationMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleCopyLinkOnly = () => {
    navigator.clipboard.writeText(invitationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(invitationMessage)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#FDFBF7] p-4 sm:p-6 md:p-8 relative flex flex-col justify-between">
      {/* Soft Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3E2723]/30 via-[#1A1816] to-[#121110] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto w-full space-y-6">
        
        {/* Navigation & Header */}
        <header className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToInvitation}
              className="p-2.5 rounded-xl glass-card-light text-[#D4C9BC] hover:text-white border border-[#C5A059]/30 transition-colors"
              title="Return to Invitation"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif-title font-bold text-[#FDFBF7] flex items-center gap-2">
                <span>Share Invitation</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                  WhatsApp Ready
                </span>
              </h1>
              <p className="text-xs text-[#9E9182] font-mono mt-0.5">
                ಕನಸು (KANASU) Griha Pravesh · 15th November 2026
              </p>
            </div>
          </div>

          <button
            onClick={onBackToInvitation}
            className="hidden sm:flex text-xs text-[#9E9182] hover:text-[#C5A059] items-center gap-1.5 font-mono transition-colors"
          >
            <span>View Home</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
          </button>
        </header>

        {/* Configuration Controls Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-3xl p-5 sm:p-6 border border-[#C5A059]/30 shadow-2xl space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Host Dropdown Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#9E9182] mb-1.5">
                Contact Person (Dropdown):
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
              <p className="text-[11px] text-[#9E9182] font-mono mt-1">
                Autofetches +91 {selectedHost.phone} for the template
              </p>
            </div>

            {/* Recipient Personalization Input */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#9E9182] mb-1.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Guest Name (Optional):</span>
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. Ramesh Uncle & Family"
                className="w-full px-4 py-3 rounded-xl bg-[#121110] border border-[#C5A059]/40 text-[#FDFBF7] text-xs font-medium placeholder-[#9E9182]/50 focus:outline-none focus:border-[#C86D51]"
              />
              <p className="text-[11px] text-[#9E9182] font-mono mt-1">
                Adds "Dear [Name]" greeting at the top
              </p>
            </div>
          </div>
        </motion.div>

        {/* Live Message Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-3xl p-5 sm:p-6 border border-white/10 shadow-2xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C5A059] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Invitation Message Preview</span>
            </span>
            <span className="text-[11px] font-mono text-[#9E9182]">
              Contact: {selectedHost.name} (+91 {selectedHost.phone})
            </span>
          </div>

          {/* Formatted Message Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#121110] border border-[#C5A059]/20 text-xs sm:text-sm font-mono text-[#D4C9BC] whitespace-pre-wrap leading-relaxed shadow-inner max-h-[380px] overflow-y-auto selection:bg-[#C86D51] selection:text-white">
            {invitationMessage}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Primary WhatsApp Share Button */}
            <button
              onClick={handleWhatsAppShare}
              className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all active:scale-98"
            >
              <MessageSquare className="w-5 h-5 fill-black text-black" />
              <span>Share via WhatsApp</span>
            </button>

            {/* Copy Full Message Button */}
            <button
              onClick={handleCopyText}
              className="w-full py-4 px-6 rounded-2xl glass-card-light text-[#FDFBF7] hover:bg-white/10 border border-[#C5A059]/40 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              {copiedText ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Message Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#C5A059]" />
                  <span>Copy Full Message</span>
                </>
              )}
            </button>
          </div>

          {/* Link Only Shortcut */}
          <div className="pt-1 flex items-center justify-between text-xs font-mono text-[#9E9182] px-1">
            <span>Website Link: {invitationUrl}</span>
            <button
              onClick={handleCopyLinkOnly}
              className="text-[#C5A059] hover:underline flex items-center gap-1"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <LinkIcon className="w-3 h-3" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link Only'}</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-xs text-[#9E9182] font-mono">
        <button
          onClick={onBackToInvitation}
          className="hover:text-[#C5A059] transition-colors"
        >
          ← Return to KANASU (ಕನಸು) Digital Invitation
        </button>
      </footer>
    </div>
  );
}
