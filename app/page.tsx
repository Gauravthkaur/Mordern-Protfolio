import Hero from "@/components/sections/hero"
import Skills from "@/components/sections/skills"
import Projects from "@/components/sections/projects"
import Experience from "@/components/sections/experience"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="relative bg-[#030303] text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
