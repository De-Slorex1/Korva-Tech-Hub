import { SiteHeader } from "@/components/site-header"
import { SignInCard } from "@/components/sign-in-card"
import { MissionPanel } from "@/components/mission-panel"

export default function SignInPage() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white">
      {/* right-side radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 78% 42%, rgba(109,40,217,0.22) 0%, transparent 45%)",
        }}
      />

      <div className="relative">
        <SiteHeader />

        <main className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 py-16 lg:flex-row lg:items-center lg:justify-center lg:gap-20">
          <div className="flex flex-col items-center">
            <SignInCard />
            <p className="mt-6 text-sm text-white/60">
              New to the Academy?{" "}
              <a href="#" className="font-medium text-[#34D399] transition-colors hover:text-[#34D399]/80">
                Apply for Cohort 2024
              </a>
            </p>
          </div>

          <MissionPanel />
        </main>
      </div>
    </div>
  )
}
