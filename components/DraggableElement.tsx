"use client";

import { useState } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import Image from "next/image";

interface DraggableElementProps {
  id: string;
  type: "sticky" | "social" | "image" | "avatar" | "info";
  position: { x: number; y: number };
  content?: string;
  href?: string;
  rotation?: number;
}

export default function DraggableElement({
  id,
  type,
  position,
  content,
  href,
  rotation = 0,
}: DraggableElementProps) {
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

  const renderContent = () => {
    switch (type) {
      case "sticky":
        return (
          <div
            className="min-w-[200px] p-4 text-xs"
            style={{
              background: "#f0e68c",
              border: "4px solid #000",
              transform: `rotate(${rotation}deg)`,
              boxShadow: isDragging
                ? "8px 8px 0 #000"
                : "4px 4px 0 #000",
            }}
          >
            {content}
          </div>
        );

      case "social":
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-xs"
            style={{
              background: "#4ade80",
              border: "4px solid #000",
              color: "#000",
              transform: `rotate(${rotation}deg)`,
              boxShadow: isDragging
                ? "8px 8px 0 #000"
                : "4px 4px 0 #000",
            }}
            onClick={(e) => {
              if (isDragging) e.preventDefault();
            }}
          >
            {content}
          </a>
        );

      case "avatar":
        return (
          <div
            className="flex flex-col items-center p-4"
            style={{
              background: "#fff",
              border: "4px solid #000",
              transform: `rotate(${rotation}deg)`,
              boxShadow: isDragging
                ? "8px 8px 0 #000"
                : "4px 4px 0 #000",
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
              />
            </div>
            <span className="text-xs font-bold" style={{ letterSpacing: "2px" }}>
              {content}
            </span>
          </div>
        );

      case "info":
        return (
          <div
            className="px-4 py-3 text-xs"
            style={{
              background: "#a7f3d0",
              border: "4px solid #000",
              color: "#000",
              transform: `rotate(${rotation}deg)`,
              boxShadow: isDragging
                ? "8px 8px 0 #000"
                : "4px 4px 0 #000",
            }}
          >
            {content}
          </div>
        );

      case "image":
        return (
          <div
            className="p-2"
            style={{
              background: "#fff",
              border: "4px solid #000",
              transform: `rotate(${rotation}deg)`,
              boxShadow: isDragging
                ? "8px 8px 0 #000"
                : "4px 4px 0 #000",
            }}
          >
            <div className="w-48 h-48 bg-gray-200" style={{ imageRendering: "pixelated" }} />
            {content && (
              <p className="text-xs mt-2">{content}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Draggable
      defaultPosition={position}
      onStart={handleStart}
      onStop={handleStop}
      handle=".draggable-handle"
    >
      <motion.div
        className="draggable-handle absolute"
        style={{ zIndex }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {renderContent()}
      </motion.div>
    </Draggable>
  );
}