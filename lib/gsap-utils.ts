import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Make sure to register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Helper function to create horizontal scroll sections
export const createHorizontalScrollSection = (trigger: string | Element, container: string | Element, options = {}) => {
  const defaultOptions = {
    start: "top top",
    end: "+=2000",
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  }

  const mergedOptions = { ...defaultOptions, ...options }

  return gsap.to(container, {
    x: () => {
      const containerEl = typeof container === "string" ? document.querySelector(container) : container

      if (!containerEl) return 0

      return -(containerEl.scrollWidth - window.innerWidth + 32)
    },
    ease: "none",
    scrollTrigger: {
      trigger,
      ...mergedOptions,
    },
  })
}

// Helper function to create staggered reveal animations
export const createStaggeredReveal = (elements: string | Element | NodeListOf<Element>, options = {}) => {
  const defaultOptions = {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out",
  }

  const mergedOptions = { ...defaultOptions, ...options }

  return gsap.from(elements, mergedOptions)
}

// Helper function to create scroll-triggered animations
export const createScrollTriggeredAnimation = (
  elements: string | Element | NodeListOf<Element>,
  animation: gsap.TweenVars,
  triggerOptions = {},
) => {
  const defaultTriggerOptions = {
    start: "top bottom-=100",
    end: "center center",
    toggleActions: "play none none reverse",
  }

  const mergedTriggerOptions = { ...defaultTriggerOptions, ...triggerOptions }

  return gsap.to(elements, {
    ...animation,
    scrollTrigger: mergedTriggerOptions,
  })
}

// Clean up all ScrollTrigger instances
export const cleanupScrollTriggers = () => {
  if (typeof window !== "undefined") {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
}
