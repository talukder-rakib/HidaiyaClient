import { useEffect, useState } from 'react';

/**
 * Custom hook to get the device compass heading (0-360 degrees).
 * Supports iOS (with permission), Android, and fallback cases.
 */
export function useCompassHeading(): number {
  const [heading, setHeading] = useState<number>(0);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      let newHeading = 0;

      if (event.absolute && typeof event.alpha === 'number') {
        newHeading = 360 - event.alpha;
      } else if ('webkitCompassHeading' in event) {
        // @ts-ignore: iOS Safari-specific property
        newHeading = event.webkitCompassHeading;
      } else if (typeof event.alpha === 'number') {
        newHeading = 360 - event.alpha;
      }

      setHeading((newHeading + 360) % 360); // Normalize
    };

    const setupCompass = async () => {
      try {
        // iOS 13+ requires explicit permission
        const deviceOrientation = DeviceOrientationEvent as any;

        if (typeof deviceOrientation?.requestPermission === 'function') {
          const response = await deviceOrientation.requestPermission();
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
          } else {
            console.warn('Device orientation permission denied.');
          }
        } else {
          // Android or older iOS
          window.addEventListener('deviceorientation', handleOrientation, true);
        }
      } catch (err) {
        console.error('Compass access error:', err);
      }
    };

    setupCompass();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return heading;
}
