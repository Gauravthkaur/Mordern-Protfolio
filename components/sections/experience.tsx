"use client"

import { Suspense, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase, Calendar, Link } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { motion, useInView } from "framer-motion"
import { ExperienceSkeleton } from "./experience-skeleton"

const experiences = [
  {
    title: "Web Development Intern",
    company: "RIF Foundation, MJP Rohilkhand University",
    period: "2025",
    description: "Led development of official ReactJS landing page for Samagam 2025. Solely responsible for end-to-end delivery.",
    highlights: [
      "Architected modular components with client-side routing",
      "Implemented code splitting & lazy loading",
      "Ensured mobile-first responsiveness",
      "Achieved WCAG 2.1 compliance"
    ],
    skills: ["React", "React Router", "CSS Modules", "Accessibility", "SEO"],
    url: "https://samagam-landing-page.vercel.app/"
  },
  {
    title: "Android Development Intern",
    company: "Evova Technologies Pvt. Ltd.",
    period: "2024",
    description: "Developed MVP Android application with modern UI and core features.",
    highlights: [
      "Built MVP Android application",
      "Implemented Firebase Authentication",
      "Designed modern UI with XML",
      "Integrated business-focused features"
    ],
    skills: ["Android", "Firebase", "Java", "Kotlin", "XML"],
  }
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false })
  const isMobile = useMediaQuery("(max-width: 767px)")

  useEffect(() => {
    if (typeof window === "undefined") return
    
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      // Timeline flow animation
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current,
          { 
            scaleY: 0,
            background: 'linear-gradient(to bottom, rgb(99 102 241), rgb(168 85 247), rgb(236 72 153))',
          },
          {
            scaleY: 1,
            duration: 1, // Reduced from 1.5
            ease: "power2.inOut", // Changed from power3
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%", // Adjusted trigger point
              end: "bottom 15%",
              scrub: 0.8, // Reduced from 1.5
              onUpdate: (self) => {
                const progress = self.progress;
                const dots = document.querySelectorAll('.timeline-dot');
                
                dots.forEach((dot, index) => {
                  const dotPosition = (index + 1) / dots.length;
                  if (progress >= dotPosition) {
                    dot.classList.add('active');
                  } else {
                    dot.classList.remove('active');
                  }
                });
              }
            },
          }
        )
      }

      // Enhanced dot animations
      cardRefs.current.forEach((card, index) => {
        if (!card) return
        
        const dot = card.querySelector('.timeline-dot');
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.2
            }
          )
        }
      })
    }, sectionRef)
    
    return () => ctx.revert()
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      id="experience"
      // Unified background color with Skills section
      className="relative py-20 lg:py-32 bg-[#030303] overflow-hidden"
    >
      {/* Remove or soften the animated gradient background for seamless blend */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0 bg-[#030303]" // Use same solid bg as Skills
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Experience
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            My professional journey and key achievements
          </p>
        </motion.div>

        {/* Timeline section */}
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div 
            ref={timelineRef}
            className={`
              absolute top-0 bottom-0 w-0.5 
              ${isMobile ? 'left-6' : 'left-1/2 -translate-x-px'}
              before:absolute before:inset-0 before:blur-sm before:bg-gradient-to-b 
              before:from-indigo-500 before:via-purple-500 before:to-pink-500
              after:absolute after:inset-0 after:blur-md after:bg-gradient-to-b 
              after:from-indigo-500/50 after:via-purple-500/50 after:to-pink-500/50
            `}
            style={{ 
              transform: 'scaleY(0)',
              transformOrigin: 'top',
              background: 'linear-gradient(to bottom, rgb(99 102 241), rgb(168 85 247), rgb(236 72 153))'
            }}
          />

          {/* Experience cards */}
          <div className="relative space-y-12 md:space-y-24 pr-4">
            {experiences.map((experience, index) => (
              <div
                key={index}
                ref={(el: HTMLDivElement | null) => { cardRefs.current[index] = el }}
                className={`
                  relative flex items-start
                  ${isMobile 
                    ? 'pl-12' 
                    : `${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`
                  }
                `}
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className={`
                    timeline-dot
                    
                    absolute w-4 h-4 rounded-full 
                    ${isMobile ? 'left-4' : 'left-1/2'}
                    -translate-x-1/2 z-20
                    bg-[#030303] border-2 border-indigo-500
                    before:absolute before:inset-[-2px] before:rounded-full
                    before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500
                    before:opacity-0 before:transition-opacity before:duration-300
                    after:absolute after:inset-[-4px] after:rounded-full
                    after:bg-indigo-500/20 after:opacity-0 after:transition-opacity
                    group-hover:before:opacity-100 group-hover:after:opacity-100
                  `}
                />

                {/* Card */}
                <motion.div
                  className={`
                    ${isMobile ? 'w-full' : 'w-[calc(50%-2rem)]'}
                  `}
                  initial={{ opacity: 0, x: isMobile ? -20 : (index % 2 === 0 ? -20 : 20) }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="group relative">
                    {/* Card glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-500" />
                    
                    {/* Card content */}
                    <div className="relative bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg border border-gray-800 group-hover:border-indigo-500/50 transition duration-300">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                            {experience.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{experience.period}</span>
                            <span className="text-indigo-400">•</span>
                            <span>{experience.company}</span>
                          </div>
                        </div>
                        {experience.url && (
                          <a
                            href={experience.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 transition-colors"
                          >
                            <Link className="w-5 h-5" />
                          </a>
                        )}
                      </div>

                      <p className="text-gray-300 mb-4 text-sm md:text-base">
                        {experience.description}
                      </p>

                      {/* Highlights */}
                      {experience.highlights && (
                        <ul className="space-y-2 mb-4">
                          {experience.highlights.map((highlight, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 + (i * 0.1) }}
                              className="flex items-start gap-2 text-sm text-gray-400"
                            >
                              <span className="mt-2 w-1 h-1 rounded-full bg-indigo-500" />
                              {highlight}
                            </motion.li>
                          ))}
                        </ul>
                      )}

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {experience.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-xs font-medium text-indigo-300 bg-indigo-500/10 rounded-full hover:bg-indigo-500/20 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative element: fade it out for seamless blend */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent pointer-events-none" />
    </section>
  )
}