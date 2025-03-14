import { NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com';
const GITHUB_USERNAME = 'emamulmursalin47'; // Replace with actual GitHub username

async function fetchGitHubStats() {
  const [userResponse, reposResponse] = await Promise.all([
    fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`),
    fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos`)
  ]);

  const userData = await userResponse.json();
  const reposData = await reposResponse.json();

  return {
    followers: userData.followers,
    publicRepos: userData.public_repos,
    totalStars: reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0),
    topLanguages: Array.from(
      new Set(
        reposData
          .map((repo: any) => repo.language)
          .filter(Boolean)
      )
    ).slice(0, 5)
  };
}

export async function GET() {
  try {
    const stats = await fetchGitHubStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    );
  }
}