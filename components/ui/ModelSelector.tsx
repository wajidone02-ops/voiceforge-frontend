"use client"
import { AIModel } from "@/types/generation"

interface Model {
  id: AIModel
  name: string
  description: string
  badge: string
  badgeColor: string
  icon: string
  comingSoon?: boolean
}

const MODELS: Model[] = [
  {
    id: "swift",
    name: "Swift",
    description: "Fast, lightweight — best for quick generations",
    badge: "Available",
    badgeColor: "text-[#3ecf8e] bg-[#3ecf8e]/10",
    icon: "⚡",
  },
  {
    id: "studio",
    name: "Studio",
    description: "High quality + voice cloning — coming soon",
    badge: "Coming Soon",
    badgeColor: "text-purple-400 bg-purple-400/10",
    icon: "🎙️",
    comingSoon: true,
  },
]

interface ModelSelectorProps {
  value: AIModel
  onChange: (model: AIModel) => void
}

export default function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {MODELS.map((model) => (
        <button
          key={model.id}
          onClick={() => !model.comingSoon && onChange(model.id)}
          disabled={model.comingSoon}
          className={`text-left p-4 rounded-xl border transition-all relative ${
            model.comingSoon
              ? "border-white/5 bg-[#111] opacity-60 cursor-not-allowed"
              : value === model.id
              ? "border-[#3ecf8e]/50 bg-[#3ecf8e]/5"
              : "border-white/10 bg-[#1a1a1a] hover:border-white/20"
          }`}
        >
          <div className="text-2xl mb-2">{model.icon}</div>
          <div className="text-sm font-semibold text-white mb-1">{model.name}</div>
          <div className="text-xs text-gray-400 mb-3">{model.description}</div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${model.badgeColor}`}>
            {model.badge}
          </span>
        </button>
      ))}
    </div>
  )
}
