"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/lib/smooth-scroll";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import StaggeredMenu from "@/components/StaggeredMenu";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import CodingProfile from "@/components/CodingProfile";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Loading screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Scroll progress bar */}
      {!isLoading && <ScrollProgress />}

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Navigation — StaggeredMenu stacked on left side */}
      {!isLoading && (
        <StaggeredMenu
          position="left"
          items={[
            { label: "Projects", ariaLabel: "Go to Projects section", link: "#projects" },
            { label: "Experience", ariaLabel: "Go to Experience section", link: "#experience" },
            { label: "Coding Profile", ariaLabel: "Go to Coding Profile section", link: "#coding" },
            { label: "Skills", ariaLabel: "Go to Skills section", link: "#skills" },
            { label: "Education", ariaLabel: "Go to Education section", link: "#education" },
            { label: "Contact", ariaLabel: "Go to Contact section", link: "#contact" },
          ]}
          socialItems={[
            { label: "GitHub", link: "https://github.com/apurbahalderr" },
            { label: "LeetCode", link: "https://leetcode.com/apurbahalder" },
            { label: "LinkedIn", link: "https://www.linkedin.com/in/apurba-halder-457a81319/" },
            { label: "Instagram", link: "https://www.instagram.com/apurbahalderr" },
          ]}
          displaySocials={true}
          displayItemNumbering={true}
          colors={["#0d0d0f", "#1e1e24"]}
          accentColor="#A02A22"
          menuButtonColor="#ffffff"
          openMenuButtonColor="#A02A22"
        />
      )}

      {/* Main content */}
      <SmoothScroll>
        <main>
          {/* Hero — cinematic editorial section */}
          <Hero />

          <Introduction />
          <Projects />
          <Experience />
          <CodingProfile />
          <Skills />
          <Education />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}
