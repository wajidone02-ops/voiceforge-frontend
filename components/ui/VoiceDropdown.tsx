"use client"
import { useState } from "react"
import { AIModel } from "@/types/generation"

interface Voice {
  id: string
  name: string
  gender: "Female" | "Male"
  accent: string
}

// Real Kokoro voices — id goes to backend, name shown to user
const SWIFT_VOICES: Voice[] = [
  { id: "af_bella",   name: "Bella",    gender: "Female", accent: "American" },
  { id: "af_sarah",   name: "Sarah",    gender: "Female", accent: "American" },
  { id: "af_sky",     name: "Sky",      gender: "Female", accent: "American" },
  { id: "af_nicole",  name: "Nicole",   gender: "Female", accent: "American" },
  { id: "am_adam",    name: "Adam",     gender: "Male",   accent: "American" },
  { id: "am_michael", name: "Michael",  gender: "Male",   accent: "American" },
  { id: "bf_emma",    name: "Emma",     gender: "Female", accent: "British"  },
  { id: "bf_isabella",name: "Isabella", gender: "Female", accent: "British"  },
  { id: "bm_george",  name: "George",   gender: "Male",   accent: "British"  },
  { id: "bm_lewis",   name: "Lewis",    gender: "Male",   accent: "British"  },
]

interface VoiceDropdownProps {
  model: AIModel
  value: string       // voice id — e.g. "af_bella"
  onChange: (voiceId: string) => void
}

export default function VoiceDropdown({ model, value, onChange }: VoiceDropdownProps) {
  const [open, setOpen] = useState(false)

  // Only Swift has voices right now — Studio coming soon
  const voices = SWIFT_VOICES

  // Find display name from id
  const selectedVoice = voices.find(v => v.id === value) ?? voices[0]

  // Group by accent
  const american = voices.filter(v => v.accent === "American")
  const british  = voices.filter(v => v.accent === "British")

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-sm text-white hover:border-white/20 transition-colors min-w-[180px]"
      >
        {/* Gender icon */}
        <span className="text-gray-400 text-xs">
          {selectedVoice.gender === "Female" ? "♀" : "♂"}
        </span>
        <span className="flex-1 text-left">
          {selectedVoice.name}
          <span className="text-gray-500 ml-1 text-xs">({selectedVoice.accent})</span>
        </span>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className={`text-gray-500 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
        >
          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 w-56 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl z-20">

          {/* American */}
          <div className="px-3 pt-2 pb-1">
            <span className="text-xs text-gray-500 uppercase tracking-wider">🇺🇸 American</span>
          </div>
          {american.map((v) => (
            <button
              key={v.id}
              onClick={() => { onChange(v.id); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/5 transition-colors ${
                v.id === value ? "text-[#3ecf8e]" : "text-gray-300"
              }`}
            >
              <span className="text-xs text-gray-500">{v.gender === "Female" ? "♀" : "♂"}</span>
              {v.name}
              {v.id === value && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-auto">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}

          {/* British */}
          <div className="px-3 pt-3 pb-1 border-t border-white/5 mt-1">
            <span className="text-xs text-gray-500 uppercase tracking-wider">🇬🇧 British</span>
          </div>
          {british.map((v) => (
            <button
              key={v.id}
              onClick={() => { onChange(v.id); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/5 transition-colors ${
                v.id === value ? "text-[#3ecf8e]" : "text-gray-300"
              }`}
            >
              <span className="text-xs text-gray-500">{v.gender === "Female" ? "♀" : "♂"}</span>
              {v.name}
              {v.id === value && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-auto">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}

          <div className="px-3 py-2 border-t border-white/5 mt-1">
            <p className="text-xs text-gray-600">10 voices available</p>
          </div>
        </div>
      )}
    </div>
  )
}
