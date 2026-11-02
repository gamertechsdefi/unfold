"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";

type SiteMenuProps = {
  id: string;
  open: boolean;
  links: { href: string; label: string }[];
  onClose: () => void;
};

const COLOURS = ["bg-signal", "bg-paper", "bg-kraft"];
const EASE = [0.16, 1, 0.3, 1] as const;

// Phone navigation: strips of the sheet fold down one after another.
export function SiteMenu({ id, open, links, onClose }: SiteMenuProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onClose);

    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onClose);
    };
  }, [open, onClose]);

  const all = [{ href: "/", label: "Unfold" }, ...links];

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          id={id}
          aria-label="Menu"
          data-lenis-prevent
          initial="closed"
          animate="open"
          exit="closed"
          variants={{
            open: { transition: { staggerChildren: 0.07 } },
            closed: {
              transition: { staggerChildren: 0.05, staggerDirection: -1 },
            },
          }}
          className="fixed inset-0 z-40 flex flex-col bg-ink pt-12 [perspective:1400px] lg:hidden"
        >
          {all.map(({ href, label }, i) => (
            <motion.div
              key={href}
              variants={{
                open: { rotateX: 0, opacity: 1 },
                closed: { rotateX: reduceMotion ? 0 : -90, opacity: 0 },
              }}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
              className={`flex-1 origin-top text-ink ${COLOURS[i % COLOURS.length]}`}
            >
              <Link
                href={href}
                onClick={onClose}
                className="flex h-full items-center px-4 text-[11vw] leading-none font-extrabold tracking-tight"
              >
                {label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
