"use client"

import { Box, Card, Center, Divider, Flex, Grid, GridItem, Text } from "@chakra-ui/react"

export default function DateContainer({
  children,
  date
}: {
  children: React.ReactNode | React.ReactNode[]
  date: Date
}) {
  return (
    <div style={{ backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}` }}>
      <GridItem>
        {children}
      </GridItem>
      <GridItem>
        <Center >
          <Box w='lg'>
            <Flex alignItems='center' gap='10px'>
              <Text>{date.toLocaleDateString()}</Text>
              <Divider width={20} borderWidth='3px' />
            </Flex>

          </Box>
        </Center>
      </GridItem>
    </div>
  )
}
