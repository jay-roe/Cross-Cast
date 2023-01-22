"use client"

import { GenericPost, Origin } from "@/types/all";
import { Center, Box, Divider, HStack, Flex } from "@chakra-ui/react"
import MessageCard from "./MessageCard"
import { AiFillTwitterCircle, AiFillGithub, AiFillSlackCircle } from "react-icons/ai";


export default function MessageCardContainer(props: { post: GenericPost}) {
  function getProviderIcon(provider: Origin) {
    switch(provider) {
      case Origin.GitHub:
        return <AiFillGithub style={{ backgroundColor: "white", borderRadius: "50%" }} size='36px' /> 
      case Origin.Twitter:
        return <AiFillTwitterCircle style={{ backgroundColor: "white", borderRadius: "50%" }} size='36px' />
      case Origin.Slack:
        return <AiFillSlackCircle style={{ backgroundColor: "white", borderRadius: "50%" }} size='36px' />
    }
  }

  return (
    <>
    <Flex justifyContent='center'>
        {
          getProviderIcon(props.post.origin)
        }
        {/* <Divider height='110' borderWidth={2} orientation="vertical" /> */}
        <Box ml="3"></Box>
        <MessageCard post={props.post}/>
        <div></div>
    </Flex>
    </>
  )
  
}