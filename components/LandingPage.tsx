"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onEnter}
      className="min-h-screen w-full flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
      style={{
        background: "#8b956d",
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px),
          repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px)
        `
      }}
    >
      {/* Pixel art decorative blocks */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: "32px",
              height: "32px",
              background: i % 2 === 0 ? "#4ade80" : "#22c55e",
              border: "2px solid #000",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className="z-10 flex flex-col items-center"
      >
        {/* Avatar with pixel style */}
        <div className="relative mb-8">
          <div
            className="w-32 h-32 bg-white"
            style={{
              border: "4px solid #000",
              boxShadow: "0 0 0 4px #000, 0 0 0 8px #fff, 0 0 0 12px #000",
              imageRendering: "pixelated",
              overflow: "hidden"
            }}
          >
            <Image
              src="/avatar.png"
              alt="RIRIKA Avatar"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold mb-4"
          style={{
            color: "#000",
            textShadow: "2px 2px 0 #4ade80",
            letterSpacing: "2px"
          }}
        >
          RIRIKA
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs mb-8 text-center"
          style={{ color: "#1e1e1e", lineHeight: "20px" }}
        >
          HKUST YR2 • AI+ELEC<br />
          MECHA AI • MUSIC • FIGHTING
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pixel-button flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>PRESS START</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ▶
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}