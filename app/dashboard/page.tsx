"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/ui/Navbar"
import CreditBadge from "@/components/ui/CreditBadge"
import { User } from "@/types/user"
import { Generation } from "@/types/generation"

const API = process.env.NEXT_PUBLIC_API_URL

const MODEL_COLORS: Record<string, string> = {
  swift: "text-[#3ecf8e] bg-[#3ecf8e]/10",
  studio: "text-purple-400 bg-purple-400/10",
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [history, setHistory] = useState<Generation[]>([])
  const [totalHistory, setTotalHistory] = useState(0)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteError, setDeleteError] = useState("")

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          window.location.href = "/login"
          return
        }

        const headers = { authorization: `Bearer ${token}` }

        // User info + history parallel fetch
        const [userRes, historyRes] = await Promise.all([
          fetch(`${API}/user`, { headers }),
          fetch(`${API}/history?page=1&limit=20`, { headers }),
        ])

        if (!userRes.ok) {
          localStorage.removeItem("token")
          window.location.href = "/login"
          return
        }

        const userData = await userRes.json()
        const historyData = await historyRes.json()

        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.email.split("@")[0],
          credits: userData.credits,
          plan: userData.plan,
          createdAt: userData.created_at,
        })

        setHistory(historyData.items || [])
        setTotalHistory(historyData.total || 0)
      } catch {
        window.location.href = "/login"
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  const handleDeleteAccount = async () => {
    setDeleting(true)
    setDeleteError("")
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API}/account`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      })
      const data = await res.json()

      if (!res.ok) {
        setDeleteError(data.detail || "Error ho gaya!")
        setDeleting(false)
        return
      }

      // Logout aur login pe bhejo
      localStorage.removeItem("token")
      alert("Account delete ho gaya. Yeh email dobara use nahi ho sakti.")
      window.location.href = "/login"
    } catch {
      setDeleteError("Network error — dobara try karo.")
      setDeleting(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
            <path d="M16 9a7 7 0 00-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Loading...
        </div>
      </div>
    )
  }

  if (!user) return null

  const planLimit = user.plan === "pro" ? 500000 : user.plan === "starter" ? 100000 : 10000
  const usedCredits = planLimit - user.credits
  const usedPercent = Math.min((usedCredits / planLimit) * 100, 100)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar user={user} />

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
            <p className="text-sm text-gray-400">
              Hi {user.name} 👋 — manage your account and history
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/generate"
              className="px-4 py-2 bg-white text-black text-sm font-medium rounded-xl hover:bg-gray-100 transition-colors"
            >
              + New generation
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-white/10 text-gray-400 text-sm rounded-xl hover:bg-white/5 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Credits */}
          <div className="rounded-2xl border border-white/10 bg-[#111] p-5">
            <div className="text-xs text-gray-400 mb-1">Credits remaining</div>
            <div className="text-3xl font-bold text-white">
              {user.credits?.toLocaleString() ?? "0"}
            </div>
            <div className="mt-2">
              <CreditBadge credits={user.credits} />
            </div>
          </div>

          {/* Plan */}
          <div className="rounded-2xl border border-white/10 bg-[#111] p-5">
            <div className="text-xs text-gray-400 mb-1">Current plan</div>
            <div className="text-3xl font-bold text-white capitalize">{user.plan}</div>
            <Link
              href="/pricing"
              className="mt-2 inline-block text-xs text-[#3ecf8e] hover:underline"
            >
              Upgrade plan →
            </Link>
          </div>

          {/* Generations */}
          <div className="rounded-2xl border border-white/10 bg-[#111] p-5">
            <div className="text-xs text-gray-400 mb-1">Total generations</div>
            <div className="text-3xl font-bold text-white">{totalHistory}</div>
            <div className="mt-2 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3ecf8e] rounded-full transition-all"
                style={{ width: `${usedPercent}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {planLimit.toLocaleString()} credit limit
            </div>
          </div>
        </div>

        {/* Account info */}
        <div className="rounded-2xl border border-white/10 bg-[#111] p-5 mb-8">
          <h2 className="text-sm font-semibold text-white mb-4">Account</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs text-gray-500 mb-1">Email</div>
              <div className="text-white">{user.email}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Member since</div>
              <div className="text-white">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">User ID</div>
              <div className="text-gray-400 font-mono text-xs">{user.id}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Plan</div>
              <div className="capitalize text-white">{user.plan}</div>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Generation history</h2>
            <span className="text-xs text-gray-500">{totalHistory} total</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111] overflow-hidden">
            {history.length === 0 ? (
              <div className="py-12 text-center text-gray-500 text-sm">
                No generations yet.{" "}
                <Link href="/generate" className="text-[#3ecf8e] hover:underline">
                  Create your first one →
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {history.map((gen) => (
                  <div
                    key={gen.id}
                    className="px-5 py-4 flex items-start gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate mb-1">{gen.text}</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                            MODEL_COLORS[gen.model] ?? "text-gray-400 bg-white/5"
                          }`}
                        >
                          {gen.model}
                        </span>
                        <span className="text-xs text-gray-500">{gen.voice}</span>
                        <span className="text-xs text-gray-500">{gen.chars_used} chars</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-gray-500">{formatDate(gen.created_at)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Danger Zone — Account Delete */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <h2 className="text-sm font-semibold text-red-400 mb-2">Danger Zone</h2>
          <p className="text-xs text-gray-400 mb-4">
            Account delete karne ke baad yeh email aur Google account{" "}
            <strong className="text-white">dobara use nahi ho sakta</strong>. Yeh action permanent hai.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-sm text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/10 transition-colors"
            >
              Delete my account
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-white font-medium">
                Kya aap sure hain? Yeh action undo nahi ho sakta!
              </p>
              {deleteError && (
                <p className="text-xs text-red-400">{deleteError}</p>
              )}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {deleting ? (
                    <>
                      <svg className="animate-spin" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
                        <path d="M10.5 6a4.5 4.5 0 00-4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    "Haan, delete karo"
                  )}
                </button>
                <button
                  onClick={() => { setShowDeleteConfirm(false); setDeleteError("") }}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
