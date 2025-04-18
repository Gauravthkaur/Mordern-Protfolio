"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import emailjs from '@emailjs/browser'
import { gsap } from "gsap/dist/gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "service_69ack9p"
const EMAILJS_TEMPLATE_ID = "template_9su4hiy"
const EMAILJS_PUBLIC_KEY = "61L9jgIKZHwYDmVnm"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Register ScrollTrigger only on client side
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
      
      const section = sectionRef.current
      const form = formRef.current

      if (section) {
        // Important: Set initial opacity to 1 for reliable mobile rendering
        const title = section.querySelector("h2")
        const description = section.querySelector("p")

        if (title && description) {
          // Set initial state to ensure elements are visible by default
          gsap.set([title, description], { opacity: 1 })
          
          // Use a more reliable animation that won't hide elements if trigger fails
          gsap.fromTo(
            [title, description],
            { y: 20, opacity: 0.8 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.2,
              duration: 0.6,
              scrollTrigger: {
                trigger: section,
                start: "top 90%", // More generous trigger point
                toggleActions: "play none none none", // Don't reverse
              },
            }
          )
        }

        // Animate contact info items with safer values
        const contactItems = section.querySelectorAll(".contact-item")
        contactItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { x: -15, opacity: 0.8 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              delay: 0.1 + index * 0.1,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none", // Don't reverse
              },
            }
          )
        })

        // Animate form with safer values
        if (form) {
          const formElements = form.querySelectorAll("input, textarea, button")
          gsap.fromTo(
            formElements,
            { y: 10, opacity: 0.8 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.4,
              scrollTrigger: {
                trigger: form,
                start: "top 90%",
                toggleActions: "play none none none", // Don't reverse
              },
            }
          )
        }
      }

      return () => {
        // Clean up all ScrollTrigger instances when component unmounts
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
        },
        EMAILJS_PUBLIC_KEY
      )

      if (result.text === "OK") {
        setIsSubmitted(true)
        setFormState({ name: "", email: "", message: "" })
        
        // Reset form submission status after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      alert("Failed to send message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY)
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-16 md:py-20 bg-[#030303]">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        {/* Important: Always have opacity-100 to ensure visibility on mobile */}
        <div className="text-center mb-8 sm:mb-16 opacity-100">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white opacity-100">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto px-4 opacity-100">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="contact-item flex items-start space-x-4 opacity-100">
              <div className="bg-indigo-500/10 p-2 sm:p-3 rounded-lg">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-white">Location</h3>
                <p className="text-sm sm:text-base text-gray-400">Bareilly Uttar Pradesh</p>
              </div>
            </div>

            <div className="contact-item flex items-start space-x-4 opacity-100">
              <div className="bg-indigo-500/10 p-2 sm:p-3 rounded-lg">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-white">Email</h3>
                <p className="text-sm sm:text-base text-gray-400">gaurav079t@gmail.com</p>
              </div>
            </div>

            <div className="contact-item flex items-start space-x-4 opacity-100">
              <div className="bg-indigo-500/10 p-2 sm:p-3 rounded-lg">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-white">Phone</h3>
                <p className="text-sm sm:text-base text-gray-400">+91 8395858165</p>
              </div>
            </div>

            {/* Remove motion import dependency for better performance */}
            <div
              className="mt-8 sm:mt-12 p-4 sm:p-6 bg-[#0a0a0a] border border-gray-800 rounded-xl opacity-100 transition-all duration-500"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">Connect With Me</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-4">
                Follow me on social media to see my latest projects and updates.
              </p>
              <div className="flex flex-wrap gap-3">
                {/* Social media icons */}

                <a
                  href="https://x.com/gauravThakur_2"
                  target="_blank" // Add target="_blank"
                  rel="noopener noreferrer" // Add rel attribute
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/gauravkumar-dev" // Corrected LinkedIn URL
                  target="_blank" // Add target="_blank"
                  rel="noopener noreferrer" // Add rel attribute
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/Gauravthkaur"
                  target="_blank" // Add target="_blank"
                  rel="noopener noreferrer" // Add rel attribute
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 sm:p-6 md:p-8 opacity-100">
            {isSubmitted ? (
              <div
                className="text-center py-8 sm:py-12 transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 sm:h-8 sm:w-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-400 mb-1 sm:mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#151515] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400 mb-1 sm:mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#151515] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-400 mb-1 sm:mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#151515] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white resize-none text-sm sm:text-base"
                    placeholder="Hello, I'd like to talk about..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 sm:py-3 px-4 sm:px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}