"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const AREAS = [
  {
    title: "Media & Storytelling",
    text: "We create and distribute content that makes complex ideas easier to understand and interesting to explore.",
    src: "/images/morphs-corner/4T8B4656.jpg",
    alt: "Two hosts speaking into microphones in front of a large green screen",
  },
  {
    title: "Technology & Innovation",
    text: "We explore the products, people, and innovations shaping the digital world.",
    src: "/images/morphs-corner/4T8B4702.jpg",
    alt: "People seated on a sofa with their phones, beside a table with a laptop",
  },
  {
    title: "Community & Ecosystem Building",
    text: "We connect people, creators, projects, and communities through meaningful initiatives.",
    src: "/images/morphs-corner/4T8B4665.jpg",
    alt: "A group gathered on stage with microphones in front of a Sip and Paint screen",
  },
  {
    title: "Creative Productions & Experiences",
    text: "We bring ideas to life through visual productions, events, interactive formats, and community-led experiences.",
    src: "/images/morphs-corner/4T8B4719.jpg",
    alt: "Guests in aprons painting at easels along a long table",
  },
];

// The four areas of work, each with a photo that opens as its row scrolls in.
export function Pillars() {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        for (const row of gsap.utils.toArray<HTMLElement>("[data-row]")) {
          gsap.fromTo(
            row.querySelector("[data-photo]"),
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 96%",
                end: "top 52%",
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
    <ul ref={root}>
      {AREAS.map((area, i) => (
        <li
          key={area.title}
          data-row
          className="grid gap-4 border-t border-ink/25 py-5 md:grid-cols-[1fr_1fr_23vw] md:items-center md:gap-6"
        >
          <h3 className="text-[8.6vw] leading-[1.04] font-extrabold tracking-tight text-balance md:text-[3.1vw]">
            <span className="mr-3 align-middle font-mono text-xs font-normal tracking-normal">
              0{i + 1}
            </span>
            {area.title}
          </h3>
          <p className="text-lg leading-snug font-medium md:text-[1.6vw]">
            {area.text}
          </p>
          <div
            data-photo
            className="relative aspect-[5/2] w-full overflow-hidden md:aspect-[8/3]"
          >
            <Image
              src={area.src}
              alt={area.alt}
              fill
              sizes="(min-width: 768px) 23vw, 100vw"
              className="object-cover"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
