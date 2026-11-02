"use client";

import { type ReactNode, useRef } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

type WordRevealProps = {
  children: ReactNode;
  className?: string;
};

// Words come up from a dim state as the reader scrolls through the paragraph.
export function WordReveal({ children, className }: WordRevealProps) {
  const root = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(root.current, { type: "words" });
        gsap.from(split.words, {
          opacity: 0.14,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "bottom 55%",
            scrub: true,
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <p ref={root} className={className}>
      {children}
    </p>
  );
}
