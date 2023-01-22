"use client"

import { Divider } from "@chakra-ui/react"

export default function DateContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <div>
      {children}
      
      <Divider width={20} />
    </div>
  )
}
