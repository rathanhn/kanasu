// Dedicated Audio Engine for Background Music (BGM.mp3)
// Plays /BGM.mp3 by default, with automatic interaction handling for browser autoplay policies.

class BGMSystem {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.isMutedByUser = false;
    this.listeners = new Set();
    this.chimeCtx = null;
    this.initialized = false;
    this.unlockEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'pointerup', 'keydown', 'scroll', 'wheel'];
    this.handleInteraction = this.handleInteraction.bind(this);
  }

  init() {
    if (this.initialized) return;
    if (typeof window === 'undefined') return;

    this.initialized = true;
    this.audio = new Audio('/BGM.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.70;
    this.audio.preload = 'auto';

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.notifyListeners();
    });

    this.audio.addEventListener('pause', () => {
      if (this.isMutedByUser) {
        this.isPlaying = false;
      }
      this.notifyListeners();
    });

    // Listen across all interaction types to guarantee immediate playback on first gesture
    this.unlockEvents.forEach((evt) => {
      window.addEventListener(evt, this.handleInteraction, { passive: true });
      document.addEventListener(evt, this.handleInteraction, { passive: true });
    });

    // Try starting immediately on load
    this.start();
  }

  handleInteraction() {
    if (!this.isMutedByUser && this.audio && !this.isPlaying) {
      this.start();
    }
  }

  start() {
    if (!this.initialized) {
      this.init();
    }
    if (!this.audio) return;
    this.isMutedByUser = false;

    const promise = this.audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          this.isPlaying = true;
          this.notifyListeners();
        })
        .catch((err) => {
          // Autoplay was restricted by browser; will start on first touch/click
          this.isPlaying = false;
          this.notifyListeners();
        });
    }
  }

  stop() {
    this.isMutedByUser = true;
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.notifyListeners();
  }

  toggle() {
    if (!this.initialized) {
      this.init();
    }
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach((cb) => {
      try {
        cb(this.isPlaying);
      } catch (e) {
        console.error(e);
      }
    });
  }

  // Soft door chime sound effect on door open
  playDoorChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.chimeCtx) {
        this.chimeCtx = new AudioCtx();
      }
      if (this.chimeCtx.state === 'suspended') {
        this.chimeCtx.resume();
      }
      const now = this.chimeCtx.currentTime;
      const osc = this.chimeCtx.createOscillator();
      const gain = this.chimeCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.6); // C5

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

      osc.connect(gain);
      gain.connect(this.chimeCtx.destination);

      osc.start(now);
      osc.stop(now + 2.1);
    } catch (e) {
      console.warn('Door chime notification:', e);
    }
  }
}

export const ambientAudio = new BGMSystem();
