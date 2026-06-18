import { SiteHeader } from "@/components/site-header"
import { ProgressSteps } from "@/components/progress-steps"
import { PricingCards } from "@/components/pricing-cards"
import { GuaranteeSection } from "@/components/guarantee-section"

export default function PaymentPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040A1A] text-white">
      {/* Ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-[#8B5CF6]/12 blur-[160px]"
      />

      <div className="relative z-10">
        <SiteHeader />

        <div className="mx-auto max-w-6xl px-6 py-12">
          <ProgressSteps activeStep={3} />

          <div className="mt-10 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Select Your Learning Path</h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/65">
              Flexible investment options designed for Africa&apos;s future tech leaders. Choose the plan that best fits
              your career goals.
            </p>
          </div>

          <div className="mt-12">
            <PricingCards />
          </div>

          <div className="mt-8">
            <GuaranteeSection />
          </div>
        </div>
      </div>
    </main>
  )
}
