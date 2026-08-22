"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LeetCodeData {
  username: string;
  profileUrl: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  streak: number;
  totalActiveDays: number;
  badges: Array<{ name: string; icon: string }>;
}

interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  updatedAt: string;
}

interface GitHubActivity {
  type: string;
  repo: string;
  date: string;
  message: string;
}

interface GitHubData {
  username: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  languages: Array<{ name: string; count: number; percentage: number }>;
  repos: GitHubRepo[];
  recentActivity: GitHubActivity[];
}

export default function CodingProfile() {
  const sectionRef = useRef<HTMLElement>(null);
  const [leetcode, setLeetcode] = useState<LeetCodeData | null>(null);
  const [github, setGithub] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [lcRes, ghRes] = await Promise.all([
          fetch("/api/leetcode"),
          fetch("/api/github")
        ]);

        if (lcRes.ok) {
          const lcData = await lcRes.json();
          setLeetcode(lcData);
        }
        if (ghRes.ok) {
          const ghData = await ghRes.json();
          setGithub(ghData);
        }
      } catch (err) {
        console.error("Error fetching coding profile data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current || loading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".profile-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  const easyPercent = leetcode ? Math.round((leetcode.easySolved / (leetcode.totalEasy || 1)) * 100) : 0;
  const mediumPercent = leetcode ? Math.round((leetcode.mediumSolved / (leetcode.totalMedium || 1)) * 100) : 0;
  const hardPercent = leetcode ? Math.round((leetcode.hardSolved / (leetcode.totalHard || 1)) * 100) : 0;

  return (
    <section
      ref={sectionRef}
      id="coding"
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
    >
      {/* Top Divider */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-iron to-transparent"
        aria-hidden="true"
      />

      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none blur-[160px]"
        style={{ backgroundColor: "var(--ember)" }}
      />

      <div className="section-container relative z-10">
        {/* Section Heading */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-ember inline-block rounded-full" />
              <span className="text-ember text-xs font-bold tracking-[0.25em] uppercase">
                Coding Profile
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Coding Stats & Activity
            </h2>
            <p className="mt-4 text-base md:text-lg text-ash max-w-xl leading-relaxed font-normal">
              Problem solving performance on LeetCode and real-time open-source repositories and activity from GitHub.
            </p>
          </div>

          {/* Live Sync Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/10 text-xs font-mono text-silver self-start md:self-auto">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>Live Sync Active</span>
          </div>
        </div>

        {/* Main Grid: LeetCode & GitHub Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ═══════════════════════════════════════════════
             LEETCODE CARD
             ═══════════════════════════════════════════════ */}
          <div className="profile-card glass-card p-6 sm:p-8 md:p-10 flex flex-col justify-between relative group">
            {/* Ember Accent Line */}
            <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-ember to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-ember/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-xl">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">LeetCode</h3>
                    <a
                      href="https://leetcode.com/apurbahalder"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-ember hover:underline"
                    >
                      @apurbahalder
                    </a>
                  </div>
                </div>

                {/* Streak Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold">
                  <span>🔥</span>
                  <span>{leetcode ? `${leetcode.streak} Day Streak` : "110 Day Streak"}</span>
                </div>
              </div>

              {/* Total Solved Showcase */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-center">
                  <span className="text-xs font-mono text-ash mb-1">Total Problems Solved</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      {leetcode ? leetcode.totalSolved : 211}
                    </span>
                    <span className="text-xs text-ash font-mono">
                      / {leetcode ? leetcode.totalQuestions : 4019}
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-center">
                  <span className="text-xs font-mono text-ash mb-1">Active Days</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-amber-400 tracking-tight">
                      {leetcode ? leetcode.totalActiveDays : 128}
                    </span>
                    <span className="text-xs text-ash font-mono">days</span>
                  </div>
                </div>
              </div>

              {/* Easy / Medium / Hard Progress Bars */}
              <div className="space-y-4 mb-8">
                <h4 className="text-xs uppercase tracking-wider font-mono text-ash font-semibold">Difficulty Breakdown</h4>

                {/* Easy */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-emerald-400 font-bold">Easy</span>
                    <span className="text-silver">
                      {leetcode ? leetcode.easySolved : 101} <span className="text-ash">/ {leetcode ? leetcode.totalEasy : 958}</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.max(easyPercent, 10)}%` }}
                    />
                  </div>
                </div>

                {/* Medium */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-amber-400 font-bold">Medium</span>
                    <span className="text-silver">
                      {leetcode ? leetcode.mediumSolved : 92} <span className="text-ash">/ {leetcode ? leetcode.totalMedium : 2099}</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.max(mediumPercent, 8)}%` }}
                    />
                  </div>
                </div>

                {/* Hard */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-rose-500 font-bold">Hard</span>
                    <span className="text-silver">
                      {leetcode ? leetcode.hardSolved : 18} <span className="text-ash">/ {leetcode ? leetcode.totalHard : 962}</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.max(hardPercent, 5)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* LeetCode Footer & Link */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-ash font-mono">Updated via GraphQL</span>
              <a
                href="https://leetcode.com/apurbahalder"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ember hover:text-white transition-colors"
              >
                <span>View Profile</span>
                <span className="text-sm">↗</span>
              </a>
            </div>
          </div>


          {/* ═══════════════════════════════════════════════
             GITHUB CARD
             ═══════════════════════════════════════════════ */}
          <div className="profile-card glass-card p-6 sm:p-8 md:p-10 flex flex-col justify-between relative group">
            {/* Ember Accent Line */}
            <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-ember to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-extrabold text-xl">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">GitHub</h3>
                    <a
                      href="https://github.com/apurbahalderr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-ember hover:underline"
                    >
                      @apurbahalderr
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-ash">
                  <div>
                    <span className="text-white font-bold">{github ? github.publicRepos : 18}</span> Repos
                  </div>
                  <div>
                    <span className="text-white font-bold">{github ? github.totalStars : 5}</span> Stars
                  </div>
                </div>
              </div>

              {/* Contribution Activity Graph Embedding */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs uppercase tracking-wider font-mono text-ash font-semibold">Contribution Graph</h4>
                  <span className="text-[11px] font-mono text-ember">Annual Contributions</span>
                </div>
                <div className="p-4 rounded-xl bg-obsidian/80 border border-white/5 flex items-center justify-center overflow-x-auto no-scrollbar">
                  <img
                    src="https://ghchart.rshah.org/A02A22/apurbahalderr"
                    alt="GitHub Contribution Graph"
                    className="w-full max-w-full h-auto min-w-[500px] filter saturate-150 contrast-125"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Top Languages Distribution */}
              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-wider font-mono text-ash font-semibold mb-3">Top Languages</h4>
                <div className="space-y-2">
                  {(github?.languages || [
                    { name: "TypeScript", percentage: 31 },
                    { name: "JavaScript", percentage: 19 },
                    { name: "Java", percentage: 13 },
                    { name: "CSS", percentage: 13 },
                    { name: "HTML", percentage: 13 },
                    { name: "C", percentage: 6 }
                  ]).slice(0, 5).map((lang, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs font-mono">
                      <span className="w-24 text-silver truncate">{lang.name}</span>
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-ember rounded-full"
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-ash">{lang.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Repositories */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono text-ash font-semibold mb-3">Featured Repositories</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(github?.repos || [
                    { name: "Spill-Tea", language: "JavaScript", url: "https://github.com/apurbahalderr/Spill-Tea", description: "Interactive web platform project" },
                    { name: "CodeFrag", language: "TypeScript", url: "https://github.com/apurbahalderr/CodeFrag", description: "Code snippet platform" }
                  ]).slice(0, 2).map((repo, i) => (
                    <a
                      key={i}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-ember/40 hover:bg-white/[0.04] transition-all block group/repo"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white group-hover/repo:text-ember transition-colors font-mono">
                          {repo.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-ash">
                          {repo.language}
                        </span>
                      </div>
                      <p className="text-xs text-ash line-clamp-1 font-normal">
                        {repo.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* GitHub Footer & Link */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-8">
              <span className="text-xs text-ash font-mono">Updated via GitHub REST API</span>
              <a
                href="https://github.com/apurbahalderr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ember hover:text-white transition-colors"
              >
                <span>View GitHub</span>
                <span className="text-sm">↗</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
