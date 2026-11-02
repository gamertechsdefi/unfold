"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// The old name folds shut as the new one opens, driven by scroll.
export function NameSwapHero() {
  const root = useRef<HTMLElement>(null);
  const before = useRef<HTMLSpanElement>(null);
  const after = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const wide = window.innerWidth >= 768;
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
        timeline
          .to(before.current, { "--wdth": 62, opacity: 0.3 }, 0)
          .to(after.current, { "--wdth": wide ? 125 : 92 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[220svh] motion-reduce:h-svh">
      <div className="sticky top-0 flex h-svh flex-col justify-end overflow-hidden px-4 pb-8 md:px-6 md:pb-10">
        <p className="mb-6 border-b border-paper/40 pb-3 font-mono text-xs uppercase">
          <span className="mr-3 text-signal">02</span>The Evolution
        </p>
        <h1 className="font-extrabold tracking-tight">
          <span className="block text-3xl font-medium md:text-[min(3.1vw,6svh)]">
            From
          </span>
          <span
            ref={before}
            className="stretch block text-[15.5vw] leading-none whitespace-nowrap [--wdth:78] md:text-[min(10.8vw,20svh)] md:[--wdth:125]"
          >
            MorphsCorner
          </span>
          <span className="mt-4 block text-3xl font-medium md:mt-6 md:text-[min(3.1vw,6svh)]">
            to
          </span>
          <span
            ref={after}
            className="stretch block text-[26.5vw] leading-none whitespace-nowrap text-signal [--wdth:62] md:text-[min(21.8vw,40svh)]"
          >
            Unfold.
          </span>
        </h1>
      </div>
    </section>
  );
}
