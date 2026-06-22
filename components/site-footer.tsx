"use client"
import {GraduationCap} from "lucide-react"
import { useState } from "react"
import Image from "next/image";
const programs = [
  "Digital Foundation Program",
  "Frontend Engineering & UI/UX",
  "Backend Engineering wih AI",
  "Fullstack Engineering with AI",
  "Data Intelligence with AI",
]

const resources = [
  "Learning Materials",
  "Scholarships",
  "Tech Blog",
  "Student Portal",
  "Internships",
]

const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"]

export function SiteFooter() {
   const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      setMessage("")

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setMessage(data.message)
      setEmail("")
    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }
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
              {/* Facebook */}
              <a
                href="https://www.facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1a1a22] text-neutral-300 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0,0,256,256">
                  <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M12,2c-5.523,0 -10,4.477 -10,10c0,5.013 3.693,9.153 8.505,9.876v-7.226h-2.474v-2.629h2.474v-1.749c0,-2.896 1.411,-4.167 3.818,-4.167c1.153,0 1.762,0.085 2.051,0.124v2.294h-1.642c-1.022,0 -1.379,0.969 -1.379,2.061v1.437h2.995l-0.406,2.629h-2.588v7.247c4.881,-0.661 8.646,-4.835 8.646,-9.897c0,-5.523 -4.477,-10 -10,-10z"></path></g></g>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1a1a22] text-neutral-300 transition-all duration-300 hover:bg-pink-600 hover:text-white hover:scale-105"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0,0,256,256">
                  <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M8,3c-2.761,0 -5,2.239 -5,5v8c0,2.761 2.239,5 5,5h8c2.761,0 5,-2.239 5,-5v-8c0,-2.761 -2.239,-5 -5,-5zM18,5c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1zM12,7c2.761,0 5,2.239 5,5c0,2.761 -2.239,5 -5,5c-2.761,0 -5,-2.239 -5,-5c0,-2.761 2.239,-5 5,-5zM12,9c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3z"></path></g></g>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1a1a22] text-neutral-300 transition-all duration-300 hover:bg-blue-700 hover:text-white hover:scale-105"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0,0,256,256">
                  <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M19,3h-14c-1.105,0 -2,0.895 -2,2v14c0,1.105 0.895,2 2,2h14c1.105,0 2,-0.895 2,-2v-14c0,-1.105 -0.895,-2 -2,-2zM9,17h-2.523v-7h2.523zM7.694,8.717c-0.771,0 -1.286,-0.514 -1.286,-1.2c0,-0.686 0.514,-1.2 1.371,-1.2c0.771,0 1.286,0.514 1.286,1.2c0,0.686 -0.514,1.2 -1.371,1.2zM18,17h-2.442v-3.826c0,-1.058 -0.651,-1.302 -0.895,-1.302c-0.244,0 -1.058,0.163 -1.058,1.302c0,0.163 0,3.826 0,3.826h-2.523v-7h2.523v0.977c0.325,-0.57 0.976,-0.977 2.197,-0.977c1.221,0 2.198,0.977 2.198,3.174z"></path></g></g>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1a1a22] text-neutral-300 transition-all duration-300 hover:bg-black hover:text-white hover:scale-105"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0,0,256,256">
                  <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M6,3c-1.64497,0 -3,1.35503 -3,3v12c0,1.64497 1.35503,3 3,3h12c1.64497,0 3,-1.35503 3,-3v-12c0,-1.64497 -1.35503,-3 -3,-3zM12,7h2c0,1.005 1.471,2 2,2v2c-0.605,0 -1.332,-0.26584 -2,-0.71484v3.71484c0,1.654 -1.346,3 -3,3c-1.654,0 -3,-1.346 -3,-3c0,-1.654 1.346,-3 3,-3v2c-0.552,0 -1,0.449 -1,1c0,0.551 0.448,1 1,1c0.552,0 1,-0.449 1,-1z"></path></g></g>
                </svg>
              </a>

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
            <h3 className="text-lg font-semibold text-white">
              Newsletter
            </h3>

            <p className="mt-5 text-base leading-relaxed text-neutral-400">
              Get tech insights and academy updates directly in your inbox.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full rounded-lg border border-neutral-800 bg-[#13131a] px-4 py-3 text-white"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#c4a8f5] px-4 py-3 font-semibold text-[#4c1d95] transition hover:bg-[#b794f6] disabled:opacity-60"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>

              {message && (
                <p className="text-sm text-neutral-300">
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 border-t border-neutral-800 pt-8">
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
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm uppercase tracking-wider text-neutral-500">
              &copy; 2026 Korva Tech Hub Academy. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Admissions bar */}
      <div className="w-full bg-[#1a1a22]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

          {/* LEFT SECTION */}
          <div className="flex items-start gap-4 sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#9333ea]">
              <GraduationCap className="h-6 w-6 text-white" />
            </span>

            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-400">
                Selected Specialization
              </p>
              <p className="text-base sm:text-lg font-semibold text-white">
                Full-Stack Development
              </p>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:gap-6">

            {/* DATE */}
            <div className="sm:text-right">
              <p className="text-xs uppercase tracking-wider text-neutral-400">
                Start Date
              </p>
              <p className="text-sm sm:text-base font-medium text-white">
                November 12, 2024
              </p>
            </div>

            {/* divider (only desktop) */}
            <div className="hidden h-10 w-px bg-neutral-700 lg:block" />

            {/* BUTTON */}
            <button className="
              w-full sm:w-auto
              rounded-xl sm:rounded-full
              bg-[#c4a8f5]
              px-6 sm:px-8
              py-3 sm:py-4
              text-sm sm:text-base
              font-semibold
              text-[#4c1d95]
              transition-colors
              hover:bg-[#b794f6]
              active:scale-[0.98]
            ">
              Continue to Admissions
            </button>
          </div>

        </div>
      </div>
    </footer>
  )
}
