export type AIModel = "chatterbox" | "coqui" | "piper"

export type Generation = {
  id: string
  text: string
  model: AIModel
  voice: string
  audioUrl: string
  createdAt: string
  charsUsed: number
  duration: number
}
