"use client"

import { useState } from "react"
import { AtSign, Lock, Eye, EyeOff, Fingerprint, KeyRound } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function SignInCard() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/[0.08] p-8">
      {/* gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(160deg, rgba(52,211,153,0.18) 0%, rgba(15,23,42,0.4) 45%, rgba(139,92,246,0.18) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 backdrop-blur-xl" />

      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
        <p className="mt-2 text-sm text-white/65">Continue your tech excellence journey</p>
      </div>

      <form className="mt-8 flex flex-col gap-5">
        {/* Academic ID */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="academic-id" className="text-sm text-white/80">
            Academic ID
          </Label>
          <div className="relative">
            <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              id="academic-id"
              type="email"
              placeholder="student@academyhub.tech"
              className="h-11 border-white/[0.08] bg-[#0a1120]/70 pl-10 text-white placeholder:text-white/35"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm text-white/80">
              SecuriId Key
            </Label>
            <a href="#" className="text-sm text-[#34D399] transition-colors hover:text-[#34D399]/80">
              Forgot?
            </a>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              defaultValue="password"
              className="h-11 border-white/[0.08] bg-[#0a1120]/70 px-10 text-white placeholder:text-white/35"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white/70"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Remember */}
        <div className="flex items-center gap-2">
          <Checkbox id="remember" className="border-white/20 data-[state=checked]:bg-[#8B5CF6] data-[state=checked]:border-[#8B5CF6]" />
          <Label htmlFor="remember" className="text-sm font-normal text-white/65">
            Remember this station
          </Label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="h-11 w-full rounded-lg bg-[#c4b5fd] text-sm font-semibold text-[#1e1b4b] transition-colors hover:bg-[#b4a3fc]"
        >
          Access Dashboard
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/[0.08]" />
        <span className="text-[11px] font-medium tracking-wider text-white/40">OR SECURE CONNECT</span>
        <span className="h-px flex-1 bg-white/[0.08]" />
      </div>

      {/* Alt methods */}
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          className="flex h-11 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/70 transition-colors hover:bg-white/[0.06]"
          aria-label="Sign in with fingerprint"
        >
          <Fingerprint className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex h-11 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/70 transition-colors hover:bg-white/[0.06]"
          aria-label="Sign in with security key"
        >
          <KeyRound className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex h-11 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-sm font-semibold tracking-wide text-white/70 transition-colors hover:bg-white/[0.06]"
          aria-label="Sign in with Google"
        >
          GOOGLE
        </button>
      </div>

      {/* Security status */}
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#34D399]/20 bg-[#34D399]/[0.06] px-4 py-3">
        <ShieldIcon />
        <div>
          <p className="text-sm font-medium text-[#34D399]">Biometric Identity Active</p>
          <p className="text-[10px] tracking-wider text-[#34D399]/60">ENTERPRISE GRADE SECURITY</p>
        </div>
      </div>
    </div>
  )
}

function ShieldIcon() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#34D399]/15 text-[#34D399]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    </span>
  )
}
