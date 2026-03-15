"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for X and Y coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth trailing effect
  const springConfig = { damping: 20, stiffness: 700, mass: 0.1 };
  // const cursorX = useSpring(mouseX, springConfig);
  // const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setTimeout(() => setIsVisible(true), 0);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if the mouse is hovering over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.closest(
        'a, button, [role="button"], input, select, textarea'
      );
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-999999 rounded-full mix-blend-difference"
        // 1. Remove the useSpring imports and variables.
        // 2. Change your style prop in the motion.div to use the raw motion values directly:
        style={{
        x: mouseX, // Using raw mouseX instead of cursorX
        y: mouseY, // Using raw mouseY instead of cursorY
        translateX: "-50%",
        translateY: "-50%",
        }}
      animate={{
        // Morphing animation logic
        width: isHovering ? 40 : 12,
        height: isHovering ? 40 : 12,
        backgroundColor: isHovering ? "transparent" : "white",
        border: isHovering ? "2px solid white" : "0px solid white",
      }}
      transition={{ 
        duration: 0.15, 
        ease: "easeOut" 
      }}
    />
  );
}