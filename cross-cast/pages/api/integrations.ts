// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GenericPost, Origin } from '@/types/all'
import type { NextApiRequest, NextApiResponse } from 'next'
import slackConfig from '@/config/slack.config'
import twitterConfig from '@/config/twitter.config'
import integrationsConfig from '@/config/integrations.config'
import { TweetFilter } from './twitter'

type Reaction = {
icon: string
numInteractions: number
}

type IntegrationsRequestParams = {
    days: string
    maxCount?: string
    integration?: Origin
    filterType?: TweetFilter
}

function sortChronologically(posts: GenericPost[]) {
    posts.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });

    return posts;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenericPost[]>
) {
    let { days, maxCount, integration, filterType } = req.query as IntegrationsRequestParams;

    if (!maxCount) {
        maxCount = integrationsConfig.maxCountDefault
    } 

    if (!filterType) {
        filterType = TweetFilter.latest
    }

    const twitterRequest = process.env.PUBLIC_URL + `/api/twitter?days=${days}&maxCount=${maxCount}&filterType=${filterType}`
    const githubRequest = process.env.PUBLIC_URL + `/api/github`
    const slackRequest = process.env.PUBLIC_URL + `/api/slack?days=${days}&maxCount=${maxCount}`



    if (integration) {
        if (integration === Origin.GitHub) {
            const data = await (await fetch(githubRequest)).json() as GenericPost[];
            res.status(200).json(data)
        } else if (integration === Origin.Twitter) {
            const data = await (await fetch(twitterRequest)).json() as GenericPost[];
            res.status(200).json(data)
        } else if (integration === Origin.Slack) {
            const data = await (await fetch(slackRequest)).json() as GenericPost[];
            res.status(200).json(data)
        } else {
            res.status(400)
        }
    } else {
        const twitterPosts = await (await fetch(twitterRequest)).json() as GenericPost[];
        const githubPosts = await (await fetch(githubRequest)).json() as GenericPost[];
        const slackPosts = await (await fetch(slackRequest)).json() as GenericPost[];

        let allPosts = sortChronologically(twitterPosts.concat(githubPosts, slackPosts))
        res.status(200).json(allPosts)
    }
    
}
