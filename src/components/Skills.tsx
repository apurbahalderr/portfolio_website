"use client";

import { useMemo } from "react";
import SectionHeading from "./SectionHeading";
import DriftWall, { DriftWallItem } from "./DriftWall";

interface Skill {
  name: string;
  icon: string;
  category: string;
}

const SKILLS: Skill[] = [
  { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/ffffff", category: "Languages" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", category: "Languages" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", category: "Languages" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", category: "Languages" },
  { name: "C", icon: "https://cdn.simpleicons.org/c/ffffff", category: "Languages" },
  { name: "React.js", icon: "https://cdn.simpleicons.org/react/61DAFB", category: "Web Development" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff", category: "Web Development" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E", category: "Web Development" },
  { name: "Express.js", icon: "https://cdn.simpleicons.org/express/ffffff", category: "Web Development" },
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26", category: "Web Development" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css/1572B6", category: "Web Development" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", category: "Web Development" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248", category: "Backend" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/DD2C00", category: "Backend" },
  { name: "REST APIs", icon: "https://cdn.simpleicons.org/postman/FF6C37", category: "Backend" },
  { name: "Socket.IO", icon: "https://cdn.simpleicons.org/socketdotio/ffffff", category: "Backend" },
  { name: "JWT Authentication", icon: "https://cdn.simpleicons.org/jsonwebtokens/ffffff", category: "Backend" },
  { name: "NumPy", icon: "https://cdn.simpleicons.org/numpy/4DABCF", category: "Machine Learning" },
  { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas/150458", category: "Machine Learning" },
  { name: "Matplotlib", icon: "https://cdn.simpleicons.org/python/3776AB", category: "Machine Learning" },
  { name: "Scikit-learn", icon: "https://cdn.simpleicons.org/scikitlearn/F7931E", category: "Machine Learning" },
  { name: "Data Structures & Algorithms", icon: "https://cdn.simpleicons.org/openjdk/ffffff", category: "Core CS" },
  { name: "OOP", icon: "https://cdn.simpleicons.org/openjdk/ffffff", category: "Core CS" },
  { name: "DBMS", icon: "https://cdn.simpleicons.org/mongodb/47A248", category: "Core CS" },
  { name: "Computer Networks", icon: "https://cdn.simpleicons.org/cisco/1BA0D7", category: "Core CS" },
  { name: "Operating Systems", icon: "https://cdn.simpleicons.org/linux/FCC624", category: "Core CS" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", category: "Tools" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/ffffff", category: "Tools" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED", category: "Tools" },
  { name: "Postman", icon: "https://cdn.simpleicons.org/postman/FF6C37", category: "Tools" },
  { name: "VS Code", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg", category: "Tools" },
  { name: "MongoDB Compass", icon: "https://cdn.simpleicons.org/mongodb/47A248", category: "Tools" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/ffffff", category: "Tools" },
];

export default function Skills() {
  const driftWallItems: DriftWallItem[] = useMemo(() => {
    return SKILLS.map((skill) => ({
      image: "/images/skill-tile-bg.png",
      title: skill.name,
      icon: skill.icon,
    }));
  }, []);

  return (
    <section id="skills" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-iron to-transparent"
        aria-hidden="true"
      />

      <div className="section-container">
        <SectionHeading
          eyebrow="Skills & Tools"
          title="My Arsenal"
          subtitle="Languages, frameworks, core computer-science foundations, machine-learning tools, and platforms I use to build practical products."
          align="center"
        />

        {/* DriftWall 3D animated skills container - full screen full bleed */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-screen overflow-hidden -translate-x-12 sm:-translate-x-16">
          <DriftWall
            items={driftWallItems}
            columns={6}
            tileWidth={210}
            tileHeight={138}
            gap={20}
            tilt={14}
            turn={-16}
            perspective={1000}
            depth={100}
            speed={40}
            direction="up"
            variance={0.4}
            parallax={0.6}
            lift={65}
            fade={0.4}
            dim={0.6}
            overlayColor="#050505"
          />
        </div>
      </div>
    </section>
  );
}
