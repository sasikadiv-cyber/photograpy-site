import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Reveal, RevealLine, EASE } from "../components/Reveal";
import { StatItem } from "../components/StatItem";
import {
  aboutImage,
  studioImage,
  darkroomImage,
  fieldImage,
  contactImage,
} from "../data/photos";

const timeline = [
  { year: "2016", title: "First commission", text: "Left a design desk to shoot full time from a one-room studio in Colombo." },
  { year: "2019", title: "Editorial work", text: "First magazine cover; began shooting regularly for regional publications." },
  { year: "2022", title: "Into the highlands", text: "A long personal series on mist, altitude and the quiet of the hill country." },
  { year: "2025", title: "Studio & darkroom", text: "Opened a permanent studio with a working darkroom for hand-made prints." },
];

const values = [
  { title: "Patience first", text: "The best frame usually arrives after everyone has relaxed. I build time for that." },
  { title: "Light over gear", text: "Cameras are tools. Direction, timing and light do the real work." },
  { title: "Honest edits", text: "Grading that respects skin, weather and the room — never plastic, never loud." },
];

const gear = [
  "Leica M11 · 35mm Summicron",
  "Hasselblad 500C/M · 80mm",
  "Sony A7R V · 85mm GM",
  "Profoto B10 · natural modifiers",
];

export function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About — Ravin Fernando"
        title="Behind"
        italic="the lens"
        intro="A photographer from Colombo working in portraiture, editorial and landscape — drawn to quiet moments and the weather that shapes them."
        image={aboutImage}
      />

      {/* story */}
      <section className="relative px-5 py-24 md:px-10 md:py-36">
        <RevealLine className="absolute inset-x-5 top-0 h-px bg-line md:inset-x-10" />
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">
                01 — Story
              </span>
              <RevealLine className="h-px w-16 bg-line" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 text-4xl font-medium leading-[1.05] tracking-tight text-bone md:text-5xl">
                Nine years of{" "}
                <span className="font-serif font-light italic tracking-normal">looking</span>{" "}
                slowly.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-8 max-w-xl text-sm leading-loose text-bone/60 md:text-[15px]">
                I started photographing on a borrowed film body during long bus rides through the
                hill country — mostly windows, mostly weather. What began as a way to pass time
                became a way of paying attention.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-sm leading-loose text-bone/60 md:text-[15px]">
                Today I work between a studio in Colombo and wherever a commission takes me. My
                portraits lean quiet; my landscapes lean patient. I shoot digital and film, print
                by hand when the image asks for it, and I still believe a photograph should feel
                like a held breath.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="mt-10 font-serif text-3xl font-light italic text-bone/85">— Ravin</p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-line pt-10 sm:grid-cols-4">
                <StatItem value="08+" label="Years" size="lg" />
                <StatItem value="240" label="Projects" delay={0.15} size="lg" />
                <StatItem value="12" label="Awards" delay={0.3} size="lg" />
                <StatItem value="05" label="Exhibitions" delay={0.45} size="lg" />
              </div>
            </Reveal>
          </div>

          {/* stacked imagery */}
          <div className="flex flex-col gap-4">
            {[studioImage, fieldImage].map((src, i) => (
              <Reveal key={src} delay={i * 0.1}>
                <div className="overflow-hidden rounded-[26px]">
                  <motion.img
                    src={src}
                    alt="Ravin at work"
                    initial={{ filter: "grayscale(1)", scale: 1.1 }}
                    whileInView={{ filter: "grayscale(0)", scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.4, delay: i * 0.1, ease: EASE }}
                    className="aspect-[4/3] w-full object-cover contrast-[1.06]"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="relative px-5 py-24 md:px-10 md:py-36">
        <RevealLine className="absolute inset-x-5 top-0 h-px bg-line md:inset-x-10" />
        <Reveal className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">
            02 — Approach
          </span>
          <RevealLine className="h-px w-16 bg-line" />
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full bg-ink p-9 transition-colors duration-500 hover:bg-white/[0.03]">
                <h3 className="text-xl font-medium tracking-tight text-bone">{v.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-fog">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* timeline */}
      <section className="relative px-5 py-24 md:px-10 md:py-36">
        <RevealLine className="absolute inset-x-5 top-0 h-px bg-line md:inset-x-10" />
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Reveal className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">
                03 — Timeline
              </span>
              <RevealLine className="h-px w-16 bg-line" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 text-4xl font-medium leading-[1.05] tracking-tight text-bone md:text-5xl">
                A working{" "}
                <span className="font-serif font-light italic tracking-normal">history</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-10 overflow-hidden rounded-[26px]">
                <motion.img
                  src={darkroomImage}
                  alt="Camera in hand"
                  initial={{ filter: "grayscale(1)", scale: 1.1 }}
                  whileInView={{ filter: "grayscale(0)", scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.4, ease: EASE }}
                  className="aspect-[4/5] w-full object-cover contrast-[1.06]"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>

          <div className="border-t border-line">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <div className="group grid grid-cols-[72px_1fr] gap-6 border-b border-line py-8 transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-[110px_1fr] md:py-10">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-fog transition-colors duration-500 group-hover:text-bone">
                    {t.year}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight text-bone md:text-2xl">
                      {t.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-fog">{t.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* gear */}
            <Reveal delay={0.1}>
              <div className="mt-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
                  In the bag
                </span>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {gear.map((g) => (
                    <span
                      key={g}
                      className="rounded-full border border-line px-5 py-2.5 text-xs text-bone/70"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-28 md:px-10 md:pb-40">
        <Reveal>
          <div className="relative grid items-center gap-10 overflow-hidden rounded-[32px] border border-line md:grid-cols-2">
            <div className="p-9 md:p-14">
              <h2 className="text-3xl font-medium leading-[1.06] tracking-tight text-bone md:text-5xl">
                Let's work{" "}
                <span className="font-serif font-light italic tracking-normal">together</span>
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-fog">
                Tell me about the shoot you have in mind — I reply to every enquiry within 48 hours.
              </p>
              <Link
                to="/contact"
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-bone px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink transition-transform duration-500 hover:scale-[1.04]"
              >
                Get in touch
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45"
                  strokeWidth={1.75}
                />
              </Link>
            </div>
            <div className="h-full min-h-[280px] overflow-hidden">
              <img
                src={contactImage}
                alt="Portrait study"
                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
