// app/providers.tsx
"use client";

// import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider} from "next-themes";

export function Providers({children}) {
  return (
    <div>
      <ThemeProvider  enableSystem={true} attribute="class">
        {children}
      </ThemeProvider>
    </div>
  )
}