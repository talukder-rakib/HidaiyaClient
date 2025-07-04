import { useEffect, useState, useRef } from 'react';
import { useCompassHeading } from '../hooks/useCompassHeading';
import { getRelativeRotation } from '../lib/compassUtils';
import { Button } from '../components/ui/button';
import { animated, useSpring } from 'react-spring';
import { Loader2 } from 'lucide-react';

export default function QiblaDirectionPage() {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [manualPrompt, setManualPrompt] = useState(false);

  const heading = useCompassHeading();
  const lastVibrationTime = useRef(0);

  const relativeRotation = qiblaDirection !== null ? getRelativeRotation(heading, qiblaDirection) : 0;

  const compassAnim = useSpring({ rotation: heading });
  const arrowAnim = useSpring({ rotation: relativeRotation });

  // Fetch Qibla direction from AlAdhan API (no Supabase cache)
  const fetchFromAlAdhan = async (lat: number, lng: number) => {
    setError(null);
    try {
      const res = await fetch(`https://api.aladhan.com/v1/qibla/${lat}/${lng}`);
      const data = await res.json();
      if (data.code === 200 && data.data?.direction !== undefined) {
        setQiblaDirection(data.data.direction);
        setLocation({ lat, lng });
        setError(null);
      } else {
        setError('AlAdhan API থেকে কিবলা দিক পাওয়া যায়নি।');
      }
    } catch (err) {
      console.error(err);
      setError('AlAdhan API তে সংযোগ ব্যর্থ হয়েছে।');
    }
  };

  // Initial fetch logic: try geolocation, else manual input
  useEffect(() => {
    const fetchQibla = async () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            fetchFromAlAdhan(latitude, longitude);
          },
          (err) => {
            console.error(err);
            setError('লোকেশন অনুমতি পাওয়া যায়নি।');
            setManualPrompt(true);
          }
        );
      } else {
        setError('আপনার ডিভাইসে জিওলোকেশন সাপোর্ট নেই।');
        setManualPrompt(true);
      }
    };

    fetchQibla();
  }, []);

  // Vibration and sound feedback when facing Qibla within 5 degrees
  useEffect(() => {
    if (qiblaDirection === null) return;
    const diff = Math.abs(relativeRotation % 360);
    const isAligned = diff < 5 || diff > 355;
    const now = Date.now();

    if (isAligned && 'vibrate' in navigator && now - lastVibrationTime.current > 5000) {
      navigator.vibrate?.(200);
      lastVibrationTime.current = now;

      try {
        const ding = new Audio('/sounds/ding.mp3');
        ding.play().catch(() => {});
      } catch {}
    }
  }, [relativeRotation, qiblaDirection]);

  // Handle manual location form submit
  const handleManualSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const lat = parseFloat((form.elements.namedItem('lat') as HTMLInputElement).value);
    const lng = parseFloat((form.elements.namedItem('lng') as HTMLInputElement).value);
    if (!isNaN(lat) && !isNaN(lng)) {
      fetchFromAlAdhan(lat, lng);
      setManualPrompt(false);
      setError(null);
    } else {
      setError('সঠিক Latitude এবং Longitude দিন।');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-2 sm:px-4 py-4 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white font-sans">
      <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-2 xs:mb-3 sm:mb-4 text-center leading-tight">কিবলার দিক নির্দেশনা</h1>

      {error && <div className="text-red-600 text-xs xs:text-sm sm:text-base text-center mb-2 max-w-xs sm:max-w-md mx-auto">{error}</div>}

      {manualPrompt && (
        <form onSubmit={handleManualSubmit} className="mt-2 xs:mt-3 sm:mt-4 text-center space-y-2 w-full max-w-xs sm:max-w-sm mx-auto">
          <p className="text-xs xs:text-sm sm:text-base">অথবা নিজে আপনার লোকেশন দিন:</p>
          <div className="flex flex-col xs:flex-row gap-2 justify-center items-center">
            <input
              name="lat"
              type="number"
              step="any"
              required
              placeholder="Latitude"
              className="border rounded p-1 w-full xs:w-28 text-xs xs:text-sm sm:text-base text-gray-900 dark:text-gray-800"
            />
            <input
              name="lng"
              type="number"
              step="any"
              required
              placeholder="Longitude"
              className="border rounded p-1 w-full xs:w-28 text-xs xs:text-sm sm:text-base text-gray-900 dark:text-gray-800"
            />
          </div>
          <Button type="submit" className="w-full xs:w-auto">লোকেশন দিন</Button>
        </form>
      )}

      {qiblaDirection === null && !manualPrompt ? (
        <div
          className="flex items-center gap-2 text-gray-500 text-xs xs:text-sm sm:text-base mt-4 xs:mt-5 sm:mt-6"
          role="status"
          aria-live="polite"
        >
          <Loader2 className="animate-spin w-4 h-4" />
          কিবলা দিক লোড হচ্ছে...
        </div>
      ) : qiblaDirection !== null ? (
        <>
          <div
            className="relative w-36 h-36 xs:w-44 xs:h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 my-4 xs:my-5 sm:my-6 mx-auto"
            style={{ maxWidth: '90vw', maxHeight: '60vw', minWidth: 120, minHeight: 120 }}
          >
            <div className="absolute inset-0">
              <div className="compass-container">
                <div className="compass-body">
                  <div className="compass-face">
                    <div className="inner-circle"></div>
                    <div className="outer-rim"></div>
                    <div className="ticks">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className="tick" style={{ transform: `rotate(${i * 10}deg)` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Bangla Direction Labels */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-700 dark:text-gray-300 font-bold select-none">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg" style={{ top: '6px' }}>
                  উ
                </div>
                {/* North */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg" style={{ bottom: '6px' }}>
                  দ
                </div>
                {/* South */}
                <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg" style={{ left: '6px' }}>
                  প
                </div>
                {/* West */}
                <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg" style={{ right: '6px' }}>
                  পূ
                </div>
                {/* East */}
              </div>
            </div>
            <animated.div
              className="absolute left-1/2 top-1/2 w-1 xs:w-1.5 sm:w-2 md:w-2.5 lg:w-3 h-16 xs:h-20 sm:h-28 md:h-36 lg:h-48 bg-red-600 rounded-full origin-bottom z-10"
              style={{
                transform: arrowAnim.rotation.to(
                  (r: number) => `translate(-50%, -100%) rotate3d(0, 0, 1, ${r}deg)`
                ),
              }}
            />
          </div>

          <div className="text-center text-xs xs:text-sm sm:text-base text-gray-700 dark:text-gray-300" aria-live="polite">
            <p>বর্তমান দিক: {Math.round(heading)}°</p>
            <p>কিবলার দিক: {Math.round(qiblaDirection)}°</p>
            <p>আপনার আপেক্ষিক দিক: {Math.round(relativeRotation)}°</p>
            <p className="mt-1 text-green-600 font-medium">
              {(Math.abs(relativeRotation % 360) < 5 || Math.abs(relativeRotation % 360) > 355)
                ? '✅ কিবলা অভিমুখে ঠিকভাবে মুখ করা হয়েছে!'
                : '🧭 কিবলার দিকে ঘুরুন'}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
