# VoiceForge — Frontend

Next.js 14 app (App Router + TypeScript + Tailwind).

## Pages

| Route | File |
|-------|------|
| `/` | `app/page.tsx` — Landing page |
| `/login` | `app/login/page.tsx` — Login & Register |
| `/generate` | `app/generate/page.tsx` — Main TTS app |
| `/dashboard` | `app/dashboard/page.tsx` — Credits & history |
| `/pricing` | `app/pricing/page.tsx` — Pricing plans |
| `/api-docs` | `app/api-docs/page.tsx` — API reference |

## Components

| Component | Path |
|-----------|------|
| `Navbar` | `components/ui/Navbar.tsx` |
| `AudioPlayer` | `components/ui/AudioPlayer.tsx` |
| `ModelSelector` | `components/ui/ModelSelector.tsx` |
| `CreditBadge` | `components/ui/CreditBadge.tsx` |
| `VoiceDropdown` | `components/ui/VoiceDropdown.tsx` |

## Setup

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

## API Integration Points

Search for `// TODO: fetch from` to find all backend integration points:

- `/api/generate` — POST to create audio
- `/api/user` — GET logged-in user
- `/api/user/credits` — GET credit balance
- `/api/history` — GET generation history
- `/api/voices` — GET available voices per model
- `/api/auth/login` — POST login
- `/api/auth/register` — POST register
- `/api/billing/topup` — POST buy credits

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend base URL |

## Deploy

Push to GitHub → connect to Vercel → done. No extra config needed.
