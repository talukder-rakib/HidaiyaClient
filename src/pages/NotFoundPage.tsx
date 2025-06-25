import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-16">
      <div className="text-6xl font-bold text-primary-500 mb-4">404</div>
      <h1 className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        পেজটি পাওয়া যায়নি!
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। হতে পারে পেজটি সরানো হয়েছে, নাম পরিবর্তন করা হয়েছে, বা অস্থায়ীভাবে অনুপলব্ধ।
      </p>
      <Link to="/" className="btn btn-primary flex items-center">
        <Home size={18} className="mr-2" />
        <span>হোম পেজে ফিরে যান</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;