"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import LikeButton from "./LikeButton";

interface DraggableCardProps {
  id: string;
  type: "avatar" | "info" | "social" | "skill";
  content: string;
  initialPosition: { x: number; y: number };
  color: string;
  href?: string;
  icon?: React.ReactNode;
  delay?: number;
  viewportOffset: { x: number; y: number; scale: number };
}

// Pixel art icons - official logo representations
const PixelGitHub = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

const PixelDiscord = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
  </svg>
);

const PixelTelegram = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
  </svg>
);

const PixelBilibili = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5.5 2.5L6 1h1l.5 1.5h5c.8 0 1.5.7 1.5 1.5v8c0 .8-.7 1.5-1.5 1.5h-9c-.8 0-1.5-.7-1.5-1.5V4c0-.8.7-1.5 1.5-1.5h2zm4.5 0L9.5 1h1l.5 1.5M4 6v4h2V6H4zm6 0v4h2V6h-2z"/>
  </svg>
);

const PixelYouTube = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
  </svg>
);

function DraggableCard({ id, type, content, initialPosition, color, href, icon, delay = 0, viewportOffset }: DraggableCardProps) {
  const [localOffset, setLocalOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setHasDragged(false);
    const actualX = (initialPosition.x + localOffset.x) * viewportOffset.scale + viewportOffset.x;
    const actualY = (initialPosition.y + localOffset.y) * viewportOffset.scale + viewportOffset.y;
    setDragStart({
      x: e.clientX - actualX,
      y: e.clientY - actualY,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setHasDragged(false);
    const touch = e.touches[0];
    const actualX = (initialPosition.x + localOffset.x) * viewportOffset.scale + viewportOffset.x;
    const actualY = (initialPosition.y + localOffset.y) * viewportOffset.scale + viewportOffset.y;
    setDragStart({
      x: touch.clientX - actualX,
      y: touch.clientY - actualY,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = (e.clientX - dragStart.x - viewportOffset.x) / viewportOffset.scale - initialPosition.x;
        const newY = (e.clientY - dragStart.y - viewportOffset.y) / viewportOffset.scale - initialPosition.y;
        const distance = Math.sqrt(Math.pow(newX - localOffset.x, 2) + Math.pow(newY - localOffset.y, 2));
        if (distance > 2) {
          setHasDragged(true);
        }
        setLocalOffset({ x: newX, y: newY });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        const touch = e.touches[0];
        const newX = (touch.clientX - dragStart.x - viewportOffset.x) / viewportOffset.scale - initialPosition.x;
        const newY = (touch.clientY - dragStart.y - viewportOffset.y) / viewportOffset.scale - initialPosition.y;
        const distance = Math.sqrt(Math.pow(newX - localOffset.x, 2) + Math.pow(newY - localOffset.y, 2));
        if (distance > 2) {
          setHasDragged(true);
        }
        setLocalOffset({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragStart, viewportOffset, initialPosition]);

  const position = {
    x: initialPosition.x + localOffset.x,
    y: initialPosition.y + localOffset.y,
  };

  if (type === "avatar") {
    return (
      <motion.div
        ref={cardRef}
        className="absolute cursor-move select-none"
        style={{
          left: position.x,
          top: position.y,
          zIndex: isDragging ? 1000 : 10
        }}
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className="flex flex-col items-center p-4"
          style={{
            background: color,
            border: "4px solid #000",
            boxShadow: isDragging ? "8px 8px 0 #000" : "4px 4px 0 #000",
            transform: isDragging ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.1s",
          }}
        >
          <div className="w-24 h-24 mb-2" style={{
            border: "4px solid #000",
            imageRendering: "pixelated",
            overflow: "hidden"
          }}>
            <Image
              src="/avatar.png"
              alt="RIRIKA"
              width={96}
              height={96}
              className="w-full h-full object-cover"
              style={{ imageRendering: "pixelated" }}
              draggable={false}
            />
          </div>
          <span className="text-xs font-bold" style={{ letterSpacing: "2px" }}>
            {content}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      className="absolute cursor-move select-none"
      style={{
        left: position.x,
        top: position.y,
        zIndex: isDragging ? 1000 : 10
      }}
      initial={{ scale: 0, rotate: Math.random() * 10 - 5 }}
      animate={{ scale: 1, rotate: Math.random() * 6 - 3 }}
      transition={{ delay }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div
        className="px-4 py-3 text-xs flex items-center gap-2"
        style={{
          background: color,
          border: "4px solid #000",
          color: "#000",
          boxShadow: isDragging ? "8px 8px 0 #000" : "4px 4px 0 #000",
          maxWidth: "280px",
          transform: isDragging ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.1s",
          cursor: href ? "pointer" : "move",
        }}
        onClick={(e) => {
          if (href && !isDragging && !hasDragged) {
            e.stopPropagation();
            window.open(href, "_blank");
          }
        }}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{content}</span>
      </div>
    </motion.div>
  );
}

export default function CanvasPage() {
  const [viewport, setViewport] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const cards = [
    { id: "avatar", type: "avatar" as const, content: "RIRIKA", initialPosition: { x: 400, y: 200 }, color: "#fff" },
    { id: "school", type: "info" as const, content: "HKUST YR2 • AI+ELEC", initialPosition: { x: 650, y: 250 }, color: "#a7f3d0" },
    { id: "interests", type: "info" as const, content: "AI • MUSIC • FIGHTING", initialPosition: { x: 900, y: 200 }, color: "#fde68a" },
    {
      id: "github",
      type: "social" as const,
      content: "GitHub: kaminoguo",
      initialPosition: { x: 450, y: 400 },
      color: "#4ade80",
      href: "https://github.com/kaminoguo",
      icon: <PixelGitHub />
    },
    {
      id: "bilibili",
      type: "social" as const,
      content: "Bilibili: 梨梨果",
      initialPosition: { x: 300, y: 350 },
      color: "#fb7299",
      href: "https://space.bilibili.com/9720977",
      icon: <PixelBilibili />
    },
    {
      id: "youtube",
      type: "social" as const,
      content: "YouTube: 梨梨果",
      initialPosition: { x: 600, y: 350 },
      color: "#ff0000",
      href: "https://www.youtube.com/@%E6%A2%A8%E6%A2%A8%E6%9E%9C",
      icon: <PixelYouTube />
    },
    {
      id: "discord",
      type: "social" as const,
      content: "Discord: gogogod2333",
      initialPosition: { x: 750, y: 450 },
      color: "#5865f2",
      href: "https://discord.com/users/gogogod2333_83027",
      icon: <PixelDiscord />
    },
    {
      id: "telegram",
      type: "social" as const,
      content: "Telegram: @GOGOGODww",
      initialPosition: { x: 1050, y: 400 },
      color: "#0088cc",
      href: "https://t.me/GOGOGODww",
      icon: <PixelTelegram />
    },
    {
      id: "email",
      type: "social" as const,
      content: "Lyrica2333@gmail.com",
      initialPosition: { x: 600, y: 550 },
      color: "#4ade80",
      href: "mailto:Lyrica2333@gmail.com"
    },
    {
      id: "goal",
      type: "skill" as const,
      content: "GOAL: MECHA AI STARTUP",
      initialPosition: { x: 900, y: 550 },
      color: "#f87171"
    },
    {
      id: "career",
      type: "skill" as const,
      content: "DREAM JOB: AI PM / CPO",
      initialPosition: { x: 500, y: 480 },
      color: "#a78bfa"
    },
  ];

  // Handle canvas panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).classList.contains('canvas-background')) {
      setIsPanning(true);
      setPanStart({
        x: e.clientX - viewport.x,
        y: e.clientY - viewport.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setViewport({
        ...viewport,
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Handle zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.5, viewport.scale + delta), 3);

    // Zoom towards mouse position
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const scaleChange = newScale / viewport.scale;

      setViewport({
        x: x - (x - viewport.x) * scaleChange,
        y: y - (y - viewport.y) * scaleChange,
        scale: newScale,
      });
    }
  };

  return (
    <motion.div
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-screen h-screen overflow-hidden relative canvas-background"
      style={{
        background: "#8b956d",
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px),
          repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px)
        `,
        cursor: isPanning ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Canvas Container */}
      <div
        className="absolute inset-0 canvas-background"
        style={{
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.scale})`,
          transformOrigin: "0 0",
        }}
      >
        {/* Draggable Cards */}
        {cards.map((card, index) => (
          <DraggableCard
            key={card.id}
            {...card}
            delay={index * 0.1}
            viewportOffset={viewport}
          />
        ))}

        {/* Like Button */}
        <LikeButton
          initialPosition={{ x: 200, y: 200 }}
          viewportOffset={viewport}
        />
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={() => setViewport({ x: 0, y: 0, scale: 1 })}
          className="px-3 py-2 text-xs hover:scale-105 transition-transform"
          style={{
            background: "#000",
            border: "4px solid #4ade80",
            color: "#4ade80",
            cursor: "pointer",
          }}
        >
          RESET VIEW
        </button>
        <div
          className="px-3 py-2 text-xs text-center"
          style={{
            background: "rgba(0,0,0,0.8)",
            border: "4px solid #000",
            color: "#4ade80",
          }}
        >
          ZOOM: {Math.round(viewport.scale * 100)}%
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 left-4 px-4 py-2 text-xs pointer-events-none select-none"
        style={{
          background: "rgba(0,0,0,0.8)",
          border: "4px solid #000",
          color: "#4ade80",
        }}
      >
        DRAG CARDS • PAN CANVAS • SCROLL TO ZOOM
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-4 px-4 py-2 text-xs pointer-events-none select-none"
        style={{
          background: "#000",
          border: "4px solid #4ade80",
          color: "#4ade80",
          letterSpacing: "2px"
        }}
      >
        RIRIKA'S DIGITAL CANVAS
      </motion.div>
    </motion.div>
  );
}