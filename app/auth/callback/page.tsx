"use client"
import { useEffect } from "react"

const API = process.env.NEXT_PUBLIC_API_URL

export default function AuthCallbackPage() {
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { createClient } = await import("@supabase/supabase-js")
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // Supabase session lo
        const { data, error } = await supabase.auth.getSession()
        if (error || !data.session) {
          window.location.href = "/login"
          return
        }

        const googleToken = data.session.access_token

        // Backend ko bhejo — blacklist check + credits setup
        const res = await fetch(`${API}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: googleToken }),
        })

        const result = await res.json()

        if (!res.ok) {
          // Blacklisted account
          localStorage.removeItem("token")
          alert(result.detail || "Login fail ho gaya.")
          window.location.href = "/login"
          return
        }

        // Token save karo
        localStorage.setItem("token", result.access_token)
        window.location.href = "/generate"
      } catch (err) {
        console.error("Callback error:", err)
        window.location.href = "/login"
      }
    }

    handleCallback()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-gray-400">
        <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
          <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="text-sm">Google se verify ho raha hai...</p>
      </div>
    </div>
  )
}
