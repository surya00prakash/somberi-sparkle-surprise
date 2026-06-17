import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FloatingParticles, Sparkles } from "./Atmosphere";

const MESSAGES = [
  { text: "You make ordinary days special.", emoji: "🌸" },
  { text: "Your smile makes people happy.", emoji: "💖" },
  { text: "Keep shining and smiling.", emoji: "✨" },
  { text: "You deserve endless happiness.", emoji: "🌹" },
];

export function MessagesScene({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useEffect(() => scrollYProgress.on("change", setProgress), [scrollYProgress]);

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} className="relative" style={{ height: `${MESSAGES.length * 110 + 60}vh` }}>
      {/* Parallax background */}
      <motion.div
        className="pointer-events-none fixed inset-0 -z-0"
        style={{
          y: bgY,
          background:
            "linear-gradient(180deg, oklch(0.96 0.04 350), oklch(0.88 0.08 15), oklch(0.82 0.1 30), oklch(0.92 0.06 350))",
        }}
      />
      <div className="pointer-events-none fixed inset-0">
        <Sparkles count={50} />
        <FloatingParticles type="petals" count={18} />
        <FloatingParticles type="butterflies" count={6} />
      </div>

      {/* Intro */}
      <div className="sticky top-0 flex h-screen items-center justify-center px-6">
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
          className="text-center"
        >
          <h2 className="font-display text-5xl md:text-7xl italic text-rose-deep text-glow">
            For You, Somberi
          </h2>
          <p className="mt-4 text-lg text-rose-deep/80 italic">scroll gently 🌸</p>
        </motion.div>
      </div>

      {/* Messages */}
      {MESSAGES.map((m, i) => {
        const start = 0.08 + i * 0.2;
        const peak = start + 0.08;
        const end = start + 0.18;
        return <MessageCard key={i} index={i} message={m} scrollYProgress={scrollYProgress} start={start} peak={peak} end={end} />;
      })}

      {/* Continue button */}
      {progress > 0.93 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-0 bottom-24 z-50 flex justify-center"
        >
          <button
            onClick={onComplete}
            className="rounded-full px-10 py-4 font-display text-lg tracking-wider text-white shadow-soft"
            style={{
              background: "linear-gradient(135deg, oklch(0.72 0.18 5), oklch(0.62 0.2 10))",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            Enter the Gallery 🌹
          </button>
        </motion.div>
      )}
    </section>
  );
}

function MessageCard({
  index,
  message,
  scrollYProgress,
  start,
  peak,
  end,
}: {
  index: number;
  message: { text: string; emoji: string };
  scrollYProgress: any;
  start: number;
  peak: number;
  end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, peak, end - 0.02, end], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, peak], [120, 0]);
  const scale = useTransform(scrollYProgress, [start, peak], [0.8, 1]);
  const rotate = index % 2 === 0 ? -2 : 2;

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center px-6"
    >
      <motion.div
        animate={{ rotate: [rotate, rotate + 1, rotate], y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="glass max-w-2xl rounded-3xl px-10 py-12 text-center"
        style={{ boxShadow: "var(--shadow-soft), 0 0 60px rgba(255,182,193,0.4)" }}
      >
        <div className="text-5xl mb-4">{message.emoji}</div>
        <p className="font-display text-3xl md:text-5xl italic text-rose-deep leading-snug">
          {message.text}
        </p>
        <div className="mt-6 flex justify-center gap-2 text-2xl">
          <span>🌸</span><span>✨</span><span>🦋</span><span>✨</span><span>🌸</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
