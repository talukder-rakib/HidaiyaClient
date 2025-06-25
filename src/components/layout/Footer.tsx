import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md py-6 mt-auto hidden md:block">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-4">হিদায়াহ</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              বাংলাভাষী মুসলিমদের জন্য একটি পূর্ণাঙ্গ ইসলামিক রিসোর্স। আল্লাহর পথে জ্ঞান অর্জন ও বিতরণ করা আমাদের লক্ষ্য।
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-4">দ্রুত লিঙ্ক</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><Link to="/quran" className="hover:text-primary-500">কুরআন</Link></li>
              <li><Link to="/hadith" className="hover:text-primary-500">হাদিস</Link></li>
              <li><Link to="/dua" className="hover:text-primary-500">দোয়া ও যিকর</Link></li>
              <li><Link to="/prayer-times" className="hover:text-primary-500">নামাজের সময়</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-4">যোগাযোগ</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              ইমেইল: info@hidaya.com
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-primary-500 hover:text-primary-600">
                ফেসবুক
              </a>
              <a href="#" className="text-primary-500 hover:text-primary-600">
                টুইটার
              </a>
              <a href="#" className="text-primary-500 hover:text-primary-600">
                ইউটিউব
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-4 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} হিদায়াহ । সর্বসত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;