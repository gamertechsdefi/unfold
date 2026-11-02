import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";

type NextChapterProps = {
  href: string;
  title: string;
  line: string;
};

export function NextChapter({ href, title, line }: NextChapterProps) {
  return (
    <Link
      href={href}
      className="group relative z-10 block bg-signal px-4 py-10 text-ink md:px-6 md:py-14"
    >
      <span className="font-mono text-xs uppercase">{title}</span>
      <span className="mt-3 flex items-end justify-between gap-4">
        <span className="stretch text-[9.5vw] leading-none font-extrabold tracking-tight transition-[--wdth] duration-700 ease-out [--wdth:72] group-hover:[--wdth:100] md:text-[6.2vw]">
          {line}
        </span>
        <ArrowRightIcon
          aria-hidden="true"
          className="shrink-0 transition-transform duration-500 group-hover:translate-x-2"
          size={40}
        />
      </span>
    </Link>
  );
}
