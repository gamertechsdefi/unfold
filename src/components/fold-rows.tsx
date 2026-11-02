"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type FoldRowsProps = {
  rows: string[];
};

// One sentence, broken into rows that each fold down from their top edge.
export function FoldRows({ rows }: FoldRowsProps) {
  const root = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        for (const row of gsap.utils.toArray<HTMLElement>("[data-row]")) {
          gsap.fromTo(
            row,
            { rotateX: -75, opacity: 0.15 },
            {
              rotateX: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 92%",
                end: "top 58%",
                scrub: true,
              },
            },
          );
        }
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <p ref={root} className="[perspective:1400px]">
      {rows.map((row) => (
        <span
          key={row}
          data-row
          className="block origin-top border-t border-paper/25 py-4 text-[9.5vw] leading-[1.02] font-extrabold tracking-tight text-balance md:py-6 md:text-[5.6vw]"
        >
          {row}
        </span>
      ))}
    </p>
  );
}
