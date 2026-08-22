import { NextResponse } from "next/server";

const FALLBACK_GITHUB_DATA = {
  username: "apurbahalderr",
  profileUrl: "https://github.com/apurbahalderr",
  publicRepos: 18,
  followers: 0,
  following: 0,
  totalStars: 5,
  languages: [
    { name: "TypeScript", count: 5, percentage: 31 },
    { name: "JavaScript", count: 3, percentage: 19 },
    { name: "Java", count: 2, percentage: 13 },
    { name: "CSS", count: 2, percentage: 13 },
    { name: "HTML", count: 2, percentage: 13 },
    { name: "C", count: 1, percentage: 6 },
    { name: "EJS", count: 1, percentage: 5 }
  ],
  repos: [
    {
      name: "Spill-Tea",
      description: "Interactive web application and platform project",
      url: "https://github.com/apurbahalderr/Spill-Tea",
      language: "JavaScript",
      stars: 0,
      updatedAt: "2026-08-13"
    },
    {
      name: "CodeFrag",
      description: "Modern code snippet sharing & collaboration platform",
      url: "https://github.com/apurbahalderr/CodeFrag",
      language: "TypeScript",
      stars: 0,
      updatedAt: "2026-08-13"
    }
  ],
  recentActivity: [
    {
      type: "PushEvent",
      repo: "apurbahalderr/Spill-Tea",
      date: "Recent",
      message: "Pushed updates to Spill-Tea"
    },
    {
      type: "PushEvent",
      repo: "apurbahalderr/CodeFrag",
      date: "Recent",
      message: "Updated TypeScript features and logic"
    }
  ]
};

export async function GET() {
  try {
    const headers = {
      "User-Agent": "PortfolioApp",
      Accept: "application/vnd.github.v3+json"
    };

    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch("https://api.github.com/users/apurbahalderr", { headers, next: { revalidate: 3600 } }),
      fetch("https://api.github.com/users/apurbahalderr/repos?per_page=100&sort=updated", { headers, next: { revalidate: 3600 } }),
      fetch("https://api.github.com/users/apurbahalderr/events/public?per_page=15", { headers, next: { revalidate: 1800 } })
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error("GitHub API request failed");
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();
    const eventsData = eventsRes.ok ? await eventsRes.json() : [];

    // Calculate total stars & languages
    let totalStars = 0;
    const langMap: Record<string, number> = {};
    const parsedRepos: Array<{
      name: string;
      description: string;
      url: string;
      language: string;
      stars: number;
      updatedAt: string;
    }> = [];

    if (Array.isArray(reposData)) {
      reposData.forEach((repo: any) => {
        totalStars += repo.stargazers_count || 0;
        if (repo.language) {
          langMap[repo.language] = (langMap[repo.language] || 0) + 1;
        }

        parsedRepos.push({
          name: repo.name,
          description: repo.description || "Open source repository",
          url: repo.html_url,
          language: repo.language || "Plain Text",
          stars: repo.stargazers_count || 0,
          updatedAt: repo.updated_at ? repo.updated_at.split("T")[0] : ""
        });
      });
    }

    // Prioritize Spill-Tea and CodeFrag in featured list
    const featuredNames = ["Spill-Tea", "CodeFrag"];
    const prioritizedRepos = [
      ...parsedRepos.filter(r => featuredNames.includes(r.name)),
      ...parsedRepos.filter(r => !featuredNames.includes(r.name))
    ];

    // Top languages breakdown
    const totalLangCount = Object.values(langMap).reduce((a, b) => a + b, 0) || 1;
    const languages = Object.entries(langMap)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / totalLangCount) * 100)
      }))
      .sort((a, b) => b.count - a.count);

    // Format recent activity
    const recentActivity = Array.isArray(eventsData)
      ? eventsData.slice(0, 6).map((ev: any) => {
          let message = "Activity on GitHub";
          if (ev.type === "PushEvent") {
            const count = ev.payload?.commits?.length || 1;
            message = `Pushed ${count} commit${count > 1 ? "s" : ""} to ${ev.repo?.name?.split("/")[1] || ev.repo?.name}`;
          } else if (ev.type === "CreateEvent") {
            message = `Created ${ev.payload?.ref_type || "repository"} in ${ev.repo?.name}`;
          } else if (ev.type === "WatchEvent") {
            message = `Starred ${ev.repo?.name}`;
          } else if (ev.type === "ForkEvent") {
            message = `Forked ${ev.repo?.name}`;
          }

          const eventDate = ev.created_at ? new Date(ev.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Recently";

          return {
            type: ev.type,
            repo: ev.repo?.name || "Repository",
            date: eventDate,
            message
          };
        })
      : FALLBACK_GITHUB_DATA.recentActivity;

    return NextResponse.json(
      {
        username: userData.login || "apurbahalderr",
        profileUrl: userData.html_url || "https://github.com/apurbahalderr",
        publicRepos: userData.public_repos ?? FALLBACK_GITHUB_DATA.publicRepos,
        followers: userData.followers ?? 0,
        following: userData.following ?? 0,
        totalStars,
        languages,
        repos: prioritizedRepos.slice(0, 6),
        recentActivity
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
        }
      }
    );
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json(FALLBACK_GITHUB_DATA);
  }
}
