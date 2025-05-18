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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Dev-Gaurav",
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
  themeColor: "#030303"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head> is managed by Next.js Metadata API, no need for manual <head> tag here */}
      <body className={cn("min-h-screen bg-background font-sans antialiased hardware-accelerated", fontSans.variable)}>
        {/* Add a no-js class that gets removed by JavaScript to help with progressive enhancement */}
        <script dangerouslySetInnerHTML={{ 
          __html: `
            (function() {
              // Add polyfill for smooth scrolling for older browsers
              if (!('scrollBehavior' in document.documentElement.style)) {
                document.documentElement.classList.add('no-smooth-scroll');
              }
              
              // Check for reduced motion preference
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.classList.add('reduced-motion');
              }
              
              // Remove no-js class
              document.documentElement.classList.remove('no-js');
            })();
          `
        }} />
        
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        
        {/* Add the Analytics component here */}
        <Analytics />
      </body>
    </html>
  )
}