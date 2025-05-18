import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
// Import the Vercel Analytics component
import { Analytics } from "@vercel/analytics/react"
import { cn } from "@/lib/utils"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Dev-Gaurav",
  description: "My professional portfolio",
  // Add favicon link if you haven't already
  icons: {
    icon: '/gaurav.png', // Example path, adjust if needed
  },
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head> is managed by Next.js Metadata API, no need for manual <head> tag here */}
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        
        {/* Add the Analytics component here */}
        <Analytics />
      </body>
    </html>
  )
}