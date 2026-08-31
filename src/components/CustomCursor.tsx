import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smoothness
  const springConfig = { damping: 25, stiffness: 250 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports fine pointer (desktop)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.classList.contains('cursor-pointer');
      
      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-green rounded-full shadow-[0_0_10px_rgba(31,95,58,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: 1,
        }}
      />

      {/* Trailing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-brand-green/30 rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.8 : (isClicked ? 0.8 : 1),
          borderWidth: isHovered ? '2px' : '1px',
          borderColor: isHovered ? 'rgba(31, 95, 58, 0.6)' : 'rgba(31, 95, 58, 0.3)',
          backgroundColor: isHovered ? 'rgba(31, 95, 58, 0.05)' : 'transparent',
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 150
        }}
      />

      {/* Subtle Glow Aura */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 bg-brand-green/5 blur-xl rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 2 : 1,
          opacity: isHovered ? 1 : 0.5,
        }}
      />
    </div>
  );
};

export default CustomCursor;
