"use client"
import Link from "next/link"
import Navbar from "@/components/ui/Navbar"

const STATS = [
  { value: "2", label: "Voice models" },
  { value: "20+", label: "Voices" },
  { value: "$0", label: "To start" },
  { value: "~2s", label: "Generation time" },
]

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" stroke="#3ecf8e" strokeWidth="1.5" />
        <path d="M7 10l2 2 4-4" stroke="#3ecf8e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Natural-sounding voices",
    desc: "Powered by cutting-edge AI models fine-tuned for expressiveness and clarity.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10h14M10 3l7 7-7 7" stroke="#3ecf8e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "~2s generation",
    desc: "Fast inference pipeline means audio is ready before you blink.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="#3ecf8e" strokeWidth="1.5" />
        <path d="M7 10h6M10 7v6" stroke="#3ecf8e" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Credit-based pricing",
    desc: "Pay only for what you use. No forced subscriptions.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 4v3M10 13v3M4 10H7M13 10h3" stroke="#3ecf8e" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="10" r="3" stroke="#3ecf8e" strokeWidth="1.5" />
      </svg>
    ),
    title: "20+ voices",
    desc: "Male, female, accents — across all available models.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7 8a3 3 0 106 0 3 3 0 00-6 0zM3 17a7 7 0 0114 0" stroke="#3ecf8e" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Voice cloning — coming soon",
    desc: "Clone any voice with just a few seconds of audio. Available in Studio model.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M17 8a7 7 0 11-14 0 7 7 0 0114 0z" stroke="#3ecf8e" strokeWidth="1.5" />
        <path d="M10 11V8M10 6v-.5" stroke="#3ecf8e" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Simple REST API",
    desc: "Integrate TTS into your app in minutes with our clean API.",
  },
]

export default function LandingPage() {
  const user = null

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar user={user} transparent />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#3ecf8e]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 mb-8">
            <span className="text-[#3ecf8e]">✦</span>
            AI-powered voice engine — built for scale
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Turn text into{" "}
            <span className="text-[#3ecf8e]">natural speech</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Professional-grade text-to-speech — fast, expressive, and affordable for every creator.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/login"
              className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-colors"
            >
              Try for free
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 rounded-xl border border-white/15 text-white font-medium hover:bg-white/5 transition-colors"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-t border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Live demo */}
      <section className="py-24 px-6" id="demo">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="text-xs uppercase tracking-widest text-[#3ecf8e] mb-3">Live Demo</div>
          <h2 className="text-3xl font-bold">Try it now</h2>
        </div>

        <div className="max-w-2xl mx-auto rounded-2xl border border-white/10 bg-[#111] p-6">
          <div className="flex items-center gap-2 mb-5">
            {["Swift", "Studio ✦"].map((m, i) => (
              <button
                key={m}
                disabled={i === 1}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-[#3ecf8e] text-black"
                    : "text-gray-500 cursor-not-allowed opacity-50"
                }`}
              >
                {m}
              </button>
            ))}
            <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full ml-1">
              Coming Soon
            </span>
            <div className="flex-1" />
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-white/10 text-sm text-white">
              Bella
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <textarea
            className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none h-28 focus:outline-none focus:border-[#3ecf8e]/40 transition-colors"
            defaultValue="Welcome to VoiceForge — convert your text into natural, expressive speech in seconds."
          />
          <div className="text-right text-xs text-gray-500 mt-1 mb-4">
            80 / 5,000 characters
          </div>

          <div className="flex items-center justify-between gap-4 mb-4">
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1a1a1a] border border-white/10 text-sm text-white hover:bg-white/5 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <polygon points="2,2 12,7 2,12" fill="currentColor" />
              </svg>
              Generate audio
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Speed</span>
              <div className="w-24 h-1.5 bg-white/10 rounded-full relative">
                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md" />
              </div>
              <span>1.0x</span>
            </div>
          </div>

          {/* Audio player preview */}
          <div className="rounded-xl bg-[#161616] border border-white/10 px-4 py-3 flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-[#3ecf8e] flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="black">
                <polygon points="3,2 11,7 3,12" />
              </svg>
            </div>
            <div className="flex-1 flex items-center gap-[2px] h-7">
              {Array.from({ length: 32 }).map((_, i) => {
                const h = Math.sin(i * 0.6) * 35 + Math.sin(i * 1.4) * 20 + 45
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-full bg-[#3ecf8e]"
                    style={{ height: `${h}%` }}
                  />
                )
              })}
            </div>
            <span className="text-xs text-gray-400">0:04</span>
            <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v7M3 5.5l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              .mp3
            </button>
          </div>
        </div>
      </section>

      {/* Available models */}
      <section className="py-16 px-6" id="models">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Available models</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: "⚡",
                name: "Swift",
                desc: "Fast, lightweight — best for quick generations and high volume",
                badge: "Available",
                badgeClass: "text-[#3ecf8e] bg-[#3ecf8e]/10",
                comingSoon: false,
              },
              {
                icon: "🎙️",
                name: "Studio",
                desc: "High quality output + voice cloning — for professional use",
                badge: "Coming Soon",
                badgeClass: "text-purple-400 bg-purple-400/10",
                comingSoon: true,
              },
            ].map((m) => (
              <div
                key={m.name}
                className={`p-5 rounded-2xl border bg-[#111] relative ${
                  m.comingSoon ? "border-white/5 opacity-70" : "border-white/10"
                }`}
              >
                {m.comingSoon && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                )}
                <div className="text-3xl mb-3">{m.icon}</div>
                <div className="font-semibold text-white mb-1">{m.name}</div>
                <div className="text-sm text-gray-400 mb-4">{m.desc}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.badgeClass}`}>
                  {m.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6" id="features">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Everything you need</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="p-5 rounded-2xl border border-white/10 bg-[#111]">
                <div className="mb-3">{f.icon}</div>
                <div className="font-semibold text-white mb-1">{f.title}</div>
                <div className="text-sm text-gray-400">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Start generating for free</h2>
          <p className="text-gray-400 mb-8">
            No credit card required. Get 5,000 free credits to try all features.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3.5 rounded-xl bg-[#3ecf8e] text-black font-semibold hover:bg-[#34b87a] transition-colors"
          >
            Create free account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3ecf8e]" />
            <span className="text-sm font-semibold text-white">VoiceForge</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-xs text-gray-500 hover:text-gray-300">Pricing</Link>
            <Link href="/api-docs" className="text-xs text-gray-500 hover:text-gray-300">API docs</Link>
            <span className="text-xs text-gray-600">© 2026 VoiceForge</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
