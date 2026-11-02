"use client";

import { type CSSProperties, useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const DEFAULT_TEXT =
  "text-[8.6vw] leading-[1.02] font-extrabold tracking-tight text-balance md:text-[min(6vw,9.5svh)]";
const PANEL =
  "absolute inset-x-0 top-full h-full origin-top [transform-style:preserve-3d] flex items-center";
const SHADE = "pointer-events-none absolute inset-0 bg-black opacity-0";

type Panel = {
  text: string;
  className: string;
};

type FoldPanelsProps = {
  panels: Panel[];
  textClassName?: string;
};

function HangingPanels({
  panels,
  textClassName,
}: {
  panels: Panel[];
  textClassName: string;
}) {
  const [panel, ...rest] = panels;
  if (!panel) return null;

  return (
    <div data-panel className={`${PANEL} ${panel.className}`}>
      <p className={`px-4 md:px-6 ${textClassName}`}>{panel.text}</p>
      <div data-shade className={SHADE} />
      <HangingPanels panels={rest} textClassName={textClassName} />
    </div>
  );
}

// One sheet in several panels. Each panel hangs from the bottom edge of the one
// before it, so opening them reads as a real accordion fold.
export function FoldPanels({
  panels,
  textClassName = DEFAULT_TEXT,
}: FoldPanelsProps) {
  const root = useRef<HTMLElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const [first, ...rest] = panels;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const hanging = gsap.utils.toArray<HTMLElement>("[data-panel]");
        const timeline = gsap.timeline({
          defaults: { ease: "power1.inOut" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        // The sheet stays vertically centred as it grows.
        gsap.set(sheet.current, { yPercent: hanging.length * 50 });
        hanging.forEach((panel, i) => {
          timeline
            .to(
              sheet.current,
              { yPercent: (hanging.length - i - 1) * 50, duration: 1 },
              i,
            )
            .fromTo(panel, { rotateX: -90 }, { rotateX: 0, duration: 1 }, i)
            .fromTo(
              panel.querySelector("[data-shade]"),
              { opacity: 0.75 },
              { opacity: 0, duration: 1 },
              i,
            );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative z-10 h-(--fold-height) bg-ink motion-reduce:h-svh"
      style={{ "--fold-height": `${panels.length * 100}svh` } as CSSProperties}
    >
      <div className="sticky top-0 h-svh overflow-hidden [perspective:1500px]">
        <div
          ref={sheet}
          className={`relative flex items-center [transform-style:preserve-3d] ${first.className}`}
          style={{ height: `${100 / panels.length}%` }}
        >
          <p className={`px-4 md:px-6 ${textClassName}`}>{first.text}</p>
          <HangingPanels panels={rest} textClassName={textClassName} />
        </div>
      </div>
    </section>
  );
}
