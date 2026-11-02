"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type ClosingProps = {
  lead: string;
  word: string;
  tail?: string;
};

export function Closing({ lead, word: unfolding, tail }: ClosingProps) {
  const root = useRef<HTMLElement>(null);
  const word = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          word.current,
          { "--wdth": 62 },
          {
            "--wdth": window.innerWidth >= 768 ? 125 : 92,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 85%",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative z-10 flex min-h-[80svh] flex-col justify-center bg-ink px-4 py-16 text-paper md:px-6"
    >
      <h2 className="font-extrabold tracking-tight uppercase">
        <span className="block text-[9vw] leading-none md:text-[6vw]">
          {lead}
        </span>
        <span
          ref={word}
          className="stretch block text-[21vw] leading-[0.95] whitespace-nowrap text-signal [--wdth:92] md:text-[16.6vw] md:[--wdth:125]"
        >
          {unfolding}
        </span>
        {tail && (
          <span className="block text-[9vw] leading-none md:text-[6vw]">
            {tail}
          </span>
        )}
      </h2>
    </section>
  );
}
