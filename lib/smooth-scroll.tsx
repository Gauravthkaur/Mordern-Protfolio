"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from "react" // Removed unused useRef
import Lenis from "@studio-freight/lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface SmoothScrollContextProps {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: any) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextProps | undefined>(undefined);

export const useSmoothScrollContext = () => {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("useSmoothScrollContext must be used within a SmoothScrollProvider");
  }
  return context;
};

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  // Removed unused reqIdRef

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const lenisInstance = new Lenis({
      duration: 1.0, // Adjust duration as needed (e.g., 1.0 seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Standard easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      smoothWheel: true,
      touchInertiaMultiplier: 2, // Adjust touch inertia for better mobile experience
      touchMultiplier: 2,
      infinite: false,
      smoothTouch: true,
      smooth: true,
      smoothTouchThreshold: 0,
      touchpadSupport: true,
    });

    // Integrate Lenis with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      // Multiply time by 1000 to convert seconds to milliseconds
      lenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0); // Disable lag smoothing

    setLenis(lenisInstance);

    // Removed commented-out requestAnimationFrame logic

    // Cleanup function
    return () => {
      // Removed commented-out cancelAnimationFrame logic
      gsap.ticker.remove(lenisInstance.raf); // Remove from GSAP ticker
      lenisInstance.destroy();
      setLenis(null);
      // Optional: Kill all ScrollTriggers if they are only used with Lenis
      // ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollTo = useCallback((target: string | number | HTMLElement, options?: any) => {
    if (lenis) {
      lenis.scrollTo(target, {
        offset: -100, // Default offset, can be overridden by options
        duration: 1.0, // Default duration
        ...options, // Allow overriding defaults
      });
    }
  }, [lenis]);

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
