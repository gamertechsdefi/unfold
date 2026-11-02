import type { Metadata } from "next";
import { FoldingLeaves } from "@/components/folding-leaves";
import { NextChapter } from "@/components/next-chapter";

export const metadata: Metadata = {
  title: "What We Do | Unfold",
  description: "We make ideas interesting. We make stories matter.",
};

const AREAS = [
  {
    title: "Media & Storytelling",
    paragraphs: [
      "We create and distribute content that makes complex ideas easier to understand and interesting to explore.",
      "From Web3 and DeFi to emerging technologies, businesses, and culture, we use creative storytelling to connect audiences with the subjects that matter.",
    ],
    src: "/images/morphs-corner/4T8B4656.jpg",
    alt: "Two hosts speaking into microphones in front of a large green screen",
    className: "bg-signal text-ink",
  },
  {
    title: "Technology & Innovation",
    paragraphs: [
      "We explore the products, people, and innovations shaping the digital world.",
      "We are particularly interested in Web3, blockchain technology, decentralized finance, digital ownership, and emerging technologies.",
      "Our goal is to bridge the gap between innovation and everyday understanding.",
    ],
    src: "/images/morphs-corner/4T8B4702.jpg",
    alt: "People seated on a sofa with their phones, beside a table with a laptop",
    className: "bg-paper text-ink",
  },
  {
    title: "Community & Ecosystem Building",
    paragraphs: [
      "We connect people, creators, projects, and communities through meaningful initiatives.",
      "From ecosystem campaigns and creator collaborations to digital communities, we create opportunities for people to participate and grow.",
    ],
    src: "/images/morphs-corner/4T8B4665.jpg",
    alt: "A group gathered on stage with microphones in front of a Sip and Paint screen",
    className: "bg-kraft text-ink",
  },
  {
    title: "Creative Productions & Experiences",
    paragraphs: [
      "We bring ideas to life through visual productions, events, interactive formats, and community-led experiences.",
      "We believe creativity should extend beyond the screen. It should be something people can participate in and remember.",
    ],
    src: "/images/morphs-corner/4T8B4719.jpg",
    alt: "Guests in aprons painting at easels along a long table",
    className: "bg-ink text-paper",
  },
];

export default function WhatWeDoPage() {
  return (
    <main>
      <section className="flex min-h-svh flex-col justify-end bg-paper px-4 pt-20 pb-6 text-ink md:px-6 md:pb-8">
        <p className="mb-6 border-b border-ink/40 pb-3 font-mono text-xs uppercase">
          <span className="mr-3">03</span>What We Do
        </p>
        <h1 className="text-[14.5vw] leading-[0.98] font-extrabold tracking-tight md:text-[min(8.6vw,17svh)]">
          <span className="block">We make ideas</span>
          <span
            className="hero-letter stretch block"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            interesting.
          </span>
          <span className="mt-[0.15em] block">We make stories</span>
          <span
            className="hero-letter stretch block"
            style={{ "--i": 5 } as React.CSSProperties}
          >
            matter.
          </span>
        </h1>
        <p className="mt-8 max-w-[28ch] text-2xl leading-[1.1] font-medium tracking-tight md:ml-auto md:text-[min(2.6vw,5svh)]">
          Our work revolves around four interconnected areas.
        </p>
      </section>

      <FoldingLeaves leaves={AREAS} />
      <NextChapter
        href="/work"
        title="Our Work & Experiences"
        line="We bring them to life."
      />
    </main>
  );
}
