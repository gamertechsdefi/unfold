import Image from "next/image";
import { Chapter } from "@/components/chapter";
import { Closing } from "@/components/closing";
import { FilmStrip } from "@/components/film-strip";
import { FoldPanels } from "@/components/fold-panels";
import { Hero } from "@/components/hero";
import { Pillars } from "@/components/pillars";
import { WordReveal } from "@/components/word-reveal";

const SUMMARY =
  "text-2xl leading-[1.12] font-medium tracking-tight md:text-[2.6vw]";

const SELECTED_WORK = [
  {
    credit: "MorphsCorner —",
    title: "30 Days of Morfi",
    text: "A community-led campaign that generated over 2,500 posts and 7.4 million views.",
  },
  {
    credit: "MorphsCorner —",
    title: "Sip & Paint 1.0",
    text: "A physical creative gathering that brought 60 community members together in Lagos.",
  },
  {
    credit: "Unfold × Zuva Network × Phoenix Token —",
    title: "Halloween Creative Shoot",
    text: "A creative production bringing together Unfold, Zuva Network, and Phoenix Token for a Halloween-themed visual collaboration.",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="relative z-10 bg-paper px-4 py-24 text-ink md:px-6 md:py-40">
        <WordReveal className="text-[9.5vw] leading-[1.02] font-extrabold tracking-tight md:text-[6.2vw]">
          Unfold is an independent media and creative platform exploring the
          intersection of Web3, technology, culture, and human experiences.
        </WordReveal>
        <p className="mt-14 max-w-[42ch] text-xl leading-snug font-medium md:mt-24 md:ml-[50vw] md:text-2xl">
          We use storytelling, digital media, creative productions, and
          community-led experiences to make emerging ideas more accessible,
          connect people with innovation, and create meaningful interactions.
        </p>
      </section>

      <Chapter
        number="02"
        title="The Evolution"
        href="/evolution"
        headline={
          <>
            From MorphsCorner to <span className="text-signal">Unfold.</span>
          </>
        }
        className="bg-ink"
        ruleClassName="border-paper/40"
      >
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src="/images/morphs-corner/4T8B4657.jpg"
              alt="A speaker with a raised arm in front of a large screen reading Morph's Corner Sip and Paint"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className={SUMMARY}>
            MorphsCorner gave us our foundation. Unfold gives us room to grow.
          </p>
        </div>
      </Chapter>

      <Chapter
        number="03"
        title="What We Do"
        href="/what-we-do"
        headline="We make ideas interesting. We make stories matter."
        className="bg-paper text-ink"
        ruleClassName="border-ink/40"
      >
        <Pillars />
      </Chapter>

      <FilmStrip />

      <Chapter
        number="04"
        title="Our Work & Experiences"
        href="/work"
        headline="We don’t just talk about ideas. We bring them to life."
        className="bg-signal text-ink"
        ruleClassName="border-ink/40"
      >
        <ul>
          {SELECTED_WORK.map((work) => (
            <li
              key={work.title}
              className="grid gap-3 border-t border-ink/25 py-5 md:grid-cols-2 md:gap-6"
            >
              <h3 className="text-[8.6vw] leading-[1.04] font-extrabold tracking-tight text-balance md:text-[3.1vw]">
                <span className="mb-2 block font-mono text-xs font-normal tracking-normal uppercase">
                  {work.credit}
                </span>
                {work.title}
              </h3>
              <p className="text-lg leading-snug font-medium md:self-end md:text-[1.6vw]">
                {work.text}
              </p>
            </li>
          ))}
        </ul>
      </Chapter>

      <FoldPanels
        panels={[
          {
            text: "We believe the best stories deserve to be told,",
            className: "bg-signal text-ink",
          },
          {
            text: "the best ideas deserve an audience,",
            className: "bg-paper text-ink",
          },
          {
            text: "and communities deserve experiences worth remembering.",
            className: "bg-kraft text-ink",
          },
        ]}
      />

      <Chapter
        number="05"
        title="What We Believe"
        href="/what-we-believe"
        headline="Attention is earned. Stories create connections."
        className="bg-paper text-ink"
        ruleClassName="border-ink/40"
      >
        <p className={`max-w-[34ch] ${SUMMARY}`}>
          We are interested in the intersection of technology and humanity.
        </p>
      </Chapter>

      <Chapter
        number="06"
        title="What’s Next?"
        href="/whats-next"
        headline="There is more to unfold."
        className="bg-kraft text-ink"
        ruleClassName="border-ink/40"
      >
        <p className={`max-w-[34ch] ${SUMMARY}`}>
          We are building towards a future where media, technology, and
          experiences work together.
        </p>
      </Chapter>

      <Chapter
        number="07"
        title="Be Part of It"
        href="/be-part-of-it"
        headline="There’s always more to discover."
        className="bg-ink"
        ruleClassName="border-paper/40"
      >
        <p className={`max-w-[34ch] ${SUMMARY}`}>
          Collaborate with us. Share your story. Build something together.
        </p>
      </Chapter>

      <Closing lead="Welcome to" word="Unfold." />
    </main>
  );
}
