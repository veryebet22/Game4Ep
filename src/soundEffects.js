// Simple Cozy Web Audio synthesizer for 16-bit retro sounds
// No external audio files needed; 100% reliable and lightweight!

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.08) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio not supported or blocked
    }
  }

  // Cozy Sound Presets
  playBleep() {
    this.playTone(440, 'triangle', 0.08, 0.05);
  }

  playStarCatch() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      // Arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'sine', 0.12, 0.06);
        }, idx * 60);
      });
    } catch {}
  }

  playCameraClick() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      this.playTone(800, 'square', 0.04, 0.08);
      setTimeout(() => {
        this.playTone(400, 'square', 0.08, 0.06);
      }, 50);
    } catch {}
  }

  playCardFlip() {
    this.playTone(587.33, 'triangle', 0.1, 0.05);
  }

  playSuccess() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'triangle', 0.18, 0.07);
        }, idx * 90);
      });
    } catch {}
  }
}

export const sounds = new SoundEngine();
