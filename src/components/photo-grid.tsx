"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type PhotoGridProps = {
  photos: { src: string; alt: string }[];
};

// Prints that swing open from their left edge, like pages of a contact sheet.
export function PhotoGrid({ photos }: PhotoGridProps) {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        for (const tile of gsap.utils.toArray<HTMLElement>("[data-tile]")) {
          gsap.fromTo(
            tile,
            { rotateY: -85, opacity: 0.2 },
            {
              rotateY: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: tile.parentElement,
                start: "top 98%",
                end: "top 60%",
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
    <ul ref={root} className="grid grid-cols-2 gap-2 md:grid-cols-3">
      {photos.map((photo) => (
        <li key={photo.src} className="[perspective:1200px]">
          <div
            data-tile
            className="relative aspect-[3/2] origin-left overflow-hidden"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
