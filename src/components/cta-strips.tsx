"use client";

import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type CtaLink = { label: string; href: string };

type CtaStrip = {
  label: string;
  className: string;
  detail?: string;
  // A strip goes to one page, or lists several outside links of its own.
  href?: string;
  links?: CtaLink[];
};

type CtaStripsProps = {
  strips: CtaStrip[];
};

const STRIP =
  "group flex items-center justify-between gap-4 px-4 py-8 md:px-6 md:py-12";
const LABEL =
  "stretch text-[11vw] leading-none font-extrabold tracking-tight transition-[--wdth] duration-700 ease-out [--wdth:72] md:text-[7.4vw]";
const OUTSIDE = { target: "_blank", rel: "noopener noreferrer" };

function StripBody({ strip, href }: { strip: CtaStrip; href: string }) {
  const outside = href.startsWith("http");
  const Arrow = outside ? ArrowUpRightIcon : ArrowRightIcon;

  return (
    <>
      <span className={`${LABEL} group-hover:[--wdth:100]`}>{strip.label}</span>
      <span className="flex shrink-0 items-center gap-4">
        {strip.detail && (
          <span className="hidden font-mono text-xs md:inline">
            {strip.detail}
          </span>
        )}
        <Arrow
          aria-hidden="true"
          className="transition-transform duration-500 group-hover:translate-x-1"
          size={40}
        />
      </span>
    </>
  );
}

// Strips of the sheet that fold down in turn, widening on hover.
export function CtaStrips({ strips }: CtaStripsProps) {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        for (const strip of gsap.utils.toArray<HTMLElement>("[data-strip]")) {
          gsap.fromTo(
            strip,
            { rotateX: -80 },
            {
              rotateX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: strip.parentElement,
                start: "top 100%",
                end: "top 62%",
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
    <ul ref={root} className="relative z-10 bg-ink [perspective:1400px]">
      {strips.map((strip) => (
        <li key={strip.label}>
          <div data-strip className={`origin-top ${strip.className}`}>
            {strip.links ? (
              <div className="flex flex-col gap-5 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6 md:py-12">
                <span className={LABEL}>{strip.label}</span>
                <span className="flex flex-wrap gap-x-6 gap-y-2 text-xl font-extrabold tracking-tight md:text-[2.6vw]">
                  {strip.links.map(({ label, href }) => (
                    <a
                      key={href}
                      href={href}
                      {...OUTSIDE}
                      className="underline decoration-2 underline-offset-[0.2em] hover:no-underline"
                    >
                      {label}
                    </a>
                  ))}
                </span>
              </div>
            ) : strip.href?.startsWith("http") ? (
              <a href={strip.href} {...OUTSIDE} className={STRIP}>
                <StripBody strip={strip} href={strip.href} />
              </a>
            ) : (
              strip.href && (
                <Link href={strip.href} className={STRIP}>
                  <StripBody strip={strip} href={strip.href} />
                </Link>
              )
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
