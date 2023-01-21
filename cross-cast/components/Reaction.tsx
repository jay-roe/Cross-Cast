"use client"

import { HStack, Tag, TagLeftIcon, TagLabel, Avatar} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineRetweet, AiFillEye } from "react-icons/ai"

export default function Reaction(props: { icon: string, numInteractions: number}) {

  const getIcon = (icon: string) => {
    switch (icon) {
      case "retweet_count":
        return <AiOutlineRetweet />;
      case "like_count":
        return <AiFillHeart/>;
      case "impression_count":
        return <AiFillEye />;
      default:
    }
  }

  const iconComponent = getIcon(props.icon);
  if (!iconComponent) {
    return;
  }

  return <>
    <Tag size='md' key={props.icon} variant='subtle' colorScheme='blackAlpha'>
      { iconComponent }
      <TagLabel>{ props.numInteractions }</TagLabel>
    </Tag>
  </>
}