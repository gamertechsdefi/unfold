"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type CrossingBandsProps = {
  sentence: string;
  first: string;
  second: string;
};

const BAND =
  "absolute top-[68%] left-1/2 w-[170vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden py-[0.12em] text-[17vw] leading-none font-extrabold tracking-tight text-ink mix-blend-multiply md:text-[min(9vw,16svh)]";

// Two strips of paper sliding past each other: the darker patch where they
// overlap is the intersection the sentence is talking about.
export function CrossingBands({ sentence, first, second }: CrossingBandsProps) {
  const root = useRef<HTMLElement>(null);
  const firstTrack = useRef<HTMLSpanElement>(null);
  const secondTrack = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
          .fromTo(firstTrack.current, { xPercent: -30 }, { xPercent: -5 }, 0)
          .fromTo(secondTrack.current, { xPercent: -5 }, { xPercent: -30 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative z-10 h-[220svh] bg-paper text-ink motion-reduce:h-svh"
    >
      <div className="sticky top-0 isolate h-svh overflow-hidden">
        <p className="relative px-4 pt-16 text-[9.5vw] leading-[1.02] font-extrabold tracking-tight text-balance md:px-6 md:pt-20 md:text-[min(6.2vw,10svh)]">
          {sentence}
        </p>
        <div aria-hidden="true">
          <div className={`${BAND} rotate-[-9deg] bg-signal`}>
            <span ref={firstTrack} className="block whitespace-pre">
              {`${first} `.repeat(14)}
            </span>
          </div>
          <div className={`${BAND} rotate-[9deg] bg-kraft`}>
            <span ref={secondTrack} className="block whitespace-pre">
              {`${second} `.repeat(14)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
