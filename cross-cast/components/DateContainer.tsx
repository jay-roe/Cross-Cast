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
    <div style={{ paddingBottom: '2em' }}>
      <GridItem>
        {children}
      </GridItem>
      <GridItem>
        <Center>
          <Box width={[ 'xs', 'md', 'lg', 'xl' ]}>
            <Flex alignItems='center' gap='10px'>
              <Divider  width='14' borderWidth='3px' borderColor='#000000' borderRadius='6' />
              <Text>{date.toLocaleDateString()}</Text>
            </Flex>

          </Box>
        </Center>
      </GridItem>
    </div>
  )
}
