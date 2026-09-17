import { motion } from "framer-motion";
import { EASE } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  italic,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  intro: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden px-5 pb-14 pt-40 md:min-h-[78svh] md:px-10 md:pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute inset-0"
      >
        <motion.img
          src={image}
          alt=""
          initial={{ scale: 1.2 }}
          animate={{ scale: [1.2, 1.08, 1.2] }}
          transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full object-cover contrast-[1.08] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/60" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_65%_at_50%_45%,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
      </motion.div>

      <div className="relative z-10 w-full">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="block font-mono text-[10px] uppercase tracking-[0.4em] text-bone/60"
        >
          {eyebrow}
        </motion.span>

        <h1 className="mt-6 overflow-hidden pb-[0.08em]">
          <motion.span
            initial={{ y: "112%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            className="block text-[clamp(2.8rem,9vw,7.5rem)] font-medium uppercase leading-[0.95] tracking-[-0.02em] text-bone"
          >
            {title}
            {italic && (
              <span className="font-serif font-light normal-case italic tracking-normal">
                {" "}
                {italic}
              </span>
            )}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          className="mt-7 max-w-xl text-base leading-relaxed text-bone/65"
        >
          {intro}
        </motion.p>
      </div>
    </section>
  );
}
