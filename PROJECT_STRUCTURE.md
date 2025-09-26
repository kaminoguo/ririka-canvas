# RIRIKA's Canvas - Project Documentation

## Project Overview
Personal portfolio website with pixel art style, featuring draggable cards with personal information.
- **GitHub**: https://github.com/kaminoguo/ririka-canvas
- **Live Site**: https://ririka.uk
- **Tech Stack**: Next.js 14.2.16, TypeScript, Tailwind CSS, Framer Motion
- **Database**: Upstash Redis (for like count)
- **Deployment**: Vercel with custom domain

## Directory Structure
```
personal-canvas/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── likes/        # Like count endpoint
│   ├── globals.css        # Global styles with pixel fonts
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx          # Main entry point
├── components/            # React components
│   ├── LandingPage.tsx   # Landing page with PRESS START
│   ├── CanvasPage.tsx    # Main canvas with draggable cards
│   ├── LikeButton.tsx    # Draggable like button with Redis
│   ├── DraggableElement.tsx # Unused - legacy component
│   └── MusicPlayer.tsx   # Unused - music player component
├── lib/                   # Utilities
│   └── store.ts          # Zustand store for state management
├── public/               # Static assets
│   └── avatar.png        # RIRIKA's pixel avatar
├── source/               # Source files (gitignored)
│   ├── information.txt   # Personal info data
│   └── *.png            # Avatar images
└── [Config Files]        # Various configuration files
```

## Key Features
1. **Landing Page**:
   - Pixel art style with animated background
   - Floating pixel blocks animation
   - Avatar display
   - PRESS START button

2. **Canvas Page**:
   - Draggable cards with personal information
   - Pan and zoom functionality (mouse/touch)
   - Social links with official SVG logo icons
   - Like button with real-time count (Upstash Redis)
   - Career goals cards

3. **Mobile Support**:
   - Touch events for dragging cards
   - Single finger pan canvas
   - Two finger pinch zoom
   - Responsive design

## Cards on Canvas
- **Avatar**: RIRIKA with pixel art image
- **Info**: HKUST YR2 • AI+ELEC
- **Interests**: AI • MUSIC • FIGHTING
- **Career**: DREAM JOB: AI PM / CPO
- **Goal**: MECHA AI STARTUP
- **Social Links**: GitHub, Bilibili, YouTube, Discord, Telegram, Email
- **Like Button**: Draggable with persistent count

## Technical Details

### Fonts
- English: `Press Start 2P` (Google Fonts)
- Chinese: `ZCOOL QingKe HuangYou` (Google Fonts)

### Social Links
- GitHub: https://github.com/kaminoguo
- Bilibili: https://space.bilibili.com/9720977
- YouTube: https://www.youtube.com/@梨梨果
- Discord: gogogod2333_83027
- Telegram: @GOGOGODww
- Email: Lyrica2333@gmail.com

### Color Scheme
- Background: `#8b956d` (olive green)
- Accent: `#4ade80` (pixel green)
- Bilibili: `#fb7299` (pink)
- YouTube: `#ff0000` (red)
- Discord: `#5865f2` (purple)
- Telegram: `#0088cc` (blue)
- Career: `#a78bfa` (violet)
- Goal: `#f87171` (coral)
- Like: `#ff1744` (red)

### Draggable System
- Custom implementation with touch support
- Tracks `hasDragged` state to prevent accidental clicks
- Works with canvas pan/zoom transformations
- Supports both mouse and touch events
- Cards maintain position relative to viewport scale

### Canvas Controls
- **Desktop**:
  - Drag to pan
  - Scroll wheel to zoom
  - Click and drag cards
- **Mobile**:
  - Single finger to pan canvas
  - Pinch to zoom (two fingers)
  - Touch and drag cards

### Like System
- Backend: Upstash Redis (Free tier)
- Real-time count synchronization
- LocalStorage for preventing duplicate likes
- Pixel heart animation on click
- Persistent across all visitors

### Docker Setup (optional for local dev)
- Uses Node 20-alpine
- Configured in `docker-compose.yml`
- Solves WSL2 + Next.js startup issues
- Run with: `docker-compose up`

## Development Commands
```bash
# Local development
npm run dev

# Docker development (if WSL2 issues)
docker-compose up

# Build for production
npm run build

# Git commands (minimal English commits)
git add .
git commit -m "update"
git push
```

## Deployment & Infrastructure
- **Platform**: Vercel
- **Domain**: ririka.uk (via Cloudflare)
- **Database**: Upstash Redis (Free tier - 500k requests/month)
- **Auto-deploy**: On push to main branch
- **Environment Variables**:
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`

## Known Issues & Solutions
1. **WSL2 Next.js hang**: Server stuck at "Starting..." - Use Docker
2. **Drag vs Click**: Implemented hasDragged check to prevent accidental clicks
3. **Chinese font**: Added ZCOOL QingKe HuangYou for pixel-style Chinese text
4. **Mobile dragging**: Added full touch event support for cards and canvas

## Recent Updates
- Added draggable like button with Redis backend
- Implemented mobile touch support for all interactions
- Added career goal cards (AI PM / CPO)
- Converted all icons to pixel art SVG
- Added Bilibili and YouTube cards
- Custom domain setup (ririka.uk)

## Contact
Owner: RIRIKA (Lyrica)
- Name: RIRIKA (梨梨果)
- School: HKUST Year 2, AI + Electronics
- Interests: Mecha AI, Music, Fighting Games
- Career Goal: AI PM / CPO
- Startup Goal: Mecha AI Company

---
Last Updated: 2025-09-26
Version: 1.5.0