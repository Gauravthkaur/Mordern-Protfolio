"use client"
// Make sure Download icon is imported
import { Github, Linkedin, Mail, Twitter, Download, Send } from "lucide-react"
// Import the context hook
import { useSmoothScrollContext } from "@/lib/smooth-scroll"
import { useState } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { scrollTo } = useSmoothScrollContext();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // Use the scrollTo function from the context with custom options
    scrollTo(href, {
      duration: 1.2, // Increase duration (in seconds) for a slower scroll
      easing: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, // Example: easeInOutCubic
      // You can experiment with other easing functions or durations
    });
  }

  // Define email parameters
  const emailParams = {
    to: 'gaurav079t@gmail.com', // Corrected email address
    subject: 'Reaching out regarding your portfolio',
    body: 'Hi Gaurav,\n\nI saw your portfolio and would like to connect.\n\nBest regards,'
  };

  // Create Gmail compose URL with parameters
  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailParams.to}&su=${encodeURIComponent(emailParams.subject)}&body=${encodeURIComponent(emailParams.body)}`;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your API
    console.log("Subscribing email:", email);
    setSubscribed(true);
    setEmail("");
    // Reset subscription status after 3 seconds
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="relative py-12 bg-[#030303] border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.01] via-transparent to-rose-500/[0.01] blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"> 
          {/* Portfolio Info Column */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
              Portfolio
            </h3>
            <p className="text-white/40 max-w-xs">
              Creating exceptional digital experiences through innovative design and cutting-edge technology.
            </p>
            
            {/* Newsletter Signup - New Addition */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-white mb-2">Stay Updated</h4>
              {subscribed ? (
                <p className="text-green-400 text-sm">Thanks for subscribing!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="bg-white/5 border border-white/10 rounded-l-md px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 rounded-r-md px-3 transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links Section */}
          <div> {/* This div wraps the Quick Links */}
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Skills", "Projects", "Experience", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => handleLinkClick(e, `#${link.toLowerCase()}`)} // This now uses the updated handler
                    className="text-white/40 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-flex items-center group cursor-pointer"
                  >
                    <span className="w-0 overflow-hidden transition-all duration-200 group-hover:w-2 group-hover:mr-1">
                      →
                    </span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div> {/* Close the Quick Links div */}

          {/* Connect Section */}
          <div> {/* This div wraps the Connect section */}
            <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
            <div className="flex space-x-4 mb-6"> {/* Added mb-6 */}
              <a
                href="https://github.com/Gauravthkaur"
                target="_blank" // Add target blank for external links
                rel="noopener noreferrer" // Add rel for security
                className="bg-white/[0.03] hover:bg-white/[0.08] p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/10 border border-white/10"
                aria-label="GitHub"
              >
                <Github size={20} className="text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/gauravkumar-dev"
                target="_blank" // Add target blank for external links
                rel="noopener noreferrer" // Add rel for security
                className="bg-white/[0.03] hover:bg-white/[0.08] p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/10 border border-white/10"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="text-white" />
              </a>
              <a
                href="https://x.com/gauravThakur_2"
                target="_blank" // Add target blank for external links
                rel="noopener noreferrer" // Add rel for security
                className="bg-white/[0.03] hover:bg-white/[0.08] p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/10 border border-white/10"
                aria-label="Twitter"
              >
                <Twitter size={20} className="text-white" />
              </a>
              <a
                href={mailtoLink} // Use the constructed Gmail link
                target="_blank" // Open in a new tab
                rel="noopener noreferrer" // Security best practice
                className="bg-white/[0.03] hover:bg-white/[0.08] p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/10 border border-white/10"
                aria-label="Email"
              >
                <Mail size={20} className="text-white" />
              </a>
            </div>

            {/* Add Resume Download Button Here */}
            <div>
              
              <a
                href="/GAURAV KUMAR - Full Stack Developer Resume.pdf" // Path relative to the public folder
                download="Gaurav_Kumar_Resume.pdf" // Suggests the filename for download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500/80 to-rose-500/80 text-white text-sm font-medium rounded-md shadow-md transition-all duration-300 ease-in-out hover:from-indigo-600 hover:to-rose-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#030303]"
              >
                <Download size={16} /> {/* The Download icon is used here */}
                Resume
              </a>
            </div>

          </div> {/* Close the Connect div */}
        </div>

        {/* Footer Bottom - Enhanced */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/40 text-sm">
              © {currentYear}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">
                Gaurav's Portfolio
              </span>
              . All rights reserved.
            </p>
            
            {/* Additional Links - New Addition */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Terms of Use</a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
