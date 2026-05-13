export type Plan = "free" | "starter" | "pro"

export type User = {
  id: string
  email: string
  name: string
  credits: number
  plan: Plan
  createdAt: string
}
