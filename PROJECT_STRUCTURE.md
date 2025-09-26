# RIRIKA's Canvas - Project Documentation

## Project Overview
Personal portfolio website with pixel art style, featuring draggable cards with personal information.
- **GitHub**: https://github.com/kaminoguo/RIRIKA-s-canvas
- **Tech Stack**: Next.js 14.2.16, TypeScript, Tailwind CSS, Framer Motion
- **Deployment**: Vercel (pending)

## Directory Structure
```
personal-canvas/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles with pixel fonts
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main entry point
├── components/            # React components
│   ├── LandingPage.tsx   # Landing page with PRESS START
│   ├── CanvasPage.tsx    # Main canvas with draggable cards
│   ├── DraggableElement.tsx # Unused - legacy draggable component
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
1. **Landing Page**: Pixel art style with animated background, avatar, and PRESS START button
2. **Canvas Page**:
   - Draggable cards with personal information
   - Pan and zoom functionality (scroll/drag)
   - Social links with official logo icons
   - Cards include: Avatar, School, Interests, GitHub, Bilibili, YouTube, Discord, Telegram, Email, Goals

## Important Technical Details

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
- Cards: Various (`#fb7299` Bilibili pink, `#ff0000` YouTube red, etc.)

### Draggable Card System
- Custom implementation (not using react-draggable due to issues)
- Tracks `hasDragged` state to prevent accidental link clicks
- Works with canvas pan/zoom transformations
- Cards maintain position relative to viewport scale

### Docker Setup (for local dev)
- Uses Node 20-alpine
- Configured in `docker-compose.yml`
- Solves WSL2 + Next.js startup issues
- Run with: `docker-compose up`

## Development Commands
```bash
# Local development (WSL2 has issues, use Docker)
npm run dev

# Docker development
docker-compose up

# Build for production
npm run build

# Git commands (use minimal English)
git add .
git commit -m "update"
git push
```

## Deployment Notes
- Platform: Vercel
- Auto-deploys from main branch
- Environment variables: None required currently
- Domain: (to be configured)

## Known Issues & Solutions
1. **WSL2 Next.js hang**: Server stuck at "Starting..." - Use Docker
2. **Drag vs Click**: Implemented hasDragged check to prevent accidental clicks
3. **Chinese font**: Added ZCOOL QingKe HuangYou for pixel-style Chinese text

## Future Enhancements (Ideas)
- Add more interactive elements
- Music player integration
- Project showcase cards
- Blog/writing section
- Dark mode toggle
- Custom domain setup

## Contact
Owner: RIRIKA (Lyrica)
- Name: RIRIKA (梨梨果)
- School: HKUST Year 2, AI + Electronics
- Interests: Mecha AI, Music, Fighting Games
- Goal: Mecha AI Startup / Big Tech PM

---
Last Updated: 2024
Version: 1.0.0