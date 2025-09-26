"use client";

import { useState } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";

interface MusicPlayerProps {
  id: string;
  initialPosition: { x: number; y: number };
  title: string;
  artist: string;
  albumArt?: string;
}

export default function MusicPlayer({
  id,
  initialPosition,
  title,
  artist,
  albumArt,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(240); // 4 minutes in seconds
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(10);

  const handleStart = () => {
    setIsDragging(true);
    setZIndex(1000);
  };

  const handleStop = () => {
    setIsDragging(false);
    setZIndex(10);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Draggable
      defaultPosition={initialPosition}
      onStart={handleStart}
      onStop={handleStop}
      handle=".drag-handle"
    >
      <motion.div
        className="absolute"
        style={{ zIndex }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div
          className="bg-red-500 text-white p-4 rounded-lg shadow-2xl"
          style={{
            width: "320px",
            boxShadow: isDragging
              ? "0 20px 40px rgba(0,0,0,0.4)"
              : "0 4px 20px rgba(0,0,0,0.2)",
            transform: isDragging ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.2s",
          }}
        >
          {/* Header / Drag Handle */}
          <div className="drag-handle cursor-move mb-3 flex justify-between items-center">
            <span className="font-mono text-sm">Now Playing</span>
            <span className="text-xs opacity-70">⋮⋮</span>
          </div>

          {/* Album Art */}
          <div className="bg-white bg-opacity-20 rounded mb-3 p-8 flex items-center justify-center">
            <div className="w-24 h-24 bg-white bg-opacity-30 rounded-full animate-pulse" />
          </div>

          {/* Track Info */}
          <div className="mb-3">
            <h3 className="font-bold text-lg truncate">{title}</h3>
            <p className="text-sm opacity-80 truncate">{artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="bg-white bg-opacity-30 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-300"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mt-1 opacity-70">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4">
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors">
              ⏮
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors">
              ⏭
            </button>
          </div>

          {/* Extra controls */}
          <div className="flex justify-between items-center mt-3 text-xs opacity-70">
            <button className="hover:opacity-100">Share</button>
            <button className="hover:opacity-100">Wishlist</button>
          </div>
        </div>
      </motion.div>
    </Draggable>
  );
}