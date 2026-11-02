"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteMenu } from "@/components/site-menu";

const LINKS = [
  { href: "/evolution", label: "The Evolution" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/work", label: "Our Work" },
  { href: "/what-we-believe", label: "What We Believe" },
  { href: "/whats-next", label: "What’s Next" },
  { href: "/be-part-of-it", label: "Be Part of It" },
];

const FPS = 25;
const PX_PER_FRAME = 4;

const pad = (n: number) => String(n).padStart(2, "0");

// Scroll position read out as broadcast timecode (HH:MM:SS:FF).
function toTimecode(scrollY: number) {
  const total = Math.floor(scrollY / PX_PER_FRAME);
  const seconds = Math.floor(total / FPS);
  return [
    pad(Math.floor(seconds / 3600)),
    pad(Math.floor(seconds / 60) % 60),
    pad(seconds % 60),
    pad(total % FPS),
  ].join(":");
}

export function SiteHeader() {
  const timecode = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const update = () => {
      if (timecode.current) {
        timecode.current.textContent = toTimecode(window.scrollY);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 font-mono text-xs tracking-wide text-white mix-blend-difference md:px-6">
        <div className="pointer-events-auto flex gap-5 uppercase">
          <Link href="/" className="font-medium" onClick={closeMenu}>
            Unfold
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="cursor-pointer uppercase lg:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          <nav aria-label="Primary" className="hidden gap-5 lg:flex">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className="underline-offset-4 hover:underline aria-[current=page]:underline"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <span
          aria-hidden="true"
          className="flex items-center gap-2 tabular-nums"
        >
          <span className="size-2 animate-pulse rounded-full bg-white" />
          <span ref={timecode}>00:00:00:00</span>
        </span>
      </header>
      <SiteMenu
        id="site-menu"
        open={menuOpen}
        links={LINKS}
        onClose={closeMenu}
      />
    </>
  );
}
