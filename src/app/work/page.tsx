import type { Metadata } from "next";
import Image from "next/image";
import { CountUp } from "@/components/count-up";
import { FoldCanvas } from "@/components/fold-canvas";
import { NextChapter } from "@/components/next-chapter";
import { PhotoGrid } from "@/components/photo-grid";
import { WordReveal } from "@/components/word-reveal";
import { ZoomWord } from "@/components/zoom-word";

export const metadata: Metadata = {
  title: "Our Work & Experiences | Unfold",
  description: "We don’t just talk about ideas. We bring them to life.",
};

const HALLOWEEN_IMAGE = "/images/hallowen/4T8B4912.jpeg";

const SIP_AND_PAINT_PHOTOS = [
  {
    src: "/images/morphs-corner/4T8B4723.jpg",
    alt: "Guests painting on small easels at a table under green neon light",
  },
  {
    src: "/images/morphs-corner/4T8B4659.jpg",
    alt: "A speaker on stage with a microphone",
  },
  {
    src: "/images/morphs-corner/4T8B4728.jpg",
    alt: "A person in an apron painting on canvas while holding up a phone",
  },
  {
    src: "/images/morphs-corner/4T8B4730.jpg",
    alt: "A wide view of a full lounge during the event",
  },
  {
    src: "/images/morphs-corner/4T8B4717.jpg",
    alt: "Guests leaning in over canvases on easels",
  },
  {
    src: "/images/morphs-corner/4T8B4674.jpg",
    alt: "Two guests smiling, a photographer behind them",
  },
];

const CREDIT = "mb-4 border-b pb-3 font-mono text-xs uppercase";
const TITLE =
  "text-[11vw] leading-[1.02] font-extrabold tracking-tight text-balance md:text-[7.4vw]";
const SENTENCE =
  "text-[8.6vw] leading-[1.06] font-extrabold tracking-tight text-balance md:text-[5vw]";

export default function WorkPage() {
  return (
    <main>
      <ZoomWord
        src="/images/morphs-corner/4T8B4723.jpg"
        alt="Guests painting on small easels at a table under green neon light"
        label="Our Work & Experiences"
        lead={["We don’t just talk about ideas.", "We bring them to"]}
      />

      <section className="relative z-10 bg-paper px-4 py-24 text-ink md:px-6 md:py-40">
        <WordReveal className="text-[9.5vw] leading-[1.02] font-extrabold tracking-tight md:text-[6.2vw]">
          Our work takes different forms, depending on the story we want to tell
          and the experience we want to create.
        </WordReveal>
        <p className="mt-14 max-w-[42ch] text-xl leading-snug font-medium md:mt-24 md:ml-[50vw] md:text-2xl">
          From community campaigns and creator initiatives to creative shoots
          and collaborative productions, we experiment with different ways to
          connect people with ideas.
        </p>
      </section>

      <section className="relative z-10 bg-ink px-4 pt-20 pb-10 md:px-6 md:pt-28">
        <h2 className="stretch text-[17vw] leading-[0.9] font-extrabold tracking-tight [--wdth:72] md:text-[11.5vw] md:[--wdth:100]">
          Selected Work
        </h2>
      </section>

      <article className="relative z-10 bg-signal px-4 py-16 text-ink md:px-6 md:py-24">
        <h3>
          <span className={`${CREDIT} block border-ink/40`}>
            <span className="mr-3">01</span>MorphsCorner —
          </span>
          <span className={`${TITLE} block`}>30 Days of Morfi</span>
        </h3>
        <p className="mt-16 text-[9.5vw] leading-[1.02] font-extrabold tracking-tight md:mt-28 md:text-[8vw]">
          <span className="block text-2xl font-medium tracking-tight md:text-[2.6vw]">
            A community-led campaign that generated over
          </span>
          <span className="mt-2 block text-[21vw] leading-none md:text-[15vw]">
            <CountUp value={2500} /> posts
          </span>
          <span className="mt-4 block text-2xl font-medium tracking-tight md:text-[2.6vw]">
            and
          </span>
          <span className="mt-2 block text-[17vw] leading-none md:text-[15vw]">
            <CountUp value={7.4} decimals={1} /> million views.
          </span>
        </p>
      </article>

      <article className="relative z-10 bg-ink px-4 py-16 md:px-6 md:py-24">
        <h3>
          <span className={`${CREDIT} block border-paper/40`}>
            <span className="mr-3 text-signal">02</span>MorphsCorner —
          </span>
          <span className={`${TITLE} block`}>Sip &amp; Paint 1.0</span>
        </h3>
        <div className="mt-10 mb-12 md:mt-16 md:mb-20">
          <p className={SENTENCE}>
            A physical creative gathering that brought{" "}
            <span className="text-signal">
              <CountUp value={60} /> community members
            </span>{" "}
            together in Lagos.
          </p>
        </div>
        <PhotoGrid photos={SIP_AND_PAINT_PHOTOS} />
      </article>

      <article className="relative z-10 bg-kraft text-ink">
        <div className="px-4 pt-16 pb-10 md:px-6 md:pt-24 md:pb-14">
          <h3>
            <span className={`${CREDIT} block border-ink/40`}>
              <span className="mr-3">03</span>Unfold × Zuva Network × Phoenix
              Token —
            </span>
            <span className={`${TITLE} block`}>Halloween Creative Shoot</span>
          </h3>
        </div>
        <div className="relative h-svh overflow-hidden bg-ink">
          <Image
            src={HALLOWEEN_IMAGE}
            alt="Six people in a yard with paper bags over their heads, pumpkin faces drawn on the bags and Unfold written on the side"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <FoldCanvas
            src={HALLOWEEN_IMAGE}
            unfoldOnEnter
            className="absolute inset-0"
          />
        </div>
        <div className="px-4 py-16 md:px-6 md:py-28">
          <div className="grid gap-6 text-xl leading-snug font-medium md:grid-cols-2 md:gap-6 md:text-2xl">
            <p>
              A creative production bringing together Unfold, Zuva Network, and
              Phoenix Token for a Halloween-themed visual collaboration.
            </p>
            <p>
              The project explored creative storytelling through themed visuals,
              brand integration, and collaborative production.
            </p>
          </div>
          <WordReveal className={`mt-16 md:mt-28 ${SENTENCE}`}>
            It reflects our approach to partnerships: finding creative ways to
            bring brands, communities, and ideas into stories people can engage
            with.
          </WordReveal>
        </div>
      </article>

      <NextChapter
        href="/what-we-believe"
        title="What We Believe"
        line="Attention is earned."
      />
    </main>
  );
}
