import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CakeScene } from "@/components/birthday/CakeScene";
import { FriendScene } from "@/components/birthday/FriendScene";
import { GalleryScene } from "@/components/birthday/GalleryScene";
import { EndingScene } from "@/components/birthday/EndingScene";
import { MusicPlayer } from "@/components/birthday/MusicPlayer";
import { CustomCursor } from "@/components/birthday/Atmosphere";
import { playSwoosh } from "@/hooks/useSoundEffects";

type Stage = "cake" | "friend" | "gallery" | "ending";

export default function App() {
  const [stage, setStage] = useState<Stage>("cake");
  const [interacted, setInteracted] = useState(false);

  const goTo = (next: Stage) => {
    playSwoosh();
    setStage(next);
  };

  useEffect(() => {
    const onAny = () => setInteracted(true);
    window.addEventListener("click", onAny, { once: true });
    window.addEventListener("keydown", onAny, { once: true });
    return () => {
      window.removeEventListener("click", onAny);
      window.removeEventListener("keydown", onAny);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <MusicPlayer enabled={interacted} stage={stage} />
      <ProgressDots stage={stage} />

      <AnimatePresence mode="wait">
        {stage === "cake" && (
          <PageTransition key="cake">
            <CakeScene onComplete={() => goTo("friend")} />
          </PageTransition>
        )}
        {stage === "friend" && (
          <PageTransition key="friend">
            <FriendScene onComplete={() => goTo("gallery")} />
          </PageTransition>
        )}
        {stage === "gallery" && (
          <PageTransition key="gallery">
            <GalleryScene onComplete={() => goTo("ending")} />
          </PageTransition>
        )}
        {stage === "ending" && (
          <PageTransition key="ending">
            <EndingScene />
          </PageTransition>
        )}
      </AnimatePresence>
    </main>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(20px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}

function ProgressDots({ stage }: { stage: Stage }) {
  const stages: Stage[] = ["cake", "friend", "gallery", "ending"];
  const idx = stages.indexOf(stage);
  return (
    <div className="fixed left-1/2 top-6 z-[150] flex -translate-x-1/2 gap-2 rounded-full glass px-4 py-2">
      {stages.map((s, i) => (
        <div
          key={s}
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: i === idx ? 28 : 8,
            background:
              i <= idx
                ? "linear-gradient(90deg,#ff69b4,#ff1493)"
                : "rgba(255,182,193,0.4)",
            boxShadow: i === idx ? "0 0 10px #ff69b4" : "none",
          }}
        />
      ))}
    </div>
  );
}
