export type AIModel = "swift" | "studio"

export type Generation = {
  id: string
  text: string
  model: AIModel
  voice: string
  audioUrl: string
  created_at: string
  chars_used: number
  duration: number
}
