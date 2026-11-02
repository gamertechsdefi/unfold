"use client";

import Image from "next/image";
import { type ReactNode, useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type SpotlightHeroProps = {
  src: string;
  alt: string;
  children: ReactNode;
};

// The photo sits under a dark veil; a soft-edged hole in the veil follows the
// pointer. Until the pointer moves, and on touch screens, the light drifts.
export function SpotlightHero({ src, alt, children }: SpotlightHeroProps) {
  const root = useRef<HTMLElement>(null);
  const veil = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const section = root.current;
        const layer = veil.current;
        if (!section || !layer) return;

        const place = (x: number, y: number) => {
          layer.style.setProperty("--x", `${x}px`);
          layer.style.setProperty("--y", `${y}px`);
        };
        const mask =
          "radial-gradient(circle var(--light) at var(--x) var(--y), rgb(0 0 0 / 0.2) 0%, rgb(0 0 0 / 0.2) 35%, black 100%)";
        layer.style.maskImage = mask;
        layer.style.webkitMaskImage = mask;
        layer.style.setProperty(
          "--light",
          `${Math.max(section.clientWidth * 0.3, 240)}px`,
        );

        const light = {
          x: section.clientWidth * 0.3,
          y: section.clientHeight * 0.35,
        };
        const render = () => place(light.x, light.y);
        render();

        const drift = gsap.timeline({
          repeat: -1,
          defaults: { duration: 3.2, ease: "sine.inOut", onUpdate: render },
        });
        drift
          .to(light, {
            x: () => section.clientWidth * 0.75,
            y: () => section.clientHeight * 0.3,
          })
          .to(light, {
            x: () => section.clientWidth * 0.6,
            y: () => section.clientHeight * 0.7,
          })
          .to(light, {
            x: () => section.clientWidth * 0.2,
            y: () => section.clientHeight * 0.55,
          })
          .to(light, {
            x: () => section.clientWidth * 0.3,
            y: () => section.clientHeight * 0.35,
          });

        const visibility = new IntersectionObserver(([entry]) => {
          if (!pointerActive) drift.paused(!entry.isIntersecting);
        });
        visibility.observe(section);

        let pointerActive = false;
        const onMove = (event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          pointerActive = true;
          drift.pause();
          const box = section.getBoundingClientRect();
          gsap.to(light, {
            x: event.clientX - box.left,
            y: event.clientY - box.top,
            duration: 0.7,
            ease: "power3.out",
            overwrite: true,
            onUpdate: render,
          });
        };
        section.addEventListener("pointermove", onMove);

        return () => {
          section.removeEventListener("pointermove", onMove);
          visibility.disconnect();
          drift.kill();
          gsap.killTweensOf(light);
          layer.style.maskImage = "";
          layer.style.webkitMaskImage = "";
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-ink px-4 pt-20 pb-6 md:px-6 md:pb-8"
    >
      <Image
        src={src}
        alt={alt}
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <div ref={veil} className="absolute inset-0 bg-ink/90" />
      <div className="relative">{children}</div>
    </section>
  );
}
