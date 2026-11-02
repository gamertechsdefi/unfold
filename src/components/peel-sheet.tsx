"use client";

import { type ReactNode, useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

type PeelSheetProps = {
  front: ReactNode;
  under: ReactNode;
};

type Point = [number, number];

// Direction the crease travels along: towards the bottom-right corner.
const NORMAL: Point = [0.62, 0.785];
const HOLD = 0.08;

const along = ([x, y]: Point) => x * NORMAL[0] + y * NORMAL[1];

// Keeps the part of a polygon on one side of the crease.
function clip(polygon: Point[], crease: number, keepBeyond: boolean) {
  const inside = (p: Point) =>
    keepBeyond ? along(p) >= crease : along(p) <= crease;
  const kept: Point[] = [];

  polygon.forEach((current, i) => {
    const next = polygon[(i + 1) % polygon.length];
    if (inside(current)) kept.push(current);
    if (inside(current) !== inside(next)) {
      const t = (crease - along(current)) / (along(next) - along(current));
      kept.push([
        current[0] + (next[0] - current[0]) * t,
        current[1] + (next[1] - current[1]) * t,
      ]);
    }
  });
  return kept;
}

const reflect = (p: Point, crease: number): Point => {
  const distance = 2 * (along(p) - crease);
  return [p[0] - distance * NORMAL[0], p[1] - distance * NORMAL[1]];
};

const toClipPath = (polygon: Point[]) =>
  polygon.length < 3
    ? "polygon(0 0, 0 0, 0 0)"
    : `polygon(${polygon.map(([x, y]) => `${x}px ${y}px`).join(",")})`;

// A sheet peeled back along a diagonal crease. The corner beyond the crease is
// cut from the front and redrawn, mirrored across it, as the paper's reverse.
export function PeelSheet({ front, under }: PeelSheetProps) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const flap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const render = (progress: number) => {
          if (!stage.current || !sheet.current || !flap.current) return;

          const w = stage.current.clientWidth;
          const h = stage.current.clientHeight;
          const page: Point[] = [
            [0, 0],
            [w, 0],
            [w, h],
            [0, h],
          ];
          const peeled = gsap.utils.clamp(
            0,
            1,
            (progress - HOLD) / (1 - 2 * HOLD),
          );
          const crease = gsap.utils.interpolate(
            along([w, h]) - Math.max(44, w * 0.05),
            0,
            peeled,
          );

          sheet.current.style.clipPath = toClipPath(clip(page, crease, false));
          flap.current.style.clipPath = toClipPath(
            clip(page, crease, true).map((p) => reflect(p, crease)),
          );
        };

        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => render(self.progress),
          onRefresh: (self) => render(self.progress),
        });
        render(0);

        return () => {
          if (sheet.current) sheet.current.style.clipPath = "";
          if (flap.current)
            flap.current.style.clipPath = "polygon(0 0, 0 0, 0 0)";
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative motion-safe:h-[320svh]">
      <div
        ref={stage}
        className="motion-safe:sticky motion-safe:top-0 motion-safe:h-svh motion-safe:overflow-hidden"
      >
        <div
          ref={sheet}
          className="relative z-10 motion-safe:absolute motion-safe:inset-0"
        >
          {front}
        </div>
        <div className="motion-safe:absolute motion-safe:inset-0">{under}</div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 [filter:drop-shadow(-10px_-10px_22px_rgb(12_14_11/0.4))] motion-reduce:hidden"
        >
          <div
            ref={flap}
            className="absolute inset-0 bg-[linear-gradient(322deg,var(--kraft)_30%,#dcb68c_100%)] [clip-path:polygon(0_0,0_0,0_0)]"
          />
        </div>
      </div>
    </section>
  );
}
