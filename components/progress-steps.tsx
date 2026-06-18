import { Check } from "lucide-react"

const steps = [
  { number: 1, label: "Profile" },
  { number: 2, label: "Program" },
  { number: 3, label: "Payment Plan" },
  { number: 4, label: "Review" },
]

export function ProgressSteps({ activeStep = 1 }: { activeStep?: number }) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => {
        const isActive = step.number === activeStep
        const isCompleted = step.number < activeStep
        return (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                  isActive
                    ? "bg-[#8B5CF6] text-white"
                    : isCompleted
                      ? "bg-[#8B5CF6]/25 text-white"
                      : "bg-white/[0.08] text-white/65"
                }`}
              >
                {isCompleted ? <Check className="h-3.5 w-3.5" /> : step.number}
              </span>
              <span
                className={`text-sm ${
                  isActive || isCompleted ? "font-medium text-white" : "text-white/65"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span
                className={`mx-4 h-px w-12 ${
                  step.number < activeStep ? "bg-[#8B5CF6]/40" : "bg-white/[0.12]"
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
