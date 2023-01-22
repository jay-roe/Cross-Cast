"use client"

import { GenericPost } from '../types/all'
import MessageCardContainer from '../components/MessageCardContainer'
import DateContainer from '@/components/DateContainer';
import { Grid, GridItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function MainContainer({ posts } : { posts: GenericPost[] }) {
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
    console.log('DATE SET:'+ posts.map(p => new Date(getTimestamp(assertDate(p)))).filter((date, i, self) => 
    self.findIndex(d => new Date(d).getTime() === new Date(date).getTime()) === i
  ))
    return posts.map(p => new Date(getTimestamp(assertDate(p)))).filter((date, i, self) => 
    self.findIndex(d => new Date(d).getTime() === new Date(date).getTime()) === i
  )

    // return [...new Set(posts.map(post => assertDate(post)))];
  }

  return (
    <Grid>
      {
        getDateSet(dataDateAdjusted).map((date, index) => (
          <GridItem key={index}>
            <DateContainer date={date}>
              {
                posts
                  .filter(post => {
                    console.log(getDateSet(dataDateAdjusted));
                    
                    console.log(`Post timestamp: ${getTimestamp(assertDate(post))}\nDate container timestamp: ${getTimestamp(date)}`);
                    
                    return getTimestamp(assertDate(post)) === getTimestamp(date)
                  })
                  .map((post, index) => <MessageCardContainer key={index} post={post}/>)
              }
            </DateContainer>
          </GridItem>
        ))
        
      }
      {/* {
        dataDateAdjusted.map((data, index) => 
          <GridItem key={index}>
            <MessageCardContainer post={data} />
          </GridItem>
        )
      } */}
    </Grid>
  )
}
