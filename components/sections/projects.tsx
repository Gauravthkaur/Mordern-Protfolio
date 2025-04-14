"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"

// Import only what's needed from gsap for better performance
import { gsap } from "gsap/dist/gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with product management, cart functionality, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
    github: "#",
    demo: "#",
  },
  {
    title: "Portfolio Website",
    description: "A responsive portfolio website with advanced animations and interactive elements.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "GSAP", "Framer Motion", "Tailwind CSS"],
    github: "#",
    demo: "#",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Firebase", "Redux", "Material UI"],
    github: "#",
    demo: "#",
  },
  {
    title: "Weather Dashboard",
    description: "An interactive weather dashboard with location-based forecasts and historical data visualization.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["JavaScript", "Chart.js", "Weather API", "CSS"],
    github: "#",
    demo: "#",
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const projectsContainerRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isInView, setIsInView] = useState(false)
  const [activeProject, setActiveProject] = useState(-1)

  // Initialize ScrollTrigger only on client side
  useEffect(() => {
    if (typeof window === "undefined") return
    
    gsap.registerPlugin(ScrollTrigger)
    
    // Create an intersection observer for the section
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // Initialize header animations
    if (titleRef.current && descRef.current) {
      // Set initial state to ensure elements are visible by default with fallback
      gsap.set([titleRef.current, descRef.current], { opacity: 0.01 })
      
      // Create title reveal animation
      gsap.fromTo(
        titleRef.current,
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            once: true,
          }
        }
      )
      
      // Create description reveal animation with a slight delay
      gsap.to(descRef.current, {
        opacity: 1,
        duration: 1,
        delay: 0.4,
        scrollTrigger: {
          trigger: descRef.current,
          start: "top 80%",
          once: true,
        }
      })
    }

    // Create staggered project card reveal animations
    if (projectsContainerRef.current) {
      // Create a timeline for project animations
      const projectTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: projectsContainerRef.current,
          start: "top 70%",
          once: true,
        }
      })

      // Add each project to the timeline with staggered effects
      projectRefs.current.forEach((project, index) => {
        if (project) {
          projectTimeline.fromTo(
            project,
            {
              y: 50,
              opacity: 0,
              rotateY: -5,
              scale: 0.95,
            },
            {
              y: 0,
              opacity: 1,
              rotateY: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
            },
            index * 0.15 // Stagger time
          )
        }
      })
    }

    return () => {
      observer.disconnect()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Handle hover state for projects (performance optimization)
  const handleProjectHover = (index: number) => {
    setActiveProject(index)
  }

  const handleProjectLeave = () => {
    setActiveProject(-1)
  }

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative py-16 sm:py-20 md:py-24 bg-[#030303] overflow-hidden"
    >
      {/* Dynamic background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] pointer-events-none">
        {/* Floating particles */}
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-violet-500/10 rounded-full blur-3xl animate-float-fast"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300 opacity-0"
          >
            Featured Projects
          </h2>
          <p 
            ref={descRef}
            className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base opacity-0"
          >
            A selection of my recent work showcasing my skills and expertise
          </p>
        </div>

        <div 
          ref={projectsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10"
        >
          {projects.map((project, index) => (
            <div 
              key={index} 
              ref={(el: HTMLDivElement | null): void => {
                projectRefs.current[index] = el;
              }}
              onMouseEnter={() => handleProjectHover(index)}
              onMouseLeave={handleProjectLeave}
              className={`opacity-0 transition-all duration-300 transform ${
                isInView ? 'translate-y-0' : 'translate-y-12'
              }`}
            >
              <div 
                className={`bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden transition-all duration-500 h-full shadow-lg hover:border-white/20 hover:shadow-indigo-500/20 ${
                  activeProject === index ? 'scale-[1.02] -translate-y-2' : ''
                }`}
              >
                <div className="relative h-[180px] sm:h-[220px] overflow-hidden group">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-700 ${
                      activeProject === index ? 'scale-110' : 'group-hover:scale-105'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent opacity-70"></div>
                  
                  {/* Action buttons with improved visibility and accessibility */}
                  <div className="absolute top-4 right-4 flex space-x-2 transition-all duration-300 transform origin-top-right">
                    <a
                      href={project.github}
                      className="bg-black/40 backdrop-blur-md p-2 rounded-full hover:bg-indigo-600/80 transition-colors"
                      aria-label="View code on GitHub"
                    >
                      <Github size={16} className="text-white" />
                    </a>
                    <a
                      href={project.demo}
                      className="bg-black/40 backdrop-blur-md p-2 rounded-full hover:bg-indigo-600/80 transition-colors"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={16} className="text-white" />
                    </a>
                  </div>
                </div>
                
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-2 py-1 rounded-full bg-white/[0.05] text-white/70 hover:bg-indigo-500/20 hover:text-white/90 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Visual connector with pulse animation */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-indigo-500/40"></div>
        <div className="w-3 h-3 rounded-full bg-indigo-500/60 absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
      </div>

      {/* Add these animation classes to your global CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}