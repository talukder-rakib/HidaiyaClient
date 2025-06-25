import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import PrayerTimesWidget from '../components/prayer/PrayerTimesWidget';

const PrayerTimesPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <SectionHeader 
        title="নামাজের সময়সূচী" 
        subtitle="আপনার অবস্থান অনুযায়ী সঠিক নামাজের সময় জানুন"
      />
      
      <div className="max-w-2xl mx-auto">
        <PrayerTimesWidget />
        
        <div className="mt-10 card p-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            নামাজের সময় সম্পর্কিত জানার বিষয়
          </h3>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              নামাজের সময় গণনা করা হয় সূর্যের অবস্থান অনুযায়ী, যা বিভিন্ন জায়গায় এবং ঋতুতে পরিবর্তন হয়।
            </p>
            <p>
              <strong>ফজর:</strong> সুবহে সাদিক (প্রথম আলো) থেকে সূর্যোদয় পর্যন্ত।
            </p>
            <p>
              <strong>যোহর:</strong> সূর্য মধ্য আকাশ থেকে পশ্চিম দিকে ঢলে পড়া থেকে আসর পর্যন্ত।
            </p>
            <p>
              <strong>আসর:</strong> কোন বস্তুর ছায়া যখন তার দৈর্ঘ্যের সমান হয় তখন থেকে সূর্যাস্ত পর্যন্ত।
            </p>
            <p>
              <strong>মাগরিব:</strong> সূর্যাস্ত থেকে পশ্চিম দিগন্তে লালিমা অদৃশ্য হওয়া পর্যন্ত।
            </p>
            <p>
              <strong>ইশা:</strong> সন্ধ্যার লালিমা অদৃশ্য হওয়া থেকে মধ্যরাত্রি পর্যন্ত।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesPage;