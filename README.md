# Personal Canvas Website

An infinite canvas personal website where you can freely place and drag elements around.

## Features

- 🎨 Infinite draggable canvas
- 🎵 Music player widget (Bandcamp style)
- 📝 Sticky notes
- 🔗 Social links
- 🖱️ Zoom and pan controls
- ✨ Smooth animations

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Deploy!

### Custom Domain

1. Buy a domain from Namecheap/Cloudflare/etc
2. Add domain in Vercel project settings
3. Update DNS records as instructed

## Customize

- Edit `components/LandingPage.tsx` to change the welcome page
- Modify elements in `components/CanvasPage.tsx`
- Add new draggable components in `components/`
- Update colors in `app/globals.css`

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Draggable
- Zustand