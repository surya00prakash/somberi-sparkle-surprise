// Generates sound effects using Web Audio API — no extra audio files needed.

function getCtx(): AudioContext | null {
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch {
    return null;
  }
}

/** Knife-slice sound: sharp high-frequency swipe */
export function playSlice() {
  const ctx = getCtx();
  if (!ctx) return;

  const bufSize = ctx.sampleRate * 0.18;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    // white noise shaped into a falling sweep
    const t = i / bufSize;
    data[i] = (Math.random() * 2 - 1) * (1 - t) * Math.pow(1 - t, 0.5);
  }

  const source = ctx.createBufferSource();
  source.buffer = buf;

  // high-pass filter to make it crisp/sharp
  const hpf = ctx.createBiquadFilter();
  hpf.type = "highpass";
  hpf.frequency.setValueAtTime(3000, ctx.currentTime);
  hpf.frequency.exponentialRampToValueAtTime(8000, ctx.currentTime + 0.15);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(1.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);

  source.connect(hpf);
  hpf.connect(gain);
  gain.connect(ctx.destination);
  source.start();
  source.stop(ctx.currentTime + 0.2);
}

/** Page-turn swoosh: soft whoosh */
export function playSwoosh() {
  const ctx = getCtx();
  if (!ctx) return;

  const bufSize = ctx.sampleRate * 0.3;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    const t = i / bufSize;
    // bell-shaped envelope
    const env = Math.sin(Math.PI * t);
    data[i] = (Math.random() * 2 - 1) * env;
  }

  const source = ctx.createBufferSource();
  source.buffer = buf;

  const bpf = ctx.createBiquadFilter();
  bpf.type = "bandpass";
  bpf.frequency.setValueAtTime(1800, ctx.currentTime);
  bpf.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.3);
  bpf.Q.value = 0.8;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

  source.connect(bpf);
  bpf.connect(gain);
  gain.connect(ctx.destination);
  source.start();
  source.stop(ctx.currentTime + 0.35);
}
