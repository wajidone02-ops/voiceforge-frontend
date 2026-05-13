"use client"
import Link from "next/link"
import { useState } from "react"
import CreditBadge from "./CreditBadge"
import { User } from "@/types/user"

interface NavbarProps {
  user?: User | null
  transparent?: boolean
}

export default function Navbar({ user, transparent = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/5 ${
        transparent ? "bg-transparent" : "bg-[#0f0f0f]/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3ecf8e] shadow-[0_0_8px_#3ecf8e]" />
          <span className="text-white font-semibold text-lg tracking-tight">VoiceForge</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link>
          <Link href="/#models" className="text-sm text-gray-400 hover:text-white transition-colors">Models</Link>
          <Link href="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
          <Link href="/api-docs" className="text-sm text-gray-400 hover:text-white transition-colors">API docs</Link>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <CreditBadge credits={user.credits} />
              <Link
                href="/dashboard"
                className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-2"
              >
                Dashboard
              </Link>
              <Link
                href="/generate"
                className="px-4 py-2 text-sm bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Generate
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen ? (
              <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            ) : (
              <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f0f0f] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          <Link href="/#features" className="text-sm text-gray-400">Features</Link>
          <Link href="/#models" className="text-sm text-gray-400">Models</Link>
          <Link href="/pricing" className="text-sm text-gray-400">Pricing</Link>
          <Link href="/api-docs" className="text-sm text-gray-400">API docs</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-gray-400">Dashboard</Link>
              <Link href="/generate" className="text-sm text-white font-medium">Generate</Link>
              <button onClick={handleLogout} className="text-sm text-red-400 text-left">Logout</button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-white font-medium">Get started</Link>
          )}
        </div>
      )}
    </nav>
  )
}
