"use client"

import { HStack, Tag, TagLeftIcon, TagLabel, Avatar} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineRetweet, AiFillEye } from "react-icons/ai"
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io"

export default function Reaction(props: { icon: string, numInteractions: number}) {

  const getIcon = (icon: string) => {
    switch (icon) {
      case "retweet_count":
        return <AiOutlineRetweet />
      case "like_count": case "heart":
        return '❤';
        // return <AiFillHeart/>;
      case "impression_count":
        return '👁‍🗨';
        // return <AiFillEye />;
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