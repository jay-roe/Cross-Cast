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
  date: string | Date
  timestamp?: number
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