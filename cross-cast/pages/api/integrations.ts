// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type GenericPost = {
    origin: Origin
    url: string
    title: string
    content: string
    image?: string
    reactions?: Reaction[]
    author: {
      name: string
      avatar?: string
      url?: string
    }
    date: Date
  }
  
export enum Origin {
GitHub = 'GITHUB',
Slack = 'SLACK',
Twitter = 'TWITTER',
}

type Reaction = {
icon: string
numInteractions: number
}

type IntegrationsRequestParams = {
    days: string
    integration?: Origin
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenericPost[]>
) {
    const { days, integration } = req.query as IntegrationsRequestParams;

    const twitterRequest = process.env.PUBLIC_URL + `/api/twitter?days=${days}`
    const githubRequest = process.env.PUBLIC_URL + `/api/github`


    if (integration) {
        console.log(integration)
        if (integration == Origin.GitHub) {
            const data = await (await fetch(githubRequest)).json() as GenericPost[];
            res.status(200).json(data)
        } else if (integration == Origin.Twitter) {
            const data = await (await fetch(twitterRequest)).json() as GenericPost[];
            res.status(200).json(data)
        } else {
            res.status(400)
        }
    } else {
        const twitterPosts = await (await fetch(twitterRequest)).json() as GenericPost[];
        const githubPosts = await (await fetch(githubRequest)).json() as GenericPost[];
        res.status(200).json(twitterPosts.concat(githubPosts))
    }
    
}
