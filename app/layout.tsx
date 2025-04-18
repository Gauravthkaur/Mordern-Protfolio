import type { Metadata } from "next"
import "./globals.css"
import CustomCursor from "@/components/cursor"
// Import the provider from the components directory
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My professional portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Use the SmoothScrollProvider here */}
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <CustomCursor />
      </body>
    </html>
  )
}