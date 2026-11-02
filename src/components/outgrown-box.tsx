"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type OutgrownBoxProps = {
  text: string;
};

// A sentence squeezed into a narrow box, condensed type and all, that pushes
// the box out to the full width as you scroll.
export function OutgrownBox({ text }: OutgrownBoxProps) {
  const root = useRef<HTMLElement>(null);
  const box = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const wide = window.innerWidth >= 768;
        gsap.fromTo(
          box.current,
          { width: wide ? "36%" : "66%", "--wdth": 62 },
          {
            width: "100%",
            "--wdth": wide ? 125 : 92,
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
      className="relative z-10 h-[260svh] bg-ink motion-reduce:h-auto"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden px-4 md:px-6 motion-reduce:static motion-reduce:h-auto motion-reduce:py-24">
        <p
          ref={box}
          className="stretch w-full border-2 border-signal p-4 text-[10vw] leading-[1.04] font-extrabold tracking-tight [--wdth:92] md:p-6 md:text-[min(5.6vw,10svh)] md:[--wdth:125]"
        >
          {text}
        </p>
      </div>
    </section>
  );
}
