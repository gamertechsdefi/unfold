import type { Metadata } from "next";
import Image from "next/image";
import { FoldCanvas } from "@/components/fold-canvas";
import { FoldPanels } from "@/components/fold-panels";
import { FoldRows } from "@/components/fold-rows";
import { GrowFrame } from "@/components/grow-frame";
import { NameSwapHero } from "@/components/name-swap-hero";
import { NextChapter } from "@/components/next-chapter";
import { WordReveal } from "@/components/word-reveal";

export const metadata: Metadata = {
  title: "The Evolution | Unfold",
  description: "From MorphsCorner to Unfold.",
};

const UNFOLD_IMAGE = "/images/hallowen/4T8B4912.jpeg";

export default function EvolutionPage() {
  return (
    <main>
      <NameSwapHero />

      <section className="relative z-10 bg-paper px-4 py-24 text-ink md:px-6 md:py-40">
        <WordReveal className="text-[9.5vw] leading-[1.02] font-extrabold tracking-tight md:text-[6.2vw]">
          MorphsCorner served its purpose, but our vision continued to grow.
        </WordReveal>
      </section>

      <GrowFrame
        src="/images/morphs-corner/4T8B4657.jpg"
        alt="A speaker with a raised arm in front of a large screen reading Morph's Corner Sip and Paint"
        text="What started within a particular ecosystem gradually became an opportunity to explore something much bigger."
      />

      <section className="relative z-10 bg-ink px-4 py-24 md:px-6 md:py-40">
        <FoldRows
          rows={[
            "We wanted to tell more stories,",
            "explore more industries,",
            "collaborate with different communities,",
            "and create experiences that weren’t limited to one ecosystem.",
          ]}
        />
        <div className="mt-16 grid gap-6 md:mt-28 md:grid-cols-2 md:items-end md:gap-6">
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src="/images/morphs-corner/4T8B4666.jpg"
              alt="Five people talking on stage with microphones beside a Sip and Paint screen"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="max-w-[34ch] text-2xl leading-[1.12] font-medium tracking-tight text-balance md:text-[2.6vw]">
            We began to see an opportunity to build an independent platform that
            could explore Web3, emerging technologies, culture, creativity, and
            the people behind them.
          </p>
        </div>
      </section>

      <section className="relative z-10 h-svh overflow-hidden bg-ink">
        <Image
          src={UNFOLD_IMAGE}
          alt="Six people in a yard with paper bags over their heads, pumpkin faces drawn on the bags and Unfold written on the side"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <FoldCanvas
          src={UNFOLD_IMAGE}
          unfoldOnEnter
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(12_14_11/0.8)_0%,transparent_45%)]" />
        <p className="absolute inset-x-0 top-0 px-4 pt-14 text-[11vw] leading-none font-extrabold tracking-tight text-balance md:px-6 md:pt-16 md:text-[7.4vw]">
          That thinking gave birth to{" "}
          <span className="text-signal">Unfold.</span>
        </p>
      </section>

      <section className="relative z-10 bg-kraft px-4 py-24 text-ink md:px-6 md:py-40">
        <WordReveal className="text-[9.5vw] leading-[1.02] font-extrabold tracking-tight md:text-[6.2vw]">
          Unfold carries the foundation of MorphsCorner forward: storytelling,
          community, creativity, and participation.
        </WordReveal>
        <p className="mt-14 max-w-[42ch] text-xl leading-snug font-medium md:mt-24 md:ml-[50vw] md:text-2xl">
          However, it gives us the freedom to operate independently, explore new
          opportunities, and build beyond the boundaries of a single ecosystem.
        </p>
      </section>

      <FoldPanels
        textClassName="text-[11vw] leading-[1.02] font-extrabold tracking-tight text-balance md:text-[min(7.4vw,14svh)]"
        panels={[
          {
            text: "MorphsCorner gave us our foundation.",
            className: "bg-paper text-ink",
          },
          {
            text: "Unfold gives us room to grow.",
            className: "bg-signal text-ink",
          },
        ]}
      />

      <section className="relative z-10 bg-ink px-4 py-28 md:px-6 md:py-44">
        <WordReveal className="text-[9.5vw] leading-[1.02] font-extrabold tracking-tight md:text-[6.2vw]">
          This is not an abandonment of our roots. It’s an{" "}
          <span className="text-signal">expansion</span> of what we believe
          media and community can become.
        </WordReveal>
      </section>

      <NextChapter
        href="/what-we-do"
        title="What We Do"
        line="We make ideas interesting."
      />
    </main>
  );
}
