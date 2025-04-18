"use client"

// Re-export the provider from the lib directory
export { SmoothScrollProvider } from "@/lib/smooth-scroll";

// The old implementation below should be removed:
/*
import { useSmoothScroll } from "@/lib/smooth-scroll"

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useSmoothScroll()
  return <>{children}</>
}
*/
