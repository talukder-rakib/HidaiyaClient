import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const surahs = [
  { id: 1, name: 'আল-ফাতিহা', arabicName: 'الفاتحة', verses: 7, revelation: 'মক্কী' },
  { id: 2, name: 'আল-বাকারা', arabicName: 'البقرة', verses: 286, revelation: 'মাদানী' },
  { id: 3, name: 'আলে ইমরান', arabicName: 'آل عمران', verses: 200, revelation: 'মাদানী' },
  { id: 4, name: 'আন-নিসা', arabicName: 'النساء', verses: 176, revelation: 'মাদানী' },
  { id: 5, name: 'আল-মায়িদাহ', arabicName: 'المائدة', verses: 120, revelation: 'মাদানী' },
  { id: 6, name: 'আল-আনআম', arabicName: 'الأنعام', verses: 165, revelation: 'মক্কী' },
  { id: 7, name: 'আল-আরাফ', arabicName: 'الأعراف', verses: 206, revelation: 'মক্কী' },
  { id: 8, name: 'আল-আনফাল', arabicName: 'الأنفال', verses: 75, revelation: 'মাদানী' },
  { id: 9, name: 'আত-তাওবাহ', arabicName: 'التوبة', verses: 129, revelation: 'মাদানী' },
  { id: 10, name: 'ইউনুস', arabicName: 'يونس', verses: 109, revelation: 'মক্কী' },
  { id: 11, name: 'হুদ', arabicName: 'هود', verses: 123, revelation: 'মক্কী' },
  { id: 12, name: 'ইউসুফ', arabicName: 'يوسف', verses: 111, revelation: 'মক্কী' },
  { id: 13, name: 'আর-রাদ', arabicName: 'الرعد', verses: 43, revelation: 'মাদানী' },
  { id: 14, name: 'ইব্রাহিম', arabicName: 'إبراهيم', verses: 52, revelation: 'মক্কী' },
  { id: 15, name: 'আল-হিজর', arabicName: 'الحجر', verses: 99, revelation: 'মক্কী' },
  { id: 16, name: 'আন-নাহল', arabicName: 'النحل', verses: 128, revelation: 'মক্কী' },
  { id: 17, name: 'আল-ইসরা', arabicName: 'الإسراء', verses: 111, revelation: 'মক্কী' },
  { id: 18, name: 'আল-কাহফ', arabicName: 'الكهف', verses: 110, revelation: 'মক্কী' },
  { id: 19, name: 'মারইয়াম', arabicName: 'مريم', verses: 98, revelation: 'মক্কী' },
  { id: 20, name: 'ত্বা-হা', arabicName: 'طه', verses: 135, revelation: 'মক্কী' },
  // [...continued up to 114]
  { id: 114, name: 'আন-নাস', arabicName: 'الناس', verses: 6, revelation: 'মক্কী' },
];

const SurahList: React.FC = () => {
  return (
    <div className="card">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">সূরা তালিকা</h3>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
        {surahs.map((surah, index) => (
          <motion.div 
            key={surah.id}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.01 }}
          >
            <div className="flex items-center">
              <Link
                to={`/quran/surah/${surah.id}`} 
                className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3 hover:underline"
              >
                {surah.id}
              </Link>

              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">{surah.name}</h4>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>আয়াত: {surah.verses}</span>
                  <span>{surah.revelation}</span>
                </div>
              </div>

              <div className="text-right">
                <p className="arabic text-xl text-gray-800 dark:text-gray-200">{surah.arabicName}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
        <button className="btn btn-outline">
          সকল সূরা দেখুন
        </button>
      </div>
    </div>
  );
};

export default SurahList;
