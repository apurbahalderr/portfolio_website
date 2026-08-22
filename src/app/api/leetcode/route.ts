import { NextResponse } from "next/server";

const FALLBACK_LEETCODE_DATA = {
  username: "apurbahalder",
  profileUrl: "https://leetcode.com/apurbahalder",
  totalSolved: 211,
  totalQuestions: 4019,
  easySolved: 101,
  totalEasy: 958,
  mediumSolved: 92,
  totalMedium: 2099,
  hardSolved: 18,
  totalHard: 962,
  streak: 110,
  totalActiveDays: 128,
  badges: [
    { name: "Annual Badge", icon: "https://assets.leetcode.com/static_assets/others/100_1080_1080.png" },
    { name: "Annual Badge", icon: "https://assets.leetcode.com/static_assets/others/50_1080_1080.png" }
  ]
};

export async function GET() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
              badges {
                name
                icon
              }
              userCalendar {
                streak
                totalActiveDays
              }
            }
            allQuestionsCount {
              difficulty
              count
            }
          }
        `,
        variables: { username: "apurbahalder" }
      }),
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`LeetCode API returned status ${res.status}`);
    }

    const data = await res.json();
    const matchedUser = data?.data?.matchedUser;
    const allQuestions = data?.data?.allQuestionsCount || [];

    if (!matchedUser) {
      return NextResponse.json(FALLBACK_LEETCODE_DATA);
    }

    const submissions = matchedUser.submitStats?.acSubmissionNum || [];
    const getCount = (diff: string) => submissions.find((s: { difficulty: string }) => s.difficulty === diff)?.count || 0;
    const getTotal = (diff: string) => allQuestions.find((q: { difficulty: string }) => q.difficulty === diff)?.count || 0;

    const parsedData = {
      username: matchedUser.username || "apurbahalder",
      profileUrl: "https://leetcode.com/apurbahalder",
      totalSolved: getCount("All"),
      totalQuestions: getTotal("All"),
      easySolved: getCount("Easy"),
      totalEasy: getTotal("Easy"),
      mediumSolved: getCount("Medium"),
      totalMedium: getTotal("Medium"),
      hardSolved: getCount("Hard"),
      totalHard: getTotal("Hard"),
      streak: matchedUser.userCalendar?.streak || FALLBACK_LEETCODE_DATA.streak,
      totalActiveDays: matchedUser.userCalendar?.totalActiveDays || FALLBACK_LEETCODE_DATA.totalActiveDays,
      badges: matchedUser.badges || FALLBACK_LEETCODE_DATA.badges
    };

    return NextResponse.json(parsedData, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
      }
    });
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return NextResponse.json(FALLBACK_LEETCODE_DATA);
  }
}
