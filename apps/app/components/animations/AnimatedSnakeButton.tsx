"use client";

import { Button } from "@parallane/ui/components/ui/button";
import { motion } from "framer-motion";
import React from "react";

const AnimatedSnakeButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative inline-block">
      {/* SVG Border */}
      <motion.svg
        viewBox="0 0 200 60"
        className="absolute top-0 left-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.rect
          x="2"
          y="2"
          width="196"
          height="56"
          rx="12"
          stroke="#ffffff" // indigo-600
          strokeWidth="4"
          strokeDasharray="500"
          strokeDashoffset="500"
          animate={{
            strokeDashoffset: [500, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 3,
            ease: "linear",
          }}
        />
      </motion.svg>

      {/* The button */}
      <Button className="relative">{children}</Button>
    </div>
  );
};

export default AnimatedSnakeButton;
