export type AIModel = "chatterbox" | "coqui" | "piper"

export type Generation = {
  id: string
  text: string
  model: AIModel
  voice: string
  audioUrl: string
  createdAt: string
  chars_used: number
  duration: number
}
