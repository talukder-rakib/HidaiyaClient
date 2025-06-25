import { useEffect, useRef, useState } from "react";
import { getRelativeRotation } from "../lib/compassUtils";
import { useCompassHeading } from "./useCompassHeading";

interface QiblaCompassResult {
  heading: number;
  relativeRotation: number;
  isAligned: boolean;
}

/**
 * Custom hook to calculate relative rotation to Qibla and detect alignment.
 * Includes vibration & sound feedback when aligned (±5°).
 */
export function useQiblaCompass(qiblaDirection: number | null): QiblaCompassResult {
  const heading = useCompassHeading();
  const [relativeRotation, setRelativeRotation] = useState(0);
  const [isAligned, setIsAligned] = useState(false);
  const lastFeedbackTime = useRef(0);

  useEffect(() => {
    if (qiblaDirection === null) return;

    const relative = getRelativeRotation(heading, qiblaDirection);
    setRelativeRotation(relative);

    const alignmentThreshold = 5; // ±5 degrees
    const aligned =
      Math.abs(relative % 360) < alignmentThreshold ||
      Math.abs(relative % 360) > 360 - alignmentThreshold;

    setIsAligned(aligned);

    const now = Date.now();
    const feedbackCooldown = 5000; // 5 seconds

    if (aligned && "vibrate" in navigator && now - lastFeedbackTime.current > feedbackCooldown) {
      navigator.vibrate?.(200);
      lastFeedbackTime.current = now;

      // Audio feedback (ding)
      const audio = new Audio("/sounds/ding.mp3");
      audio.play().catch((err) => {
        console.warn("🔇 Audio play failed:", err);
      });
    }
  }, [heading, qiblaDirection]);

  return { heading, relativeRotation, isAligned };
}
