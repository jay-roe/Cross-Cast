export type TwitterMetrics = {
  retweet_count: number,
  reply_count: number,
  like_count: number,
  quote_count: number,
  impression_count: number
}

export type TweetData = {
  content: string
  metrics: TwitterMetrics
  date: Date
}