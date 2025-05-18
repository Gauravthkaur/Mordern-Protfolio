"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
// Import the context hook
import { useSmoothScrollContext } from "@/lib/smooth-scroll"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Get the scrollTo function from the context
  const { scrollTo } = useSmoothScrollContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // Use the scrollTo function from the context
    scrollTo(href); // Using default options from context
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 relative",
          isScrolled ? "bg-[#030303]/80 backdrop-blur-lg border-b border-white/10 py-3" : "bg-transparent py-5",
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <a
              href="#home" // Point to home section
              onClick={(e) => handleNavClick(e, "#home")} // Add click handler
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300 cursor-pointer" // Add cursor-pointer
            >
              Dev-Gaurav
            </a>

            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Refined Structure */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu" // Add key for AnimatePresence reliability
            className="fixed inset-0 z-[100] bg-[#030303]/95 backdrop-blur-lg md:hidden overflow-y-auto" // Ensure vertical scroll
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top bar with logo and close button */}
            <div className="flex justify-between items-center p-5 border-b border-white/10"> {/* Added bottom border */}
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "#home")}
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300"
              >
                Portfolio
              </a>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-2 rounded-full hover:bg-white/10 transition-colors" // Improved tappable area
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links - Simplified Layout */}
            <nav className="flex flex-col items-center space-y-4 p-5 pt-8"> {/* Adjusted padding and removed flex-1/justify-center */}
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  // Explicitly set text color and ensure block display
                  className="block w-full text-center text-xl py-3 px-4 text-white hover:bg-white/10 rounded-md transition-colors duration-200"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
