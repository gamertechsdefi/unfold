"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type GrowFrameProps = {
  src: string;
  alt: string;
  text: string;
  textClassName?: string;
};

// A small window onto the photo opens until it fills the screen.
export function GrowFrame({
  src,
  alt,
  text,
  textClassName = "text-3xl font-medium md:max-w-[34ch] md:text-[3.1vw]",
}: GrowFrameProps) {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          frame.current,
          { clipPath: "inset(16% 34% 44% 34%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
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
      className="relative z-10 h-[240svh] bg-ink motion-reduce:h-svh"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div ref={frame} className="absolute inset-0">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgb(12_14_11/0.9)_100%)]" />
        </div>
        <p
          className={`absolute inset-x-0 bottom-0 px-4 pb-8 leading-[1.08] tracking-tight text-balance md:px-6 md:pb-10 ${textClassName}`}
        >
          {text}
        </p>
      </div>
    </section>
  );
}
