import type { Metadata } from "next"
import "./globals.css"
import CustomCursor from "@/components/cursor"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My professional portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <CustomCursor />
      </body>
    </html>
  )
}