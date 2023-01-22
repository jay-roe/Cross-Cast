"use client"

import { Divider, Grid, GridItem } from "@chakra-ui/react"

export default function DateContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <div style={{ backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}` }}>
      <GridItem>
        {children}
      </GridItem>
      <GridItem>
        <Divider  width={20} />
      </GridItem>
    </div>
  )
}
