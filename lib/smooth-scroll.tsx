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
      duration: 1.2, // Slightly longer for smoother feel
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic ease-out for smoother deceleration
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 0.85, // Reduced for smoother wheel scrolling
      smoothWheel: true,
      touchInertiaMultiplier: 1.0, // Use touchInertiaMultiplier instead of smoothTouch for touch smoothing
      touchMultiplier: 1.5, // Adjusted for better touch response
      infinite: false,
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

  // Add window resize handler
  useEffect(() => {
    const handleResize = () => {
      if (lenis) {
        lenis.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [lenis]);

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
      <div className="scroll-content scroll-optimize">
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
};
