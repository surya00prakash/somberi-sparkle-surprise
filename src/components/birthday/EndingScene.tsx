import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BeatingHeart, FloatingLanterns, FloatingParticles, NightSky } from "./Atmosphere";

const FINAL_MESSAGE =
  "Every moment becomes beautiful when shared with wonderful people. Happy Birthday Somberi ❤️. May your dreams come true, may your smile never fade, may happiness always stay with you. Keep being the amazing person you are. Wishing you endless joy and unforgettable memories. Happy Birthday Once Again!";

export function EndingScene() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(FINAL_MESSAGE.slice(0, i));
      if (i >= FINAL_MESSAGE.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!done) return;
    let cancelled = false;
    const launch = async () => {
      const confetti = (await import("canvas-confetti")).default;
      const fire = () => {
        if (cancelled) return;
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 80,
          origin: { x: 0, y: 0.8 },
          colors: ["#ff69b4", "#ffd700", "#fff0f5", "#ff1493"],
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 80,
          origin: { x: 1, y: 0.8 },
          colors: ["#ff69b4", "#ffd700", "#fff0f5", "#ff1493"],
        });
      };
      fire();
      const interval = setInterval(fire, 2500);
      return () => { cancelled = true; clearInterval(interval); };
    };
    const cleanup = launch();
    return () => { void cleanup.then((fn) => fn?.()); };
  }, [done]);

  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      <NightSky />
      <FloatingLanterns />
      <FloatingParticles type="stars" count={20} />
      <FloatingParticles type="hearts" count={15} />
      <FloatingParticles type="petals" count={10} />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="shimmer-text font-display text-4xl md:text-6xl italic font-bold mb-10"
        >
          A Letter Beneath the Stars
        </motion.h2>

        <div className="glass-dark min-h-[280px] w-full rounded-3xl p-8 md:p-12">
          <p className="font-display text-lg md:text-2xl leading-relaxed italic text-white/95">
            {typed}
            {!done && <span className="inline-block w-1 animate-pulse">|</span>}
          </p>
        </div>

        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="mt-16"
          >
            <BeatingHeart />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-10 font-script text-3xl text-pink-200"
              style={{ textShadow: "0 0 20px rgba(255,182,193,0.8)" }}
            >
              ~ Forever Yours ~
            </motion.p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
