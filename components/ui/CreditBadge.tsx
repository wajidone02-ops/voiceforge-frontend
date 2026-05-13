interface CreditBadgeProps {
  credits: number
}

export default function CreditBadge({ credits }: CreditBadgeProps) {
  // TODO: fetch from /api/user/credits
  const formatted = credits?.toLocaleString() ?? "0"

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" stroke="#3ecf8e" strokeWidth="1.5" />
        <path d="M6 3v6M3 6h6" stroke="#3ecf8e" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="text-xs text-white font-medium">{formatted}</span>
      <span className="text-xs text-gray-500">credits</span>
    </div>
  )
}
