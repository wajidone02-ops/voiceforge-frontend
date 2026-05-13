"use client"
import { useState, useRef, useEffect } from "react"

interface AudioPlayerProps {
  audioUrl: string | null
  isLoading: boolean
  onDownload?: () => void
  duration?: number
}

export default function AudioPlayer({ audioUrl, isLoading, onDownload, duration = 0 }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl
      setPlaying(false)
      setProgress(0)
      setCurrentTime(0)
    }
  }, [audioUrl])

  const togglePlay = () => {
    if (!audioRef.current || !audioUrl) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const p = (audioRef.current.currentTime / (audioRef.current.duration || 1)) * 100
    setProgress(p)
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleEnded = () => setPlaying(false)

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`
  }

  const BARS = 32

  return (
    <div className="w-full rounded-xl bg-[#161616] border border-white/10 px-4 py-3 flex items-center gap-4">
      {/* Hidden audio element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      )}

      {/* Play button */}
      <button
        onClick={togglePlay}
        disabled={!audioUrl || isLoading}
        className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
          audioUrl && !isLoading
            ? "bg-[#3ecf8e] hover:bg-[#34b87a] text-black"
            : "bg-white/10 text-gray-500 cursor-not-allowed"
        }`}
      >
        {isLoading ? (
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
            <path d="M14 8a6 6 0 00-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="2" y="1" width="4" height="12" rx="1" />
            <rect x="8" y="1" width="4" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M3 2l10 5-10 5V2z" />
          </svg>
        )}
      </button>

      {/* Waveform bars */}
      <div className="flex-1 flex items-center gap-[2px] h-8 overflow-hidden">
        {Array.from({ length: BARS }).map((_, i) => {
          const height = Math.sin(i * 0.5) * 0.4 + Math.sin(i * 1.2) * 0.3 + 0.3
          const filled = (i / BARS) * 100 <= progress
          return (
            <div
              key={i}
              className={`flex-1 rounded-full transition-colors ${
                isLoading ? "animate-pulse bg-white/10" : filled ? "bg-[#3ecf8e]" : "bg-white/20"
              }`}
              style={{ height: `${Math.max(20, height * 100)}%` }}
            />
          )
        })}
      </div>

      {/* Time */}
      <span className="text-xs text-gray-400 flex-shrink-0 tabular-nums">
        {audioUrl ? formatTime(currentTime) : `0:${String(Math.round(duration)).padStart(2, "0")}`}
      </span>

      {/* Download */}
      <button
        onClick={onDownload}
        disabled={!audioUrl || isLoading}
        className={`flex items-center gap-1 text-xs flex-shrink-0 transition-colors ${
          audioUrl && !isLoading ? "text-gray-400 hover:text-white" : "text-gray-600 cursor-not-allowed"
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        .mp3
      </button>
    </div>
  )
}
