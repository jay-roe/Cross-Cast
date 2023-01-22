import { GenericPost, Origin } from '@/types/all'
import { ReleaseRaw, Release } from '@/types/github'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from 'octokit'
import githubConfig from "@/config/github.config"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenericPost[]>
) {
  const { owner, repo } = githubConfig;

  const latestRelease = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
    owner: owner,
    repo: repo
  });

  const latestReleaseData: ReleaseRaw = latestRelease.data;  
  

  const cleanRelease: GenericPost = {
    origin: Origin.GitHub,
    url: latestReleaseData.html_url,
    author: {
      name: latestReleaseData.author.login,
      avatar: latestReleaseData.author.avatar_url,
      url: latestReleaseData.author.html_url
    },
    title: latestReleaseData.name,
    date: new Date(latestReleaseData.published_at),
    content: latestReleaseData.body_html || latestReleaseData.body_text || latestReleaseData.body,
    reactions: Object.keys(latestReleaseData.reactions).map(reaction => {
      return {
        icon: reaction,
        numInteractions: latestReleaseData.reactions[reaction]
      }
    })
  }

  res.status(200).json([cleanRelease])
}
