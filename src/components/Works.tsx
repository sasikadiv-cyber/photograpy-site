import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { works, type Photo } from "../data/photos";
import { Reveal, RevealLine, EASE } from "./Reveal";
import { Lightbox } from "./Lightbox";

const categories = ["Portrait", "Landscape", "Editorial", "Architecture"] as const;

const blurbs: Record<string, string> = {
  Portrait: "Faces, stillness and the light between gestures.",
  Landscape: "Weather, distance and the patience it asks for.",
  Editorial: "Concept-led frames for magazines and brands.",
  Architecture: "Geometry, shadow and the shape of silence.",
};

/* idle + hover transforms for the 3-card cluster */
const layout = [
  { idle: { x: "-14%", y: "3%", rotate: -8, scale: 0.94, z: 1 },
    open: { x: "-72%", y: "0%", rotate: -5, scale: 1, z: 1 } },
  { idle: { x: "0%", y: "0%", rotate: 0, scale: 1, z: 3 },
    open: { x: "0%", y: "-4%", rotate: 0, scale: 1.06, z: 3 } },
  { idle: { x: "14%", y: "3%", rotate: 8, scale: 0.94, z: 2 },
    open: { x: "72%", y: "0%", rotate: 5, scale: 1, z: 2 } },
];

function CategoryCluster({
  category,
  photos,
  onOpen,
  delay,
}: {
  category: string;
  photos: Photo[];
  onOpen: (i: number) => void;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(0);
  const isPortrait = photos[0]?.ratio === "portrait";

  /* on touch devices the cluster opens when scrolled into view */
  const clusterRef = useRef<HTMLDivElement>(null);
  const inView = useInView(clusterRef, { margin: "-38% 0px -38% 0px" });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(pointer: fine)").matches);
  }, []);

  const expanded = hovered || (isTouch && inView);

  /* alternating colour fade while idle */
  useEffect(() => {
    if (expanded) return;
    const id = setInterval(() => setActive((a) => (a + 1) % photos.length), 1500);
    return () => clearInterval(id);
  }, [expanded, photos.length]);

  return (
    <Reveal delay={delay}>
      <div
        ref={clusterRef}
        className={`group/cluster ${expanded ? "is-open" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* cluster */}
        <div className="relative flex h-[290px] items-center justify-center sm:h-[340px] lg:h-[380px]">
          {photos.slice(0, 3).map((photo, i) => {
            const t = expanded ? layout[i].open : layout[i].idle;
            const colored = expanded || active === i;
            return (
              <motion.button
                key={photo.id}
                onClick={() => onOpen(i)}
                data-cursor="View"
                aria-label={`${photo.title} — ${photo.category}`}
                initial={false}
                animate={{ x: t.x, y: t.y, rotate: t.rotate, scale: t.scale }}
                transition={{ duration: 0.75, ease: EASE }}
                style={{ zIndex: t.z }}
                className={`absolute overflow-hidden rounded-[20px] border border-white/10 bg-coal shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] ${
                  isPortrait ? "aspect-[3/4] w-[44%]" : "aspect-[4/3] w-[58%]"
                }`}
              >
                <motion.img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  animate={{ filter: colored ? "grayscale(0)" : "grayscale(1)" }}
                  transition={{ duration: 1.1, ease: EASE }}
                  className="h-full w-full object-cover contrast-[1.06]"
                />
                <span
                  className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/75 to-transparent p-3.5 transition-opacity duration-500 ${
                    expanded ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-[11px] font-normal text-bone">{photo.title}</span>
                  <span className="font-mono text-[9px] tracking-[0.15em] text-bone/70">
                    {photo.year}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* label under the cluster */}
        <div className="mt-7 flex items-end justify-between gap-4 border-t border-line pt-5">
          <div>
            <h3 className="text-2xl font-medium tracking-tight text-bone md:text-3xl">
              {category}
            </h3>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-fog">{blurbs[category]}</p>
          </div>
          <button
            onClick={() => onOpen(0)}
            className={`flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${
              expanded ? "text-bone" : "text-fog"
            }`}
          >
            {String(photos.length).padStart(2, "0")}
            <ArrowUpRight
              className={`h-3.5 w-3.5 transition-transform duration-500 ${
                expanded ? "translate-x-0.5 -translate-y-0.5" : ""
              }`}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export function Works() {
  const [openSet, setOpenSet] = useState<Photo[]>([]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const grouped = useMemo(
    () => categories.map((c) => ({ category: c, photos: works.filter((w) => w.category === c) })),
    []
  );

  return (
    <section id="works" className="relative px-5 py-28 md:px-10 md:py-44">
      {/* header */}
      <div className="mb-20 md:mb-28">
        <Reveal className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">
            01 — Selected Works
          </span>
          <RevealLine className="h-px w-16 bg-line" />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">
            ({String(works.length).padStart(2, "0")})
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-7 max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight text-bone md:text-6xl">
            Frames that <span className="font-serif font-light italic">outlive</span> the moment.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-fog">
            Four bodies of work — hover a set to spread the frames, click to view full size.
          </p>
        </Reveal>
      </div>

      {/* clusters */}
      <div className="grid gap-x-12 gap-y-20 md:grid-cols-2 md:gap-y-24">
        {grouped.map((g, i) => (
          <CategoryCluster
            key={g.category}
            category={g.category}
            photos={g.photos}
            delay={(i % 2) * 0.08}
            onOpen={(idx) => {
              setOpenSet(g.photos);
              setLightbox(idx);
            }}
          />
        ))}
      </div>

      <Lightbox photos={openSet} index={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
