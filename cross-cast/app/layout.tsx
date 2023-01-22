"use client"

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './globals.css'

const theme = extendTheme({
  // fonts: {
  //   heading: 'Roboto',
  //   body: 'Roboto'
  // },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.900',
      },
      h2: {
        fontSize: '2xl',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: 'lg',
        fontWeight: 'bold'
      },
      h4: {
        fontSize: 'md'
      }
    }
  }
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ChakraProvider theme={theme}>
            {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
