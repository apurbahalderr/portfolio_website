"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const EDUCATION = [
  { type: "Degree", institution: "B.Tech in Computer Science and Engineering", detail: "Kalinga Institute of Industrial Technology · CGPA: 9.7", year: "2024 - 2028" },
  { type: "Schooling", institution: "JVM Shyamali, Ranchi", detail: "Class 12 · 91%", year: "2018 - 2024" },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".edu-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="education" className="relative py-32 md:py-48">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-iron to-transparent" aria-hidden="true" />
      <div className="section-container">
        <SectionHeading eyebrow="Education" title="Foundation" subtitle="Academic foundations supporting my work in software engineering and machine learning." />
        <div className="grid md:grid-cols-2 gap-8">
          {EDUCATION.map((edu) => (
            <div key={edu.institution} className="edu-card glass-card p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs text-ember tracking-widest uppercase font-medium mb-2 block" style={{ fontFamily: "var(--font-display)" }}>{edu.type}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>{edu.institution}</h3>
                  <p className="text-sm text-ash leading-relaxed">{edu.detail}</p>
                </div>
                {edu.year && <span className="text-xs text-ash tracking-wider px-3 py-1.5 rounded-full bg-white/5 border border-white/5 whitespace-nowrap">{edu.year}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
