import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { EASE } from "./Reveal";

const scenes = [
  { text: "Light", hold: 3000, enter: 1.45 },
  { text: "Shadow", hold: 1450, enter: 0.7 },
  { text: "Composition", hold: 1450, enter: 0.7 },
  { text: "The decisive moment", hold: 1900, enter: 0.75 },
];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"words" | "ring" | "out">("words");
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  /* lock scroll for the whole intro */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* Each word gets its own timer and animation layer, preventing black gaps. */
  useEffect(() => {
    const timers: number[] = [];
    let elapsed = 0;

    scenes.forEach((scene, index) => {
      if (index > 0) {
        timers.push(window.setTimeout(() => setWordIndex(index), elapsed));
      }
      elapsed += scene.hold;
    });

    timers.push(window.setTimeout(() => setPhase("ring"), elapsed));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  /* phase 2 — ring fills */
  useEffect(() => {
    if (phase !== "ring") return;
    const controls = animate(0, 100, {
      duration: 3.2,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => setProgress(v),
      onComplete: () => setTimeout(() => setPhase("out"), 500),
    });
    return () => controls.stop();
  }, [phase]);

  /* phase 3 — exit */
  useEffect(() => {
    if (phase !== "out") return;
    const id = setTimeout(onDone, 1500);
    return () => clearTimeout(id);
  }, [phase, onDone]);

  const R = 54;
  const CIRC = 2 * Math.PI * R;

  return (
    <motion.div
      className="fixed inset-0 z-[400] flex items-center justify-center overflow-hidden bg-black"
      animate={phase === "out" ? { clipPath: "inset(0 0 100% 0)" } : { clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 1.5, ease: EASE }}
    >
      {/* subtle vignette + drifting glow for depth */}
      <motion.div
        animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.09),transparent_65%)] blur-2xl"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_65%_at_50%_50%,transparent_0%,rgba(0,0,0,0.85)_100%)]" />

      {/* content */}
      <div className="relative flex h-40 w-full items-center justify-center px-6">
        {scenes.map((scene, index) => {
          const active = phase === "words" && wordIndex === index;
          const passed = phase !== "words" || wordIndex > index;

          return (
            <motion.p
              key={scene.text}
              initial={{ opacity: 0, y: 18, filter: "blur(14px)", letterSpacing: "0.5em" }}
              animate={
                active
                  ? { opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.22em" }
                  : passed
                    ? { opacity: 0, y: -14, filter: "blur(12px)", letterSpacing: "0.3em" }
                    : { opacity: 0, y: 16, filter: "blur(12px)", letterSpacing: "0.42em" }
              }
              transition={{ duration: active ? scene.enter : 0.65, ease: EASE }}
              className="pointer-events-none absolute text-center text-[clamp(1.1rem,3.4vw,2.2rem)] font-light uppercase tracking-[0.22em] text-white"
            >
              {scene.text}
            </motion.p>
          );
        })}

        <AnimatePresence>
          {phase !== "words" && (
            <motion.div
              key="ring"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="relative flex items-center justify-center"
            >
              <svg width="132" height="132" viewBox="0 0 132 132" className="-rotate-90">
                <circle
                  cx="66"
                  cy="66"
                  r={R}
                  fill="none"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="1"
                />
                <circle
                  cx="66"
                  cy="66"
                  r={R}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC - (progress / 100) * CIRC}
                />
              </svg>
              <span className="absolute font-mono text-[11px] tabular-nums tracking-[0.2em] text-white/85">
                {String(Math.round(progress)).padStart(3, "0")}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* signature */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "out" ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-sm font-semibold tracking-tight text-white">Ravin Fernando</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/40">
          Photography
        </span>
      </motion.div>
    </motion.div>
  );
}
