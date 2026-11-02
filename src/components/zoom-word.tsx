"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type ZoomWordProps = {
  src: string;
  alt: string;
  label: string;
  lead: string[];
};

// The last word is a window onto the photo: multiply turns the ink overlay
// nearly black and leaves the white letters clear. Zooming through the stem of
// the "l" opens that window until the photo fills the screen.
export function ZoomWord({ src, alt, label, lead }: ZoomWordProps) {
  const root = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const stem = useRef<HTMLSpanElement>(null);
  const leadBlock = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const zoomToFill = () => {
          const letter = stem.current;
          const stage = overlay.current;
          if (!letter || !stage) return 1;

          let x = letter.offsetWidth / 2;
          let y = letter.offsetHeight / 2;
          for (
            let el: HTMLElement = letter;
            el !== stage;
            el = el.offsetParent as HTMLElement
          ) {
            x += el.offsetLeft;
            y += el.offsetTop;
          }
          gsap.set(stage, { transformOrigin: `${x}px ${y}px` });

          const stemWidth = letter.offsetWidth * 0.5;
          const reach = 2 * Math.max(x, stage.offsetWidth - x);
          return (reach / stemWidth) * 1.1;
        };

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .to(leadBlock.current, { opacity: 0, duration: 0.2 }, 0)
          .to(
            overlay.current,
            { scale: zoomToFill, ease: "power3.in", duration: 1 },
            0,
          )
          .set(overlay.current, { autoAlpha: 0 }, 1)
          .to({}, { duration: 0.25 }, 1);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[320svh] motion-reduce:h-svh">
      <div className="sticky top-0 isolate h-svh overflow-hidden bg-ink">
        <Image
          src={src}
          alt={alt}
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div
          ref={overlay}
          className="absolute inset-0 flex items-end justify-center bg-ink pb-[6svh] text-white mix-blend-multiply"
        >
          <h1
            aria-label={`${lead.join(" ")} life.`}
            className="relative leading-[0.8] font-extrabold tracking-tight"
          >
            <span
              aria-hidden="true"
              className="stretch relative block text-[46vw] whitespace-nowrap [--wdth:82] md:text-[min(40vw,72svh)] md:[--wdth:125]"
            >
              <span ref={stem} className="inline-block">
                l
              </span>
              ife.
            </span>
          </h1>
        </div>
        <div
          ref={leadBlock}
          aria-hidden="true"
          className="absolute inset-x-0 top-0 px-4 pt-14 text-paper md:px-6"
        >
          <p className="mb-4 border-b border-paper/40 pb-3 font-mono text-xs uppercase">
            <span className="mr-3 text-signal">04</span>
            {label}
          </p>
          {lead.map((line) => (
            <p
              key={line}
              className="text-3xl leading-[1.08] font-medium tracking-tight md:text-[min(3.6vw,7svh)]"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
