import { useEffect, useRef, useState } from "react";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";

const PLAYLIST = [
  { title: "song1", src: "/music/song1.mp3" },
];

// stage passed from App — music only starts from page 2 onwards
export function MusicPlayer({ enabled, stage }: { enabled: boolean; stage: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [track] = useState(0);
  const fadeRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(PLAYLIST[track].src);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [track]);

  const fadeTo = (target: number, ms = 1500) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    const steps = 30;
    const start = audio.volume;
    let i = 0;
    fadeRef.current = window.setInterval(() => {
      i++;
      audio.volume = Math.max(0, Math.min(1, start + (target - start) * (i / steps)));
      if (i >= steps && fadeRef.current) {
        window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    }, ms / steps);
  };

  // Only auto-start when we reach page 2+ (not on cake page)
  useEffect(() => {
    if (!enabled || startedRef.current) return;
    if (stage === "cake") return; // wait until after cake page
    const audio = audioRef.current;
    if (!audio) return;
    startedRef.current = true;
    audio.play().then(() => {
      setPlaying(true);
      fadeTo(muted ? 0 : volume);
    }).catch(() => {});
  }, [enabled, stage, muted, volume]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      fadeTo(0, 600);
      setTimeout(() => audio.pause(), 600);
      setPlaying(false);
    } else {
      audio.play().then(() => {
        setPlaying(true);
        fadeTo(muted ? 0 : volume);
      }).catch(() => {});
    }
  };

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      fadeTo(next ? 0 : volume, 400);
      return next;
    });
  };

  const onVolume = (v: number) => {
    setVolume(v);
    if (!muted && audioRef.current) audioRef.current.volume = v;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-full glass px-4 py-2 shadow-soft">
      <Music className="h-4 w-4 text-rose-deep" />
      <button onClick={toggle} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 hover:bg-white/90 transition">
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      <button onClick={toggleMute} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 hover:bg-white/90 transition">
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={volume}
        onChange={(e) => onVolume(parseFloat(e.target.value))}
        className="hidden w-20 accent-rose-400 sm:block"
      />
    </div>
  );
}
