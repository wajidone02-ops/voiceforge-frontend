"use client"
import Link from "next/link"
import Navbar from "@/components/ui/Navbar"

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for trying out VoiceForge",
    credits: "10,000",
    features: [
      "10,000 credits / month",
      "All AI models",
      "5,000 chars per generation",
      "MP3 downloads",
      "5 voices",
      "Community support",
    ],
    cta: "Get started free",
    href: "/login?tab=register",
    highlight: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: "$9",
    period: "/ month",
    desc: "For creators and small teams",
    credits: "100,000",
    features: [
      "100,000 credits / month",
      "All AI models",
      "Unlimited chars per generation",
      "MP3 + WAV downloads",
      "20+ voices",
      "Priority generation",
      "Email support",
    ],
    cta: "Start Starter",
    href: "/login?tab=register&plan=starter",
    highlight: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    period: "/ month",
    desc: "For power users and businesses",
    credits: "500,000",
    features: [
      "500,000 credits / month",
      "All AI models",
      "Unlimited chars per generation",
      "All audio formats",
      "All voices + custom voice cloning",
      "Priority generation",
      "API access",
      "Dedicated support",
    ],
    cta: "Start Pro",
    href: "/login?tab=register&plan=pro",
    highlight: false,
  },
]

const FAQ = [
  {
    q: "What is a credit?",
    a: "Each character in your text costs 1 credit. So generating audio from a 500-character paragraph costs 500 credits.",
  },
  {
    q: "Do unused credits roll over?",
    a: "Credits reset at the start of each billing cycle. They do not roll over to the next month.",
  },
  {
    q: "Can I upgrade or downgrade anytime?",
    a: "Yes. You can change your plan at any time. Upgrades are prorated instantly.",
  },
  {
    q: "Is there an API?",
    a: "Yes, Pro plan includes full REST API access. See our API docs for details.",
  },
  {
    q: "What audio formats are supported?",
    a: "Free and Starter plans support MP3. Pro plan also supports WAV and other high-quality formats.",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Start for free. Scale as you grow. No hidden fees.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 flex flex-col relative ${
                plan.highlight
                  ? "border-[#3ecf8e]/40 bg-[#3ecf8e]/5"
                  : "border-white/10 bg-[#111]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#3ecf8e] text-black text-xs font-semibold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-400 mb-1">{plan.name}</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm mb-1">{plan.period}</span>
                </div>
                <p className="text-xs text-gray-500">{plan.desc}</p>
              </div>

              <Link
                href={plan.href}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-colors mb-6 ${
                  plan.highlight
                    ? "bg-[#3ecf8e] text-black hover:bg-[#34b87a]"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0">
                      <path d="M2 7l4 4 6-6" stroke="#3ecf8e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Credit top-up note */}
        <div className="rounded-2xl border border-white/10 bg-[#111] p-6 mb-20 text-center">
          <h3 className="font-semibold text-white mb-2">Need more credits?</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            You can purchase additional credit packs on top of your plan at any time — starting from $5 for 50,000 extra credits.
          </p>
          {/* TODO: implement top-up via /api/billing/topup */}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-xl border border-white/10 bg-[#111] p-5">
                <div className="font-medium text-white mb-2">{item.q}</div>
                <div className="text-sm text-gray-400">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
