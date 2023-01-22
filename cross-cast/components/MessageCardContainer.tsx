"use client"

import { GenericPost } from "@/types/all";
import { Center, Box, Divider } from "@chakra-ui/react"
import MessageCard from "./MessageCard"


export default function MessageCardContainer(props: { post: GenericPost}) {

  return (
    <Center height="calc(100vh)">
      <Divider orientation="vertical" />
      <Box ml="3"></Box>
      <MessageCard post={props.post}/>
    </Center>
  )
  
}