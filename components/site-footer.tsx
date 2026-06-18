import { Globe, Share2, Mail, GraduationCap } from "lucide-react"
import Image from "next/image"

const programs = [
  "AI & Machine Learning",
  "Blockchain Engineering",
  "Full Stack Development",
  "Cybersecurity Professional",
  "Cloud Architecture",
]

const resources = [
  "Success Stories",
  "Scholarships",
  "Tech Blog",
  "Student Portal",
  "Hiring Partners",
]

const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"]

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#0a0a0f] text-neutral-200 border-t border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center">
                       <Image
                         src="/logo.png"
                         alt="logo"
                         width={120}
                         height={120}
                         // className="h-10 w-auto object-contain"
                         priority
                       />
              </a> 
            </div>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-neutral-400">
              The leading academy for deep tech education in Africa. We empower the
              next generation of engineers with world-class skills and industry
              connections.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Globe, Share2, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1a1a22] text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                  aria-label="Social link"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold text-white">Programs</h3>
            <ul className="mt-5 space-y-3">
              {programs.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-base text-neutral-400 transition-colors hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="mt-5 space-y-3">
              {resources.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-base text-neutral-400 transition-colors hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="mt-5 text-base leading-relaxed text-neutral-400">
              Get tech insights and academy updates directly in your inbox.
            </p>
            <form className="mt-5 flex flex-col gap-3">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email address"
                className="w-full rounded-lg border border-neutral-800 bg-[#13131a] px-4 py-3 text-base text-white placeholder:text-neutral-500 outline-none transition-colors focus:border-[#b794f6]"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-[#c4a8f5] px-4 py-3 text-base font-semibold text-[#4c1d95] transition-colors hover:bg-[#b794f6]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 border-t border-neutral-800 pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm uppercase tracking-wider text-neutral-500">
              &copy; 2024 Korva Tech Hub Academy. All Rights Reserved.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {legalLinks.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm uppercase tracking-wider text-neutral-500 transition-colors hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Admissions bar */}
      <div className="w-full bg-[#1a1a22]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#9333ea]">
              <GraduationCap className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-400">
                Selected Specialization
              </p>
              <p className="text-lg font-semibold text-white">
                Full-Stack Development
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="lg:text-right">
              <p className="text-xs uppercase tracking-wider text-neutral-400">
                Start Date
              </p>
              <p className="text-base font-medium text-white">November 12, 2024</p>
            </div>
            <div className="hidden h-12 w-px bg-neutral-700 lg:block" />
            <button className="rounded-full bg-[#c4a8f5] px-8 py-4 text-base font-semibold text-[#4c1d95] transition-colors hover:bg-[#b794f6]">
              Continue to Admissions
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
