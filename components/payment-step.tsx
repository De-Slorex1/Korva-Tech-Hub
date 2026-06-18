"use client"

import { CheckCircle2 } from "lucide-react"
import { Enrollment } from "@/types/enrollements"

interface PaymentStepProps {
  data: Partial<Enrollment>
  setData: React.Dispatch<
    React.SetStateAction<Partial<Enrollment>>
  >
  next: () => void
  back: () => void
}

const plans = [
  {
    id: "full",
    title: "Full Payment",
    description:
      "Pay once and secure your seat immediately.",
    badge: "Best Value",
  },

  {
    id: "installment",
    title: "Installment Plan",
    description:
      "Spread payment across multiple installments.",
    badge: "Flexible",
  },

  {
    id: "scholarship",
    title: "Scholarship Application",
    description:
      "Apply for financial assistance and review.",
    badge: "Limited",
  },
]

export function PaymentStep({
  data,
  setData,
  next,
  back,
}: PaymentStepProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Payment Plan
        </h2>

        <p className="mt-2 text-white/60">
          Select how you'd like to pay for your
          program.
        </p>
      </div>

      <div className="space-y-4">
        {plans.map((plan) => {
          const selected =
            data.paymentPlan === plan.id

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  paymentPlan:
                    plan.id as Enrollment["paymentPlan"],
                }))
              }
              className={`group w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                selected
                  ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/20"
                  : "border-white/10 hover:border-white/30 hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-white">
                      {plan.title}
                    </h3>

                    <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-xs text-violet-300">
                      {plan.badge}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-white/60">
                    {plan.description}
                  </p>
                </div>

                {selected && (
                  <CheckCircle2 className="h-6 w-6 text-violet-400" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Summary */}

      {data.paymentPlan && (
        <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4">
          <p className="text-sm text-violet-300">
            Selected Plan
          </p>

          <h3 className="mt-1 text-lg font-semibold text-white">
            {plans.find(
              (p) => p.id === data.paymentPlan
            )?.title}
          </h3>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={back}
          className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:bg-white/5"
        >
          Back
        </button>

        <button
          disabled={!data.paymentPlan}
          onClick={next}
          className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  )
}