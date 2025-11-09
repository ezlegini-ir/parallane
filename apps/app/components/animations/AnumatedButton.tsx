// AnimatedShadcnButton.tsx
"use client";

import { Button } from "@parallane/ui/components/ui/button";
import { motion } from "framer-motion";
import React from "react";

interface AnimatedShadcnButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const AnimatedShadcnButton: React.FC<AnimatedShadcnButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3 },
      }}
      className="w-fit"
    >
      <Button
        type={type}
        onClick={onClick}
        className={`bg-indigo-600 text-white font-semibold rounded-lg focus:outline-none ${className}`}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedShadcnButton;
