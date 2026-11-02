import { SOCIALS } from "@/lib/socials";

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-ink px-4 pb-4 text-paper md:px-6">
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-paper/40 pt-3 font-mono text-xs uppercase">
        <span>Media. Technology. Culture. Experiences.</span>
        <span className="flex gap-4">
          {SOCIALS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {label}
            </a>
          ))}
        </span>
        <span>&copy; 2026 Unfold</span>
      </div>
    </footer>
  );
}
