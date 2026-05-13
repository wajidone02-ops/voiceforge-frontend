"use client"
import { useState } from "react"
import Link from "next/link"

const API = process.env.NEXT_PUBLIC_API_URL

// ─────────────────────────────────────────
// Terms Modal
// ─────────────────────────────────────────
function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6 z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Terms of Service</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
          </button>
        </div>

        <div className="space-y-5 text-sm text-gray-400 leading-relaxed">
          <p className="text-xs text-gray-500">Last updated: May 2026</p>

          <div>
            <h3 className="text-white font-medium mb-2">1. Acceptance of Terms</h3>
            <p>By accessing or using VoiceForge, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">2. Account Registration</h3>
            <p>You must sign in with a valid Google account. One Google account equals one VoiceForge account. Creating multiple accounts to abuse free credits is strictly prohibited and will result in a permanent ban.</p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">3. Account Deletion</h3>
            <p>If you delete your account, your email and Google account will be permanently blacklisted and cannot be used to create a new account. This action is irreversible.</p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">4. Acceptable Use</h3>
            <p>You agree not to use VoiceForge to generate audio content that is:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Illegal, harmful, or abusive</li>
              <li>Defamatory or harassing</li>
              <li>Infringing on intellectual property rights</li>
              <li>Used for spam or automated abuse</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">5. Credits & Payments</h3>
            <p>Free accounts receive 5,000 credits upon signup. Credits are non-refundable. Paid credits expire according to your plan terms. We reserve the right to modify pricing at any time.</p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">6. Service Availability</h3>
            <p>We strive for high availability but do not guarantee uninterrupted service. We are not liable for any losses due to downtime or service interruptions.</p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">7. Termination</h3>
            <p>We reserve the right to suspend or terminate accounts that violate these terms at our sole discretion, without prior notice.</p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">8. Contact</h3>
            <p>For questions regarding these terms, contact us at <span className="text-[#3ecf8e]">support@voiceforge.io</span></p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-xl bg-white/10 text-white text-sm hover:bg-white/15 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// Privacy Modal
// ─────────────────────────────────────────
function PrivacyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6 z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Privacy Policy</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
          </button>
        </div>

        <div className="space-y-5 text-sm text-gray-400 leading-relaxed">
          <p className="text-xs text-gray-500">Last updated: May 2026</p>

          <div>
            <h3 className="text-white font-medium mb-2">1. Information We Collect</h3>
            <p>When you sign in with Google, we receive your email address and Google account ID. We do not access your Google contacts, drive, or any other personal data.</p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">2. How We Use Your Data</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>To create and manage your account</li>
              <li>To track your credit balance and usage</li>
              <li>To store your generation history</li>
              <li>To prevent abuse and multiple account creation</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">3. Data Storage</h3>
            <p>Your data is stored securely using Supabase (PostgreSQL). We do not sell or share your personal data with third parties for marketing purposes.</p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">4. Audio Data</h3>
            <p>Text you submit for audio generation is processed by our AI model and is not stored permanently. Generation history (text + metadata) is stored for your reference and can be deleted with your account.</p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">5. Cookies</h3>
            <p>We use minimal cookies only for authentication purposes. We do not use tracking or advertising cookies.</p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">6. Account Deletion</h3>
            <p>When you delete your account, all your personal data, generation history, and credits are permanently deleted. Only your email is retained in a blacklist to prevent re-registration abuse.</p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">7. Third-Party Services</h3>
            <p>We use the following third-party services:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Google OAuth — for authentication</li>
              <li>Supabase — for database and auth</li>
              <li>RunPod — for AI audio generation</li>
              <li>Railway — for backend hosting</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">8. Contact</h3>
            <p>For privacy-related questions, contact us at <span className="text-[#3ecf8e]">support@voiceforge.io</span></p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-xl bg-white/10 text-white text-sm hover:bg-white/15 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// Main Login Page
// ─────────────────────────────────────────
export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError("")
    try {
      const { createClient } = await import("@supabase/supabase-js")
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (err: any) {
      setError("Google login failed. Please try again.")
      setLoading(false)
    }
  }

  return (
    <>
      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}

      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-12">
          <span className="w-2 h-2 rounded-full bg-[#3ecf8e] shadow-[0_0_8px_#3ecf8e]" />
          <span className="text-white font-semibold text-lg">VoiceForge</span>
        </Link>

        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Welcome to VoiceForge
          </h1>
          <p className="text-sm text-gray-400 text-center mb-8">
            Sign in with Google to get started — 5,000 free credits on signup
          </p>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-full py-3 rounded-xl border border-white/10 bg-[#111] text-sm font-medium transition-all flex items-center justify-center gap-3 ${
              loading
                ? "text-gray-500 cursor-not-allowed"
                : "text-white hover:bg-white/5 hover:border-white/20"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
                  <path d="M14 8a6 6 0 00-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Connecting...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
                  <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05" />
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335" />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          {error && (
            <p className="text-xs text-red-400 text-center mt-4">{error}</p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-600">why Google only?</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Explanation */}
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-[#3ecf8e] mt-0.5">✓</span>
              <p className="text-xs text-gray-400">No fake emails — one Google account, one VoiceForge account</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#3ecf8e] mt-0.5">✓</span>
              <p className="text-xs text-gray-400">No password to remember — fast and secure</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#3ecf8e] mt-0.5">✓</span>
              <p className="text-xs text-gray-400">Your data is never sold or shared</p>
            </div>
          </div>

          <p className="text-xs text-gray-600 text-center mt-6">
            By continuing, you agree to our{" "}
            <button
              onClick={() => setShowTerms(true)}
              className="text-gray-400 hover:text-white underline underline-offset-2 transition-colors"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              onClick={() => setShowPrivacy(true)}
              className="text-gray-400 hover:text-white underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </button>.
          </p>
        </div>
      </div>
    </>
  )
}
