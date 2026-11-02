"use client";

import { ArrowDownIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef } from "react";
import { FoldCanvas } from "@/components/fold-canvas";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const HERO_IMAGE = "/images/hallowen/4T8B4912.jpeg";
const PILLARS = ["Media.", "Technology.", "Culture.", "Experiences."];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // The sheet tips away from its top edge as the next page slides over it.
        gsap.to(sheet.current, {
          rotateX: 16,
          scale: 0.9,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
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
      className="sticky top-0 h-svh overflow-hidden bg-ink [perspective:1600px]"
    >
      <div ref={sheet} className="absolute inset-0 origin-top">
        <Image
          src={HERO_IMAGE}
          alt="Six people in a yard with paper bags over their heads, pumpkin faces drawn on the bags and Unfold written on the side"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <FoldCanvas src={HERO_IMAGE} className="absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(12_14_11/0.72)_0%,transparent_38%,transparent_55%,rgb(12_14_11/0.92)_100%)]" />

        <div className="absolute inset-0 flex flex-col justify-between px-4 pt-12 pb-4 md:px-6 md:pt-12 md:pb-6">
          <h1
            aria-label="Unfold"
            className="stretch flex justify-between text-[29.5vw] leading-[0.9] font-extrabold tracking-tight uppercase md:text-[18.1vw]"
          >
            {"UNFOLD".split("").map((letter, i) => (
              <span
                // Letters are static and the word never reorders.
                // biome-ignore lint/suspicious/noArrayIndexKey: see above
                key={i}
                aria-hidden="true"
                className="hero-letter stretch"
                style={{ "--i": i } as React.CSSProperties}
              >
                {letter}
              </span>
            ))}
          </h1>

          <div>
            <p className="max-w-[24ch] text-2xl leading-[1.08] font-medium tracking-tight text-balance md:max-w-[30ch] md:text-[2.6vw]">
              We tell stories, build communities, and create experiences around
              the things shaping tomorrow.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-x-4 border-t border-paper/40 pt-3 font-mono text-xs uppercase md:mt-8 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
              {PILLARS.map((pillar) => (
                <span key={pillar}>{pillar}</span>
              ))}
              <ArrowDownIcon
                aria-hidden="true"
                className="hidden animate-bounce text-signal md:block"
                size={16}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
