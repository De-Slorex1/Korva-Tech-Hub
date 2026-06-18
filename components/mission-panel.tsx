import Image from "next/image"

export function MissionPanel() {
  return (
    <div className="flex w-full max-w-sm flex-col">
      <p className="text-right text-xs font-medium tracking-[0.3em] text-white/45">THE MISSION</p>
      <h2 className="mt-3 text-right text-4xl font-bold leading-tight text-white text-balance">
        Redefining Tech Excellence
      </h2>
      <p className="mt-4 text-right text-sm leading-relaxed text-white/60 text-pretty">
        Join 5,000+ engineers building the future of the African digital ecosystem.
      </p>

      {/* Device mockup */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a1120]">
        <div className="relative aspect-square w-full">
          <Image
            src="/tech-node-dashboard.png"
            alt="Tech command dashboard preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050816] to-transparent p-4">
            <p className="font-mono text-xs tracking-wider text-[#34D399]">CURRENT NODE: LAGOS HUB</p>
          </div>
        </div>
      </div>
    </div>
  )
}
