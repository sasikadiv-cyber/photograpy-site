import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import { EASE } from "./Reveal";

export function BackToTop() {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = ({ scroll }: { scroll: number }) => setVisible(scroll > 600);
    if (lenis) {
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }
    const fallback = () => setVisible(window.scrollY > 600);
    fallback();
    window.addEventListener("scroll", fallback, { passive: true });
    return () => window.removeEventListener("scroll", fallback);
  }, [lenis]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.5, ease: EASE }}
          onClick={() => lenis?.scrollTo(0, { duration: 1.8 })}
          data-cursor="Top"
          aria-label="Back to top"
          className="group fixed bottom-6 right-5 z-[130] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-bone backdrop-blur-xl transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink md:bottom-10 md:right-10 md:h-14 md:w-14"
        >
          {/* pulsing ring */}
          <motion.span
            animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 rounded-full border border-white/40"
          />
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex"
          >
            <ArrowUp className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.75} />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
