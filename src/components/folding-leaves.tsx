"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Leaf = {
  title: string;
  paragraphs: string[];
  src: string;
  alt: string;
  className: string;
};

type FoldingLeavesProps = {
  leaves: Leaf[];
};

const HOLD = 0.7;

// Four leaves of one sheet, always in view: scrolling folds the open leaf down
// to its spine as the next one opens. Without motion they simply stack.
export function FoldingLeaves({ leaves }: FoldingLeavesProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const section = root.current;
        if (!section) return;
        section.dataset.folding = "";

        const items = gsap.utils.toArray<HTMLElement>("[data-leaf]");
        const parts = (leaf: HTMLElement) => ({
          body: leaf.querySelector("[data-body]"),
          spine: leaf.querySelector("[data-spine]"),
        });

        items.forEach((leaf, i) => {
          const { body, spine } = parts(leaf);
          gsap.set(i === 0 ? spine : body, { opacity: 0 });
        });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        items.slice(1).forEach((leaf, i) => {
          const start = HOLD + i * (1 + HOLD);
          const closing = items[i];
          const out = parts(closing);
          const next = parts(leaf);
          timeline
            .to(closing, { flexGrow: 0, duration: 1 }, start)
            .to(leaf, { flexGrow: 1, duration: 1 }, start)
            .to(next.spine, { opacity: 0, duration: 0.25 }, start)
            .to(next.body, { opacity: 1, duration: 0.25 }, start)
            .to(out.body, { opacity: 0, duration: 0.25 }, start + 0.75)
            .to(out.spine, { opacity: 1, duration: 0.25 }, start + 0.75);
        });
        timeline.to({}, { duration: HOLD });

        return () => {
          delete section.dataset.folding;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="leaves relative z-10 bg-ink">
      <div className="leaves-stage">
        {leaves.map((leaf, i) => (
          <article
            key={leaf.title}
            data-leaf
            className={`leaf ${leaf.className}`}
          >
            <div data-spine aria-hidden="true" className="leaf-spine">
              <span>0{i + 1}</span>
              <span>{leaf.title}</span>
            </div>
            <div
              data-body
              className="leaf-body flex flex-col gap-4 px-4 py-10 md:gap-6 md:px-6"
            >
              <h2 className="text-[9.5vw] leading-[1.02] font-extrabold tracking-tight text-balance md:text-[min(5.4vw,10svh)]">
                {leaf.title}
              </h2>
              <div className="leaf-content flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
                <div className="space-y-3 text-base leading-snug font-medium md:space-y-4 md:text-[min(1.7vw,3svh)]">
                  {leaf.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="leaf-photo relative overflow-hidden">
                  <Image
                    src={leaf.src}
                    alt={leaf.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
