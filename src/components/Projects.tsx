"use client";

import { useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  image?: string;
  color: string;
  glowColor: string;
  githubUrl: string;
  liveUrl?: string;
  status?: string;
}

const PROJECTS: Project[] = [
  {
    id: "spill-tea",
    title: "Spill Tea",
    description: "Real-time, room-based chat application with instant messaging, live presence, and debounced typing indicators via WebSocket event broadcasting.",
    technologies: "Next.js · TypeScript · Socket.IO · Tailwind CSS · WebSockets",
    image: "/images/spill-tea-landing.png",
    color: "#D4A373",
    glowColor: "rgba(212, 163, 115, 0.35)",
    githubUrl: "https://github.com/apurbahalderr/Spill-Tea",
    liveUrl: "https://spill-tea-woad.vercel.app/",
  },
  {
    id: "pulstrix",
    title: "PulstriX",
    description: "AI-powered emergency incident management platform for location-based reporting, images, real-time tracking, and an interactive map interface.",
    technologies: "Next.js · TypeScript · Python · FastAPI · MongoDB · Leaflet.js",
    image: "/images/pulstrix-dashboard.png",
    color: "#6366F1",
    glowColor: "rgba(99, 102, 241, 0.35)",
    githubUrl: "https://github.com/apurbahalderr/PulstriX",
    liveUrl: "https://pulstrix.vercel.app/",
  },
  {
    id: "codefrag",
    title: "CodeFrag",
    description: "Real-time 1v1 competitive coding platform with a self-built Docker-sandboxed judge engine, live matchmaking, and ELO ratings.",
    technologies: "Next.js · Express · Socket.IO · MongoDB",
    color: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.35)",
    githubUrl: "https://github.com/apurbahalderr/CodeFrag",
    status: "In progress",
  },
  {
    id: "wastex-ai",
    title: "WasteX-AI",
    description: "AI-powered waste management & sustainability platform built for Gemini AI Hackathon, featuring smart image classification and environmental analytics.",
    technologies: "Next.js · TypeScript · Gemini AI API · Tailwind CSS · Python",
    image: "/images/wastex-ai-dashboard.png",
    color: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.35)",
    githubUrl: "https://github.com/apurbahalderr/WasteX-AI",
    liveUrl: "https://gemini-hackathon-ecru.vercel.app/",
    status: "Gemini Hackathon",
  },
];

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="relative pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-iron to-transparent" aria-hidden="true" />
      <div
        className="absolute top-1/3 -left-48 w-96 h-96 rounded-full opacity-25 pointer-events-none blur-[140px] transition-all duration-700"
        style={{ backgroundColor: hoveredIndex !== null ? PROJECTS[hoveredIndex]?.color || "var(--ember)" : "var(--ember)" }}
      />

      <div className="section-container relative z-10">
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-ember inline-block rounded-full" />
            <span className="text-ember text-xs font-bold tracking-[0.25em] uppercase">Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">Selected Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS.map((project, i) => (
            <a
              key={project.id}
              href={project.liveUrl || project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative min-h-[300px] md:min-h-[340px] rounded-2xl overflow-hidden border border-white/10 group hover:border-white/30 transition-all duration-500 shadow-2xl block cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${project.color}22 0%, #111111 55%, ${project.color}14 100%)` }}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-55 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                />
              )}
              {project.image && <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/75 to-[#090909]/10" />}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${project.glowColor} 0%, transparent 75%)` }} />
              <div className="relative h-full min-h-[300px] md:min-h-[340px] p-7 md:p-8 flex flex-col justify-end">
                <div className="absolute top-6 left-7 md:left-8 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                  {project.status && <span className="text-[10px] uppercase tracking-[0.18em] text-ash border border-white/15 rounded-full px-3 py-1">{project.status}</span>}
                </div>
                <div className="absolute top-5 right-5 bg-black/60 backdrop-blur-md p-3 rounded-full text-white border border-white/15 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">{project.title}</h3>
                <p className="text-sm md:text-base text-silver leading-relaxed mb-5 max-w-xl">{project.description}</p>
                <p className="text-[11px] text-ash uppercase tracking-[0.12em] leading-relaxed">{project.technologies}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
