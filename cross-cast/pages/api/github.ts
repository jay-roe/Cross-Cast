import { ReleaseRaw, Release } from '@/types/github'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from 'octokit'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

export type GitHubQueryParams = {
  owner: string
  repo: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Release>
) {
  const { owner, repo } = req.query as GitHubQueryParams;

  const latestRelease = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
    owner: owner,
    repo: repo
  });

  const latestReleaseData: ReleaseRaw = latestRelease.data;

  const cleanRelease: Release = {
    html_url: latestReleaseData.html_url,
    author: {
      login: latestReleaseData.author.login,
      avatar_url: latestReleaseData.author.avatar_url,
      html_url: latestReleaseData.author.html_url
    },
    name: latestReleaseData.name,
    published_at: latestReleaseData.published_at,
    body: latestReleaseData.body,
    reactions: {
      total_count: latestReleaseData.reactions?.total_count,
      "+1": latestReleaseData.reactions?.['+1'],
      "-1": latestReleaseData.reactions?.['-1'],
      laugh: latestReleaseData.reactions?.laugh,
      confused: latestReleaseData.reactions?.confused,
      heart: latestReleaseData.reactions?.heart,
      hooray: latestReleaseData.reactions?.hooray,
      eyes: latestReleaseData.reactions?.eyes,
      rocket: latestReleaseData.reactions?.rocket,
      // [k]: latestReleaseData.reactions?[k]
    }
  }

  console.log(cleanRelease)

  res.status(200).json(cleanRelease)
}
