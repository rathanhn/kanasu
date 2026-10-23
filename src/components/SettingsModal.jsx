import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RotateCcw, Settings, Calendar, Clock, MapPin, Users, Phone, Map } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, eventDetails, onSaveDetails, onResetDetails }) {
  const [formData, setFormData] = useState(eventDetails);

  useEffect(() => {
    if (eventDetails) {
      setFormData(eventDetails);
    }
  }, [eventDetails, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveDetails(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-md glass-panel rounded-3xl p-6 border border-[#C5A059]/40 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full glass-card-light text-[#9E9182] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Settings className="w-5 h-5 text-[#C5A059]" />
            <h3 className="text-xl font-serif-title font-bold text-[#FDFBF7]">
              Customize Event Details
            </h3>
          </div>
          <p className="text-xs text-[#D4C9BC] font-mono mb-5">
            Update Date, Time, Venue, and Host details dynamically
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Event Display Date */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9E9182] mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" /> Display Date *
              </label>
              <input
                type="text"
                value={formData.date || ''}
                onChange={(e) => handleChange('date', e.target.value)}
                placeholder="e.g. Sunday, 15th November 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#C5A059]/30 text-[#FDFBF7] text-xs font-medium focus:outline-none focus:border-[#C86D51]"
                required
              />
            </div>

            {/* ISO Target Date for Countdown */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9E9182] mb-1">
                Countdown Date (YYYY-MM-DD) *
              </label>
              <input
                type="date"
                value={formData.isoDate || ''}
                onChange={(e) => handleChange('isoDate', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#C5A059]/30 text-[#FDFBF7] text-xs font-medium focus:outline-none focus:border-[#C86D51]"
                required
              />
            </div>

            {/* Event Display Time */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9E9182] mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" /> Display Time *
              </label>
              <input
                type="text"
                value={formData.time || ''}
                onChange={(e) => handleChange('time', e.target.value)}
                placeholder="e.g. 9:00 AM onwards (Muhurtham: 09:33 AM)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#C5A059]/30 text-[#FDFBF7] text-xs font-medium focus:outline-none focus:border-[#C86D51]"
                required
              />
            </div>

            {/* Venue / House Name */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9E9182] mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C86D51]" /> Venue Name
              </label>
              <input
                type="text"
                value={formData.venueName || ''}
                onChange={(e) => handleChange('venueName', e.target.value)}
                placeholder="e.g. KANASU (ಕನಸು)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#C5A059]/30 text-[#FDFBF7] text-xs font-medium focus:outline-none focus:border-[#C86D51]"
              />
            </div>

            {/* Full Address */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9E9182] mb-1">
                Full Address
              </label>
              <textarea
                rows={3}
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="House No. 507/10, Site No. 10, Kanushi Layout, Bylakuppe..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#C5A059]/30 text-[#FDFBF7] text-xs font-medium focus:outline-none focus:border-[#C86D51] resize-none"
              />
            </div>

            {/* Landmark */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9E9182] mb-1">
                Landmark
              </label>
              <input
                type="text"
                value={formData.landmark || ''}
                onChange={(e) => handleChange('landmark', e.target.value)}
                placeholder="e.g. Kanushi Layout, Bylakuppe (Haranahalli Hobli)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#C5A059]/30 text-[#FDFBF7] text-xs font-medium focus:outline-none focus:border-[#C86D51]"
              />
            </div>

            {/* Host Family Name */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9E9182] mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#C5A059]" /> Host Family Name
              </label>
              <input
                type="text"
                value={formData.hostNames || ''}
                onChange={(e) => handleChange('hostNames', e.target.value)}
                placeholder="e.g. The Family of ಕನಸು (KANASU)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#C5A059]/30 text-[#FDFBF7] text-xs font-medium focus:outline-none focus:border-[#C86D51]"
              />
            </div>

            {/* Host Contact Phone */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9E9182] mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" /> Contact Phone Number
              </label>
              <input
                type="tel"
                value={formData.contactPhone || ''}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                placeholder="e.g. 7899359217"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#C5A059]/30 text-[#FDFBF7] text-xs font-medium focus:outline-none focus:border-[#C86D51]"
              />
            </div>

            {/* Custom Google Maps URL */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9E9182] mb-1 flex items-center gap-1">
                <Map className="w-3.5 h-3.5 text-[#C5A059]" /> Google Maps Directions URL
              </label>
              <input
                type="url"
                value={formData.mapUrl || ''}
                onChange={(e) => handleChange('mapUrl', e.target.value)}
                placeholder="https://maps.app.goo.gl/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#C5A059]/30 text-[#FDFBF7] text-xs font-medium focus:outline-none focus:border-[#C86D51]"
              />
            </div>

            {/* Submit & Reset Buttons */}
            <div className="pt-3 flex gap-2">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#C86D51] to-[#A8533B] text-white font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg active:scale-98"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onResetDetails();
                  onClose();
                }}
                className="py-3 px-3 rounded-xl glass-card-light text-[#9E9182] hover:text-white border border-[#C5A059]/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Reset to Defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
