import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "./Reveal";

const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = ({ scroll }: { scroll: number }) => setScrolled(scroll > 40);
    if (lenis) {
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }
    const fallback = () => setScrolled(window.scrollY > 40);
    fallback();
    window.addEventListener("scroll", fallback, { passive: true });
    return () => window.removeEventListener("scroll", fallback);
  }, [lenis]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled || open
            ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-black/55 via-black/20 to-transparent"
        }`}
      >
        <div
          className={`relative flex items-center justify-between px-5 transition-all duration-500 md:px-10 ${
            scrolled ? "py-5 md:py-3.5" : "py-7 md:py-5"
          }`}
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="group flex items-center text-bone"
            data-cursor="Home"
          >
            <span className="text-[15px] font-semibold tracking-tight text-bone drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] transition-opacity duration-500 group-hover:opacity-80 md:text-base">
              Ravin Fernando
            </span>
          </Link>

          {/* centered nav */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-9 md:flex">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={`group relative py-1 text-[13px] font-normal tracking-[0.02em] drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] transition-colors duration-500 ${
                    active ? "text-bone" : "text-bone/80 hover:text-bone"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute bottom-0 left-0 h-px w-full bg-bone transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      active
                        ? "scale-x-100"
                        : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
                    }`}
                  />
                </NavLink>
              );
            })}
          </nav>

          <Link
            to="/contact"
            className="hidden rounded-full bg-bone px-6 py-2.5 text-[13px] font-normal text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] md:block"
          >
            Book a shoot
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-bone drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="relative flex h-3.5 w-7 flex-col justify-between">
              <motion.span
                animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="h-[1.5px] w-full rounded-full bg-bone"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className="h-[1.5px] w-full rounded-full bg-bone"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="h-[1.5px] w-full rounded-full bg-bone"
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[110] flex flex-col justify-between bg-black px-5 pb-8 pt-28"
          >
            <nav className="flex flex-col">
              {links.map((l, i) => (
                <div key={l.to} className="overflow-hidden border-b border-line">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%", transition: { duration: 0.35 } }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.06, ease: EASE }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="group flex w-full items-center justify-between py-5 text-left"
                    >
                      <span className="text-4xl font-medium tracking-tight text-bone/90 transition-colors duration-300 group-hover:text-bone">
                        {l.label}
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 text-fog transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-bone"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-end justify-between text-xs text-fog"
            >
              <span>Colombo, Sri Lanka</span>
              <a href="mailto:hello@ravinfernando.com" className="text-bone/80">
                hello@ravinfernando.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
