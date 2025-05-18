"use client"

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react" // Added useMemo
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
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Memoize browser compatibility check to avoid recalculations
  const checkBrowserCompatibility = useCallback(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return false;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for Safari and iOS devices which may need special handling
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    // Return true if browser supports smooth scrolling and user hasn't requested reduced motion
    return !prefersReducedMotion;
  }, []);

  useEffect(() => {
    if (isInitialized) return; // Prevent multiple initializations
    
    const isCompatible = checkBrowserCompatibility();
    setBrowserSupported(isCompatible);

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Only initialize Lenis if browser is compatible
    if (!isCompatible) {
      console.log('Browser prefers reduced motion or doesn\'t support smooth scrolling. Using native scrolling.');
      setIsInitialized(true);
      return;
    }

    // Create Lenis instance with optimized settings
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
    
    // Use a more efficient animation frame handling with GSAP ticker
    const rafCallback = (time: number) => {
      // Multiply time by 1000 to convert seconds to milliseconds
      lenisInstance.raf(time * 1000);
    };
    
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing for more consistent performance

    setLenis(lenisInstance);
    setIsInitialized(true);

    // Removed commented-out requestAnimationFrame logic

    // Cleanup function with proper resource management
    return () => {
      gsap.ticker.remove(rafCallback); // Remove from GSAP ticker using the reference
      lenisInstance.destroy();
      setLenis(null);
      setIsInitialized(false);
      
      // Clean up all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Optimized scrollTo function with better error handling and performance
  const scrollTo = useCallback((target: string | number | HTMLElement, options?: any) => {
    // Early return if neither lenis nor window is available
    if (!lenis && typeof window === 'undefined') return;
    
    if (lenis) {
      // Use Lenis for smooth scrolling when available
      lenis.scrollTo(target, {
        offset: -100, // Default offset, can be overridden by options
        duration: 1.0, // Default duration
        ...options, // Allow overriding defaults
      });
    } else if (typeof window !== 'undefined') {
      // Fallback for browsers without smooth scrolling support
      try {
        let targetElement: Element | null = null;
        let targetPosition: number = 0;
        
        if (typeof target === 'string') {
          // If target is a selector
          targetElement = document.querySelector(target);
          if (!targetElement) throw new Error(`Element not found: ${target}`);
        } else if (target instanceof HTMLElement) {
          // If target is an HTML element
          targetElement = target;
        } else if (typeof target === 'number') {
          // If target is a number (position)
          targetPosition = target;
          targetElement = null;
        } else {
          throw new Error('Invalid target type');
        }
        
        const offsetY = options?.offset || -100;
        
        if (targetElement) {
          targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + offsetY;
        }
        
        // Use requestAnimationFrame for smoother scrolling even in fallback mode
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = options?.duration || 1.0;
        const startTime = performance.now();
        
        const animateScroll = (currentTime: number) => {
          const elapsed = (currentTime - startTime) / 1000; // Convert to seconds
          const progress = Math.min(elapsed / duration, 1);
          
          // Use the same easing function as Lenis for consistency
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          
          window.scrollTo(0, startPosition + distance * easedProgress);
          
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };
        
        requestAnimationFrame(animateScroll);
      } catch (error) {
        console.error('Error in fallback scrollTo:', error);
      }
    }
  }, [lenis]);

  // Optimized window resize handler with debounce
  useEffect(() => {
    if (!lenis) return;
    
    let resizeTimeout: number | null = null;
    
    const handleResize = () => {
      // Debounce resize events for better performance
      if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
      }
      
      resizeTimeout = window.requestAnimationFrame(() => {
        if (lenis) {
          lenis.resize();
        }
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
      }
    };
  }, [lenis]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ 
    lenis, 
    scrollTo 
  }), [lenis, scrollTo]);
  
  // Memoize the class names for better performance
  const contentClassName = useMemo(() => {
    const classes = ['scroll-content'];
    
    if (browserSupported) {
      classes.push('scroll-optimize', 'hardware-accelerated');
    }
    
    return classes.join(' ');
  }, [browserSupported]);

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      <div 
        className={contentClassName}
        style={{ willChange: browserSupported ? 'transform' : 'auto' }}
      >
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
};
