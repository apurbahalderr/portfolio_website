"use client";

import ScrollExpand from "./ScrollExpand";

export default function Introduction() {
  return (
    <section id="introduction" className="relative">
      {/* ScrollExpand driven by the page scroll (useWindowScroll).
          The frame starts as a compact window and expands to full-bleed
          as the user scrolls past the hero section. */}
      <ScrollExpand
        src="/images/apurba-about.jpeg"
        alt="Apurba Halder"
        title="About Me"
        scrollHint="Scroll"
        useWindowScroll
        startWidth={38}
        startHeight={52}
        startRadius={20}
        endRadius={0}
        mediaZoom={1}
        scrollDistance={1.1}
        holdDistance={0.4}
        smoothing={0.08}
        overlayScrim={0.55}
      >
        {/* ── Overlay content: fades in once the frame reaches full bleed ── */}
        <div
          className="flex flex-col items-center justify-center gap-10 max-w-4xl mx-auto px-6"
          style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
        >
          {/* Eyebrow label */}
          <span className="text-ember text-xs font-semibold tracking-[0.35em] uppercase">
            About Me
          </span>

          {/* Main manifesto text */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white leading-[1.45] tracking-tight text-center">
            I&apos;m a Computer Science Engineering student at KIIT with a strong
            interest in building practical, scalable technology. I work across
            software development and machine learning, with experience in Java,
            DSA, React, Next.js, MongoDB, backend development, and APIs. I enjoy
            turning ideas into working products and growing into a well-rounded
            software engineer who combines solid engineering fundamentals with
            intelligent, data-driven solutions.
          </p>

        </div>
      </ScrollExpand>
    </section>
  );
}
