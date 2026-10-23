import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  setDoc,
  doc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  increment
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0nPJCMGPqOn-9rpu6kLCMpPBI_bW_eNM",
  authDomain: "kanasu-5e021.firebaseapp.com",
  projectId: "kanasu-5e021",
  storageBucket: "kanasu-5e021.firebasestorage.app",
  messagingSenderId: "893250576715",
  appId: "1:893250576715:web:ae1e6c861c4cb750a8c8ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Simple device detector for analytics
const getDeviceType = () => {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) return 'Mobile';
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  return 'Desktop';
};

/**
 * Record a page visit in Firestore
 */
export async function trackPageVisit() {
  try {
    const isNewSession = !sessionStorage.getItem('kanasu_visited_session');
    if (isNewSession) {
      sessionStorage.setItem('kanasu_visited_session', 'true');
    }

    // Always increment analytics counter
    const summaryRef = doc(db, 'analytics', 'summary');
    await setDoc(summaryRef, {
      totalVisits: increment(1),
      uniqueSessions: isNewSession ? increment(1) : increment(0),
      lastVisitAt: serverTimestamp(),
      updatedAt: new Date().toISOString()
    }, { merge: true });

    // Record visit log
    await addDoc(collection(db, 'page_visits'), {
      device: getDeviceType(),
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      referrer: document.referrer || 'direct',
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.warn('Firebase analytics logging info:', error?.message || error);
  }
}

/**
 * Record Door Opening interaction
 */
export async function trackDoorOpened() {
  try {
    const summaryRef = doc(db, 'analytics', 'summary');
    await setDoc(summaryRef, {
      totalDoorsOpened: increment(1),
      lastDoorOpenedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.warn('Firebase door open tracking info:', error?.message || error);
  }
}

/**
 * Save RSVP to Firestore
 */
export async function submitRsvpToFirebase(rsvpData) {
  try {
    const docData = {
      name: rsvpData.name,
      guestCount: Number(rsvpData.guestCount) || 1,
      status: rsvpData.status, // 'yes' or 'maybe'
      device: getDeviceType(),
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    };

    // Add to rsvps collection
    const docRef = await addDoc(collection(db, 'rsvps'), docData);

    // Update aggregated analytics
    const summaryRef = doc(db, 'analytics', 'summary');
    await setDoc(summaryRef, {
      totalRSVPs: increment(1),
      totalAttending: rsvpData.status === 'yes' ? increment(1) : increment(0),
      totalMaybe: rsvpData.status === 'maybe' ? increment(1) : increment(0),
      totalGuestsAttending: rsvpData.status === 'yes' ? increment(Number(rsvpData.guestCount) || 1) : increment(0),
      lastRsvpAt: serverTimestamp()
    }, { merge: true });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting RSVP to Firebase:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Subscribe to live RSVPs in real time
 */
export function subscribeToRsvps(callback) {
  try {
    const q = query(collection(db, 'rsvps'), orderBy('timestamp', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      callback(items);
    }, (error) => {
      console.warn('Firestore subscription fallback:', error?.message || error);
      // Fallback: try fetching without ordering if index is building or permissions
      getDocs(collection(db, 'rsvps')).then((snapshot) => {
        const items = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() });
        });
        callback(items);
      }).catch((e) => {
        console.warn('Firestore fallback fetch failed:', e);
        callback([]);
      });
    });
  } catch (e) {
    console.warn('subscribeToRsvps error:', e);
    return () => {};
  }
}

/**
 * Subscribe to live Analytics summary
 */
export function subscribeToAnalytics(callback) {
  try {
    const summaryRef = doc(db, 'analytics', 'summary');
    return onSnapshot(summaryRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data());
      } else {
        callback(null);
      }
    }, (error) => {
      console.warn('Analytics snapshot notice:', error?.message || error);
      callback(null);
    });
  } catch (e) {
    console.warn('subscribeToAnalytics error:', e);
    return () => {};
  }
}
