"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EXPERIENCES = [
  {
    company: "OpenRag",
    role: "Frontend Developer",
    duration: "July 2025",
    description: "Developed UI for AI-based web applications with a focus on usability and performance.",
    highlights: ["Improved user interfaces for AI-based web applications."],
  },
  {
    company: "GirlScript Summer of Code",
    role: "GSSoC 2026 Contributor",
    duration: "May 2026 - Present",
    description: "Selected contributor for GirlScript Summer of Code 2026.",
    highlights: ["Selected in May 2026 as an active contributor working on open-source repositories."],
  },
  {
    company: "Konnexions",
    role: "Operations & HR Member",
    duration: "Dec 2025 - Present",
    description: "Active member in Konnexions society handling Operations & HR management.",
    highlights: ["Involved in event coordination, operations, and HR workflows."],
  },
  {
    company: "eLabs",
    role: "Java Domain Member",
    duration: "March 2026 - Present",
    description: "Active member in eLabs focusing on Java domain development.",
    highlights: ["Practicing Java programming, OOP fundamentals, and core software concepts."],
  },
  {
    company: "Hackathons",
    role: "Hackathon Competitor",
    duration: "Ongoing",
    description: "Participated in multiple hackathons building functional web prototypes.",
    highlights: ["Built web application prototypes and pitched projects in team hackathons."],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".exp-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: (i % 3) * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
    >
      {/* Divider line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-iron to-transparent"
        aria-hidden="true"
      />

      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-15 pointer-events-none blur-[150px]"
        style={{ backgroundColor: "var(--ember)" }}
      />

      <div className="section-container relative z-10">
        {/* Section Heading */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-ember inline-block rounded-full" />
            <span className="text-ember text-xs font-bold tracking-[0.25em] uppercase">
              Experience & Activities
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Experience & Roles
          </h2>
          <p className="mt-4 text-base md:text-lg text-ash max-w-xl leading-relaxed font-normal">
            Developer roles, open-source contributions, hackathons, and active participation in college tech societies.
          </p>
        </div>

        {/* Clean Boxless Editorial Experience List */}
        <div className="space-y-12 max-w-4xl mx-auto">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="exp-item group pb-12 border-b border-white/10 last:border-b-0 flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12 transition-colors duration-300"
            >
              {/* Left Column: Duration & Company */}
              <div className="md:w-1/3 flex-shrink-0">
                <span className="text-xs font-mono font-medium text-ash tracking-wider block mb-1">
                  {exp.duration}
                </span>
                <span className="text-sm font-semibold tracking-wider uppercase block font-mono text-ember">
                  {exp.company}
                </span>
              </div>

              {/* Right Column: Role Title, Description & Highlights */}
              <div className="md:w-2/3">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-cloud transition-colors">
                  {exp.role}
                </h3>
                <p className="text-base text-ash leading-relaxed mb-6 font-normal">
                  {exp.description}
                </p>

                {/* Bullet Highlights */}
                <ul className="space-y-2.5">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-silver font-normal">
                      <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
