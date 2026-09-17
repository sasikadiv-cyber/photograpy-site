import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, RevealLine, EASE } from "./Reveal";
import { contactImage } from "../data/photos";

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "X", href: "https://x.com" },
  { label: "WhatsApp", href: "https://wa.me/94771234567" },
];

const pages = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative px-5 pt-28 md:px-10 md:pt-40">
      <RevealLine className="absolute inset-x-5 top-0 h-px bg-line md:inset-x-10" />

      <Reveal className="flex items-center gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">Contact</span>
        <RevealLine className="h-px w-16 bg-line" />
        <span className="flex items-center gap-2 text-[11px] font-normal uppercase tracking-[0.2em] text-fog">
          <span className="h-1.5 w-1.5 rounded-full bg-bone" />
          Booking 2026
        </span>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="mt-12 max-w-6xl text-[clamp(2.6rem,8vw,7rem)] font-medium leading-[0.98] tracking-tight text-bone">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, delay: 0.05, ease: EASE }}
              className="block"
            >
              Let's make something
            </motion.span>
          </span>
          <span className="mt-2 block overflow-hidden pb-[0.1em]">
            <motion.span
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="flex items-center gap-5 md:gap-6"
            >
              <span className="font-serif font-light italic tracking-normal">timeless</span>
              <span className="hidden h-[0.62em] w-[1.6em] overflow-hidden rounded-full sm:inline-block">
                <img
                  src={contactImage}
                  alt="Portrait from the archive"
                  className="h-full w-full object-cover contrast-[1.05]"
                  loading="lazy"
                />
              </span>
              <span>together.</span>
            </motion.span>
          </span>
        </h2>
      </Reveal>

      <Reveal
        delay={0.18}
        className="mt-14 flex flex-col gap-8 border-t border-line pt-10 md:mt-24 md:flex-row md:items-center md:justify-between md:gap-10 md:border-t-0 md:pt-0"
      >
        <a
          href="mailto:hello@ravinfernando.com"
          data-cursor="Say hi"
          className="group flex items-center gap-4 self-start md:gap-5"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-bone group-hover:bg-bone md:h-20 md:w-20">
            <ArrowUpRight
              className="h-4 w-4 text-bone transition-all duration-500 group-hover:rotate-45 group-hover:text-ink md:h-5 md:w-5"
              strokeWidth={1.25}
            />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="text-[10px] font-normal uppercase tracking-[0.2em] text-fog md:text-[11px]">
              Email me at
            </span>
            <span className="mt-1 break-all border-b border-transparent pb-1 text-base font-normal tracking-tight text-bone transition-colors duration-500 group-hover:border-bone/40 md:text-3xl">
              hello@ravinfernando.com
            </span>
          </span>
        </a>

        <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3 md:justify-end">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group/social flex items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-[11px] font-normal uppercase tracking-[0.12em] text-bone/60 transition-all duration-500 hover:border-bone hover:bg-bone hover:text-ink sm:px-5 sm:tracking-[0.15em]"
            >
              {s.label}
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-500 group-hover/social:rotate-45"
                strokeWidth={1.5}
              />
            </a>
          ))}
        </div>
      </Reveal>

      {/* logo + page links */}
      <Reveal delay={0.24}>
        <div className="mt-20 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="text-xl font-semibold tracking-tight text-bone md:text-2xl">
            Ravin Fernando
          </Link>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {pages.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="text-sm text-fog transition-colors duration-500 hover:text-bone"
              >
                {p.label}
              </Link>
            ))}
          </nav>
        </div>
      </Reveal>

      <div className="mt-6">
        <RevealLine className="h-px w-full bg-line" />
        <div className="flex flex-col items-center gap-1.5 py-7 text-center text-xs font-normal text-fog sm:flex-row sm:justify-center sm:gap-2">
          <span>© 2026 Ravin Fernando</span>
          <span className="hidden sm:inline">—</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
