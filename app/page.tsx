"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "@/components/LandingPage";
import CanvasPage from "@/components/CanvasPage";

export default function Home() {
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!showCanvas ? (
        <LandingPage key="landing" onEnter={() => setShowCanvas(true)} />
      ) : (
        <CanvasPage key="canvas" />
      )}
    </AnimatePresence>
  );
}
