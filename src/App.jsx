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
import SettingsModal from './components/SettingsModal';
import AdminDashboard from './components/AdminDashboard';
import SharePage from './components/SharePage';
import { HOST_CONTACTS } from './components/RsvpSection';
import { trackPageVisit } from './utils/firebase';
import { ambientAudio } from './utils/audioSystem';

const DEFAULT_EVENT_DETAILS = {
  date: 'Sunday, 15th November 2026',
  isoDate: '2026-11-15',
  time: '9:00 AM onwards (Muhurtham: 09:33 AM)',
  venueName: 'KANASU (ಕನಸು)',
  address: 'House No. 507/10, Site No. 10, Kanushi Layout, Bylakuppe, Haranahalli Hobli, Mysuru District, Karnataka – 571104',
  landmark: 'Kanushi Layout, Bylakuppe (Haranahalli Hobli)',
  location: 'Bylakuppe, Mysuru District, Karnataka',
  hostNames: 'The Family of ಕನಸು (KANASU)',
  contactPhone: '7899359217',
  contacts: HOST_CONTACTS,
  mapUrl: 'https://maps.app.goo.gl/c3TQwAhQYXHszE5u5',
};

const getRoute = () => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase().trim();
  const hash = window.location.hash.toLowerCase().trim();
  const search = window.location.search.toLowerCase();

  if (
    path === '/admin' ||
    path.startsWith('/admin/') ||
    path.startsWith('/admin') ||
    hash === '#/admin' ||
    hash === '#admin' ||
    hash.startsWith('#/admin') ||
    search.includes('admin=true')
  ) {
    return 'admin';
  }

  if (
    path === '/share' ||
    path.startsWith('/share/') ||
    path.startsWith('/share') ||
    hash === '#/share' ||
    hash === '#share' ||
    hash.startsWith('#/share') ||
    search.includes('share=true')
  ) {
    return 'share';
  }

  return 'home';
};

export default function App() {
  // Route state: 'home' | 'admin' | 'share'
  const [currentRoute, setCurrentRoute] = useState(() => getRoute());

  // Navigation Flow State: 'opening' -> 'door' -> 'main'
  const [stage, setStage] = useState('opening'); 
  const [activeSection, setActiveSection] = useState('opening');
  
  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Dynamic Event Details State
  const [eventDetails, setEventDetails] = useState(() => {
    const saved = localStorage.getItem('kanasu_event_details');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Automatically migrate if previous placeholder date was cached
        if (parsed.isoDate === '2026-10-18') {
          return DEFAULT_EVENT_DETAILS;
        }
        return { ...DEFAULT_EVENT_DETAILS, ...parsed };
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_EVENT_DETAILS;
  });

  // Track page visit on mount & start ambient BGM
  useEffect(() => {
    trackPageVisit();
    ambientAudio.start();
  }, []);

  // Listen for browser URL back/forward and hash navigation
  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentRoute(getRoute());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateToHome = () => {
    window.history.pushState(null, '', '/');
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveEventDetails = (newDetails) => {
    setEventDetails(newDetails);
    localStorage.setItem('kanasu_event_details', JSON.stringify(newDetails));
  };

  const resetEventDetails = () => {
    setEventDetails(DEFAULT_EVENT_DETAILS);
    localStorage.removeItem('kanasu_event_details');
  };

  const handleEnterHome = () => {
    ambientAudio.start();
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
    if (stage !== 'main' || currentRoute !== 'home') return;

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
  }, [stage, currentRoute]);

  // If viewing /admin, render Admin Dashboard
  if (currentRoute === 'admin') {
    return <AdminDashboard onBackToInvitation={navigateToHome} />;
  }

  // If viewing /share, render dedicated Share Page
  if (currentRoute === 'share') {
    return <SharePage onBackToInvitation={navigateToHome} eventDetails={eventDetails} />;
  }

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
          <RsvpSection eventDetails={eventDetails} />

          {/* 10 — Final Reveal */}
          <FinalReveal />
        </main>
      )}

      {/* Minimal Floating Navigation Bar */}
      <FloatingNav
        activeSection={stage === 'opening' ? 'opening' : activeSection}
        onNavigate={handleNavigate}
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
