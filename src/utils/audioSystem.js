// Web Audio Synthesizer for Ambient Housewarming Soundscape
// Clean, elegant, soothing Indian ambient pentatonic harmony (C Major / Raga Mohanam notes: C, D, E, G, A)

class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.timerId = null;
    this.isMuted = false;
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;
    this.isPlaying = true;

    // Start warm background drone (Tanpura pad effect)
    this.startDrone();

    // Schedule gentle flute notes (Raga Mohanam / Pentatonic)
    this.scheduleNotes();
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
    }
    this.isPlaying = false;
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  startDrone() {
    if (!this.ctx) return;
    
    // Tanpura C3 (130.81 Hz) and G3 (196 Hz) root frequencies
    const freqs = [130.81, 196.00, 261.63]; 
    freqs.forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Lowpass filter for warm soft pad
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
    });
  }

  scheduleNotes() {
    // Pentatonic frequencies in C major (Mohanam raga)
    // C4 (261.63), D4 (293.66), E4 (329.63), G4 (392.00), A4 (440.00), C5 (523.25)
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];

    const playRandomNote = () => {
      if (!this.isPlaying || !this.ctx) return;

      const noteFreq = scale[Math.floor(Math.random() * scale.length)];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Flute-like gentle sine with soft overtone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      // Soft attack, long sustain, gentle decay
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 4.6);
    };

    playRandomNote();
    this.timerId = setInterval(() => {
      if (this.isPlaying) playRandomNote();
    }, 3800);
  }

  // Play a soft wooden click/chime effect when the user opens the door
  playDoorChime() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(329.63, now); // E4
    osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.6); // C5

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.1);
  }
}

export const ambientAudio = new AmbientAudioEngine();
