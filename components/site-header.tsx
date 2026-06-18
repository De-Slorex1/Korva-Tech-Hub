"use client"

import Image from "next/image"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Portal", href: "#", dropdown: true },
  { label: "About", href: "/about" },
  { label: "Community", href: "/community" },
  { label: "Contact Us", href: "/contact" },
]

const portalItems = ["Student", "Instructor", "Admin"]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="w-full bg-[#0a0a0f] text-neutral-200 border-b border-neutral-800">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <a href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={120}
            height={40}
            // className="h-10 w-auto object-contain"
            priority
          />
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.dropdown ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-base hover:text-white transition-colors">
                  {link.label}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="border-neutral-800 bg-[#13131a] text-neutral-200">
                  {portalItems.map((item) => (
                    <DropdownMenuItem
                      key={item}
                      className="cursor-pointer focus:bg-neutral-800 focus:text-white"
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={
                  isActive(link.href)
                    ? "relative text-[#b794f6] after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:bg-[#b794f6]"
                    : "text-neutral-300 hover:text-white transition-colors"
                }
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <a href="#" className="hidden sm:inline hover:text-white transition">
            Sign In
          </a>

          <button
            onClick={() => router.push("/enrollment")}
            className="rounded-md bg-[#9333ea] px-5 py-2 cursor-pointer text-white hover:bg-[#7e22ce] transition"
          >
            Enroll Now
          </button>

          <button
            className="lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-neutral-800 px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                isActive(link.href)
                  ? "px-3 py-2 rounded bg-neutral-800 text-white"
                  : "px-3 py-2 rounded hover:bg-neutral-800"
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}