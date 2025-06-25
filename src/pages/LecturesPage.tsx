import React, { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import { Video, Music, Play, User } from 'lucide-react';

// Sample data for lectures
const lectures = [
  {
    id: 1,
    title: 'কুরআন বুঝার পদ্ধতি',
    speaker: 'ড. জাকির নায়েক',
    duration: '45:20',
    date: '2023-05-15',
    category: 'কুরআন',
    videoUrl: 'https://www.youtube.com/embed/B8rxVI6xPo4?si=yO6U5oJayzJIAM-u',
    description: 'কুরআন কারীম বুঝার সঠিক পদ্ধতি এবং তাফসীর পাঠের নিয়ম সম্পর্কে বিস্তারিত আলোচনা।',
  },
  {
    id: 2,
    title: 'নামাজের গুরুত্ব ও ফজিলত',
    speaker: 'মাওলানা তারেক জামিল',
    duration: '38:15',
    date: '2023-06-22',
    category: 'নামাজ',
    videoUrl: 'https://www.youtube.com/embed/HPMwFWlpIkk?si=-Gqtb0SQDM4nn9eh',
    description: 'নামাজের গুরুত্ব, ফজিলত এবং সঠিকভাবে নামাজ আদায় করার নিয়ম সম্পর্কে আলোচনা।',
  },
  {
    id: 3,
    title: 'রমজানের প্রস্তুতি',
    speaker: 'মুফতি মেনক',
    duration: '7:30',
    date: '2023-03-10',
    category: 'রমজান',
    videoUrl: 'https://www.youtube.com/embed/BszZBgG6sCY?si=QseIEHr3jywHEBTk',
    description: 'রমজান মাসে কিভাবে সর্বোত্তম উপায়ে উপবাস পালন করা যায় এবং এই মাসের আমল সম্পর্কে আলোচনা।',
  },
];

// Sample data for audio lectures
const audioLectures = [
  {
    id: 1,
    title: 'ঈমানের স্তম্ভসমূহ',
    speaker: 'ড. আব্দুল্লাহ আহমেদ',
    duration: '28:45',
    date: '2023-04-18',
    category: 'আকিদা',
    audioUrl: '#',
    description: 'ঈমানের ছয়টি স্তম্ভ (আরকান) সম্পর্কে বিস্তারিত আলোচনা।',
  },
  {
    id: 2,
    title: 'আখলাক ও চরিত্র গঠন',
    speaker: 'মাওলানা মোহাম্মদ আবদুর রহমান',
    duration: '32:10',
    date: '2023-07-05',
    category: 'আখলাক',
    audioUrl: '#',
    description: 'ইসলামে চরিত্র গঠনের গুরুত্ব এবং রাসূল (সা.) এর আদর্শ চরিত্র সম্পর্কে আলোচনা।',
  },
];

// Categories for filtering
const categories = [
  'সকল',
  'কুরআন',
  'হাদিস',
  'নামাজ',
  'রমজান',
  'আকিদা',
  'আখলাক',
  'ফিকহ',
];

const LecturesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');
  const [selectedCategory, setSelectedCategory] = useState('সকল');
  
  return (
    <div className="container mx-auto">
      <SectionHeader 
        title="ইসলামিক লেকচার" 
        subtitle="বিশ্বস্ত আলেমদের লেকচার ও বয়ান শুনুন"
      />
      
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md flex items-center ${
                activeTab === 'video'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setActiveTab('video')}
            >
              <Video size={18} className="mr-2" />
              <span>ভিডিও লেকচার</span>
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center ${
                activeTab === 'audio'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setActiveTab('audio')}
            >
              <Music size={18} className="mr-2" />
              <span>অডিও লেকচার</span>
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="লেকচার খুঁজুন"
              className="input pl-10 w-full md:w-auto"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {activeTab === 'video' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lectures
            .filter(lecture => selectedCategory === 'সকল' || lecture.category === selectedCategory)
            .map((lecture) => (
              <div key={lecture.id} className="card overflow-hidden flex flex-col h-full">
                <div className="relative aspect-video">
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <Play size={48} className="text-white opacity-80" />
                  </div>
                  <iframe 
                    className="absolute inset-0 w-full h-full" 
                    src={lecture.videoUrl} 
                    title={lecture.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                <div className="p-4 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded">
                      {lecture.category}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {lecture.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {lecture.title}
                  </h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                    {lecture.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <User size={16} className="mr-1" />
                    <span>{lecture.speaker}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audioLectures
            .filter(lecture => selectedCategory === 'সকল' || lecture.category === selectedCategory)
            .map((lecture) => (
              <div key={lecture.id} className="card p-4">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-4">
                    <Music size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded">
                        {lecture.category}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {lecture.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {lecture.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <User size={14} className="inline mr-1" />
                      <span>{lecture.speaker}</span>
                    </p>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {lecture.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(lecture.date).toLocaleDateString('bn-BD')}
                      </span>
                      <button className="btn btn-primary text-sm">
                        শুনুন
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LecturesPage;