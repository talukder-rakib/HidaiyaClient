import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import PrayerTimesWidget from '../components/prayer/PrayerTimesWidget';

const PrayerTimesPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-green-100/70 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-4 sm:p-8 mb-8 border border-green-200 dark:border-green-700">
          <SectionHeader 
            title="নামাজের সময়সূচী (বাংলাদেশ)" 
            subtitle="বাংলাদেশের সকল জেলার জন্য সঠিক নামাজের সময় দেখুন"
          />
          <PrayerTimesWidget />
        </div>
        <div className="mt-8 card p-6 bg-white/90 dark:bg-gray-900/80 rounded-xl shadow border border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
            <svg width='24' height='24' fill='none' viewBox='0 0 24 24'><path d='M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l1.41-1.41M6.34 6.34L4.93 4.93' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/></svg>
            বাংলাদেশে নামাজের সময় সম্পর্কে জানুন
          </h3>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            <p>
              বাংলাদেশের নামাজের সময় গণনা করা হয় সূর্যের অবস্থান ও <span className="font-semibold text-green-700 dark:text-green-300">ইসলামিক ফাউন্ডেশন বাংলাদেশ</span> / <span className="font-semibold text-green-700 dark:text-green-300">মুনসাইটিং কমিটি</span> পদ্ধতি অনুযায়ী।
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><strong>ফজর:</strong> সুবহে সাদিক (প্রথম আলো) থেকে সূর্যোদয় পর্যন্ত।</div>
              <div><strong>যোহর:</strong> সূর্য মধ্য আকাশ থেকে পশ্চিম দিকে ঢলে পড়া থেকে আসর পর্যন্ত।</div>
              <div><strong>আসর:</strong> কোন বস্তুর ছায়া যখন তার দৈর্ঘ্যের সমান হয় তখন থেকে সূর্যাস্ত পর্যন্ত।</div>
              <div><strong>মাগরিব:</strong> সূর্যাস্ত থেকে পশ্চিম দিগন্তে লালিমা অদৃশ্য হওয়া পর্যন্ত।</div>
              <div><strong>ইশা:</strong> সন্ধ্যার লালিমা অদৃশ্য হওয়া থেকে মধ্যরাত্রি পর্যন্ত।</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/40 border-l-4 border-green-400 dark:border-green-600 p-3 rounded text-green-800 dark:text-green-200 mt-4">
              <strong>নোট:</strong> সময়সূচী <span className="font-semibold">ইসলামিক ফাউন্ডেশন বাংলাদেশ</span> ও আন্তর্জাতিক মানদণ্ড অনুযায়ী নির্ধারিত। স্থান নির্বাচন করে আপনার জেলার সঠিক সময় দেখুন।
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesPage;
