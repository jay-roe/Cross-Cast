"use client"

import { GenericPost } from '../types/all'
import MessageCardContainer from '../components/MessageCardContainer'
import DateContainer from '@/components/DateContainer';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Grid, GridItem, IconButton, Menu, MenuButton, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import React from 'react';

export default function MainContainer({ posts } : { posts: GenericPost[] }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  function getTimestamp(date: Date) {
    return date.setHours(0, 0, 0, 0)
  }

  function assertDate(post: GenericPost) {
    if (typeof post.date === 'string') {
      return new Date(post.date);
    }
    return post.date
  }
  
  const dataDateAdjusted = posts.map(post => (
    {
      ...post,
      date: new Date(post.date)
    }
  ))

  function getDateSet(posts: GenericPost[]) {
  //   console.log('DATE SET:'+ posts.map(p => new Date(getTimestamp(assertDate(p)))).filter((date, i, self) => 
  //   self.findIndex(d => new Date(d).getTime() === new Date(date).getTime()) === i
  // ))
    return posts.map(p => new Date(getTimestamp(assertDate(p)))).filter((date, i, self) => 
    self.findIndex(d => new Date(d).getTime() === new Date(date).getTime()) === i
  )

    // return [...new Set(posts.map(post => assertDate(post)))];
  }

  return (
    <Grid>
      <Flex justifyContent='center' alignItems='center'>
        <h1 style={{ textAlign: 'center', marginBlock: '1em' }}>CrossCast Timeline</h1>
        <IconButton ref={btnRef} colorScheme='teal' onClick={onOpen} icon={<AiOutlineMenu />} />
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* <Menu alignSelf='flex-end'>
          <MenuButton as={Button} rightIcon={<BsChevronDown />}>
            Actions
          </MenuButton>
        </Menu> */}
      </Flex>
      {
        getDateSet(dataDateAdjusted).map((date, index) => (
          <GridItem key={index}>
            <DateContainer date={date}>
              {
                posts
                  .filter(post => {
                    console.log(post);
                    
                    // console.log(getDateSet(dataDateAdjusted));
                    
                    // console.log(`Post timestamp: ${getTimestamp(assertDate(post))}\nDate container timestamp: ${getTimestamp(date)}`);
                    
                    return getTimestamp(assertDate(post)) === getTimestamp(date)
                  })
                  .map((post, index) => <MessageCardContainer key={index} post={post}/>)
              }
            </DateContainer>
          </GridItem>
        ))
        
      }
    </Grid>
  )
}
