import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { FloatingParticles, Sparkles } from "./Atmosphere";

// To add real photos, drop them in /public/gallery/ and update PHOTOS below.
const PHOTOS = [
  { id: 1, color: "from-pink-300 to-rose-400", label: "Memory 1" },
  { id: 2, color: "from-rose-300 to-pink-500", label: "Memory 2" },
  { id: 3, color: "from-fuchsia-300 to-rose-400", label: "Memory 3" },
  { id: 4, color: "from-pink-400 to-amber-300", label: "Memory 4" },
  { id: 5, color: "from-rose-200 to-pink-400", label: "Memory 5" },
  { id: 6, color: "from-pink-300 to-fuchsia-400", label: "Memory 6" },
];

const POSITIONS = [
  { top: "10%", left: "8%", rotate: -8 },
  { top: "12%", left: "55%", rotate: 6 },
  { top: "38%", left: "30%", rotate: -3 },
  { top: "45%", left: "70%", rotate: 9 },
  { top: "65%", left: "12%", rotate: 5 },
  { top: "62%", left: "52%", rotate: -7 },
];

export function GalleryScene({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen overflow-hidden py-20" style={{
      background: "linear-gradient(135deg, oklch(0.94 0.05 350), oklch(0.88 0.08 20), oklch(0.92 0.06 350))",
    }}>
      <Sparkles count={50} />
      <FloatingParticles type="petals" count={15} />


      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="shimmer-text font-display text-5xl md:text-7xl italic font-bold"
        >
          Moments With You
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-4 font-display text-lg md:text-xl italic text-rose-deep/80"
        >
          Drag the cards · click to enlarge · feel every memory
        </motion.p>
      </div>

      <div className="relative mx-auto mt-12 h-[800px] max-w-6xl">
        {PHOTOS.map((p, i) => (
          <PhotoCard key={p.id} photo={p} pos={POSITIONS[i % POSITIONS.length]} onSelect={() => setSelected(p.id)} index={i} />
        ))}
      </div>

      <div className="relative z-10 mt-12 flex justify-center">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={onComplete}
          whileHover={{ scale: 1.05 }}
          className="rounded-full px-10 py-4 font-display text-lg tracking-wider text-white"
          style={{
            background: "linear-gradient(135deg, oklch(0.72 0.18 5), oklch(0.62 0.2 10))",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          Continue the Journey ✨
        </motion.button>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-xl p-6"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="glass rounded-3xl p-4"
            >
              <PhotoSurface photo={PHOTOS.find((p) => p.id === selected)!} large />
              <p className="mt-3 text-center font-display italic text-rose-deep">
                Click anywhere to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PhotoCard({ photo, pos, onSelect, index }: { photo: typeof PHOTOS[number]; pos: typeof POSITIONS[number]; onSelect: () => void; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useTransform(y, [-100, 100], [15, -15]);
  const rotY = useTransform(x, [-100, 100], [-15, 15]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      drag
      dragMomentum={false}
      dragElastic={0.2}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onSelect}
      initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: pos.rotate, y: [0, -12, 0] }}
      transition={{
        opacity: { delay: index * 0.15, duration: 0.8 },
        scale: { delay: index * 0.15, duration: 0.8 },
        rotate: { delay: index * 0.15, duration: 0.8 },
        y: { duration: 5 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 },
      }}
      whileHover={{ scale: 1.08, zIndex: 50 }}
      whileDrag={{ scale: 1.1, zIndex: 60 }}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        top: pos.top,
        left: pos.left,
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1000,
      }}
    >
      <div className="glass rounded-2xl p-3 shadow-soft" style={{ boxShadow: "0 20px 60px rgba(190,100,130,0.35), 0 0 30px rgba(255,182,193,0.4)" }}>
        <PhotoSurface photo={photo} />
      </div>
    </motion.div>
  );
}

function PhotoSurface({ photo, large }: { photo: typeof PHOTOS[number]; large?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${photo.color} ${large ? "h-[60vh] w-[80vw] max-w-[600px]" : "h-56 w-44"}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-display italic text-white/90 ${large ? "text-4xl" : "text-xl"}`}>
          {photo.label}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute top-2 right-2 text-xl">🌹</div>
    </div>
  );
}
