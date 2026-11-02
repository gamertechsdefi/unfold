import type { Metadata } from "next";
import Image from "next/image";
import { CtaStrips } from "@/components/cta-strips";
import { WordReveal } from "@/components/word-reveal";
import { SOCIALS } from "@/lib/socials";

export const metadata: Metadata = {
  title: "Join the Community | Unfold",
  description:
    "We connect people, creators, projects, and communities through meaningful initiatives.",
};

const COLOURS = [
  "bg-signal text-ink",
  "bg-paper text-ink",
  "bg-kraft text-ink",
];

const STRIPS = SOCIALS.map(({ label, href }, i) => ({
  label,
  href,
  detail: "@joinunfold",
  className: COLOURS[i],
}));

export default function JoinTheCommunityPage() {
  return (
    <main>
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-ink px-4 pt-20 pb-6 md:px-6 md:pb-8">
        <Image
          src="/images/morphs-corner/4T8B4664.jpg"
          alt="Five people on stage at a community event, one speaking into a microphone"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(12_14_11/0.85)_0%,transparent_26%,rgb(12_14_11/0.92)_78%)]" />
        <div className="relative">
          <p className="mb-6 border-b border-paper/40 pb-3 font-mono text-xs uppercase">
            <span className="mr-3 text-signal">07</span>Be Part of It
          </p>
          <h1 className="font-extrabold tracking-tight">
            <span className="block text-[14.5vw] leading-[0.98] md:text-[min(7.9vw,17svh)]">
              Join the
            </span>
            <span
              className="hero-letter stretch block text-[17.5vw] leading-[0.95] text-signal md:text-[min(13vw,28svh)]"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              community
            </span>
          </h1>
        </div>
      </section>

      <section className="relative z-10 bg-paper px-4 py-24 text-ink md:px-6 md:py-40">
        <WordReveal className="text-[9.5vw] leading-[1.02] font-extrabold tracking-tight md:text-[6.2vw]">
          We connect people, creators, projects, and communities through
          meaningful initiatives.
        </WordReveal>
        <p className="mt-14 max-w-[42ch] text-xl leading-snug font-medium md:mt-24 md:ml-[50vw] md:text-2xl">
          From ecosystem campaigns and creator collaborations to digital
          communities, we create opportunities for people to participate and
          grow.
        </p>
      </section>

      <CtaStrips strips={STRIPS} />
    </main>
  );
}
