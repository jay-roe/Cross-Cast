"use client"

import { GenericPost } from "@/types/all";
import { Center, Box, Divider } from "@chakra-ui/react"
import MessageCard from "./MessageCard"


export default function MessageCardContainer(props: { post: GenericPost}) {

  return (
    <Center>
      <Divider height='110' borderWidth={2} orientation="vertical" />
      <Box ml="3"></Box>
      <MessageCard post={props.post}/>
    </Center>
  )
  
}