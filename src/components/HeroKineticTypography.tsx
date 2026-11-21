"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export interface KineticStep {
  id: string;
  type: "single" | "duo" | "statement";
  text?: string;
  line1?: string;
  line2?: string;
  duration: number; // Duration in seconds
}

export const KINETIC_STEPS: KineticStep[] = [
  {
    id: "step-1",
    type: "single",
    text: "ENGINEERED",
    duration: 4.0,
  },
  {
    id: "step-2",
    type: "single",
    text: "RELIABLE",
    duration: 4.0,
  },
  {
    id: "step-3",
    type: "single",
    text: "UNINTERRUPTED",
    duration: 4.0,
  },
  {
    id: "step-4",
    type: "single",
    text: "POWERFUL",
    duration: 4.0,
  },
  {
    id: "step-5",
    type: "duo",
    line1: "INDUSTRIAL",
    line2: "PERFORMANCE",
    duration: 4.5,
  },
  {
    id: "step-6",
    type: "statement",
    line1: "POWERING",
    line2: "YOUR INDUSTRY",
    duration: 5.0,
  },
];

export interface HeroKineticTypographyProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
}

/**
 * ConvergingRow:
 * Splits text into individual letters.
 * Letters on the left half fly in from the left (negative X).
 * Letters on the right half fly in from the right (positive X).
 * All letters converge and settle into the center with wide tracking.
 */
function ConvergingRow({
  text,
  className = "",
  accentDot = false,
  shouldReduceMotion = false,
}: {
  text: string;
  className?: string;
  accentDot?: boolean;
  shouldReduceMotion?: boolean | null;
}) {
  const chars = text.split("");
  const middle = (chars.length - 1) / 2;

  return (
    <div className="flex items-center justify-center flex-nowrap overflow-visible py-1 tracking-normal">
      {chars.map((char, index) => {
        // Normal word space between words
        if (char === " ") {
          return (
            <span
              key={`${text}-${index}-space`}
              className="inline-block w-[0.3em]"
              aria-hidden="true"
            >
              &nbsp;
            </span>
          );
        }

        // Distance from center: negative for left half, positive for right half
        const distanceFactor = index - middle;

        return (
          <motion.span
            key={`${text}-${index}-${char}`}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    // Start from outer left and right sides
                    x: `${distanceFactor * 60}px`,
                    opacity: 0,
                    filter: "blur(3px)",
                  }
            }
            animate={{
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                x: {
                  duration: shouldReduceMotion ? 0.3 : 3.0, // Slow, fluid inward glide
                  ease: [0.35, 0.05, 0.25, 1], // Smooth easeInOut curve that starts gently without any fast snap
                },
                opacity: {
                  duration: shouldReduceMotion ? 0.3 : 1.5,
                  ease: "easeOut",
                },
                filter: {
                  duration: shouldReduceMotion ? 0.3 : 1.5,
                  ease: "easeOut",
                },
              },
            }}
            exit={{
              opacity: 0,
              filter: "blur(2px)",
              transition: {
                duration: 0.35,
                ease: "easeInOut",
              },
            }}
            className={`inline-block tracking-normal ${className}`}
          >
            {char}
          </motion.span>
        );
      })}

      {accentDot && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { delay: 0.8, duration: 0.4 },
          }}
          exit={{ opacity: 0 }}
          className="inline-block text-primary drop-shadow-[0_0_16px_rgba(224,5,1,0.9)]"
        >
          .
        </motion.span>
      )}
    </div>
  );
}

export default function HeroKineticTypography({
  videoRef,
  isPlaying,
}: HeroKineticTypographyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = Boolean(useReducedMotion());

  // Continuous step cycle timer:
  // Advances through all steps (ENGINEERED -> RELIABLE -> UNINTERRUPTED -> POWERFUL -> ...)
  // independently of background video loop length.
  useEffect(() => {
    if (!isPlaying) return;

    const currentStep = KINETIC_STEPS[currentIndex] || KINETIC_STEPS[0];
    const timer = setTimeout(() => {
      if (!document.hidden) {
        setCurrentIndex((prev) => (prev + 1) % KINETIC_STEPS.length);
      }
    }, currentStep.duration * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying]);

  const step = KINETIC_STEPS[currentIndex] || KINETIC_STEPS[0];

  return (
    <div
      className="absolute inset-0 z-20 pointer-events-none select-none flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-12 overflow-hidden"
      aria-live="polite"
    >
      {/* Centered Typography Container where converging alphabets meet and set in the middle */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-center min-h-[160px] sm:min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center justify-center w-full"
          >
            {/* Single Word (ENGINEERED, RELIABLE, UNINTERRUPTED, POWERFUL) */}
            {step.type === "single" && step.text && (
              <ConvergingRow
                text={step.text}
                shouldReduceMotion={shouldReduceMotion}
                className="font-heading font-light text-white uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-normal leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] [text-shadow:_0_2px_18px_rgba(0,0,0,0.9),_0_8px_36px_rgba(0,0,0,0.95)]"
              />
            )}

            {/* Duo (INDUSTRIAL PERFORMANCE) */}
            {step.type === "duo" && step.line1 && step.line2 && (
              <div className="flex flex-col items-center justify-center gap-1 sm:gap-3">
                <ConvergingRow
                  text={step.line1}
                  shouldReduceMotion={shouldReduceMotion}
                  className="font-heading font-extralight sm:font-light text-white/90 uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-normal drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]"
                />
                <ConvergingRow
                  text={step.line2}
                  shouldReduceMotion={shouldReduceMotion}
                  className="font-heading font-light text-white uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-normal drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
                />
              </div>
            )}

            {/* Final Statement (POWERING YOUR INDUSTRY.) */}
            {step.type === "statement" && step.line1 && step.line2 && (
              <div className="flex flex-col items-center justify-center gap-1 sm:gap-3">
                <ConvergingRow
                  text={step.line1}
                  shouldReduceMotion={shouldReduceMotion}
                  className="font-heading font-extralight sm:font-light text-white/95 uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-normal drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]"
                />
                <ConvergingRow
                  text={step.line2}
                  accentDot={true}
                  shouldReduceMotion={shouldReduceMotion}
                  className="font-heading font-light text-white uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-normal drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)]"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
