"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaBrain, FaLightbulb, FaSmile } from "react-icons/fa";

export default function ChatbotCharacter({ isThinking, isHappy }: { isThinking: boolean; isHappy: boolean }) {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <motion.div
      className="relative w-48 h-48"
      initial={{ scale: 0.8 }}
      animate={{ 
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" }
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          rotate: isThinking ? [0, 360] : 0,
          transition: {
            duration: isThinking ? 2 : 0,
            repeat: isThinking ? Infinity : 0,
            ease: "linear"
          }
        }}
      >
        <div className="relative w-full h-full">
          {/* Head */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-blue-500"
            animate={{
              scale: isHappy ? 1.1 : 1,
              transition: { duration: 0.3 }
            }}
          >
            {/* Eyes */}
            <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 rounded-full bg-white" />
            <div className="absolute top-1/4 right-1/4 w-1/4 h-1/4 rounded-full bg-white" />

            {/* Mouth */}
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-1/2 h-1/4 rounded-full bg-white"
              animate={{
                rotate: isHappy ? 180 : 0,
                transition: { duration: 0.3 }
              }}
            />
          </motion.div>

          {/* Body */}
          <motion.div
            className="absolute bottom-0 left-1/4 w-1/2 h-1/2 rounded-lg bg-blue-600"
            animate={{
              y: isThinking ? [0, -10, 0] : 0,
              transition: {
                duration: 0.5,
                repeat: isThinking ? Infinity : 0,
                ease: "easeInOut"
              }
            }}
          />

          {/* Thinking Icon */}
          {isThinking && (
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.2, 1],
                transition: {
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <FaBrain className="text-yellow-400 text-2xl" />
            </motion.div>
          )}

          {/* Happy Icon */}
          {isHappy && (
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
              animate={{
                scale: [1, 1.2, 1],
                transition: {
                  duration: 0.5,
                  repeat: 2,
                  ease: "easeInOut"
                }
              }}
            >
              <FaSmile className="text-green-400 text-2xl" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
