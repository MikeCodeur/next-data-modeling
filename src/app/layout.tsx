import React from 'react'
import type {Metadata} from 'next'
import {Inter as FontSans} from 'next/font/google'
import './globals.css'
import {ThemeProvider} from '@/components/theme-provider'
import {cn} from '@/lib/utils'
import {Toaster} from '@/components/ui/sonner'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Module - Mike Codeur Course',
  description: 'Module de la formation Next',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
