// src/lib/compassUtils.ts

/**
 * Returns the shortest signed rotation needed to face Qibla.
 * +ve → rotate clockwise, -ve → counter-clockwise
 *
 * @param heading - Current compass heading (0–360)
 * @param qiblaDirection - Qibla direction (0–360)
 * @returns Signed angle between -180 and +180
 */
export const getRelativeRotation = (
  heading: number,
  qiblaDirection: number
): number => {
  if (!isFinite(heading) || !isFinite(qiblaDirection)) return 0;

  const diff = normalizeAngle(qiblaDirection - heading);
  return diff > 180 ? diff - 360 : diff;
};

/**
 * Normalize any angle to a 0–360° range.
 *
 * @param angle - Input angle
 * @returns Normalized angle
 */
export const normalizeAngle = (angle: number): number => {
  if (!isFinite(angle)) return 0;
  return (angle % 360 + 360) % 360;
};

/**
 * Get the cardinal direction label (localized).
 *
 * @param angle - Heading angle
 * @param locale - "en" or "bn"
 * @returns Direction label like "N" or "উ"
 */
export const getCardinalDirection = (
  angle: number,
  locale: "en" | "bn" = "en"
): string => {
  const directions: Record<"en" | "bn", string[]> = {
    en: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
    bn: ["উ", "উপ", "প", "দপ", "দ", "দও", "ও", "উও"],
  };

  const validDirections = directions[locale] || directions["en"];
  const index = Math.round(normalizeAngle(angle) / 45) % 8;

  return validDirections[index];
};

/**
 * Detect if current device is Android-based.
 *
 * @returns true if Android
 */
export const isAndroidDevice = (): boolean => {
  return typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);
};

/**
 * Detects whether the device likely supports compass APIs.
 *
 * @returns true if compass is supported
 */
export const hasCompassSupport = (): boolean => {
  return (
    typeof window !== "undefined" &&
    ("ondeviceorientationabsolute" in window ||
      "ondeviceorientation" in window)
  );
};
