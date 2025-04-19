import type { Metadata } from "next"
import "./globals.css"
import CustomCursor from "@/components/cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
// Import the Vercel Analytics component
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Dev-Gaurav",
  description: "My professional portfolio",
  // Add favicon link if you haven't already
  icons: {
    icon: '/gaurav.png', // Example path, adjust if needed
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head> is managed by Next.js Metadata API, no need for manual <head> tag here */}
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <CustomCursor />
        {/* Add the Analytics component here */}
        <Analytics />
      </body>
    </html>
  )
}