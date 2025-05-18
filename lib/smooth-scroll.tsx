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
  const [browserSupported, setBrowserSupported] = useState<boolean>(true);

  useEffect(() => {
    // Check for browser compatibility
    const isBrowserCompatible = () => {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') return false;
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Return true if browser supports smooth scrolling and user hasn't requested reduced motion
      return !prefersReducedMotion;
    };

    setBrowserSupported(isBrowserCompatible());

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Only initialize Lenis if browser is compatible
    if (!isBrowserCompatible()) {
      console.log('Browser prefers reduced motion or doesn\'t support smooth scrolling. Using native scrolling.');
      return;
    }

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
    } else if (!browserSupported && typeof window !== 'undefined') {
      // Fallback for browsers without smooth scrolling support
      try {
        let targetElement: Element | null = null;
        
        if (typeof target === 'string') {
          // If target is a selector
          targetElement = document.querySelector(target);
        } else if (target instanceof HTMLElement) {
          // If target is an HTML element
          targetElement = target;
        }
        
        if (targetElement) {
          const offsetY = options?.offset || -100;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + offsetY;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'auto'
          });
        }
      } catch (error) {
        console.error('Error in fallback scrollTo:', error);
      }
    }
  }, [lenis, browserSupported]);

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
      <div className={`scroll-content ${browserSupported ? 'scroll-optimize hardware-accelerated' : ''}`}>
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
};
