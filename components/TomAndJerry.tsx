"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaMouse, FaCat } from "react-icons/fa";

export default function TomAndJerry({ isGenerating, isGenerated }: { isGenerating: boolean; isGenerated: boolean }) {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isGenerating) {
      setIsRunning(true);
      // Start the chase animation
      setTimeout(() => setIsRunning(false), 2000);
    }
  }, [isGenerating]);

  return (
    <div className="relative w-48 h-48">
      {/* Jerry (Mouse) */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        animate={
          isRunning
            ? {
                x: [0, 20, 0, -20, 0],
                y: [0, -10, 0, -10, 0],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            : {}
        }
      >
        <FaMouse className="text-yellow-400 text-2xl" />
      </motion.div>

      {/* Tom (Cat) */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        animate={
          isRunning
            ? {
                x: [0, -20, 0, 20, 0],
                y: [0, 10, 0, 10, 0],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            : {}
        }
      >
        <FaCat className="text-blue-400 text-2xl" />
      </motion.div>

      {/* Catch animation */}
      {isGenerated && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 }
          }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-green-400 text-2xl">🎉</div>
            <div className="text-white text-sm mt-2">Code Generated!</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
