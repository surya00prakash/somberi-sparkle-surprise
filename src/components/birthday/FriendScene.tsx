import { motion } from "framer-motion";
import { FloatingParticles, Sparkles, AnimatedPinkBackground } from "./Atmosphere";

const FRIENDS = [
  {
    img: "/gallery/frd0.jpeg",
    text: "Nee romba silent-aana ponnu. Yaar kittayum avlo seekiram pesa maata. Adhuvum boys kitta pesuradhuna unakku romba shy-um bayam-um irukkum. Nee girls school-la padichadhunaala, girls kitta dhaan comfortable-a pesuva. Starting-la nee yaar kittayum easy-a open up aaga maata. Unnai purinjukittu friend aaguradhe oru periya vishayam.",
  },
  {
    img: "/gallery/frd1.jpeg",
    text: 'Nee class-la mudhal mudhala jolly-a pesuna boy naan dhaan-nu naan eppovume solluven, adhu unmaithaan-nu naan namburen. Namma rendu perum nalla friends aana apram, nee en kitta dhaan romba free-a pesuva; vera boys kitta avlo pesa maata. Adhu mattum illaama, un veetla irukkuravanga kittayum enna pathi sollirukka. Ennai nee "ottai vaayi" nu kindal pannuva, naanum adha sirichukitte accept panniduven. Namma friendship-la indha chinna chinna moments dhaan romba special.',
  },
  {
    img: "/gallery/frd2.jpeg",
    text: "Aana ippo unkitta naan neraya maatrangal paakuren. Munnadi irundha shy-um bayam-um konjam konjama marainju, ippo nee romba strong-um bold-um aagitta. Unnoda indha confidence paathu enakku romba santhosham. Nee life-la ippadiye dhairiyama munneranum-nu aasai paduren.\n\nAana oru chinna secret sollanumna… nee neraya boys kooda pesumbodhu enakku konjam poraamai varum. 😅 Enna na, naan dhaan unakku eppovum first-um best friend-um irukkanum-nu aasai. Adha mattum marandhudaadha, okay? 💛",
  },
];

export function FriendScene({ onComplete }: { onComplete: () => void }) {
  return (
    <section className="relative overflow-hidden pb-24">
      <AnimatedPinkBackground />
      <Sparkles count={35} />
      <FloatingParticles type="petals" count={12} />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 pt-24 pb-16 text-center px-6"
      >
        <h2 className="shimmer-text font-display text-4xl md:text-6xl italic font-bold">
          A Note From Your Friend 💛
        </h2>
        <p className="mt-3 font-display text-lg italic text-rose-deep/70">
          scroll down to read 🌸
        </p>
      </motion.div>

      {/* Cards */}
      <div className="relative z-10 flex flex-col gap-20 px-6 md:px-16 max-w-6xl mx-auto">
        {FRIENDS.map((f, i) => {
          const photoLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className={`flex flex-col ${photoLeft ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
            >
              {/* Photo */}
              <motion.div
                whileHover={{ scale: 1.02, rotate: photoLeft ? 1 : -1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-full md:w-[42%] flex-shrink-0"
              >
                <div
                  className="glass rounded-3xl overflow-hidden"
                  style={{ boxShadow: "0 20px 60px rgba(190,100,130,0.35), 0 0 30px rgba(255,182,193,0.3)" }}
                >
                  <div className="relative h-[420px] md:h-[500px] w-full">
                    <img
                      src={f.img}
                      alt={`Friend memory ${i + 1}`}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    {/* card number badge */}
                    <div
                      className="absolute top-4 left-4 h-9 w-9 rounded-full flex items-center justify-center font-display font-bold text-white text-sm"
                      style={{ background: "linear-gradient(135deg, oklch(0.72 0.18 5), oklch(0.62 0.2 10))" }}
                    >
                      {i + 1}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: photoLeft ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="w-full md:w-[58%]"
              >
                <div
                  className="glass rounded-3xl p-8 md:p-10"
                  style={{ boxShadow: "var(--shadow-soft), 0 0 40px rgba(255,182,193,0.2)" }}
                >
                  <div className="mb-4 text-3xl">{i === 0 ? "🌸" : i === 1 ? "✨" : "💛"}</div>
                  <p className="font-display text-lg md:text-xl leading-relaxed italic text-rose-deep whitespace-pre-line">
                    {f.text}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom quote + button */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 mt-24 px-6 text-center flex flex-col items-center gap-10"
      >
        <p
          className="font-script text-2xl md:text-4xl text-rose-deep max-w-3xl"
          style={{ textShadow: "0 0 20px rgba(255,182,193,0.6)" }}
        >
          "Nee evlo maarinalum, namma friendship-um indha memories-um eppovum maaradhu. Happy Birthday, Somberi! 🎂✨"
        </p>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          onClick={onComplete}
          className="cursor-pointer text-rose-deep/60 hover:text-rose-deep transition-colors mt-2"
          title="Continue"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>


      </motion.div>
    </section>
  );
}
