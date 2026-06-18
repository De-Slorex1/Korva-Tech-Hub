"use client"

import Image from "next/image"
import courses from "@/data/courses"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { Enrollment } from "@/types/enrollements"

type Props = {
  data: Partial<Enrollment>
  setData: React.Dispatch<React.SetStateAction<Partial<Enrollment>>>
  next: () => void
  back: () => void
}

export function TrackStep({
  data,
  setData,
  next,
  back,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">
          Choose Your Program
        </h2>

        <p className="mt-2 text-sm text-white/60">
          Select the learning path that best aligns with your goals.
        </p>
      </div>

      {/* Programs */}

      <div className="grid gap-5">
        {courses.map((course) => {
          const selected =
            data.programId === course.code

          return (
            <button
              key={course.code}
              type="button"
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  programId: course.code,
                  programName: course.title,
                }))
              }
              className={`
                group relative overflow-hidden rounded-3xl
                border p-5 text-left transition-all duration-300

                ${
                  selected
                    ? "border-[#8B5CF6] bg-[#8B5CF6]/10 shadow-[0_0_40px_rgba(139,92,246,0.25)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                }
              `}
            >
              {/* Glow */}

              {selected && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/10 via-transparent to-transparent" />
              )}

              <div className="relative flex gap-5">
                {/* Image */}

                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {course.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-sm text-white/60">
                        {course.description}
                      </p>
                    </div>

                    {selected && (
                      <CheckCircle
                        className="text-[#8B5CF6]"
                        size={22}
                      />
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                      {course.courseDuration}
                    </span>

                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                      {course.levelLabel}
                    </span>

                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                      {course.projects}+ Projects
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/40">
                        Full Payment
                      </p>

                      <p className="text-lg font-bold text-white">
                        {course.price.fullPayment.discounted}
                      </p>
                    </div>

                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: course.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Summary */}

      {data.programName && (
        <div className="rounded-2xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 p-5">
          <p className="text-sm text-white/60">
            Selected Program
          </p>

          <h3 className="mt-1 text-xl font-semibold text-white">
            {data.programName}
          </h3>
        </div>
      )}

      {/* Actions */}

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={back}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          disabled={!data.programId}
          onClick={next}
          className="inline-flex items-center gap-2 rounded-xl bg-[#8B5CF6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}