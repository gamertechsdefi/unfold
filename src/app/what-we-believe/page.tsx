import type { Metadata } from "next";
import { CrossingBands } from "@/components/crossing-bands";
import { GrowFrame } from "@/components/grow-frame";
import { NextChapter } from "@/components/next-chapter";
import { Prompter } from "@/components/prompter";

export const metadata: Metadata = {
  title: "What We Believe | Unfold",
  description: "Attention is earned. Stories create connections.",
};

const BELIEFS = [
  "Technology becomes more meaningful when people understand it.",
  "Great storytelling makes complicated ideas accessible.",
  "Communities grow when people have reasons to participate.",
  "Creativity is a powerful tool for communication.",
  "Innovation deserves more than technical explanations.",
  "Experiences create connections that content alone sometimes cannot.",
  "Documenting what we build is just as important as building it.",
];

export default function WhatWeBelievePage() {
  return (
    <main>
      <section className="flex min-h-svh flex-col justify-end bg-paper px-4 pt-20 pb-6 text-ink md:px-6 md:pb-8">
        <p className="mb-6 border-b border-ink/40 pb-3 font-mono text-xs uppercase">
          <span className="mr-3">05</span>What We Believe
        </p>
        <h1 className="text-[14.5vw] leading-[0.98] font-extrabold tracking-tight md:text-[min(8.6vw,17svh)]">
          <span
            className="focus-in block"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            Attention is earned.
          </span>
          <span
            className="focus-in mt-[0.2em] block md:text-right"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Stories create connections.
          </span>
        </h1>
      </section>

      <section className="relative z-10 bg-ink px-4 pt-24 pb-[14svh] md:px-6 md:pt-36">
        <h2 className="stretch mb-[10svh] text-[17vw] leading-[0.9] font-extrabold tracking-tight text-signal [--wdth:72] md:text-[11.5vw] md:[--wdth:100]">
          We believe:
        </h2>
        <Prompter lines={BELIEFS} />
      </section>

      <CrossingBands
        sentence="We are interested in the intersection of technology and humanity."
        first="technology"
        second="humanity"
      />

      <GrowFrame
        src="/images/morphs-corner/4T8B4674.jpg"
        alt="Two guests smiling at an event, a photographer behind them"
        text="Because behind every product, protocol, community, and innovation are people with stories worth telling."
        textClassName="text-[8.6vw] font-extrabold md:max-w-[26ch] md:text-[min(4.6vw,9svh)]"
      />

      <NextChapter
        href="/whats-next"
        title="What’s Next?"
        line="There is more to unfold."
      />
    </main>
  );
}
