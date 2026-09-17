import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Reveal, RevealLine } from "../components/Reveal";
import { BookingFields } from "../components/BookingFields";
import { contactImage } from "../data/photos";

const details = [
  { icon: Mail, label: "Email", value: "hello@ravinfernando.com", href: "mailto:hello@ravinfernando.com" },
  { icon: Phone, label: "Phone", value: "+94 77 123 4567", href: "tel:+94771234567" },
  { icon: MapPin, label: "Studio", value: "42 Rosmead Place, Colombo 07", href: null },
  { icon: Clock, label: "Hours", value: "Mon – Sat · 9am – 6pm", href: null },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "X", href: "https://x.com" },
  { label: "WhatsApp", href: "https://wa.me/94771234567" },
];

export function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact — Booking 2026"
        title="Get in"
        italic="touch"
        intro="Tell me what you have in mind — the where, the when, the feeling you're after. Every enquiry gets a reply within 48 hours."
        image={contactImage}
      />

      <section className="relative px-5 py-24 md:px-10 md:py-36">
        <RevealLine className="absolute inset-x-5 top-0 h-px bg-line md:inset-x-10" />

        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* details */}
          <div>
            <Reveal className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">
                01 — Details
              </span>
              <RevealLine className="h-px w-16 bg-line" />
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-7 text-4xl font-medium leading-[1.05] tracking-tight text-bone md:text-5xl">
                Say <span className="font-serif font-light italic tracking-normal">hello</span>
              </h2>
            </Reveal>

            <div className="mt-12 space-y-px overflow-hidden rounded-[26px] border border-line bg-line">
              {details.map((d, i) => (
                <Reveal key={d.label} delay={0.08 + i * 0.06}>
                  <div className="flex items-center gap-5 bg-ink p-6 transition-colors duration-500 hover:bg-white/[0.03]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-bone/70">
                      <d.icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-fog">
                        {d.label}
                      </p>
                      {d.href ? (
                        <a
                          href={d.href}
                          className="mt-1.5 block truncate text-sm text-bone transition-colors duration-500 hover:text-bone/70"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <p className="mt-1.5 truncate text-sm text-bone">{d.value}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
                  Elsewhere
                </span>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-xs text-bone/70 transition-all duration-500 hover:border-bone hover:bg-bone hover:text-ink"
                    >
                      {s.label}
                      <ArrowUpRight
                        className="h-3 w-3 transition-transform duration-500 group-hover:rotate-45"
                        strokeWidth={1.5}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* booking form */}
          <div>
            <Reveal className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">
                02 — Booking
              </span>
              <RevealLine className="h-px w-16 bg-line" />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-7 rounded-[28px] border border-line bg-white/[0.015] p-6 md:p-10">
                <BookingFields />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
