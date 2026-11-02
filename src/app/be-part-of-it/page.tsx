import type { Metadata } from "next";
import { Closing } from "@/components/closing";
import { CtaStrips } from "@/components/cta-strips";
import { FoldPanels } from "@/components/fold-panels";
import { SpotlightHero } from "@/components/spotlight-hero";
import { WordReveal } from "@/components/word-reveal";
import { SOCIALS, X_URL } from "@/lib/socials";

export const metadata: Metadata = {
  title: "Be Part of It | Unfold",
  description: "There’s always more to discover.",
};

const STATEMENT =
  "text-[9.5vw] leading-[1.02] font-extrabold tracking-tight md:text-[6.2vw]";

const STRIPS = [
  {
    label: "Join the community",
    href: "/join-the-community",
    className: "bg-signal text-ink",
  },
  {
    label: "Partner with us",
    href: X_URL,
    className: "bg-paper text-ink",
  },
  {
    label: "Follow our work",
    links: SOCIALS,
    className: "bg-kraft text-ink",
  },
];

export default function BePartOfItPage() {
  return (
    <main>
      <SpotlightHero
        src="/images/morphs-corner/4T8B4730.jpg"
        alt="A wide view of a full lounge during a community event"
      >
        <p className="mb-6 border-b border-paper/40 pb-3 font-mono text-xs uppercase">
          <span className="mr-3 text-signal">07</span>Be Part of It
        </p>
        <h1 className="font-extrabold tracking-tight">
          <span className="block text-[14.5vw] leading-[0.98] text-balance md:text-[min(7.9vw,17svh)]">
            There’s always more to
          </span>
          <span
            className="hero-letter stretch block text-[22vw] leading-[0.95] text-signal md:text-[min(16vw,34svh)]"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            discover.
          </span>
        </h1>
      </SpotlightHero>

      <section className="relative z-10 bg-ink px-4 py-24 md:px-6 md:py-40">
        <WordReveal className={STATEMENT}>
          Whether you’re a <span className="text-signal">creator</span>,{" "}
          <span className="text-signal">technology enthusiast</span>,{" "}
          <span className="text-signal">founder</span>,{" "}
          <span className="text-signal">builder</span>,{" "}
          <span className="text-signal">brand</span>,{" "}
          <span className="text-signal">community</span>, or{" "}
          <span className="text-signal">someone curious</span> about the world
          around you, there’s an opportunity to connect with Unfold.
        </WordReveal>
      </section>

      <FoldPanels
        textClassName="text-[11vw] leading-[1.02] font-extrabold tracking-tight text-balance md:text-[min(7.4vw,14svh)]"
        panels={[
          { text: "Collaborate with us.", className: "bg-signal text-ink" },
          { text: "Share your story.", className: "bg-paper text-ink" },
          { text: "Build something together.", className: "bg-kraft text-ink" },
        ]}
      />

      <section className="relative z-10 bg-paper px-4 py-24 text-ink md:px-6 md:py-40">
        <WordReveal className={STATEMENT}>
          We are always interested in people and ideas that challenge the
          ordinary and create something meaningful.
        </WordReveal>
      </section>

      <Closing lead="Let’s" word="unfold" tail="something together." />
      <CtaStrips strips={STRIPS} />
    </main>
  );
}
