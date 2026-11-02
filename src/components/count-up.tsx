"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type CountUpProps = {
  value: number;
  decimals?: number;
};

const format = (value: number, decimals: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

// Renders the real figure on the server; scroll only replays the count to it.
export function CountUp({ value, decimals = 0 }: CountUpProps) {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const counter = { current: 0 };
        const render = () => {
          if (root.current) {
            root.current.textContent = format(counter.current, decimals);
          }
        };
        gsap.to(counter, {
          current: value,
          ease: "none",
          onUpdate: render,
          scrollTrigger: {
            trigger: root.current,
            start: "top 92%",
            end: "top 50%",
            scrub: true,
          },
        });
        render();
        return () => {
          counter.current = value;
          render();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <span ref={root} className="tabular-nums">
      {format(value, decimals)}
    </span>
  );
}
