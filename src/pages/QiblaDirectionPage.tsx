import { useEffect, useState, useRef } from 'react';
import { useCompassHeading } from '../hooks/useCompassHeading';
import { getRelativeRotation } from '../lib/compassUtils';
import { createClient } from '@supabase/supabase-js';
import { Button } from '../components/ui/button';
import { animated, useSpring } from 'react-spring';
import { Loader2 } from 'lucide-react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

const fallbackIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapPreview({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng]);
  return null;
}

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

  // Fetch Qibla direction from AlAdhan API and save to Supabase cache
  const fetchFromAlAdhan = async (lat: number, lng: number) => {
    setError(null);
    try {
      const res = await fetch(`https://api.aladhan.com/v1/qibla/${lat}/${lng}`);
      const data = await res.json();
      if (data.code === 200 && data.data?.direction !== undefined) {
        setQiblaDirection(data.data.direction);
        setLocation({ lat, lng });
        setError(null);

        // Save to Supabase cache
        await supabase.from('qibla').insert([
          { direction: data.data.direction, lat, lng, created_at: new Date().toISOString() },
        ]);
      } else {
        setError('AlAdhan API থেকে কিবলা দিক পাওয়া যায়নি।');
      }
    } catch (err) {
      console.error(err);
      setError('AlAdhan API তে সংযোগ ব্যর্থ হয়েছে।');
    }
  };

  // Initial fetch logic: try cache, then geolocation, else manual input
  useEffect(() => {
    const fetchQibla = async () => {
      try {
        const { data } = await supabase
          .from('qibla')
          .select('direction, lat, lng')
          .order('created_at', { ascending: false })
          .limit(1);

        if (data && data.length > 0) {
          setQiblaDirection(data[0].direction);
          setLocation({ lat: data[0].lat, lng: data[0].lng });
          return;
        }

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
      } catch (err) {
        console.error(err);
        setError('লোকেশন থেকে কিবলা দিক নির্ধারণে ব্যর্থ।');
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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white font-sans">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">কিবলার দিক নির্দেশনা</h1>

      {error && <div className="text-red-600 text-sm text-center mb-2">{error}</div>}

      {manualPrompt && (
        <form onSubmit={handleManualSubmit} className="mt-4 text-center space-y-2">
          <p className="text-sm">অথবা নিজে আপনার লোকেশন দিন:</p>
          <div className="flex gap-2 justify-center">
            <input
              name="lat"
              type="number"
              step="any"
              required
              placeholder="Latitude"
              className="border rounded p-1 w-28 text-sm text-gray-900 dark:text-gray-800"
            />
            <input
              name="lng"
              type="number"
              step="any"
              required
              placeholder="Longitude"
              className="border rounded p-1 w-28 text-sm text-gray-900 dark:text-gray-800"
            />
          </div>
          <Button type="submit">লোকেশন দিন</Button>
        </form>
      )}

      {location && (
        <div className="w-full max-w-md aspect-square md:aspect-video rounded overflow-hidden shadow mt-6">
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full z-0"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapPreview lat={location.lat} lng={location.lng} />
            <Marker position={[location.lat, location.lng]} icon={fallbackIcon} />
          </MapContainer>
        </div>
      )}

      {qiblaDirection === null && !manualPrompt ? (
        <div
          className="flex items-center gap-2 text-gray-500 text-sm mt-6"
          role="status"
          aria-live="polite"
        >
          <Loader2 className="animate-spin w-4 h-4" />
          কিবলা দিক লোড হচ্ছে...
        </div>
      ) : qiblaDirection !== null ? (
        <>
          <div className="relative w-64 h-64 md:w-80 md:h-80 my-6">
            <animated.div
              className="absolute inset-0"
              style={{
                transform: compassAnim.rotation.to((r) => `rotate3d(0, 0, 1, ${-r}deg)`),
              }}
            >
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
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-sm" style={{ top: '10px' }}>
                  উ
                </div>{' '}
                {/* North */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm" style={{ bottom: '10px' }}>
                  দ
                </div>{' '}
                {/* South */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-sm" style={{ left: '10px' }}>
                  প
                </div>{' '}
                {/* West */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm" style={{ right: '10px' }}>
                  পূ 
                </div>{' '}
                {/* East */}
              </div>
            </animated.div>

            <animated.div
              className="absolute left-1/2 top-1/2 w-2 h-32 md:h-40 bg-red-600 rounded-full origin-bottom z-10"
              style={{
                transform: arrowAnim.rotation.to(
                  (r) => `translate(-50%, -100%) rotate3d(0, 0, 1, ${r}deg)`
                ),
              }}
            />
          </div>

          <div className="text-center text-sm text-gray-700 dark:text-gray-300" aria-live="polite">
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
