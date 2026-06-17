import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedPinkBackground, FloatingParticles, Sparkles } from "./Atmosphere";

export function CakeScene({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<"idle" | "cutting" | "revealed">("idle");

  const cut = async () => {
    if (stage !== "idle") return;
    setStage("cutting");
    const confetti = (await import("canvas-confetti")).default;
    const burst = () => {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#ffb6c1", "#ff69b4", "#ffd700", "#fff0f5", "#ff1493"],
        scalar: 1.2,
      });
    };
    burst();
    setTimeout(burst, 400);
    setTimeout(burst, 900);
    setTimeout(() => setStage("revealed"), 1400);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <AnimatedPinkBackground />
      <Sparkles count={60} />
      <FloatingParticles type="mixed" count={20} />

      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        <AnimatePresence mode="wait">
          {stage !== "revealed" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1.2 }}
              className="mb-8"
            >
              <h1 className="font-display text-4xl md:text-6xl font-light italic text-rose-deep text-glow tracking-wide">
                A Special Surprise
              </h1>
              <p className="mt-2 font-display text-2xl md:text-4xl font-light italic text-rose-deep/90">
                For Someone Precious...
              </p>
              <p className="mt-6 text-sm md:text-base text-rose-deep/70 italic tracking-widest uppercase">
                ✨ Click the cake to make a wish ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cake */}
        <motion.button
          onClick={cut}
          className="relative cursor-pointer"
          animate={stage === "idle" ? { y: [0, -12, 0] } : {}}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={stage === "idle" ? { scale: 1.04 } : {}}
        >
          <Cake3D stage={stage} />
        </motion.button>

        <AnimatePresence>
          {stage === "revealed" && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, type: "spring" }}
              className="mt-10 flex flex-col items-center"
            >
              <h2 className="shimmer-text font-display text-3xl md:text-6xl font-bold tracking-wide">
                🎉 HAPPY BIRTHDAY SOMBERI 🎉
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.5 }}
                className="mt-4 max-w-xl font-display text-lg md:text-2xl italic text-rose-deep"
              >
                May your smile always shine brighter than the stars.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 1 }}
                onClick={onComplete}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="mt-10 rounded-full px-10 py-4 font-display text-lg font-medium tracking-wider text-white"
                style={{
                  background: "linear-gradient(135deg, oklch(0.72 0.18 5), oklch(0.62 0.2 10))",
                  boxShadow: "var(--shadow-glow)",
                }}
              >
                Open Your Surprise ❤️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Cake3D({ stage }: { stage: "idle" | "cutting" | "revealed" }) {
  const cutOffset = stage === "idle" ? 0 : 60;
  return (
    <div className="relative h-[420px] w-[420px] md:h-[480px] md:w-[480px]" style={{ perspective: 1000 }}>
      {/* Candles */}
      <div className="absolute left-1/2 top-2 z-30 flex -translate-x-1/2 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative">
            <div className="h-16 w-2 rounded-sm" style={{ background: "linear-gradient(180deg,#fff5f8,#ffc1d4)" }} />
            <div
              className="absolute -top-5 left-1/2 h-6 w-3 -translate-x-1/2 rounded-full animate-flicker"
              style={{
                background: "radial-gradient(ellipse at 50% 70%, #fff5e0, #ffb347 60%, #ff4500 90%)",
                boxShadow: "0 0 30px #ffb347, 0 0 60px #ff7e5f",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Layer 1 (top, smallest) */}
      <motion.div
        className="absolute left-1/2 top-[80px] z-20 -translate-x-1/2"
        animate={stage !== "idle" ? { x: [0, -cutOffset, -cutOffset] } : {}}
        transition={{ duration: 1 }}
      >
        <CakeLayer width={160} height={70} hue="oklch(0.85 0.12 5)" />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-[80px] z-20 -translate-x-1/2"
        animate={stage !== "idle" ? { x: [0, cutOffset, cutOffset], rotate: [0, 10, 10] } : {}}
        transition={{ duration: 1 }}
        style={{ clipPath: "inset(0 0 0 50%)" }}
      >
        <CakeLayer width={160} height={70} hue="oklch(0.85 0.12 5)" />
      </motion.div>

      {/* Layer 2 (middle) */}
      <motion.div
        className="absolute left-1/2 top-[160px] z-10 -translate-x-1/2"
        animate={stage !== "idle" ? { x: [0, -cutOffset, -cutOffset] } : {}}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <CakeLayer width={250} height={90} hue="oklch(0.92 0.06 350)" decor />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-[160px] z-10 -translate-x-1/2"
        animate={stage !== "idle" ? { x: [0, cutOffset, cutOffset], rotate: [0, 8, 8] } : {}}
        transition={{ duration: 1, delay: 0.1 }}
        style={{ clipPath: "inset(0 0 0 50%)" }}
      >
        <CakeLayer width={250} height={90} hue="oklch(0.92 0.06 350)" decor />
      </motion.div>

      {/* Layer 3 (bottom, largest) */}
      <motion.div
        className="absolute left-1/2 top-[260px] z-0 -translate-x-1/2"
        animate={stage !== "idle" ? { x: [0, -cutOffset, -cutOffset] } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <CakeLayer width={340} height={110} hue="oklch(0.78 0.12 15)" decor big />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-[260px] z-0 -translate-x-1/2"
        animate={stage !== "idle" ? { x: [0, cutOffset, cutOffset], rotate: [0, 6, 6] } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ clipPath: "inset(0 0 0 50%)" }}
      >
        <CakeLayer width={340} height={110} hue="oklch(0.78 0.12 15)" decor big />
      </motion.div>

      {/* Plate */}
      <div
        className="absolute left-1/2 top-[365px] z-0 h-6 w-[380px] -translate-x-1/2 rounded-full"
        style={{
          background: "linear-gradient(180deg, oklch(0.85 0.04 80), oklch(0.7 0.06 40))",
          boxShadow: "0 20px 40px rgba(190,100,130,0.4)",
        }}
      />

      {/* Knife animation */}
      <AnimatePresence>
        {stage === "cutting" && (
          <motion.div
            initial={{ y: -300, x: "-50%", rotate: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="absolute left-1/2 top-[40px] z-40"
          >
            <div className="flex flex-col items-center">
              <div className="h-32 w-2 rounded-sm" style={{ background: "linear-gradient(180deg,#f0f0f0,#a0a0a0)", boxShadow: "0 0 20px rgba(255,255,255,0.8)" }} />
              <div className="h-10 w-4 rounded-b-md bg-amber-900" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cream particles */}
      <AnimatePresence>
        {stage !== "idle" &&
          Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
                opacity: 0,
                scale: [1, 1.5, 0],
              }}
              transition={{ duration: 1.4, delay: i * 0.02 }}
              className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-white"
              style={{ boxShadow: "0 0 10px #ffb6c1" }}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}

function CakeLayer({ width, height, hue, decor, big }: { width: number; height: number; hue: string; decor?: boolean; big?: boolean }) {
  return (
    <div
      className="relative rounded-2xl"
      style={{
        width,
        height,
        background: `linear-gradient(180deg, ${hue}, oklch(from ${hue} calc(l - 0.1) c h))`,
        boxShadow: `inset 0 -10px 20px rgba(0,0,0,0.1), inset 0 10px 20px rgba(255,255,255,0.4), 0 10px 30px rgba(190,100,130,0.3)`,
      }}
    >
      {/* Cream drips */}
      <div className="absolute -top-2 left-0 right-0 h-4 rounded-t-2xl" style={{ background: "linear-gradient(180deg, #fff, #ffe4ec)", clipPath: "polygon(0 0, 10% 100%, 20% 30%, 35% 100%, 50% 20%, 65% 100%, 80% 30%, 90% 100%, 100% 0)" }} />
      {decor && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-around">
          {Array.from({ length: big ? 6 : 4 }).map((_, i) => (
            <span key={i} className="text-2xl" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>🌹</span>
          ))}
        </div>
      )}
    </div>
  );
}
