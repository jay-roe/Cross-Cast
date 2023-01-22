"use client"

import { HStack, Tag, TagLeftIcon, TagLabel, Avatar} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineRetweet, AiFillEye } from "react-icons/ai"
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io"
import { BsFillChatFill } from "react-icons/bs"

export default function Reaction(props: { icon: string, numInteractions: number}) {

  const getIcon = (icon: string) => {
    switch (icon) {
      case "retweets":
        return <AiOutlineRetweet />
      case "likes": case "heart":
        return '❤';
        // return <AiFillHeart/>;
      case "replies":
        // return '👁‍🗨';
        return <BsFillChatFill />;
      case "+1":
        return '👍';
        // return <IoMdThumbsUp />;
      case "-1":
        return '👎';
        // return <IoMdThumbsDown />;
      case "laugh":
        return '😄';
      case "confused":
        return '😕';
      case "hooray":
        return '🎉';
      case "eyes":
        return '👀';
      case "rocket":
        return '🚀';
      case "pray":
        return '🙏';
      case "ok":
        return '✅';
      default:
    }
  }

  const iconComponent = getIcon(props.icon);
  if (!iconComponent) {
    return;
  }

  return <>
    <Tag size='md' key={props.icon} variant='subtle' colorScheme='blackAlpha'>
      <TagLabel>{ iconComponent }</TagLabel>
      <TagLabel>{ props.numInteractions }</TagLabel>
    </Tag>
  </>
}