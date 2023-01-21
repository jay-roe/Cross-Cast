"use client"

import type { TweetData } from "@/types"
import { Card, CardHeader, CardBody, CardFooter, Text, Flex, Avatar, Box, Image, Heading, Button } from '@chakra-ui/react'


export default function MessageCard({data}: {data: TweetData}){

  const component = (
    <Card maxW='md'>
      {/* <CardHeader>
        <Text>Tweet</Text>
      </CardHeader> */}
      <CardBody>
        <Text>
          {data.content}
        </Text>
      </CardBody>
      <Image
        objectFit='cover'
        src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        alt='Chakra UI'
      />

      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Avatar name='Segun Adebayo' size='xs' src='https://bit.ly/sage-adebayo' />
        </Flex>
      </CardFooter>
    </Card>
  )

  return component
}