import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Reveal, RevealLine, EASE } from "../components/Reveal";
import { BookingModal } from "../components/BookingModal";
import { Lightbox } from "../components/Lightbox";
import { works, studioImage } from "../data/photos";

const services = [
  {
    index: "01",
    title: "Portrait Sessions",
    price: "From $180",
    duration: "1 – 2 hours",
    desc: "Individual, couple and family portraits — in studio or out where the light falls right.",
    includes: ["60–120 min session", "1 location", "25+ edited images", "Private online gallery"],
    service: "Portrait",
  },
  {
    index: "02",
    title: "Editorial & Fashion",
    price: "From $450",
    duration: "Half / full day",
    desc: "Concept-driven imagery for magazines, designers and brands with a point of view.",
    includes: ["Moodboard & planning", "Team coordination", "40+ edited images", "Commercial licence"],
    service: "Editorial",
  },
  {
    index: "03",
    title: "Weddings & Events",
    price: "From $900",
    duration: "6 – 12 hours",
    desc: "Quiet, unobtrusive documentary coverage — the day as it actually felt.",
    includes: ["Full-day coverage", "Second shooter option", "400+ edited images", "Print-ready files"],
    service: "Wedding / Event",
  },
  {
    index: "04",
    title: "Landscape & Prints",
    price: "On request",
    duration: "Varies",
    desc: "Commissions, fine-art prints and licensing from the archive — museum grade.",
    includes: ["Hand-graded prints", "Archival papers", "Signed editions", "Worldwide shipping"],
    service: "Landscape / Prints",
  },
];

const faqs = [
  { q: "How far in advance should I book?", a: "Portraits usually 2–3 weeks ahead; weddings and editorial commissions 2–4 months." },
  { q: "Do you travel?", a: "Yes — anywhere in Sri Lanka at no extra cost, and worldwide with travel covered." },
  { q: "When do I get the images?", a: "A short preview within 48 hours, and the full gallery inside two weeks." },
];

export function ServicesPage() {
  const [booking, setBooking] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Services — Commissions"
        title="What I"
        italic="offer"
        intro="Portraits, editorial commissions, weddings and fine-art prints — each one built around a conversation, not a package."
        image={studioImage}
      />

      {/* services */}
      <section className="relative px-5 py-24 md:px-10 md:py-36">
        <RevealLine className="absolute inset-x-5 top-0 h-px bg-line md:inset-x-10" />
        <Reveal className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">
            01 — Services
          </span>
          <RevealLine className="h-px w-16 bg-line" />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.index} delay={(i % 2) * 0.08}>
              <div className="group flex h-full flex-col rounded-[28px] border border-line p-8 transition-colors duration-500 hover:bg-white/[0.025] md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-mono text-[10px] text-fog transition-all duration-500 group-hover:border-bone group-hover:bg-bone group-hover:text-ink">
                    {s.index}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                    {s.duration}
                  </span>
                </div>

                <h3 className="mt-7 text-2xl font-medium tracking-tight text-bone md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{s.desc}</p>

                <ul className="mt-7 space-y-3 border-t border-line pt-7">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-3 text-sm text-bone/70">
                      <Check className="h-3.5 w-3.5 shrink-0 text-bone/50" strokeWidth={2} />
                      {inc}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-4 pt-9">
                  <span className="text-lg font-medium tracking-tight text-bone">{s.price}</span>
                  <button
                    onClick={() => setBooking(s.service)}
                    data-cursor="Book"
                    className="group/btn flex items-center gap-2.5 rounded-full bg-bone px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink transition-transform duration-500 hover:scale-[1.04]"
                  >
                    Booking
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:translate-x-0.5"
                      strokeWidth={1.75}
                    />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* works */}
      <section id="works" className="relative px-5 py-24 md:px-10 md:py-36">
        <RevealLine className="absolute inset-x-5 top-0 h-px bg-line md:inset-x-10" />
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">
                02 — Works
              </span>
              <RevealLine className="h-px w-16 bg-line" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight text-bone md:text-5xl">
                Recent{" "}
                <span className="font-serif font-light italic tracking-normal">commissions</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <p className="max-w-xs text-sm leading-relaxed text-fog">
              A cross-section of work delivered over the past three years. Click any frame to view.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {works.map((photo, i) => (
            <Reveal key={photo.id} delay={(i % 4) * 0.06}>
              <button
                onClick={() => setLightbox(i)}
                data-cursor="View"
                className="group block w-full text-left"
              >
                <div className="overflow-hidden rounded-[20px] bg-coal">
                  <motion.img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    initial={{ filter: "grayscale(1)", opacity: 0 }}
                    whileInView={{ filter: "grayscale(0)", opacity: 1 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 1.2, delay: (i % 4) * 0.1, ease: EASE }}
                    className="aspect-[3/4] w-full object-cover contrast-[1.06] transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2 px-0.5">
                  <span className="truncate text-xs text-bone">{photo.title}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-fog">
                    {photo.year}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* faq + booking CTA */}
      <section className="relative px-5 py-24 md:px-10 md:py-36">
        <RevealLine className="absolute inset-x-5 top-0 h-px bg-line md:inset-x-10" />
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">
                03 — FAQ
              </span>
              <RevealLine className="h-px w-16 bg-line" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 text-4xl font-medium leading-[1.05] tracking-tight text-bone md:text-5xl">
                Good to <span className="font-serif font-light italic tracking-normal">know</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <button
                onClick={() => setBooking("Portrait")}
                data-cursor="Book"
                className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-bone px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink transition-transform duration-500 hover:scale-[1.04]"
              >
                Start a booking
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                />
              </button>
            </Reveal>
          </div>

          <div className="border-t border-line">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.07}>
                <div className="border-b border-line py-8">
                  <h3 className="text-lg font-medium tracking-tight text-bone">{f.q}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-fog">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Lightbox photos={works} index={lightbox} onClose={() => setLightbox(null)} />
      <BookingModal
        open={booking !== null}
        service={booking ?? undefined}
        onClose={() => setBooking(null)}
      />
    </>
  );
}
