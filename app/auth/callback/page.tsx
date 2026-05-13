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

        // URL se session extract karo
        const { data, error } = await supabase.auth.getSession()

        if (error || !data.session) {
          // Hash fragment se token extract karo
          const hashParams = new URLSearchParams(
            window.location.hash.substring(1)
          )
          const accessToken = hashParams.get("access_token")
          const refreshToken = hashParams.get("refresh_token")

          if (!accessToken) {
            alert("Login failed. Please try again.")
            window.location.href = "/login"
            return
          }

          // Session set karo manually
          const { data: sessionData, error: sessionError } =
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken ?? "",
            })

          if (sessionError || !sessionData.session) {
            alert("Session error. Please try again.")
            window.location.href = "/login"
            return
          }

          // Token save karo directly
          localStorage.setItem("token", accessToken)

          // Backend ko notify karo — credits setup
          try {
            const res = await fetch(`${API}/auth/google`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ access_token: accessToken }),
            })
            const result = await res.json()

            if (!res.ok) {
              alert(result.detail || "Account issue.")
              localStorage.removeItem("token")
              window.location.href = "/login"
              return
            }

            localStorage.setItem("token", result.access_token)
          } catch {
            // Backend call fail — but token save hai, proceed karo
          }

          window.location.href = "/generate"
          return
        }

        // Session already exists
        const accessToken = data.session.access_token
        localStorage.setItem("token", accessToken)

        // Backend ko notify karo
        try {
          const res = await fetch(`${API}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ access_token: accessToken }),
          })
          const result = await res.json()

          if (!res.ok) {
            alert(result.detail || "Account issue.")
            localStorage.removeItem("token")
            window.location.href = "/login"
            return
          }

          localStorage.setItem("token", result.access_token)
        } catch {
          // Proceed anyway
        }

        window.location.href = "/generate"
      } catch (err) {
        console.error("Callback error:", err)
        alert("Something went wrong. Please try again.")
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
        <p className="text-sm">Signing you in...</p>
      </div>
    </div>
  )
}
