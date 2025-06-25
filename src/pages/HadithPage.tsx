import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/common/SectionHeader';

// Sample data for hadith collections
const hadithCollections = [
  { id: 1, name: 'সহিহ বুখারী', arabicName: 'صحيح البخاري', count: 7563, compiler: 'ইমাম বুখারী' },
  { id: 2, name: 'সহিহ মুসলিম', arabicName: 'صحيح مسلم', count: 7500, compiler: 'ইমাম মুসলিম' },
  { id: 3, name: 'সুনান আবু দাউদ', arabicName: 'سنن أبي داود', count: 5274, compiler: 'আবু দাউদ' },
  { id: 4, name: 'জামে তিরমিজি', arabicName: 'جامع الترمذي', count: 3956, compiler: 'ইমাম তিরমিজি' },
  { id: 5, name: 'সুনান নাসাঈ', arabicName: 'سنن النسائي', count: 5762, compiler: 'ইমাম নাসাঈ' },
  { id: 6, name: 'সুনান ইবনে মাজাহ', arabicName: 'سنن ابن ماجه', count: 4341, compiler: 'ইবনে মাজাহ' },
];

// Sample data for hadith categories
const hadithCategories = [
  { id: 1, name: 'ঈমান', slug: 'iman', count: 150 },
  { id: 2, name: 'নামাজ', slug: 'namaz', count: 320 },
  { id: 3, name: 'রোজা', slug: 'roza', count: 180 },
  { id: 4, name: 'যাকাত', slug: 'zakat', count: 120 },
  { id: 5, name: 'হজ্জ', slug: 'hajj', count: 210 },
  { id: 6, name: 'নিকাহ', slug: 'nikah', count: 95 },
  { id: 7, name: 'ব্যবসা', slug: 'business', count: 110 },
  { id: 8, name: 'আখলাক', slug: 'akhlaq', count: 240 },
];

const HadithPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <SectionHeader 
        title="হাদিস" 
        subtitle="বিশ্বস্ত হাদিস গ্রন্থ থেকে সংগৃহীত হাদিস সমূহ"
      />
      
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="হাদিস খুঁজুন"
              className="input pl-10 w-full"
            />
          </div>
          <div>
            <select className="select">
              <option value="">সকল গ্রন্থ</option>
              {hadithCollections.map(collection => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Hadith Collections List */}
        <div className="md:col-span-2">
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">হাদিস গ্রন্থসমূহ</h3>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {hadithCollections.map((collection) => (
                <Link 
                  to={`/hadith/collection/${collection.id}`}
                  key={collection.id}
                  className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">{collection.name}</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span>সংকলক: {collection.compiler}</span>
                        <span className="ml-3">হাদিস সংখ্যা: {collection.count}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="arabic text-lg text-gray-800 dark:text-gray-200">{collection.arabicName}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Hadith Categories List */}
        <div>
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">বিষয় অনুযায়ী</h3>
            </div>
            
            <div className="p-4">
              <ul className="space-y-2">
                {hadithCategories.map((category) => (
                  <li key={category.id}>
                    <Link 
                      to={`/hadith/category/${category.slug}`}
                      className="flex justify-between py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span className="text-gray-800 dark:text-gray-200">{category.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{category.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HadithPage;
