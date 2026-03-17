"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isHoveringRef = useRef(false);

  // Motion values for X and Y coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setTimeout(() => setIsVisible(true), 0);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Optimized hover detection: use mouseover/mouseout delegation instead of
    // checking e.target.closest() on every single mousemove (~60 calls/sec).
    // This fires only when hover state actually changes.
    const checkClickable = (target: HTMLElement | null): boolean => {
      if (!target) return false;
      return !!target.closest('a, button, [role="button"], input, select, textarea');
    };

    const handleMouseOver = (e: MouseEvent) => {
      const hovering = checkClickable(e.target as HTMLElement);
      if (hovering !== isHoveringRef.current) {
        isHoveringRef.current = hovering;
        setIsHovering(hovering);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      const stillHovering = checkClickable(relatedTarget);
      if (stillHovering !== isHoveringRef.current) {
        isHoveringRef.current = stillHovering;
        setIsHovering(stillHovering);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-999999 rounded-full mix-blend-difference"
      style={{
        x: mouseX,
        y: mouseY,
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