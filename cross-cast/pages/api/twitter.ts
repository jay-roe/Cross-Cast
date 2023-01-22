// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Client from 'twitter-api-sdk'
import twitterConfig from '@/config/twitter.config';
import { GenericPost, Origin } from '@/types/all';

const client = new Client(process.env.TWITTER_BEARER_TOKEN);

type TwitterRequestParams = {
    days: string
    maxCount: string
    filterType: TweetFilter
}

export enum TweetFilter {
    latest = 'LATEST',
    mostLiked = 'MOST_LIKED',
  }
  
type Reaction = {
icon: string
numInteractions: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GenericPost[]>,
) {
    let posts: GenericPost[] = [];
    
    let { user } = twitterConfig;
    let { days, maxCount, filterType: sortType } = req.query as TwitterRequestParams;

    // remove random quotations that are added
    user = user.replaceAll("\"", "")
    days = days.replaceAll("\"", "")
    maxCount.replaceAll("\"", "")
    let maxCountInt = parseInt(maxCount)

    // configure tweet request
    const user_id = (await client.users.findUserByUsername(user)).data?.id || "";
    
    const days_time = parseInt(days);
    const tweets_since_date = new Date();
    tweets_since_date.setDate(tweets_since_date.getDate() - days_time);

    // make tweet request
    const raw_tweets_response = await client.tweets.usersIdTweets(user_id, {
        exclude: ["replies", "retweets"],
        start_time: tweets_since_date.toISOString(),
        max_results: 100,
        expansions: ["author_id"],
        "tweet.fields": ["id", "author_id", "text", "public_metrics", "created_at"],
        "user.fields": ["profile_image_url"],
    });

    const raw_tweets_data = raw_tweets_response.data;
    const raw_tweets_user = raw_tweets_response.includes;

    let profile_image_url = "";
    raw_tweets_user?.users?.forEach(user => {
        profile_image_url = user.profile_image_url || "";
    })

    const nestedSort = (prop1, prop2 = null, direction = 'asc') => (e1, e2) => {
        const a = prop2 ? e1[prop1][prop2] : e1[prop1],
            b = prop2 ? e2[prop1][prop2] : e2[prop1],
            sortOrder = direction === "asc" ? 1 : -1
        return (a < b) ? -sortOrder : (a > b) ? sortOrder : 0;
    }

    if (sortType === TweetFilter.mostLiked) {
        raw_tweets_data?.sort(nestedSort("public_metrics", "like_count","desc"))
    }  // else will be by latest

    // convert raw tweet response to our type
    for(let i = 0; i < maxCountInt; i++) {
        const raw_tweet = raw_tweets_data.at(i);
        const tweetMetrics = {
            retweet_count: raw_tweet.public_metrics?.retweet_count || 0,
            reply_count: raw_tweet.public_metrics?.reply_count || 0,
            like_count: raw_tweet.public_metrics?.like_count || 0,
            quote_count: raw_tweet.public_metrics?.quote_count || 0
        }

        const postData = {
            origin: Origin.Twitter,
            url: `https://twitter.com/${user}/status/${raw_tweet.id}`,
            title: "",
            content: raw_tweet.text || "",
            reactions: [
                { icon: "likes", numInteractions: tweetMetrics.like_count },
                { icon: "retweets", numInteractions: tweetMetrics.retweet_count },
                { icon: "quotes", numInteractions: tweetMetrics.quote_count },
                { icon: "replies", numInteractions: tweetMetrics.reply_count }
            ],
            author: {
                name: user,
                avatar: profile_image_url,
                url: `https://twitter.com/${user}`
            },
            date: new Date(Date.parse(raw_tweet.created_at || ""))
        }
        posts.push(postData)
    }

    res.status(200).json(posts)
}
