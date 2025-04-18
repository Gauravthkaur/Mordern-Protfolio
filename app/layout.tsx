import type { Metadata } from "next"
import "./globals.css"
import CustomCursor from "@/components/cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

export const metadata: Metadata = {
  title: "Dev-Gaurav",
  description: "My professional portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add the favicon link here */}
        <link rel="icon" href="/Untitled design.png" type="Untitled design.png" />
      </head>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <CustomCursor />
      </body>
    </html>
  )
}