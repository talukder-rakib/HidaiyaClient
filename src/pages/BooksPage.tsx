import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import { BookOpen, Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';  // <-- Import Link

const books = [
  {
    id: 1,
    title: 'তাফসীরে ইবনে কাসীর',
    author: 'ইমাম ইবনে কাসীর',
    description: 'কুরআন কারীমের সর্বাধিক গ্রহণযোগ্য তাফসীর গ্রন্থগুলোর মধ্যে অন্যতম। এতে প্রতিটি আয়াতের ব্যাখ্যা কুরআন ও সহীহ হাদীসের আলোকে করা হয়েছে।',
    format: 'PDF',
    size: '25 MB',
    language: 'বাংলা',
    // Removed downloadLink or set to real URL if available
  },
  {
    id: 2,
    title: 'রিয়াদুস সালেহীন',
    author: 'ইমাম নববী',
    description: 'এই গ্রন্থে দৈনন্দিন জীবনে মুসলিম ব্যক্তির আচরণ ও কর্মকাণ্ড সম্পর্কিত হাদীস সংকলন করা হয়েছে। এতে ১৮৯৭টি হাদীস রয়েছে।',
    format: 'PDF',
    size: '18 MB',
    language: 'বাংলা',
  },
  {
    id: 3,
    title: 'সীরাতে রাসূল (সা.)',
    author: 'ড. মুহাম্মাদ হামিদুল্লাহ',
    description: 'রাসূল (সা.) এর জীবনী সম্পর্কে একটি সম্পূর্ণ ও বিশ্বস্ত গ্রন্থ। এতে তাঁর জন্ম থেকে মৃত্যু পর্যন্ত জীবনের সব দিক বর্ণনা করা হয়েছে।',
    format: 'PDF',
    size: '20 MB',
    language: 'বাংলা',
  },
];

const articles = [
  {
    id: 1,
    title: 'ইসলামে সময়ের গুরুত্ব',
    author: 'ড. আব্দুল্লাহ আহমেদ',
    description: 'সময়ের মূল্য ও এর সদ্ব্যবহার সম্পর্কে ইসলামের শিক্ষা।',
    format: 'PDF',
    size: '1.2 MB',
    language: 'বাংলা',
  },
  {
    id: 2,
    title: 'আল্লাহর সাথে সম্পর্ক',
    author: 'শাইখ মুহাম্মাদ সালেহ',
    description: 'আল্লাহর সাথে বান্দার সম্পর্ক কিভাবে উন্নত করা যায় সে সম্পর্কে আলোচনা।',
    format: 'PDF',
    size: '0.8 MB',
    language: 'বাংলা',
  },
];

const BooksPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <SectionHeader 
        title="ইসলামিক বই ও প্রবন্ধ" 
        subtitle="ডাউনলোড করুন বিভিন্ন ইসলামিক বই ও প্রবন্ধ"
      />
      
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="বই খুঁজুন"
              className="input pl-10 w-full"
            />
          </div>
          <div>
            <select className="select">
              <option value="">সকল ভাষা</option>
              <option value="bn">বাংলা</option>
              <option value="ar">আরবি</option>
              <option value="en">ইংরেজি</option>
            </select>
          </div>
        </div>
      </div>
      
      <section className="mb-12">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">
          ইসলামিক বই
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="card h-full flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-md bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-4">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      লেখক: {book.author}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {book.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4 mb-4">
                  <span>{book.format}</span>
                  <span>{book.size}</span>
                  <span>{book.language}</span>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  to="/coming-soon" 
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  <Download size={16} className="mr-2" />
                  <span>ডাউনলোড করুন</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">
          ইসলামিক প্রবন্ধ
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="card h-full flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-md bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-4">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      লেখক: {article.author}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {article.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4 mb-4">
                  <span>{article.format}</span>
                  <span>{article.size}</span>
                  <span>{article.language}</span>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  to="/coming-soon" 
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  <Download size={16} className="mr-2" />
                  <span>ডাউনলোড করুন</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BooksPage;
