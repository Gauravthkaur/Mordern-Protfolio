"use client"

import { useRef } from "react"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

const projects = [

  {
    id: "employee-management-system",
    title: "Employee Management System",
    description: "A web-based system for managing employee details, roles, and performance.",
    image: "/employeeManagemnt.png",
    tags: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/Gauravthkaur/Employee-Management-System",
    demo: "https://employee-management-system-theta-lac.vercel.app/"
},

  {
    id: "User_Management_System",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    image: "/user management.png",
    tags: ["React", "Firebase", "Redux", "Material UI"],
    github: "https://github.com/Gauravthkaur/User-Management-System",
    demo: "https://user-management-system-delta.vercel.app/",
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description: "An interactive weather dashboard with location-based forecasts.",
    image: "/weather.png",
    tags: ["JavaScript", "Chart.js", "Weather API", "CSS"],
    github: "https://github.com/Gauravthkaur/weather_app",
    demo: "https://weather-app-seven-psi-53.vercel.app/",
  },
    {
      id: "samagam-landing-page",
      title: "Samagam Landing Page",
      description: "A responsive landing page for Samagam with a visually appealing design.",
      image: "/landing Page.png",
      tags: ["JavaScript", "CSS", "HTML"],
      github: "https://github.com/Gauravthkaur/Samagam-LandingPage",
      demo: "https://samagam-landing-page.vercel.app/"
  },
  {
    id: "mental-health-bot",
    title: "Mental Health Bot",
    description: "AI-powered mental health companion providing empathetic responses and personalized recommendations for anxiety, depression, and stress.",
    image: "/bot.png",
    tags: ["Python", "JavaScript", "CSS", "Shell", "HTML"],
    github: "https://github.com/Gauravthkaur/Mental-Health-bot",
    demo: "https://mental-health-bot-two.vercel.app/"
},
{
  id: "modern-responsive-site",
  title: "Modern Responsive Site",
  description: "A modern and fully responsive website with clean design and layout.",
  image: "/modern site.png",
  tags: ["HTML", "CSS", "JavaScript"],
  github: "https://github.com/Gauravthkaur/Mordern_responsive_site",
  demo: "https://mordern-responsive-site.vercel.app/"
}
  // Add more projects if needed
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for background elements
  const bg1Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), { stiffness: 40, damping: 20 });
  const bg2Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -80]), { stiffness: 40, damping: 20 });
  const geo1X = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), { stiffness: 40, damping: 20 });
  const geo2X = useSpring(useTransform(scrollYProgress, [0, 1], [0, -40]), { stiffness: 40, damping: 20 });

  // Parallax for cards (each card gets a slightly different effect)
  const getCardParallax = (idx: number) =>
    useSpring(useTransform(scrollYProgress, [0, 1], [0, (idx % 2 === 0 ? -30 : 30)]), { stiffness: 50, damping: 20 });

  return (
    <motion.section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-32 bg-[#030303] overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Parallax Background Gradients */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-indigo-900/30 to-transparent blur-3xl"
          style={{ y: bg1Y }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-rose-900/30 to-transparent blur-3xl"
          style={{ y: bg2Y }}
        />
        {/* Parallax geometric shapes */}
        <motion.div
          className="absolute top-10 left-1/4 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl"
          style={{ x: geo1X }}
        />
        <motion.div
          className="absolute bottom-10 right-1/4 w-40 h-40 bg-rose-400/10 rounded-full blur-2xl"
          style={{ x: geo2X }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
            My Creations
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            Here's a glimpse into projects I've brought to life.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={sectionVariants}
        >
          {projects.map((project, index) => {
            const cardY = getCardParallax(index);
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                style={{ y: cardY }}
                className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:border-white/20 hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden group">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.github && project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-indigo-600/80 transition-colors"
                        aria-label="View code on GitHub"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.demo && project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-rose-600/80 transition-colors"
                        aria-label="View live demo"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-3 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-white/[0.05] text-indigo-300/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}