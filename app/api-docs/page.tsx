"use client"
import { useState } from "react"
import Navbar from "@/components/ui/Navbar"

const ENDPOINTS = [
  {
    method: "POST",
    path: "/generate",
    desc: "Convert text to speech and receive a base64 encoded audio file.",
    body: `{
  "text": "Hello from VoiceForge!",
  "voice": "af_bella",   // see /voices for available options
  "speed": 1.0           // 0.5 – 2.0
}`,
    response: `{
  "status": "success",
  "audio_base64": "UklGRiQAAABXQVZFZm10IBAAAA...",
  "chars_used": 22,
  "credits_remaining": 4978
}`,
  },
  {
    method: "GET",
    path: "/credits",
    desc: "Get the current user's credit balance and plan.",
    body: null,
    response: `{
  "credits": 4978,
  "plan": "free"
}`,
  },
  {
    method: "GET",
    path: "/user",
    desc: "Get full profile info for the authenticated user.",
    body: null,
    response: `{
  "id": "uuid-here",
  "email": "user@gmail.com",
  "credits": 4978,
  "plan": "free",
  "created_at": "2026-05-10T00:00:00"
}`,
  },
  {
    method: "GET",
    path: "/history",
    desc: "Get paginated generation history. Use ?page=1&limit=20 for pagination.",
    body: null,
    response: `{
  "items": [
    {
      "id": "uuid",
      "text": "Hello from VoiceForge!",
      "voice": "af_bella",
      "model": "swift",
      "chars_used": 22,
      "created_at": "2026-05-10T10:00:00Z"
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 20
}`,
  },
  {
    method: "GET",
    path: "/voices",
    desc: "List all available voices. Filter by model using ?model=swift.",
    body: null,
    response: `{
  "voices": [
    { "id": "af_bella", "name": "Bella", "model": "swift", "gender": "female" },
    { "id": "af_sarah", "name": "Sarah", "model": "swift", "gender": "female" },
    { "id": "am_adam",  "name": "Adam",  "model": "swift", "gender": "male"   }
  ]
}`,
  },
  {
    method: "DELETE",
    path: "/account",
    desc: "Permanently delete your account. This action is irreversible — your email cannot be used to register again.",
    body: null,
    response: `{
  "status": "success",
  "message": "Account deleted. This email cannot be used to register again."
}`,
  },
]

const METHOD_COLOR: Record<string, string> = {
  GET: "text-blue-400 bg-blue-400/10",
  POST: "text-[#3ecf8e] bg-[#3ecf8e]/10",
  DELETE: "text-red-400 bg-red-400/10",
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="relative">
      <pre className="bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-4 text-xs text-gray-300 overflow-x-auto font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
      <button
        onClick={copy}
        className="absolute top-3 right-3 text-xs text-gray-500 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  )
}

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-24">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-3">API Reference</h1>
          <p className="text-gray-400 max-w-lg">
            Integrate VoiceForge into your product with our simple REST API. Available on the Pro plan.
          </p>
        </div>

        {/* Models */}
        <div className="rounded-2xl border border-white/10 bg-[#111] p-5 mb-8">
          <h2 className="text-sm font-semibold text-white mb-4">Available Models</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#161616] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">⚡</span>
                <span className="text-white font-medium text-sm">Swift</span>
                <span className="text-xs text-[#3ecf8e] bg-[#3ecf8e]/10 px-2 py-0.5 rounded-full ml-auto">Available</span>
              </div>
              <p className="text-xs text-gray-400">Fast, lightweight — best for quick generations and high volume</p>
              <code className="text-xs text-gray-500 mt-2 block">model: "swift"</code>
            </div>
            <div className="bg-[#161616] rounded-xl p-4 opacity-60">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">🎙️</span>
                <span className="text-white font-medium text-sm">Studio</span>
                <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full ml-auto">Coming Soon</span>
              </div>
              <p className="text-xs text-gray-400">High quality + voice cloning — for professional use</p>
              <code className="text-xs text-gray-500 mt-2 block">model: "studio"</code>
            </div>
          </div>
        </div>

        {/* Base URL */}
        <div className="rounded-2xl border border-white/10 bg-[#111] p-5 mb-8">
          <div className="text-xs text-gray-400 mb-2">Base URL</div>
          <CodeBlock code={`${process.env.NEXT_PUBLIC_API_URL ?? "https://your-api.up.railway.app"}`} />
          <p className="text-xs text-gray-500 mt-3">
            All requests must include your API key in the Authorization header.
          </p>
        </div>

        {/* Auth */}
        <div className="rounded-2xl border border-white/10 bg-[#111] p-5 mb-8">
          <h2 className="text-sm font-semibold text-white mb-4">Authentication</h2>
          <p className="text-sm text-gray-400 mb-4">
            Pass your access token in the{" "}
            <code className="text-[#3ecf8e] bg-[#3ecf8e]/10 px-1 rounded">authorization</code>{" "}
            header for every request.
          </p>
          <CodeBlock code={`authorization: Bearer your_access_token_here`} />
          <p className="text-xs text-gray-500 mt-3">
            Get your access token by signing in via Google on the login page.
          </p>
        </div>

        {/* Quick start */}
        <div className="rounded-2xl border border-white/10 bg-[#111] p-5 mb-10">
          <h2 className="text-sm font-semibold text-white mb-4">Quick Start</h2>
          <CodeBlock
            code={`// Generate audio in one API call
const response = await fetch("${process.env.NEXT_PUBLIC_API_URL ?? "https://your-api.up.railway.app"}/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "authorization": "Bearer your_access_token_here",
  },
  body: JSON.stringify({
    text: "Hello from VoiceForge!",
    voice: "af_bella",
    speed: 1.0,
  }),
})

const data = await response.json()

// Convert base64 to playable audio
const audioBlob = await fetch(
  \`data:audio/wav;base64,\${data.audio_base64}\`
).then(r => r.blob())
const audioUrl = URL.createObjectURL(audioBlob)

const audio = new Audio(audioUrl)
audio.play()`}
          />
        </div>

        {/* Endpoints */}
        <h2 className="text-lg font-bold mb-6">Endpoints</h2>
        <div className="space-y-6">
          {ENDPOINTS.map((ep) => (
            <div key={ep.path} className="rounded-2xl border border-white/10 bg-[#111] overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded font-mono ${METHOD_COLOR[ep.method]}`}>
                  {ep.method}
                </span>
                <code className="text-sm text-white font-mono">{ep.path}</code>
              </div>
              <div className="px-5 py-4 space-y-4">
                <p className="text-sm text-gray-400">{ep.desc}</p>
                {ep.body && (
                  <div>
                    <div className="text-xs text-gray-500 mb-2">Request body</div>
                    <CodeBlock code={ep.body} />
                  </div>
                )}
                <div>
                  <div className="text-xs text-gray-500 mb-2">Response</div>
                  <CodeBlock code={ep.response} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rate limits */}
        <div className="rounded-2xl border border-white/10 bg-[#111] p-5 mt-10">
          <h2 className="text-sm font-semibold text-white mb-4">Rate Limits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              { plan: "Free", limit: "10 req / min", chars: "5,000 chars / req" },
              { plan: "Starter", limit: "60 req / min", chars: "5,000 chars / req" },
              { plan: "Pro", limit: "300 req / min", chars: "5,000 chars / req" },
            ].map((r) => (
              <div key={r.plan} className="bg-[#161616] rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-1">{r.plan}</div>
                <div className="text-white font-medium">{r.limit}</div>
                <div className="text-xs text-gray-500 mt-1">{r.chars}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Credits */}
        <div className="rounded-2xl border border-white/10 bg-[#111] p-5 mt-6">
          <h2 className="text-sm font-semibold text-white mb-2">Credits</h2>
          <p className="text-sm text-gray-400">
            1 character = 1 credit. Generating audio from a 500-character text costs 500 credits.
            Free accounts start with <span className="text-white">5,000 credits</span>.
          </p>
        </div>

      </main>
    </div>
  )
}
