import React, { useState, useEffect } from 'react';
import { Clock, Globe, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { Coordinates, CalculationMethod, PrayerTimes, Prayer } from 'adhan';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { motion } from 'framer-motion';

dayjs.extend(duration);
dayjs.extend(relativeTime);

type PrayerKey = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'none';

type AlAdhanApiResponse = {
  code: number;
  status: string;
  data: {
    timings: Record<string, string>;
    date: {
      hijri: { date: string };
    };
    meta: {
      timezone: string;
    };
  };
};

const predefinedLocations = [ 
  { name: 'ঢাকা', lat: 23.8103, lng: 90.4125 },
  { name: 'চট্টগ্রাম', lat: 22.3569, lng: 91.7832 },
  { name: 'সিলেট', lat: 24.8949, lng: 91.8687 },
  { name: 'রাজশাহী', lat: 24.3636, lng: 88.6241 },
  { name: 'খুলনা', lat: 22.8456, lng: 89.5403 },
  { name: 'বরিশাল', lat: 22.7010, lng: 90.3535 },
  { name: 'রংপুর', lat: 25.7439, lng: 89.2752 },
  { name: 'ময়মনসিংহ', lat: 24.7471, lng: 90.4203 },

  // Important districts and towns
  { name: 'নরসিংদী', lat: 23.9167, lng: 90.7167 },
  { name: 'কুমিল্লা', lat: 23.4607, lng: 91.1809 },
  { name: 'বগুড়া', lat: 25.2909, lng: 89.9006 },
  { name: 'কক্সবাজার', lat: 21.4272, lng: 92.0058 },
  { name: 'নওগাঁ', lat: 24.8221, lng: 88.6402 },
  { name: 'পাবনা', lat: 24.0067, lng: 89.2506 },
  { name: 'জয়পুরহাট', lat: 25.0940, lng: 89.0122 },
  { name: 'মাদারীপুর', lat: 23.1646, lng: 90.2106 },
  { name: 'ফরিদপুর', lat: 23.6076, lng: 89.8404 },
  { name: 'গাজীপুর', lat: 24.0000, lng: 90.4203 },
  { name: 'টাঙ্গাইল', lat: 24.2500, lng: 89.9167 },
  { name: 'শরীয়তপুর', lat: 23.2500, lng: 90.0833 },
  { name: 'মুন্সীগঞ্জ', lat: 23.5500, lng: 90.5000 },
  { name: 'চাঁদপুর', lat: 23.1833, lng: 91.0833 },
  { name: 'লক্ষ্মীপুর', lat: 22.9500, lng: 90.8500 },
  { name: 'ব্রাহ্মণবাড়িয়া', lat: 23.9500, lng: 91.1333 },
  { name: 'নেত্রকোনা', lat: 24.8833, lng: 90.7000 },
  { name: 'জামালপুর', lat: 24.9333, lng: 89.9500 },
  { name: 'শেরপুর', lat: 25.0167, lng: 89.9333 },
  { name: 'কিশোরগঞ্জ', lat: 24.4333, lng: 90.7833 },
  { name: 'হবিগঞ্জ', lat: 24.3667, lng: 91.4167 },
  { name: 'মৌলভীবাজার', lat: 24.4833, lng: 91.7833 },

  // Newly added places
  { name: 'পটুয়াখালী', lat: 22.3667, lng: 90.3333 },
  { name: 'ঝালকাঠি', lat: 22.6700, lng: 90.1833 },
  { name: 'ভোলা', lat: 22.6833, lng: 90.6167 },
  { name: 'বরগুনা', lat: 22.2667, lng: 90.1833 },
  { name: 'দুমকি', lat: 22.4833, lng: 90.2333 }, 

  // International cities for Islamic context
  { name: 'মক্কা', lat: 21.3891, lng: 39.8579 },
  { name: 'মদিনা', lat: 24.5247, lng: 39.5692 },
];



const prayerNames: Record<PrayerKey, string> = {
  fajr: 'ফজর',
  sunrise: 'সূর্যোদয়',
  dhuhr: 'যোহর',
  asr: 'আসর',
  maghrib: 'মাগরিব',
  isha: 'ইশা',
  none: '',
};

function mapApiTimings(t: Record<string, string>): Record<PrayerKey, string> {
  return {
    fajr: t.Fajr ?? '',
    sunrise: t.Sunrise ?? '',
    dhuhr: t.Dhuhr ?? '',
    asr: t.Asr ?? '',
    maghrib: t.Maghrib ?? '',
    isha: t.Isha ?? '',
    none: '',
  };
}

// Add prop types for UI/UX enhancements
interface PrayerTimesWidgetProps {
  showLocationIcon?: boolean;
  showLoading?: boolean;
  showErrorToast?: boolean;
  highlightCurrentNextPrayer?: boolean;
  responsivePadding?: boolean;
}

const PrayerTimesWidget: React.FC<PrayerTimesWidgetProps> = () => {
  const [selectedLocation, setSelectedLocation] = useState(() => {
    const saved = localStorage.getItem('selectedLocation');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return predefinedLocations[0];
      }
    }
    return predefinedLocations[0];
  });

  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [aladhanTimes, setAladhanTimes] = useState<Record<PrayerKey, string> | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<PrayerKey | null>(null);
  const [currentPrayer, setCurrentPrayer] = useState<PrayerKey | null>(null);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [hijriDate, setHijriDate] = useState<string | null>(null);
  const [timeZone, setTimeZone] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Get user location on mount, fallback to manual
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSelectedLocation({
            name: 'বর্তমান অবস্থান',
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          // Permission denied or error
          // No alert spam on repeated mount, could add UI notification if desired
        }
      );
    }
  }, []);

  // Persist selected location
  useEffect(() => {
    localStorage.setItem('selectedLocation', JSON.stringify(selectedLocation));
  }, [selectedLocation]);

  // Fetch prayer times and setup PrayerTimes instance
  useEffect(() => {
    setLoading(true);
    setFetchError(null);
    const dateStr = dayjs().format('DD-MM-YYYY');
    const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${selectedLocation.lat}&longitude=${selectedLocation.lng}&method=3`;

    fetch(url)
      .then((res) => res.json())
      .then((data: AlAdhanApiResponse) => {
        if (data?.data?.timings && data?.data?.meta) {
          const timings = mapApiTimings(data.data.timings);
          setAladhanTimes(timings);
          setHijriDate(data.data.date.hijri?.date ?? null);
          setTimeZone(data.data.meta.timezone ?? null);

          const coords = new Coordinates(selectedLocation.lat, selectedLocation.lng);
          const params = CalculationMethod.MoonsightingCommittee();
          const pt = new PrayerTimes(coords, new Date(), params);
          setPrayerTimes(pt);
          setCurrentDate(new Date());
          setLoading(false);
        } else {
          setFetchError('নামাজের সময় আনতে সমস্যা হয়েছে।');
          setLoading(false);
        }
      })
      .catch(() => {
        setFetchError('নামাজের সময় আনতে সমস্যা হয়েছে।');
        setLoading(false);
      });
  }, [selectedLocation]);

  // Update currentDate every minute to detect date change
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getDate() !== currentDate.getDate()) {
        setCurrentDate(now);
      }
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [currentDate]);

  // Update current prayer, next prayer, and countdown every 30 seconds
  useEffect(() => {
    if (!prayerTimes) return;

    const updatePrayerInfo = () => {
      const now = new Date();
      const next = prayerTimes.nextPrayer();
      const current = prayerTimes.currentPrayer();
      setNextPrayer(next);
      setCurrentPrayer(current);

      if (next) {
        const nextTime = prayerTimes.timeForPrayer(next);
        if (nextTime) {
          const diffMs = dayjs(nextTime).diff(now);
          if (diffMs > 0) {
            const d = dayjs.duration(diffMs);
            const h = d.hours();
            const m = d.minutes();
            setTimeLeft(`${h} ঘন্টা ${m} মিনিট`);
          } else {
            setTimeLeft(null);
          }
        } else {
          setTimeLeft(null);
        }
      } else {
        setTimeLeft(null);
      }
    };

    updatePrayerInfo();
    const interval = setInterval(updatePrayerInfo, 30 * 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const formatLocal = (date: Date) => dayjs(date).format('h:mm A');

  return (
    <div className="card shadow rounded-lg overflow-hidden max-w-md mx-auto p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="p-4 bg-primary-500 text-white flex justify-between items-center rounded-t-lg">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <MapPin size={20} className="inline-block mr-1 text-white" /> নামাজের সময়সূচী
          </h3>
          {hijriDate && <p className="text-sm mt-0.5">হিজরি: {hijriDate}</p>}
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Clock size={18} />
          <span>{dayjs(currentDate).format('DD MMMM, YYYY')}</span>
        </div>
      </div>
      <div className="p-2 sm:p-4 md:p-6">
        {/* Location Selector with icon */}
        <label htmlFor="location-select" className="text-sm mb-1 block font-medium flex items-center gap-1">
          <MapPin size={16} className="text-green-600 dark:text-green-300" /> স্থান নির্বাচন করুন
        </label>
        <select
          id="location-select"
          className="select w-full border px-3 py-2 rounded-md mb-4"
          value={selectedLocation.name}
          onChange={(e) => {
            const sel = predefinedLocations.find((l) => l.name === e.target.value);
            if (sel) setSelectedLocation(sel);
          }}
          aria-label="স্থান নির্বাচন করুন"
        >
          {[selectedLocation, ...predefinedLocations]
            .filter((loc, i, arr) => arr.findIndex((x) => x.name === loc.name) === i)
            .map((loc) => (
              <option key={loc.name} value={loc.name}>
                {loc.name}
              </option>
            ))}
        </select>

        {/* 4. Loading State */}
        {loading && (
          <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300 my-6">
            <Loader2 className="animate-spin" /> নামাজের সময় লোড হচ্ছে...
          </div>
        )}
        {/* 6. Error Toast/Alert */}
        {fetchError && (
          <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/40 border-l-4 border-red-400 dark:border-red-600 p-3 rounded text-red-800 dark:text-red-200 my-4" role="alert">
            <AlertCircle size={18} /> {fetchError}
          </div>
        )}
        {/* Timezone display */}
        {timeZone && !loading && (
          <div className="mb-3 text-sm text-gray-500 flex items-center gap-1">
            <Globe size={14} /> টাইম জোন: {timeZone}
          </div>
        )}
        {/* Current prayer */}
        {currentPrayer && currentPrayer !== 'none' && !loading && (
          <motion.div
            key={`current-${currentPrayer}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="my-2 text-center font-bold text-green-700 dark:text-green-300 text-base"
            aria-live="polite"
          >
            <span className="inline-block px-2 py-1 rounded bg-green-100 dark:bg-green-800/60 text-green-800 dark:text-green-100 mr-2">চলমান</span>
            {prayerNames[currentPrayer]}
          </motion.div>
        )}
        {/* Next prayer with countdown */}
        {nextPrayer && nextPrayer !== 'none' && timeLeft && !loading && (
          <motion.div
            key={`next-${nextPrayer}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 text-center font-semibold text-primary-700 dark:text-primary-300 text-base"
            aria-live="polite"
          >
            <span className="inline-block px-2 py-1 rounded bg-blue-100 dark:bg-blue-800/60 text-blue-800 dark:text-blue-100 mr-2">পরবর্তী</span>
            {prayerNames[nextPrayer]} <span className="ml-1">({timeLeft} বাকি)</span>
          </motion.div>
        )}
        {/* Prayer Times Table */}
        {!loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border dark:border-gray-700" role="table" aria-label="নামাজের সময়সূচী টেবিল">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                <th className="p-2">নামাজ</th>
                <th className="p-2 flex items-center gap-1">
                  <Clock size={14} /> স্থানীয়
                </th>
                <th className="p-2 flex items-center gap-1">
                  <Globe size={14} /> AlAdhan
                </th>
              </tr>
            </thead>
            <tbody>
              {prayerTimes &&
                aladhanTimes &&
                (Object.keys(prayerNames) as PrayerKey[])
                  .filter((key) => key !== 'none')
                  .map((key) => {
                    const prayerTime = prayerTimes.timeForPrayer(key);
                    const isCurrent = currentPrayer === key;
                    const isNext = nextPrayer === key;
                    return (
                      <tr
                        key={key}
                        className={`border-t dark:border-gray-600 transition-all duration-200 ${
                          isCurrent
                            ? 'bg-green-100 dark:bg-green-900 font-bold text-green-800 border-l-4 border-green-500'
                            : isNext
                            ? 'bg-blue-50 dark:bg-blue-900 font-semibold text-blue-800 border-l-4 border-blue-400'
                            : ''
                        }`}
                      >
                        <td className="p-2">{prayerNames[key]}</td>
                        <td className="p-2">{prayerTime ? formatLocal(prayerTime) : '-'}</td>
                        <td className="p-2">{aladhanTimes[key]}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
};

export default PrayerTimesWidget;
