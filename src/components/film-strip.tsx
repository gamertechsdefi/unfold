"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const FRAMES = [
  { id: "4T8B4659", alt: "A speaker on stage with a microphone" },
  { id: "4T8B4674", alt: "Two guests smiling, a photographer behind them" },
  {
    id: "4T8B4664",
    alt: "Five people on stage, one speaking into a microphone",
  },
  { id: "4T8B4730", alt: "A wide view of a full lounge during the event" },
  {
    id: "4T8B4709",
    alt: "A guest in a red scarf seated while others film in the background",
  },
  {
    id: "4T8B4719",
    alt: "Guests in aprons painting at easels along a long table",
  },
];

export function FilmStrip() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to(track.current, {
          x: () =>
            -((track.current?.scrollWidth ?? 0) - document.body.clientWidth),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative z-10 overflow-x-clip bg-ink pt-20 pb-24 motion-reduce:overflow-x-auto md:pt-32"
    >
      <p className="mb-14 max-w-[28ch] px-4 text-3xl leading-[1.08] font-medium tracking-tight text-balance md:ml-[33vw] md:max-w-[34ch] md:px-0 md:text-[3.1vw]">
        From the evolving world of Web3 to technology, creativity, and culture,
        we are interested in the people, ideas, and movements shaping the
        future.
      </p>
      <div ref={track} className="flex w-max flex-col gap-2 bg-black py-2">
        <div className="sprockets" />
        <ul className="flex gap-2 px-2">
          {FRAMES.map((frame) => (
            <li
              key={frame.id}
              className="relative aspect-[3/2] w-[78vw] md:w-[38vw]"
            >
              <Image
                src={`/images/morphs-corner/${frame.id}.jpg`}
                alt={frame.alt}
                fill
                sizes="(min-width: 768px) 38vw, 78vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
        <div className="sprockets" />
      </div>
    </section>
  );
}
