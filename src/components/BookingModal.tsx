import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";
import { BookingFields } from "./BookingFields";
import { EASE } from "./Reveal";

export function BookingModal({
  open,
  onClose,
  service,
}: {
  open: boolean;
  onClose: () => void;
  service?: string;
}) {
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[160] flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-10 backdrop-blur-md md:items-center"
          onClick={onClose}
          data-lenis-prevent
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.6, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-[28px] border border-line bg-coal p-6 md:p-10"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
                  Booking
                </span>
                <h3 className="mt-3 text-3xl font-medium tracking-tight text-bone">
                  Reserve a <span className="font-serif font-light italic">date</span>
                </h3>
                {service && (
                  <p className="mt-2 text-sm text-fog">
                    Selected service — <span className="text-bone/80">{service}</span>
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                data-cursor="Close"
                aria-label="Close booking form"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-bone/80 transition-all duration-500 hover:border-bone hover:bg-bone hover:text-ink"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-8">
              <BookingFields compact defaultService={service} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
