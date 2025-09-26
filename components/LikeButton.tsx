"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LikeButtonProps {
  initialPosition: { x: number; y: number };
  viewportOffset: { x: number; y: number; scale: number };
}

// Pixel heart SVG component
const PixelHeart = ({ filled }: { filled: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
    {filled ? (
      // Filled heart
      <>
        <rect x="3" y="2" width="3" height="1" fill="#ff1744"/>
        <rect x="10" y="2" width="3" height="1" fill="#ff1744"/>
        <rect x="2" y="3" width="5" height="1" fill="#ff1744"/>
        <rect x="9" y="3" width="5" height="1" fill="#ff1744"/>
        <rect x="1" y="4" width="6" height="3" fill="#ff1744"/>
        <rect x="9" y="4" width="6" height="3" fill="#ff1744"/>
        <rect x="2" y="7" width="12" height="1" fill="#ff1744"/>
        <rect x="3" y="8" width="10" height="1" fill="#ff1744"/>
        <rect x="4" y="9" width="8" height="1" fill="#ff1744"/>
        <rect x="5" y="10" width="6" height="1" fill="#ff1744"/>
        <rect x="6" y="11" width="4" height="1" fill="#ff1744"/>
        <rect x="7" y="12" width="2" height="1" fill="#ff1744"/>
        <rect x="8" y="13" width="1" height="1" fill="#ff1744"/>
      </>
    ) : (
      // Empty heart outline
      <>
        <rect x="3" y="2" width="3" height="1" fill="#000"/>
        <rect x="10" y="2" width="3" height="1" fill="#000"/>
        <rect x="2" y="3" width="1" height="1" fill="#000"/>
        <rect x="6" y="3" width="1" height="1" fill="#000"/>
        <rect x="9" y="3" width="1" height="1" fill="#000"/>
        <rect x="13" y="3" width="1" height="1" fill="#000"/>
        <rect x="1" y="4" width="1" height="3" fill="#000"/>
        <rect x="7" y="4" width="2" height="1" fill="#000"/>
        <rect x="14" y="4" width="1" height="3" fill="#000"/>
        <rect x="2" y="7" width="1" height="1" fill="#000"/>
        <rect x="13" y="7" width="1" height="1" fill="#000"/>
        <rect x="3" y="8" width="1" height="1" fill="#000"/>
        <rect x="12" y="8" width="1" height="1" fill="#000"/>
        <rect x="4" y="9" width="1" height="1" fill="#000"/>
        <rect x="11" y="9" width="1" height="1" fill="#000"/>
        <rect x="5" y="10" width="1" height="1" fill="#000"/>
        <rect x="10" y="10" width="1" height="1" fill="#000"/>
        <rect x="6" y="11" width="1" height="1" fill="#000"/>
        <rect x="9" y="11" width="1" height="1" fill="#000"/>
        <rect x="7" y="12" width="2" height="1" fill="#000"/>
        <rect x="8" y="13" width="1" height="1" fill="#000"/>
      </>
    )}
  </svg>
);

export default function LikeButton({ initialPosition, viewportOffset }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [localOffset, setLocalOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  // Fetch initial likes
  useEffect(() => {
    fetch('/api/likes')
      .then(res => res.json())
      .then(data => setLikes(data.likes))
      .catch(console.error);

    // Check if user has liked before
    const liked = localStorage.getItem('has_liked') === 'true';
    setHasLiked(liked);
  }, []);

  // Handle like
  const handleLike = async () => {
    if (hasDragged || hasLiked) return;

    setIsAnimating(true);
    setHasLiked(true);
    localStorage.setItem('has_liked', 'true');

    try {
      const res = await fetch('/api/likes', { method: 'POST' });
      const data = await res.json();
      setLikes(data.likes);
    } catch (error) {
      console.error('Error liking:', error);
    }

    setTimeout(() => setIsAnimating(false), 600);
  };

  // Handle dragging
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

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, viewportOffset, initialPosition, localOffset]);

  const position = {
    x: initialPosition.x + localOffset.x,
    y: initialPosition.y + localOffset.y,
  };

  return (
    <motion.div
      ref={buttonRef}
      className="absolute select-none"
      style={{
        left: position.x,
        top: position.y,
        zIndex: isDragging ? 1000 : 100,
        cursor: isDragging ? "grabbing" : "grab"
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onMouseDown={handleMouseDown}
    >
      <div
        className={`relative px-6 py-4 text-center ${hasLiked ? 'cursor-not-allowed' : 'hover:scale-105'} transition-transform`}
        style={{
          background: hasLiked ? "#666" : "#ff1744",
          border: "4px solid #000",
          boxShadow: isDragging ? "8px 8px 0 #000" : "4px 4px 0 #000",
          transform: isDragging ? "scale(1.05)" : "scale(1)",
        }}
        onClick={handleLike}
      >
        {/* Pixel Heart Icon */}
        <div className={`mb-2 flex justify-center ${isAnimating ? 'animate-bounce' : ''}`}>
          <PixelHeart filled={hasLiked} />
        </div>

        {/* Like Count */}
        <div className="text-xs font-bold" style={{ letterSpacing: "1px", color: "#fff" }}>
          {likes} LIKES
        </div>

        {/* Floating pixel hearts animation */}
        {isAnimating && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ left: '40%' }}
                initial={{
                  x: Math.random() * 20 - 10,
                  y: 0,
                  opacity: 1
                }}
                animate={{
                  y: -60,
                  opacity: 0
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="2" width="3" height="1" fill="#ff1744"/>
                  <rect x="10" y="2" width="3" height="1" fill="#ff1744"/>
                  <rect x="2" y="3" width="5" height="1" fill="#ff1744"/>
                  <rect x="9" y="3" width="5" height="1" fill="#ff1744"/>
                  <rect x="1" y="4" width="14" height="3" fill="#ff1744"/>
                  <rect x="2" y="7" width="12" height="1" fill="#ff1744"/>
                  <rect x="3" y="8" width="10" height="1" fill="#ff1744"/>
                  <rect x="4" y="9" width="8" height="1" fill="#ff1744"/>
                  <rect x="5" y="10" width="6" height="1" fill="#ff1744"/>
                  <rect x="6" y="11" width="4" height="1" fill="#ff1744"/>
                  <rect x="7" y="12" width="2" height="1" fill="#ff1744"/>
                </svg>
              </motion.div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}