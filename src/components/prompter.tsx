"use client";

import { useRef, useState } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

type PrompterProps = {
  lines: string[];
};

const OUT_OF_FOCUS = { opacity: 0.12, filter: "blur(7px)" };
const IN_FOCUS = { opacity: 1, filter: "blur(0px)" };

// Reads like a teleprompter: only the line at the reading mark is in focus.
export function Prompter({ lines }: PrompterProps) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((line, i) => {
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: line,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            })
            .fromTo(line.firstElementChild, OUT_OF_FOCUS, {
              ...IN_FOCUS,
              duration: 1,
            })
            .to(line.firstElementChild, { ...IN_FOCUS, duration: 0.5 })
            .to(line.firstElementChild, { ...OUT_OF_FOCUS, duration: 1 });

          ScrollTrigger.create({
            trigger: line,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) setActive(i);
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="grid grid-cols-[2.25rem_1fr] md:grid-cols-[7rem_1fr]"
    >
      <div
        aria-hidden="true"
        className="sticky top-0 flex h-svh flex-col justify-center motion-reduce:invisible"
      >
        <span className="font-mono text-xs text-signal tabular-nums">
          {String(active + 1).padStart(2, "0")}
          <span className="hidden text-paper/60 md:inline">
            /{String(lines.length).padStart(2, "0")}
          </span>
        </span>
        <span className="mt-2 flex flex-col gap-1.5">
          {lines.map((line, i) => (
            <span
              key={line}
              className={`h-0.5 transition-[width,background-color] duration-300 ${
                i === active
                  ? "w-6 bg-signal md:w-14"
                  : "w-2 bg-paper/30 md:w-4"
              }`}
            />
          ))}
        </span>
      </div>
      <ol>
        {lines.map((line) => (
          <li
            key={line}
            data-line
            className="flex min-h-[72svh] items-center py-8"
          >
            <span className="text-[9vw] leading-[1.04] font-extrabold tracking-tight text-balance md:text-[min(6vw,11svh)]">
              {line}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
