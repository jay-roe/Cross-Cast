import type { NextApiRequest, NextApiResponse } from 'next'
import { WebClient } from "@slack/web-api";

const token = process.env.SLACK_BOT_TOKEN;
const slack = new WebClient(token);

export type GenericPost = {
  origin: Origin
  url: string
  title: string
  content: string
  image?: string
  reactions?: Reactions[]
  author: {
    name: string
    avatar?: string
    url?: string
  }
  date: Date
}

type Reactions = {
  icon: string
  numInteractions: number
}


type SlackData = {
  content: string,
  author: string,
  image: string,
  reactions: Reactions[],
  totalReactions: number,
  date: string,
}

type MyChannel = {
  id: string
  name: string
}

export enum Origin {
  GitHub = 'GITHUB',
  Slack = 'SLACK',
  Twitter = 'TWITTER',
}

type SlackRequestParams = {
  days: string
  maxCount: string
}


async function getChannelMessages(channel: MyChannel, string_time: string) {
  let channelMessages = await (await slack.conversations.history({ channel: channel.id, oldest: string_time })).messages;
  return channelMessages;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenericPost[]>
) {
  const desired_channels: string[] = ["crosscast", "general", "random"]
  const { days , maxCount } = req.query as SlackRequestParams;

  const daysTime = parseInt(days)
  const elementCountInt = parseInt(maxCount)

  const time = new Date();
  time.setDate(time.getDate() - daysTime) //make var
  let string_time = (time.getTime() / 1000).toString(); //slack time in seconds

  // get all channels
  const slack_channels = (await slack.conversations.list()).channels || []

  // only keep chosen channels
  const my_channels: MyChannel[] = slack_channels
    .filter(channel => desired_channels.includes(channel.name || ""))
    .map(channel => (
      {
        id: channel.id || "",
        name: channel.name || ""
      }
    ))
  //   console.log(my_channels);


  const messages = await Promise.all(my_channels.map(async (channel) => await getChannelMessages(channel, string_time)))

  //console.log(messages)

  const react_messages: SlackData[] = await Promise.all(messages
    .map(async messages => await Promise.all(messages.map(async function (messages) {
      if (messages.reactions != undefined) {
        let sumReactions = 0;
        messages.reactions.forEach(reaction => {
          sumReactions += reaction.count
        })

        return {
          content: messages.text,
          author: (await slack.users.info({ user: messages.user })).user.real_name,
          image: (await slack.users.info({ user: messages.user })).user.profile.image_32,
          reactions: messages.reactions.map(reaction => {
            return {
              icon: reaction.name,
              numInteractions: reaction.count
            }
          }),
          totalReactions: sumReactions,
          date: messages.ts,

        }
      }
    })
    )))
  // num_reacts: messages.reactions.map(reactions => reactions.count)
  //console.log(string_time);

  const flat_messages = react_messages.flat();

  const done = flat_messages.filter(function (x) {
    return x !== undefined;
  });

  //  console.log(done);

  let redone: SlackData[] = done.sort((a, b) => b.totalReactions - a.totalReactions);

  let posts: GenericPost[] = [];
  for (let i = 0; i < elementCountInt; i++) {
    let thisSlackData = redone.at(i);
    var realDate = new Date(0);
    realDate.setUTCSeconds(parseInt(thisSlackData.date));
    const postData = {
      origin: Origin.Slack,
      url: "",
      title: "",
      image: "",
      content: thisSlackData.content || "",
      reactions: thisSlackData.reactions,
      author: {
        name: thisSlackData.author,
        avatar: thisSlackData.image
      },
      date: realDate
    }
    //console.log(postData)
    posts.push(postData);
  }

  res.status(200).json(posts);
}