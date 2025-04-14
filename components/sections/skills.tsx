"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
  FaReact, 
  FaNodeJs, 
  FaVuejs, 
  FaAngular 
} from "react-icons/fa"
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiMongodb, 
  SiGraphql,
  SiSvelte,
  SiRemix,
  SiTailwindcss,
  SiThreedotjs
} from "react-icons/si"

// Define the skills with their icons
const skills = [
  { name: "React", icon: FaReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: FaNodeJs },
  { name: "MongoDB", icon: SiMongodb },
  { name: "GraphQL", icon: SiGraphql },
  { name: "Vue", icon: FaVuejs },
  { name: "Svelte", icon: SiSvelte },
  { name: "Remix", icon: SiRemix },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Angular", icon: FaAngular },
  { name: "Three.js", icon: SiThreedotjs },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate section title and description
      if (titleRef.current && descriptionRef.current) {
        gsap.fromTo(
          [titleRef.current, descriptionRef.current],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Animate skill icons
      if (iconsRef.current) {
        const icons = iconsRef.current.querySelectorAll(".skill-icon")
        gsap.fromTo(
          icons,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.05,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: iconsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#030303] overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            My Skills
          </h2>
          <p
            ref={descriptionRef}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Technologies and tools I've worked with and mastered over the years
          </p>
        </div>

        <div
          ref={iconsRef}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-icon group relative flex flex-col items-center"
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-[#030303] p-4 rounded-xl w-full aspect-square flex items-center justify-center group-hover:border-indigo-500/50 group-hover:shadow-lg group-hover:shadow-indigo-500/10 transition-all duration-300">
                <skill.icon
                  size={48}
                  className="w-12 h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="mt-2 text-sm text-gray-400 group-hover:text-indigo-400 transition-colors duration-300">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
    </section>
  )
}