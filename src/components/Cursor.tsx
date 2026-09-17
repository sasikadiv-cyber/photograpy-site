import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-fine");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      const tag = target.closest("[data-cursor]");
      setLabel(tag ? tag.getAttribute("data-cursor") : null);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.classList.remove("cursor-none-fine");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[300] flex items-center justify-center"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{
          width: label ? 72 : 10,
          height: label ? 72 : 10,
          scale: pressed ? 0.85 : 1,
          backgroundColor: label ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,1)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="flex items-center justify-center rounded-full mix-blend-difference"
      >
        {label && (
          <span className="select-none text-[9px] font-normal uppercase tracking-[0.22em] text-ink">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
