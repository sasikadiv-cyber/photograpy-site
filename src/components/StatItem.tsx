import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

export function StatItem({
  value,
  label,
  delay = 0.1,
  size = "sm",
}: {
  value: string;
  label: string;
  delay?: number;
  size?: "sm" | "lg";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const target = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, "");
  const digits = String(target).length;
  const [display, setDisplay] = useState(String("0").padStart(digits, "0") + suffix);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v)).padStart(digits, "0") + suffix),
    });
    return () => controls.stop();
  }, [inView, target, suffix, digits, delay]);

  if (size === "lg") {
    return (
      <div ref={ref}>
        <p className="font-serif text-4xl font-light tabular-nums text-bone md:text-5xl">
          {display}
        </p>
        <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-fog">{label}</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex items-baseline gap-2 md:gap-2.5">
      <span className="text-base font-medium tabular-nums tracking-tight text-bone md:text-xl">
        {display}
      </span>
      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/50 md:text-[9px] md:tracking-[0.25em]">
        {label}
      </span>
    </div>
  );
}
