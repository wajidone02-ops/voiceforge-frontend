"use client"
import { useState, useEffect } from "react"
import Navbar from "@/components/ui/Navbar"
import AudioPlayer from "@/components/ui/AudioPlayer"
import ModelSelector from "@/components/ui/ModelSelector"
import VoiceDropdown from "@/components/ui/VoiceDropdown"
import { AIModel } from "@/types/generation"
import { User } from "@/types/user"

type ButtonState = "idle" | "loading" | "done"

const MAX_CHARS = 5000

export default function GeneratePage() {
  const [user, setUser] = useState<User>({
    id: "",
    email: "",
    name: "User",
    credits: 0,
    plan: "free",
    createdAt: "",
  })

  const [text, setText] = useState("")
  const [model, setModel] = useState<AIModel>("chatterbox")
  const [voice, setVoice] = useState("af_bella")
  const [speed, setSpeed] = useState(1.0)
  const [btnState, setBtnState] = useState<ButtonState>("idle")
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const charCount = text.length

  // User + Credits fetch karo
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          window.location.href = "/login"
          return
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/credits`, {
          headers: { "authorization": `Bearer ${token}` }
        })
        const data = await res.json()
        if (!res.ok) {
          window.location.href = "/login"
          return
        }
        setUser(prev => ({
          ...prev,
          credits: data.credits,
          plan: data.plan
        }))
      } catch {
        window.location.href = "/login"
      }
    }
    fetchUser()
  }, [])

  const handleGenerate = async () => {
    if (!text.trim()) return
    setBtnState("loading")
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ text, voice: "af_bella", speed })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || "Error")

      // Base64 audio ko playable URL banao
      const audioBlob = await fetch(
        `data:audio/wav;base64,${data.audio_base64}`
      ).then(r => r.blob())
      const url = URL.createObjectURL(audioBlob)
      setAudioUrl(url)

      // Credits update karo locally
      setUser(prev => ({
        ...prev,
        credits: data.credits_remaining
      }))

      setBtnState("done")
    } catch {
      setBtnState("idle")
    }
  }

  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement("a")
      a.href = audioUrl
      a.download = "voiceforge-output.wav"
      a.click()
    }
  }

  const buttonLabel = {
    idle: (
      <>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <polygon points="2,2 12,7 2,12" />
        </svg>
        Generate audio
      </>
    ),
    loading: (
      <>
        <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
          <path d="M12.5 7a5.5 5.5 0 00-5.5-5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Generating...
      </>
    ),
    done: (
      <>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Regenerate
      </>
    ),
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar user={user} />

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Generate audio</h1>
          <p className="text-sm text-gray-400">Convert your text to natural speech</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111] p-6 space-y-6">

          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-2">Model</label>
              <ModelSelector value={model} onChange={(m) => { setModel(m); setBtnState("idle"); setAudioUrl(null) }} />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-2">Voice</label>
            <VoiceDropdown model={model} value={voice} onChange={setVoice} />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-2">Text</label>
            <textarea
              value={text}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARS) setText(e.target.value)
              }}
              placeholder="Enter text to convert to speech..."
              className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 resize-none h-36 focus:outline-none focus:border-[#3ecf8e]/40 transition-colors"
            />
            <div className={`text-right text-xs mt-1 ${charCount > MAX_CHARS * 0.9 ? "text-yellow-400" : "text-gray-500"}`}>
              {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-gray-400">Speed</label>
              <span className="text-xs text-white font-medium">{speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={2.0}
              step={0.1}
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-[#3ecf8e]"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>0.5x</span>
              <span>2.0x</span>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={btnState === "loading" || !text.trim()}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              btnState === "loading" || !text.trim()
                ? "bg-white/10 text-gray-500 cursor-not-allowed"
                : btnState === "done"
                ? "bg-[#1a1a1a] border border-white/15 text-white hover:bg-white/5"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {buttonLabel[btnState]}
          </button>

          <div>
            <label className="block text-xs text-gray-400 mb-2">Output</label>
            <AudioPlayer
              audioUrl={audioUrl}
              isLoading={btnState === "loading"}
              onDownload={handleDownload}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 px-1">
          <span>
            Credits remaining:{" "}
            <span className="text-white font-medium">{user.credits?.toLocaleString() ?? 0}</span>
          </span>
          <a href="/dashboard" className="text-[#3ecf8e] hover:underline">View dashboard →</a>
        </div>
      </main>
    </div>
  )
}