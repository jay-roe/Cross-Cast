// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { TwitterMetrics, TweetData } from '@/types'


const sampleTweet: TweetData = {
  content: 'This is a sample tweet',
  metrics: {
    retweet_count: 1,
    reply_count: 1,
    like_count: 1,
    quote_count: 1,
    impression_count: 1
  },
  date: new Date(Date.now())
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TweetData>
) {
  res.status(200).json(sampleTweet)
}
