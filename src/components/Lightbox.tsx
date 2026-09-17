import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "../data/photos";
import { EASE } from "./Reveal";

export function Lightbox({
  photos,
  index,
  onClose,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
}) {
  const lenis = useLenis();
  const [current, setCurrent] = useState<number>(index ?? 0);
  const [dir, setDir] = useState(1);
  const open = index !== null;
  const lastIndex = useRef(0);

  // sync when opened from the grid
  useEffect(() => {
    if (index !== null) {
      setCurrent(index);
      lastIndex.current = index;
    }
  }, [index]);

  // lock scroll while open
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      return () => {
        lenis?.start();
        document.body.style.overflow = "";
      };
    }
  }, [open, lenis]);

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setCurrent((c) => (c + d + photos.length) % photos.length);
    },
    [photos.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  const photo = photos[open ? current : lastIndex.current];

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[150] flex flex-col bg-ink/[0.985] backdrop-blur-md"
          data-lenis-prevent
        >
          {/* top bar */}
          <div className="flex items-center justify-between px-5 py-5 md:px-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
              {String(current + 1).padStart(2, "0")}
              <span className="mx-1.5 text-fog/50">/</span>
              {String(photos.length).padStart(2, "0")}
            </span>
            <button
              onClick={onClose}
              data-cursor="Close"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-bone/80 transition-all duration-500 hover:border-bone/40 hover:bg-bone hover:text-ink"
              aria-label="Close"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* image */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-5 md:px-24">
            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0, x: dir * 90, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir * -90, scale: 0.98 }}
                transition={{ duration: 0.6, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.55}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                className="flex max-h-full items-center justify-center"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  draggable={false}
                  className="max-h-[60vh] w-auto max-w-full select-none rounded-xl object-contain md:max-h-[68vh]"
                />
              </motion.div>
            </AnimatePresence>

            {/* arrows */}
            <button
              onClick={() => go(-1)}
              data-cursor="Prev"
              className="absolute left-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line text-bone/70 transition-all duration-500 hover:border-bone/40 hover:bg-bone hover:text-ink md:flex lg:left-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <button
              onClick={() => go(1)}
              data-cursor="Next"
              className="absolute right-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line text-bone/70 transition-all duration-500 hover:border-bone/40 hover:bg-bone hover:text-ink md:flex lg:right-10"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>

          {/* caption */}
          <div className="flex items-end justify-between px-5 py-6 md:px-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="font-serif text-2xl font-light italic text-bone md:text-3xl">
                  {photo.title}
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
                  {photo.category} — {photo.year}
                </p>
              </motion.div>
            </AnimatePresence>
            <span className="hidden text-[10px] uppercase tracking-[0.25em] text-fog md:block">
              Drag or use arrows
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
