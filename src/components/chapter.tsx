import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ReactNode } from "react";

type ChapterProps = {
  number: string;
  title: string;
  href: string;
  headline: ReactNode;
  className: string;
  ruleClassName: string;
  children: ReactNode;
};

// A landing page summary of one page: its key lines and the way through to it.
export function Chapter({
  number,
  title,
  href,
  headline,
  className,
  ruleClassName,
  children,
}: ChapterProps) {
  return (
    <section
      className={`relative z-10 px-4 py-20 md:px-6 md:py-32 ${className}`}
    >
      <p
        className={`mb-8 border-b pb-3 font-mono text-xs uppercase md:mb-12 ${ruleClassName}`}
      >
        <span className="mr-3">{number}</span>
        {title}
      </p>
      <h2 className="text-[11vw] leading-[1.02] font-extrabold tracking-tight text-balance md:text-[7.4vw]">
        {headline}
      </h2>
      <div className="mt-10 md:mt-16">{children}</div>
      <Link
        href={href}
        className="group mt-12 inline-flex items-center gap-3 md:mt-20"
      >
        <span className="stretch text-3xl leading-none font-extrabold tracking-tight underline decoration-2 underline-offset-[0.2em] transition-[--wdth] duration-700 ease-out [--wdth:80] group-hover:[--wdth:125] md:text-[3.1vw]">
          {title}
        </span>
        <ArrowRightIcon
          aria-hidden="true"
          className="shrink-0 transition-transform duration-500 group-hover:translate-x-2"
          size={32}
        />
      </Link>
    </section>
  );
}
