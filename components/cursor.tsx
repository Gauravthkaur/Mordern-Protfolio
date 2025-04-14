"use client"

import { useEffect } from "react"

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const cursorDot = document.getElementById('cursor-dot')
    
    if (cursor && cursorDot) {
      const moveCursor = (e: MouseEvent) => {
        requestAnimationFrame(() => {
          cursor.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`
          cursorDot.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`
        })
      }
      
      document.addEventListener('mousemove', moveCursor)
      
      // Interactive elements hover effect
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]')
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-hover')
        })
        
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-hover')
        })
      })
      
      return () => {
        document.removeEventListener('mousemove', moveCursor)
        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => {})
          el.removeEventListener('mouseleave', () => {})
        })
      }
    }
  }, [])

  return (
    <>
      <div
        id="cursor"
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50 border-2 border-indigo-500 hidden md:block"
      />
      <div
        id="cursor-dot"
        className="fixed w-2 h-2 rounded-full pointer-events-none z-50 bg-rose-500 hidden md:block"
      />
    </>
  )
}