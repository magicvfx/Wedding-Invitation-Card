// Web Audio API ambient romantic music generator
// Plays a gentle, lush arpeggiated romantic progression reminiscent of Canon in D and romantic acoustic piano

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private gainNode: GainNode | null = null;
  private volume: number = 0.25;

  // Chord progression: D -> A -> Bm -> F#m -> G -> D -> G -> A
  private readonly chords = [
    // D major: D3, F#3, A3, D4, F#4
    [146.83, 185.00, 220.00, 293.66, 369.99],
    // A major: A2, E3, A3, C#4, E4
    [110.00, 164.81, 220.00, 277.18, 329.63],
    // B minor: B2, F#3, B3, D4, F#4
    [123.47, 185.00, 246.94, 293.66, 369.99],
    // F# minor: F#2, C#3, F#3, A3, C#4
    [92.50, 138.59, 185.00, 220.00, 277.18],
    // G major: G2, D3, G3, B3, D4
    [98.00, 146.83, 196.00, 246.94, 293.66],
    // D major: D3, A3, D4, F#4, A4
    [146.83, 220.00, 293.66, 369.99, 440.00],
    // G major: G2, G3, B3, D4, G4
    [98.00, 196.00, 246.94, 293.66, 392.00],
    // A major: A2, E3, A3, C#4, E4
    [110.00, 164.81, 220.00, 277.18, 329.63],
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number = 2.4, timeOffset: number = 0, isBass: boolean = false) {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm, soft acoustic character
    osc.type = isBass ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + timeOffset);

    // Filter for mellow acoustic warmth
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isBass ? 450 : 1200, this.ctx.currentTime + timeOffset);

    const now = this.ctx.currentTime + timeOffset;
    const initialVel = isBass ? 0.35 : 0.22;
    noteGain.gain.setValueAtTime(0.0001, now);
    // Soft attack
    noteGain.gain.exponentialRampToValueAtTime(initialVel, now + 0.08);
    // Smooth natural acoustic decay
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  private scheduleChord() {
    if (!this.isPlaying) return;

    const chord = this.chords[this.currentStep % this.chords.length];
    
    // Play root bass
    this.playTone(chord[0], 3.8, 0, true);

    // Arpeggiate harmonic notes gently
    this.playTone(chord[1], 2.8, 0.25, false);
    this.playTone(chord[2], 2.6, 0.55, false);
    this.playTone(chord[3], 2.4, 0.85, false);
    this.playTone(chord[4], 2.2, 1.15, false);
    // Gentle melodic turn
    this.playTone(chord[3], 2.0, 1.5, false);
    this.playTone(chord[2], 2.0, 1.85, false);

    this.currentStep++;
    // Step duration: 2.2 seconds per measure
    this.timerId = window.setTimeout(() => {
      this.scheduleChord();
    }, 2200);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;
    this.scheduleChord();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioPlayer();
