import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Hero } from "../components/Hero";
import { Works } from "../components/Works";
import { Reveal, RevealLine, EASE } from "../components/Reveal";
import { StatItem } from "../components/StatItem";
import { aboutImage, studioImage, darkroomImage, fieldImage } from "../data/photos";

const process = [
  { step: "01", title: "Conversation", text: "We talk through the idea, the mood and the practicalities." },
  { step: "02", title: "Planning", text: "Location scouting, references, schedule and shot direction." },
  { step: "03", title: "The shoot", text: "Unhurried, directed lightly — space for things to happen." },
  { step: "04", title: "Delivery", text: "Hand-graded edits in a private gallery within two weeks." },
];

const testimonials = [
  {
    quote: "Ravin made a room full of strangers feel calm. The portraits still stop me mid-scroll.",
    name: "Nadia Perera",
    role: "Creative Director, Lumen",
  },
  {
    quote: "He shoots like an editor — every frame already knows where it belongs on the page.",
    name: "Marcus Silva",
    role: "Editor, North Journal",
  },
];

const teaserImages = [
  { src: studioImage, label: "Studio" },
  { src: fieldImage, label: "On location" },
  { src: darkroomImage, label: "Darkroom" },
];

export function Home() {
  return (
    <>
      <Hero />
      <Works />

      {/* about teaser */}
      <section className="relative px-5 py-28 md:px-10 md:py-40">
        <RevealLine className="absolute inset-x-5 top-0 h-px bg-line md:inset-x-10" />
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px]">
              <motion.img
                src={aboutImage}
                alt="Ravin Fernando in the studio"
                initial={{ scale: 1.15, filter: "grayscale(1)" }}
                whileInView={{ scale: 1, filter: "grayscale(0)" }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 1.5, ease: EASE }}
                className="aspect-[4/5] w-full object-cover contrast-[1.06]"
                loading="lazy"
              />
            </div>
          </Reveal>

          <div className="flex flex-col justify-center">
            <Reveal className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">
                02 — About
              </span>
              <RevealLine className="h-px w-16 bg-line" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 text-4xl font-medium leading-[1.05] tracking-tight text-bone md:text-5xl">
                The eye behind the{" "}
                <span className="font-serif font-light italic tracking-normal">lens</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-8 max-w-lg text-sm leading-loose text-bone/60 md:text-[15px]">
                I'm Ravin — a photographer based in Colombo, working wherever the light is honest.
                For nearly a decade I've chased stillness: in faces, in fog, in the geometry of
                buildings at dusk.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line pt-8">
                <StatItem value="08+" label="Years" />
                <StatItem value="240" label="Projects" delay={0.2} />
                <StatItem value="12" label="Awards" delay={0.35} />
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <Link
                to="/about"
                className="group mt-10 inline-flex items-center gap-3 self-start rounded-full border border-line px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/80 transition-colors duration-500 hover:border-bone hover:text-bone"
              >
                More about me
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45"
                  strokeWidth={1.5}
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* process */}
      <section className="relative px-5 py-28 md:px-10 md:py-40">
        <RevealLine className="absolute inset-x-5 top-0 h-px bg-line md:inset-x-10" />
        <Reveal className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">
            03 — Process
          </span>
          <RevealLine className="h-px w-16 bg-line" />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-7 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-bone md:text-5xl">
            Simple, slow and{" "}
            <span className="font-serif font-light italic tracking-normal">considered</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.07}>
              <div className="group h-full bg-ink p-8 transition-colors duration-500 hover:bg-white/[0.03]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-mono text-[10px] text-fog transition-all duration-500 group-hover:border-bone group-hover:bg-bone group-hover:text-ink">
                  {p.step}
                </span>
                <h3 className="mt-7 text-lg font-medium tracking-tight text-bone">{p.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-fog">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* three-up imagery */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {teaserImages.map((img, i) => (
            <Reveal key={img.label} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-[22px]">
                <motion.img
                  src={img.src}
                  alt={img.label}
                  initial={{ filter: "grayscale(1)", scale: 1.08 }}
                  whileInView={{ filter: "grayscale(0)", scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.3, delay: i * 0.12, ease: EASE }}
                  className="aspect-[4/3] w-full object-cover contrast-[1.06] transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/45 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-bone backdrop-blur-md">
                  {img.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* testimonials */}
      <section className="relative px-5 py-28 md:px-10 md:py-40">
        <RevealLine className="absolute inset-x-5 top-0 h-px bg-line md:inset-x-10" />
        <Reveal className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">
            04 — Words
          </span>
          <RevealLine className="h-px w-16 bg-line" />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="h-full rounded-[28px] border border-line p-8 transition-colors duration-500 hover:bg-white/[0.02] md:p-10">
                <blockquote className="font-serif text-2xl font-light italic leading-snug text-bone/90 md:text-3xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 border-t border-line pt-6 text-sm">
                  <span className="block text-bone">{t.name}</span>
                  <span className="mt-1 block text-xs text-fog">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="px-5 pb-28 md:px-10 md:pb-40">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-line px-8 py-16 text-center md:px-16 md:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)]" />
            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-balance text-4xl font-medium leading-[1.05] tracking-tight text-bone md:text-6xl">
                Ready when the{" "}
                <span className="font-serif font-light italic tracking-normal">light</span> is.
              </h2>
              <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-fog">
                Portrait sittings, editorial commissions and weddings — booking now for 2026.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/contact"
                  data-cursor="Book"
                  className="group flex items-center gap-2.5 rounded-full bg-bone px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink transition-transform duration-500 hover:scale-[1.04]"
                >
                  Book a shoot
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </Link>
                <Link
                  to="/services"
                  className="rounded-full border border-line px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/80 transition-colors duration-500 hover:border-bone hover:text-bone"
                >
                  See services
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
