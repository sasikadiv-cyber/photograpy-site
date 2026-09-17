import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { EASE } from "./Reveal";

export const serviceOptions = [
  "Portrait",
  "Editorial",
  "Wedding / Event",
  "Landscape / Prints",
];

type Fields = { name: string; email: string; date: string; message: string };
const empty: Fields = { name: "", email: "", date: "", message: "" };

const inputBase =
  "w-full rounded-2xl border border-line bg-white/[0.02] px-5 py-4 text-sm text-bone placeholder:text-fog/70 outline-none transition-all duration-500 focus:border-bone/50 focus:bg-white/[0.04]";

export function BookingFields({
  compact = false,
  defaultService,
}: {
  compact?: boolean;
  defaultService?: string;
}) {
  const [fields, setFields] = useState<Fields>(empty);
  const [service, setService] = useState(defaultService ?? serviceOptions[0]);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Fields> = {};
    if (!fields.name.trim()) next.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) next.email = "Enter a valid email";
    if (!fields.message.trim()) next.message = "Tell me a little about the shoot";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
    setFields(empty);
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.6, ease: EASE }}
          className={`flex flex-col items-center justify-center text-center ${
            compact ? "min-h-[320px]" : "min-h-[420px]"
          }`}
        >
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-bone"
          >
            <Check className="h-6 w-6 text-ink" strokeWidth={1.75} />
          </motion.span>
          <h3 className="mt-7 text-2xl font-medium tracking-tight text-bone">Enquiry received</h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone/55">
            Thank you — I'll get back to you within 48 hours to talk through the details.
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-8 rounded-full border border-line px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/70 transition-colors duration-500 hover:border-bone/60 hover:text-bone"
          >
            Send another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={submit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
              Type of shoot
            </label>
            <div className="mt-3.5 flex flex-wrap gap-2.5">
              {serviceOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setService(s)}
                  className={`rounded-full border px-5 py-2.5 text-xs transition-all duration-500 ${
                    service === s
                      ? "border-bone bg-bone text-ink"
                      : "border-line text-fog hover:border-fog/60 hover:text-bone"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
                Name
              </label>
              <input
                type="text"
                value={fields.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your full name"
                className={`mt-3 ${inputBase} ${errors.name ? "border-white/60" : ""}`}
              />
              {errors.name && <p className="mt-2 text-[11px] text-bone/60">{errors.name}</p>}
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
                Email
              </label>
              <input
                type="email"
                value={fields.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@email.com"
                className={`mt-3 ${inputBase} ${errors.email ? "border-white/60" : ""}`}
              />
              {errors.email && <p className="mt-2 text-[11px] text-bone/60">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
              Preferred date <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="date"
              value={fields.date}
              onChange={(e) => set("date", e.target.value)}
              className={`mt-3 ${inputBase} [color-scheme:dark]`}
            />
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
              Project details
            </label>
            <textarea
              rows={compact ? 3 : 4}
              value={fields.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Location, mood, timeline — anything that helps."
              className={`mt-3 resize-none ${inputBase} ${errors.message ? "border-white/60" : ""}`}
            />
            {errors.message && <p className="mt-2 text-[11px] text-bone/60">{errors.message}</p>}
          </div>

          <button
            type="submit"
            data-cursor="Send"
            className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-bone px-8 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]"
          >
            Send enquiry
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
