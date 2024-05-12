'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Mock Organization",
//   description: "ProveSelf website for mock Organization",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <ChakraProvider>
            {children}
          </ChakraProvider>
        </body>
    </html>
  );
}
