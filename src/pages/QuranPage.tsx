import React, { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import SurahList from '../components/quran/SurahList';

const QuranPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'surah' | 'juz'>('surah');

  return (
    <div className="container mx-auto">
      <SectionHeader 
        title="পবিত্র কুরআন" 
        subtitle="বাংলা অনুবাদ, তাফসীর এবং অডিও তিলাওয়াত সহ"
      />
      
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${
                viewMode === 'surah'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setViewMode('surah')}
            >
              সূরা অনুযায়ী
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                viewMode === 'juz'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setViewMode('juz')}
            >
              পারা অনুযায়ী
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="সূরা খুঁজুন"
              className="input pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {viewMode === 'surah' ? (
        <SurahList />
      ) : (
        <div className="card p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">পারা অনুযায়ী দেখার বৈশিষ্ট্য শীঘ্রই আসছে।</p>
        </div>
      )}
    </div>
  );
};

export default QuranPage;