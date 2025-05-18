import Hero from "@/components/sections/hero"
import Navbar from "@/components/navbar"
import dynamic from 'next/dynamic'

// Simple loading placeholder
const LoadingPlaceholder = () => (
  <div className="min-h-[50vh] flex items-center justify-center text-white/50">
    Loading Section...
  </div>
);

// Dynamically import sections with loading state
const Skills = dynamic(() => import('@/components/sections/skills'), {
  loading: () => <LoadingPlaceholder />,
})
const Projects = dynamic(() => import('@/components/sections/projects'), {
  loading: () => <LoadingPlaceholder />,
})
const Experience = dynamic(() => import('@/components/sections/experience'), {
  loading: () => <LoadingPlaceholder />,
})
const Contact = dynamic(() => import('@/components/sections/contact'), {
  loading: () => <LoadingPlaceholder />,
})
// Remove the dynamic import for the Resume section
// const Resume = dynamic(() => import('@/components/sections/resume'), {
//  loading: () => <LoadingPlaceholder />,
// })
const Footer = dynamic(() => import('@/components/sections/footer'), {
  loading: () => <LoadingPlaceholder />, // Footer might load fast, but consistency helps
})


export default function Home() {
  return (
    <main className="relative bg-[#030303] text-white overflow-hidden">
      <Navbar />
      <Hero />
      {/* Render dynamically imported components */}
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      {/* Remove the Resume section rendering */}
      {/* <Resume /> */}
      <Footer />
    </main>
  )
}