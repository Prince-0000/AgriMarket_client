'use client'

import {HeroUIProvider} from '@heroui/react'

export function ThemeProvider({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  )
}