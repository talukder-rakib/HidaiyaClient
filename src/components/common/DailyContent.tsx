import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DailyContentProps {
  type: 'quran' | 'hadith' | 'dua';
}

// Sample data - in a real app, this would come from an API or database
const dailyContent = {
  quran: {
    arabic: 'إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ',
    bengali: 'নিশ্চয় আল্লাহ সৎকর্মশীলদের প্রতিদান নষ্ট করেন না।',
    reference: 'সূরা আত-তাওবাহ ৯:১২০',
  },
  hadith: {
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    bengali: 'নিশ্চয় আমলসমূহ নিয়তের উপর নির্ভরশীল এবং প্রত্যেক ব্যক্তি তাই পাবে যা সে নিয়ত করেছে।',
    reference: 'সহিহ বুখারী, হাদিস নং ১',
  },
  dua: {
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    bengali: 'হে আমাদের রব, আমাদেরকে দুনিয়াতে কল্যাণ দিন এবং আখিরাতেও কল্যাণ দিন, আর আমাদেরকে আগুনের শাস্তি থেকে রক্ষা করুন।',
    reference: 'সূরা আল-বাকারা ২:২০১',
  },
};

const DailyContent: React.FC<DailyContentProps> = ({ type }) => {
  const [content, setContent] = useState(dailyContent[type]);
  
  useEffect(() => {
    setContent(dailyContent[type]);
  }, [type]);
  
  const contentTitle = {
    quran: 'আজকের আয়াত',
    hadith: 'আজকের হাদিস',
    dua: 'আজকের দোয়া',
  };

  return (
    <motion.div 
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-medium text-primary-600 dark:text-primary-400 mb-4">
        {contentTitle[type]}
      </h3>
      
      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
        <p className="arabic text-right text-xl md:text-2xl mb-2">{content.arabic}</p>
      </div>
      
      <p className="text-gray-800 dark:text-gray-200 mb-3">{content.bengali}</p>
      
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>উৎস: {content.reference}</p>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="btn btn-outline text-sm">
          শেয়ার করুন
        </button>
      </div>
    </motion.div>
  );
};

export default DailyContent;