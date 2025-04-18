"use client"
import { Github, Linkedin, Mail, Twitter} from "lucide-react"
// Import the context hook
import { useSmoothScrollContext } from "@/lib/smooth-scroll"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { scrollTo } = useSmoothScrollContext();

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

  return (
    <footer className="relative py-12 bg-[#030303] border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.01] via-transparent to-rose-500/[0.01] blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6">


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
              Portfolio
            </h3>
            <p className="text-white/40 max-w-xs">
              Creating exceptional digital experiences through innovative design and cutting-edge technology.
            </p>
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
            <div className="flex space-x-4">
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
          </div> {/* Close the Connect div */}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            © {currentYear}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">
              Gaurav's Portfolio
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
