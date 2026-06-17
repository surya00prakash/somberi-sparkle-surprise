import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  type: string;
}

const EMOJI_MAP: Record<string, string[]> = {
  petals: ["🌸", "🌺", "🌷"],
  hearts: ["💗", "💖", "💕", "💝"],
  sparkles: ["✨", "⭐", "💫"],
  butterflies: ["🦋"],
  roses: ["🌹", "🌸"],
  mixed: ["🌸", "💗", "✨", "🦋", "🌹", "💖", "⭐"],
  stars: ["⭐", "✨", "💫", "🌟"],
};

export function FloatingParticles({ type = "mixed", count = 25 }: { type?: keyof typeof EMOJI_MAP; count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    const emojis = EMOJI_MAP[type] ?? EMOJI_MAP.mixed;
    const arr = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 10,
      size: 14 + Math.random() * 22,
      type: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setParticles(arr);
  }, [type, count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            filter: "drop-shadow(0 0 8px rgba(255,182,193,0.6))",
          }}
        >
          {p.type}
        </span>
      ))}
    </div>
  );
}

export function Sparkles({ count = 40 }: { count?: number }) {
  const [items, setItems] = useState<{ id: number; x: number; y: number; delay: number; size: number }[]>([]);
  useEffect(() => {
    setItems(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        size: 4 + Math.random() * 8,
      })),
    );
  }, [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 2}px white, 0 0 ${s.size * 4}px #ffb6c1`,
            animation: `sparkle 2.5s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function CustomCursor() {
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    let id = 0;
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTrail((prev) => [...prev.slice(-6), { id: id++, x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {trail.map((t, i) => (
        <div
          key={t.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: t.x,
            top: t.y,
            opacity: (i + 1) / trail.length * 0.6,
            fontSize: 8 + i,
            transition: "opacity 0.3s",
          }}
        >
          {i % 2 === 0 ? "✨" : "💗"}
        </div>
      ))}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl"
        style={{ left: pos.x, top: pos.y, filter: "drop-shadow(0 0 10px #ff69b4)" }}
      >
        💖
      </div>
    </div>
  );
}

export function AnimatedPinkBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.12 10), transparent 70%)" }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.1 35), transparent 70%)" }}
        animate={{ x: [0, -120, 0], y: [0, -60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.92 0.06 350), transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function NightSky() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 120 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    );
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ background: "var(--gradient-night)" }}>
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 3}px white`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      <motion.div
        className="absolute top-12 right-16 h-32 w-32 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, #fffbe6, #ffe4b5 50%, #d4a574 100%)",
          boxShadow: "0 0 80px #fffbe6, 0 0 160px #ffe4b5, 0 0 240px rgba(255,228,181,0.4)",
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function FloatingLanterns() {
  const [lanterns, setLanterns] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);
  useEffect(() => {
    setLanterns(
      Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 18 + Math.random() * 10,
      })),
    );
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {lanterns.map((l) => (
        <div
          key={l.id}
          className="absolute bottom-0"
          style={{
            left: `${l.left}%`,
            animation: `float-up ${l.duration}s linear ${l.delay}s infinite`,
          }}
        >
          <div className="relative">
            <div
              className="h-10 w-7 rounded-md"
              style={{
                background: "linear-gradient(180deg, #ffb88c, #ff7e5f)",
                boxShadow: "0 0 30px #ffb88c, 0 0 60px #ff7e5f, inset 0 0 10px #fff5e6",
              }}
            />
            <div className="absolute -top-1 left-1/2 h-1 w-3 -translate-x-1/2 rounded bg-amber-700" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function BeatingHeart() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="animate-heartbeat text-[180px] leading-none" style={{ filter: "drop-shadow(0 0 40px #ff1493)" }}>
        ❤️
      </div>
      <div className="absolute font-display text-sm font-bold text-white tracking-wider">
        Made With Love
      </div>
    </div>
  );
}

export { AnimatePresence };
