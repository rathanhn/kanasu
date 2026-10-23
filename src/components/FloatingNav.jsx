import React, { useState, useEffect } from 'react';
import { Home, BookOpen, HeartHandshake, MapPin, CalendarCheck, Music, Settings } from 'lucide-react';
import { ambientAudio } from '../utils/audioSystem';

export default function FloatingNav({ activeSection, onNavigate, onOpenSettings }) {
  const [isPlaying, setIsPlaying] = useState(ambientAudio.isPlaying);

  useEffect(() => {
    const unsubscribe = ambientAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const toggleAudio = () => {
    ambientAudio.toggle();
  };

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md px-3 py-2.5 rounded-full glass-panel shadow-2xl flex items-center justify-between border border-[#C5A059]/30 transition-all duration-300">
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => onNavigate('opening')}
          className={`p-2 rounded-full transition-all ${
            activeSection === 'opening' ? 'bg-[#C86D51] text-white shadow-md' : 'text-[#D4C9BC] hover:text-white'
          }`}
          title="Home"
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={() => onNavigate('story')}
          className={`p-2 rounded-full transition-all ${
            activeSection === 'story' ? 'bg-[#C86D51] text-white shadow-md' : 'text-[#D4C9BC] hover:text-white'
          }`}
          title="Story"
        >
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={() => onNavigate('invitation')}
          className={`p-2 rounded-full transition-all ${
            activeSection === 'invitation' ? 'bg-[#C86D51] text-white shadow-md' : 'text-[#D4C9BC] hover:text-white'
          }`}
          title="Invitation"
        >
          <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={() => onNavigate('location')}
          className={`p-2 rounded-full transition-all ${
            activeSection === 'location' ? 'bg-[#C86D51] text-white shadow-md' : 'text-[#D4C9BC] hover:text-white'
          }`}
          title="Location"
        >
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={() => onNavigate('rsvp')}
          className={`p-2 rounded-full transition-all ${
            activeSection === 'rsvp' ? 'bg-[#C86D51] text-white shadow-md' : 'text-[#D4C9BC] hover:text-white'
          }`}
          title="RSVP"
        >
          <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="h-4 w-[1px] bg-[#C5A059]/30 mx-1"></div>

      <div className="flex items-center gap-1">
        <button
          onClick={toggleAudio}
          className={`px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
            isPlaying ? 'bg-[#C5A059] text-[#121110] font-semibold animate-pulse' : 'bg-white/10 text-[#D4C9BC] hover:bg-white/20'
          }`}
          title="Toggle Music"
        >
          <Music className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isPlaying ? '♫ Music On' : '♫ Music Off'}</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded-full text-[#9E9182] hover:text-[#C5A059] hover:bg-white/10 transition-all"
          title="Edit Details"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>
    </nav>
  );
}
