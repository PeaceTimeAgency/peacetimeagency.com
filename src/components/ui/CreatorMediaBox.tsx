"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CreatorMediaBoxProps {
  images: string[];
  name: string;
  className?: string;
  imageClassName?: string;
  interval?: number;
  transitionDuration?: number;
}

export const CreatorMediaBox = ({
  images,
  name,
  className = "relative w-full h-full",
  imageClassName = "absolute inset-0 w-full h-full object-cover",
  interval = 4000,
  transitionDuration = 1.5,
}: CreatorMediaBoxProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const placeholder = "/branding/KYRAX425.png";
  const displayImages = images.length > 0 && images.every(img => img && img.trim() !== "") 
    ? images 
    : [placeholder];

  useEffect(() => {
    if (displayImages.length <= 1) {
      if (currentIndex !== 0) setCurrentIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [displayImages.length, interval]);

  if (displayImages.length === 0) return null;

  return (
    <div className={className}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.img
          key={displayImages[currentIndex]}
          src={displayImages[currentIndex]}
          alt={`${name} - ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: transitionDuration, ease: "easeInOut" }}
          className={imageClassName}
        />
      </AnimatePresence>
    </div>
  );
};
