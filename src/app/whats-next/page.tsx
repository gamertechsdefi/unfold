import type { Metadata } from "next";
import { FoldRows } from "@/components/fold-rows";
import { NextChapter } from "@/components/next-chapter";
import { OutgrownBox } from "@/components/outgrown-box";
import { PeelSheet } from "@/components/peel-sheet";
import { WordReveal } from "@/components/word-reveal";

export const metadata: Metadata = {
  title: "What’s Next? | Unfold",
  description: "There is more to unfold.",
};

const STATEMENT =
  "text-[9.5vw] leading-[1.02] font-extrabold tracking-tight md:text-[6.2vw]";

export default function WhatsNextPage() {
  return (
    <main>
      <PeelSheet
        front={
          <div className="flex min-h-svh flex-col justify-end bg-ink px-4 pt-20 pb-6 md:px-6 md:pb-8">
            <p className="mb-6 border-b border-paper/40 pb-3 font-mono text-xs uppercase">
              <span className="mr-3 text-signal">06</span>What’s Next?
            </p>
            <h1 className="font-extrabold tracking-tight">
              <span className="block text-[14.5vw] leading-[0.98] md:text-[min(8.6vw,17svh)]">
                There is more to
              </span>
              <span
                className="hero-letter stretch block text-[26.5vw] leading-[0.95] text-signal md:text-[min(21.8vw,40svh)]"
                style={{ "--i": 2 } as React.CSSProperties}
              >
                unfold.
              </span>
            </h1>
          </div>
        }
        under={
          <div className="flex min-h-svh items-center bg-paper px-4 py-20 text-ink md:px-6">
            <p className={STATEMENT}>
              We are building towards a future where media, technology, and
              experiences work together.
            </p>
          </div>
        }
      />

      <section className="relative z-10 bg-ink px-4 py-24 md:px-6 md:py-40">
        <FoldRows
          rows={[
            "Our focus includes developing original media formats,",
            "documenting interesting people and innovations,",
            "building creative partnerships,",
            "and creating experiences that bring different communities together.",
          ]}
        />
      </section>

      <section className="relative z-10 bg-kraft px-4 py-24 text-ink md:px-6 md:py-40">
        <WordReveal className={STATEMENT}>
          We are also exploring digital infrastructure and new ways for people
          to discover, interact with, and participate in what we create.
        </WordReveal>
      </section>

      <OutgrownBox text="We don’t want to be limited by a particular platform, industry, or format." />

      <section className="relative z-10 bg-paper px-4 py-24 text-ink md:px-6 md:py-40">
        <WordReveal className={STATEMENT}>
          We want the freedom to explore, experiment, and tell stories wherever
          there is something worth discovering.
        </WordReveal>
      </section>

      <NextChapter
        href="/be-part-of-it"
        title="Be Part of It"
        line="There’s always more to discover."
      />
    </main>
  );
}
