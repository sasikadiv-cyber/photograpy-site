import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { EASE } from "./Reveal";
import { StatItem } from "./StatItem";
import { heroImage } from "../data/photos";

const stats = [
  { value: "08+", label: "Years" },
  { value: "240", label: "Projects" },
  { value: "12", label: "Awards" },
];

export function Hero() {
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* cinematic background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
        className="absolute inset-0"
      >
        <motion.div style={{ scale: bgScale }} className="h-full w-full">
          <motion.img
            src={heroImage}
            alt="Lone figure on a ridge above a sea of clouds at dawn"
            initial={{ scale: 1.25, opacity: 0 }}
            animate={{ scale: [1.25, 1.1, 1.25], opacity: 1 }}
            transition={{
              opacity: { duration: 2, ease: EASE },
              scale: { duration: 40, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
            }}
            className="h-full w-full object-cover contrast-[1.1]"
          />
        </motion.div>

        {/* cloud layers parting left & right — visible, continuous */}
        <motion.div
          initial={{ x: "10%", opacity: 0 }}
          animate={{ x: ["10%", "-60%"], opacity: [0, 0.9, 0.9, 0] }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.15, 0.75, 1],
          }}
          className="pointer-events-none absolute inset-y-0 left-0 w-[85%] bg-[radial-gradient(55%_45%_at_60%_42%,rgba(255,255,255,0.5),transparent_68%),radial-gradient(42%_34%_at_25%_62%,rgba(255,255,255,0.38),transparent_70%)] blur-2xl"
        />
        <motion.div
          initial={{ x: "-10%", opacity: 0 }}
          animate={{ x: ["-10%", "60%"], opacity: [0, 0.9, 0.9, 0] }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.15, 0.75, 1],
          }}
          className="pointer-events-none absolute inset-y-0 right-0 w-[85%] bg-[radial-gradient(55%_45%_at_40%_48%,rgba(255,255,255,0.5),transparent_68%),radial-gradient(42%_34%_at_75%_65%,rgba(255,255,255,0.38),transparent_70%)] blur-2xl"
        />
        {/* ambient mist drift */}
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_42%_at_50%_68%,rgba(255,255,255,0.3),transparent_72%)] blur-3xl"
        />

        {/* grading + readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/55" />
        <div className="absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_45%,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      </motion.div>

      {/* centered content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-24 pt-32 text-center sm:px-5 md:px-10 md:pt-36"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="block font-mono text-[8px] uppercase tracking-[0.3em] text-bone/60 sm:text-[9px] sm:tracking-[0.35em] md:text-[10px] md:tracking-[0.4em]"
        >
          Photographer — Est. MMXVI
        </motion.span>

        {/* single-line name */}
        <h1 className="mt-5 w-full overflow-hidden pb-[0.08em] pt-[0.04em] md:mt-7">
          <motion.span
            initial={{ y: "112%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.3, delay: 0.35, ease: EASE }}
            className="block whitespace-nowrap font-sans text-[clamp(2.35rem,10.2vw,9rem)] font-medium uppercase leading-[0.95] tracking-[-0.025em] text-bone"
          >
            Ravin Fernando
          </motion.span>
        </h1>

        {/* subtext directly under name */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: EASE }}
          className="mt-4 max-w-[19rem] text-balance text-[13px] leading-relaxed text-bone/65 sm:max-w-md sm:text-sm md:mt-6 md:max-w-xl md:text-base md:text-bone/70"
        >
          Portrait, editorial &amp; landscape photographer based in Colombo — crafting quiet,
          deliberate images since 2016.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95, ease: EASE }}
          className="mt-7 flex flex-nowrap items-center justify-center gap-2.5 md:mt-10 md:gap-3"
        >
          <button
            onClick={() => lenis?.scrollTo("#works", { duration: 1.6 })}
            data-cursor="View"
            className="group flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-bone px-5 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] sm:px-6 sm:text-[10px] sm:tracking-[0.2em] md:gap-2.5 md:px-7 md:py-3.5 md:tracking-[0.22em]"
          >
            View works
            <ArrowRight
              className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 md:h-3.5 md:w-3.5"
              strokeWidth={1.75}
            />
          </button>
          <Link
            to="/contact"
            data-cursor="Book"
            className="shrink-0 whitespace-nowrap rounded-full border border-bone/30 bg-ink/20 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-bone backdrop-blur-sm transition-colors duration-500 hover:border-bone/70 sm:px-6 sm:text-[10px] sm:tracking-[0.2em] md:px-7 md:py-3.5 md:tracking-[0.22em]"
          >
            Book a shoot
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-bone/15 pt-5 sm:gap-x-8 md:mt-14 md:gap-x-10 md:pt-7"
        >
          {stats.map((s, i) => (
            <StatItem key={s.label} value={s.value} label={s.label} delay={1.25 + i * 0.15} />
          ))}
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-bone/60">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-bone/20">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-1/2 bg-bone/85"
          />
        </span>
      </motion.div>
    </section>
  );
}
