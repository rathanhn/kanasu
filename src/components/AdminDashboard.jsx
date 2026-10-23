import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  CheckCircle2, 
  HelpCircle, 
  Eye, 
  DoorOpen, 
  Download, 
  Search, 
  ArrowLeft, 
  RefreshCw, 
  Lock, 
  Unlock, 
  Calendar, 
  Clock, 
  Filter, 
  Sparkles,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  MessageSquare,
  Trash2
} from 'lucide-react';
import { 
  subscribeToRsvps, 
  subscribeToAnalytics,
  deleteRsvpFromFirebase,
  resetAnalyticsInFirebase
} from '../utils/firebase';

const ADMIN_PASSCODE = '1511'; // 15th November passcode

export default function AdminDashboard({ onBackToInvitation }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('kanasu_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const [rsvps, setRsvps] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'yes', 'maybe'
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Authenticate
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('kanasu_admin_auth', 'true');
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('kanasu_admin_auth');
  };

  // Subscribe to real-time data
  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading(true);
    const unsubscribeRsvps = subscribeToRsvps((data) => {
      setRsvps(data || []);
      setLoading(false);
      setIsRefreshing(false);
    });

    const unsubscribeAnalytics = subscribeToAnalytics((stats) => {
      setAnalytics(stats);
    });

    return () => {
      if (typeof unsubscribeRsvps === 'function') unsubscribeRsvps();
      if (typeof unsubscribeAnalytics === 'function') unsubscribeAnalytics();
    };
  }, [isAuthenticated]);

  // Only display real RSVP data directly from Firebase Firestore
  const allRsvps = useMemo(() => {
    return rsvps.filter(r => r.name && !r.name.toLowerCase().includes('dummy'));
  }, [rsvps]);

  // Delete RSVP item from Firestore
  const handleDeleteRsvp = async (id, name) => {
    if (!window.confirm(`Delete RSVP record for "${name}" from database?`)) return;
    await deleteRsvpFromFirebase(id);
  };

  // Reset visits / doors opened counters
  const handleResetAnalytics = async () => {
    if (!window.confirm('Reset all visit and door analytics counters to 0?')) return;
    await resetAnalyticsInFirebase();
  };

  // Calculate high-level numbers strictly from real database counts
  const stats = useMemo(() => {
    const totalResponses = allRsvps.length;
    const attendingResponses = allRsvps.filter(r => r.status === 'yes');
    const maybeResponses = allRsvps.filter(r => r.status === 'maybe');
    
    const totalAttendingGuests = attendingResponses.reduce(
      (sum, r) => sum + (Number(r.guestCount) || 1), 
      0
    );

    const totalMaybeGuests = maybeResponses.reduce(
      (sum, r) => sum + (Number(r.guestCount) || 1), 
      0
    );

    return {
      totalResponses,
      totalYesCount: attendingResponses.length,
      totalMaybeCount: maybeResponses.length,
      totalAttendingGuests,
      totalMaybeGuests,
      totalVisits: Number(analytics?.totalVisits) || 0,
      doorsOpened: Number(analytics?.totalDoorsOpened) || 0
    };
  }, [allRsvps, analytics]);

  // Filter & Search
  const filteredRsvps = useMemo(() => {
    return allRsvps.filter((item) => {
      const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [allRsvps, searchQuery, statusFilter]);

  // Export CSV
  const handleExportCSV = () => {
    if (allRsvps.length === 0) {
      alert('No RSVP data available to export yet.');
      return;
    }

    const headers = ['Guest Name', 'Status', 'Guest Count', 'Date & Time', 'Device'];
    const rows = allRsvps.map(r => [
      `"${r.name || ''}"`,
      `"${r.status === 'yes' ? 'Attending' : 'Tentative'}"`,
      r.guestCount || 1,
      `"${r.createdAt || ''}"`,
      `"${r.device || 'Web'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `KANASU_Griha_Pravesh_RSVP_List_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#121110] text-[#FDFBF7] flex items-center justify-center p-4 relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3E2723]/30 via-[#1A1816] to-[#121110]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="z-10 max-w-sm w-full glass-panel rounded-3xl p-8 border border-[#C5A059]/40 shadow-2xl text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#C86D51]/20 border border-[#C86D51] text-[#C86D51] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-serif-title font-bold text-[#FDFBF7] mb-1">
            Host Admin Access
          </h2>
          <p className="text-xs text-[#D4C9BC] font-mono mb-6">
            Enter passcode to track guest RSVPs & visits
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPasscodeError(false);
                }}
                placeholder="Enter 4-digit Passcode"
                className={`w-full px-4 py-3.5 rounded-xl bg-[#121110] border ${
                  passcodeError ? 'border-rose-500' : 'border-[#C5A059]/40'
                } text-[#FDFBF7] text-center font-mono text-lg tracking-widest focus:outline-none focus:border-[#C86D51] transition-colors`}
                autoFocus
              />
              {passcodeError && (
                <p className="text-rose-400 text-xs mt-1.5 font-mono">
                  Incorrect passcode. Hint: Griha Pravesh date (1511)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C86D51] to-[#A8533B] text-white font-bold text-sm tracking-wide shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Dashboard</span>
            </button>
          </form>

          <button
            onClick={onBackToInvitation}
            className="mt-6 text-xs text-[#9E9182] hover:text-[#C5A059] flex items-center justify-center gap-1.5 mx-auto font-mono transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Invitation Website</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121110] text-[#FDFBF7] p-4 sm:p-6 md:p-8 relative">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={onBackToInvitation}
                className="p-2 rounded-xl glass-card-light text-[#D4C9BC] hover:text-white border border-[#C5A059]/30 transition-colors"
                title="Back to Invitation"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#FDFBF7] flex items-center gap-2">
                  <span>ಕನಸು (KANASU)</span>
                  <span className="text-sm font-cinzel text-[#C5A059] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30">
                    Host Admin
                  </span>
                </h1>
                <p className="text-xs text-[#9E9182] font-mono mt-0.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-time Firebase Firestore Tracking</span>
                </p>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleExportCSV}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-[#C5A059]/40 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors active:scale-98"
              title="Download CSV for Excel"
            >
              <Download className="w-4 h-4 text-[#C5A059]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleResetAnalytics}
              className="px-3 py-2.5 rounded-xl glass-card-light text-[#9E9182] hover:text-rose-400 border border-white/10 text-xs font-mono transition-colors"
              title="Reset test visit numbers to 0"
            >
              Reset Visits
            </button>

            <button
              onClick={() => {
                setIsRefreshing(true);
                setTimeout(() => setIsRefreshing(false), 800);
              }}
              className="p-2.5 rounded-xl glass-card-light text-[#9E9182] hover:text-white border border-[#C5A059]/30 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#C5A059]' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl glass-card-light text-[#9E9182] hover:text-rose-400 border border-white/10 transition-colors"
              title="Lock / Sign Out"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Analytics KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: Total Confirmed Attendees */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 sm:p-5 rounded-2xl glass-panel border border-[#C86D51]/40 gold-border-glow relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-[#C86D51] mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Attending Guests</span>
              <Users className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-[#FDFBF7]">
              {stats.totalAttendingGuests}
            </div>
            <p className="text-[11px] text-[#D4C9BC] mt-1 font-mono">
              From {stats.totalYesCount} RSVP {stats.totalYesCount === 1 ? 'party' : 'parties'}
            </p>
          </motion.div>

          {/* Card 2: Total RSVPs Received */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 sm:p-5 rounded-2xl glass-panel border border-[#C5A059]/40 relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-[#C5A059] mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Total Responses</span>
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-[#FDFBF7]">
              {stats.totalResponses}
            </div>
            <p className="text-[11px] text-[#9E9182] mt-1 font-mono">
              {stats.totalMaybeCount} tentative
            </p>
          </motion.div>

          {/* Card 3: Total Website Visits */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-[#D4C9BC] mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Website Visits</span>
              <Eye className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-[#FDFBF7]">
              {stats.totalVisits}
            </div>
            <p className="text-[11px] text-[#9E9182] mt-1 font-mono">
              Invitation views tracked
            </p>
          </motion.div>

          {/* Card 4: Doors Opened */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-[#D4C9BC] mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Doors Opened</span>
              <DoorOpen className="w-5 h-5 text-[#C86D51]" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-[#FDFBF7]">
              {stats.doorsOpened}
            </div>
            <p className="text-[11px] text-[#9E9182] mt-1 font-mono">
              Door unlock experiences
            </p>
          </motion.div>
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#9E9182] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guest name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-xs font-mono text-[#FDFBF7] placeholder-[#9E9182] focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-[#C5A059] text-black font-bold'
                  : 'bg-white/5 text-[#9E9182] hover:text-white'
              }`}
            >
              All ({allRsvps.length})
            </button>
            <button
              onClick={() => setStatusFilter('yes')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors ${
                statusFilter === 'yes'
                  ? 'bg-emerald-500 text-white font-bold'
                  : 'bg-white/5 text-[#9E9182] hover:text-white'
              }`}
            >
              Attending ({stats.totalYesCount})
            </button>
            <button
              onClick={() => setStatusFilter('maybe')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors ${
                statusFilter === 'maybe'
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-white/5 text-[#9E9182] hover:text-white'
              }`}
            >
              Tentative ({stats.totalMaybeCount})
            </button>
          </div>
        </div>

        {/* Guests RSVP List */}
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#D4C9BC] font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C5A059]" />
              <span>Guest RSVP Submissions</span>
              <span className="text-xs text-[#9E9182]">({filteredRsvps.length})</span>
            </h3>
          </div>

          {filteredRsvps.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-full bg-white/5 text-[#9E9182] flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-sm text-[#D4C9BC] font-medium">No RSVPs found</p>
              <p className="text-xs text-[#9E9182] font-mono mt-1">
                {searchQuery ? 'Try matching a different guest name' : 'Guest responses will appear here automatically when submitted'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filteredRsvps.map((rsvp, idx) => {
                const isAttending = rsvp.status === 'yes';
                const formattedDate = rsvp.createdAt 
                  ? new Date(rsvp.createdAt).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'Just now';

                return (
                  <motion.div
                    key={rsvp.id || idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isAttending 
                          ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400' 
                          : 'bg-amber-500/15 border border-amber-500/30 text-amber-400'
                      }`}>
                        {isAttending ? <CheckCircle2 className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-semibold text-[#FDFBF7]">
                            {rsvp.name}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                            isAttending 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          }`}>
                            {isAttending ? 'Attending' : 'Tentative'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#9E9182] font-mono mt-1">
                          <span className="text-[#D4C9BC] font-semibold flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                            <span>{rsvp.guestCount} {Number(rsvp.guestCount) === 1 ? 'Guest' : 'Guests'}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{formattedDate}</span>
                          </span>
                          {rsvp.device && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Smartphone className="w-3 h-3" />
                                <span>{rsvp.device}</span>
                              </span>
                            </>
                          )}
                          {rsvp.sentToHost && (
                            <>
                              <span>•</span>
                              <span className="text-[#C5A059] font-semibold">
                                Notified: {rsvp.sentToHost}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick WhatsApp contact to thank/confirm & delete */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `Namaste ${rsvp.name}! Thank you for your RSVP for the KANASU Griha Pravesh on 15th November. We look forward to welcoming you!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-600/20 hover:text-emerald-400 border border-white/10 text-xs font-mono text-[#D4C9BC] flex items-center gap-1.5 transition-colors"
                        title="Send thank you / confirmation note on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Message</span>
                      </a>

                      {rsvp.id && (
                        <button
                          onClick={() => handleDeleteRsvp(rsvp.id, rsvp.name)}
                          className="p-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-[#9E9182] hover:text-rose-400 border border-white/10 transition-colors"
                          title="Delete this RSVP record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <footer className="text-center py-6 text-xs text-[#9E9182] font-mono space-y-1">
          <p>ಕನಸು (KANASU) Griha Pravesh · Bylakuppe, Karnataka</p>
          <p>Passcode: 1511 · Secured Firebase Firestore Integration</p>
        </footer>
      </div>
    </div>
  );
}
