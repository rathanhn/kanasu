import React, { useState, useEffect } from 'react';
import OpeningScreen from './components/OpeningScreen';
import DoorExperience from './components/DoorExperience';
import HouseReveal from './components/HouseReveal';
import StorySection from './components/StorySection';
import InvitationSection from './components/InvitationSection';
import CountdownSection from './components/CountdownSection';
import LocationSection from './components/LocationSection';
import RsvpSection from './components/RsvpSection';
import FinalReveal from './components/FinalReveal';
import FloatingNav from './components/FloatingNav';
import ShareModal from './components/ShareModal';
import SettingsModal from './components/SettingsModal';

const DEFAULT_EVENT_DETAILS = {
  date: 'Sunday, October 18, 2026',
  isoDate: '2026-10-18',
  time: '9:30 AM IST (Muhurtham 9:45 AM - 10:30 AM)',
  venueName: 'ಕನಸು (KANASU) House',
  location: 'Bylakuppe, Karnataka',
  hostNames: 'The Family of ಕನಸು (KANASU)',
  mapUrl: 'https://maps.google.com/?q=Bylakuppe,Karnataka',
};

export default function App() {
  // Navigation Flow State: 'opening' -> 'door' -> 'main'
  const [stage, setStage] = useState('opening'); 
  const [activeSection, setActiveSection] = useState('opening');
  
  // Modals
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Dynamic Event Details State
  const [eventDetails, setEventDetails] = useState(() => {
    const saved = localStorage.getItem('kanasu_event_details');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_EVENT_DETAILS;
  });

  const saveEventDetails = (newDetails) => {
    setEventDetails(newDetails);
    localStorage.setItem('kanasu_event_details', JSON.stringify(newDetails));
  };

  const resetEventDetails = () => {
    setEventDetails(DEFAULT_EVENT_DETAILS);
    localStorage.removeItem('kanasu_event_details');
  };

  const handleEnterHome = () => {
    setStage('door');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDoorOpened = () => {
    setStage('main');
    setActiveSection('invitation');
    setTimeout(() => {
      const el = document.getElementById('house-reveal');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNavigate = (targetSection) => {
    if (stage !== 'main') {
      setStage('main');
    }
    setActiveSection(targetSection);
    
    setTimeout(() => {
      if (targetSection === 'opening') {
        setStage('opening');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 50);
  };

  useEffect(() => {
    if (stage !== 'main') return;

    const sections = ['house-reveal', 'story', 'invitation', 'location', 'rsvp'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stage]);

  return (
    <div className="min-h-screen bg-[#121110] text-[#FDFBF7] font-sans relative selection:bg-[#C86D51] selection:text-white">
      {/* 01 — Opening Screen */}
      {stage === 'opening' && (
        <OpeningScreen onEnterHome={handleEnterHome} />
      )}

      {/* 02 — Door Opening Experience */}
      {stage === 'door' && (
        <DoorExperience onDoorOpened={handleDoorOpened} />
      )}

      {/* Main Continuous House Experience */}
      {stage === 'main' && (
        <main className="relative w-full overflow-hidden pb-20">
          {/* 03 — House Reveal */}
          <HouseReveal />

          {/* 04 — Story of ಕನಸು */}
          <StorySection />

          {/* 05 — The Invitation */}
          <InvitationSection 
            eventDetails={eventDetails} 
            onOpenSettings={() => setIsSettingsOpen(true)} 
          />

          {/* 07 — Countdown Timer */}
          <CountdownSection eventIsoDate={eventDetails.isoDate} />

          {/* 08 — Location Section */}
          <LocationSection eventDetails={eventDetails} />

          {/* 09 — RSVP Section */}
          <RsvpSection />

          {/* 10 — Final Reveal */}
          <FinalReveal />
        </main>
      )}

      {/* Minimal Floating Navigation Bar */}
      <FloatingNav
        activeSection={stage === 'opening' ? 'opening' : activeSection}
        onNavigate={handleNavigate}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        eventDetails={eventDetails}
      />

      {/* Settings / Customizer Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        eventDetails={eventDetails}
        onSaveDetails={saveEventDetails}
        onResetDetails={resetEventDetails}
      />
    </div>
  );
}
