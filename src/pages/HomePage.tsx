import React from 'react';
import { motion } from 'framer-motion';
import { BookText, BookOpen, Clock, Calculator, Heart, Video, BookMarked, HeartHandshake } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import DailyContent from '../components/common/DailyContent';
import FeatureCard from '../components/home/FeatureCard';
import PrayerTimesWidget from '../components/prayer/PrayerTimesWidget';

const HomePage: React.FC = () => {
  const features = [
    {
      title: 'কুরআন',
      description: 'বাংলা অনুবাদ, তাফসীর এবং অডিও তিলাওয়াত সহ সম্পূর্ণ কুরআন।',
      icon: <BookText size={24} />,
      link: '/quran'
    },
    {
      title: 'হাদিস',
      description: 'বিভিন্ন হাদিস গ্রন্থ থেকে সংগৃহীত হাদিস সমূহ।',
      icon: <BookMarked size={24} />,
      link: '/hadith'
    },
    {
      title: 'নামাজের সময়',
      description: 'আপনার অবস্থান অনুযায়ী সঠিক নামাজের সময়সূচী।',
      icon: <Clock size={24} />,
      link: '/prayer-times'
    },
    {
      title: 'যাকাত ক্যালকুলেটর',
      description: 'আপনার যাকাত গণনা করুন সহজেই।',
      icon: <Calculator size={24} />,
      link: '/zakat-calculator'
    },
    {
      title: 'ইসলামিক বই',
      description: 'ডাউনলোড করুন বিভিন্ন ইসলামিক বই ও প্রবন্ধ।',
      icon: <BookOpen size={24} />,
      link: '/books'
    },
    {
      title: 'লেকচার',
      description: 'বিশ্বস্ত আলেমদের লেকচার ও বয়ান শুনুন।',
      icon: <Video size={24} />,
      link: '/lectures'
    },
    {
      title: 'দোয়া ও যিকর',
      description: 'দৈনন্দিন দোয়া ও যিকর সমূহ।',
      icon: <Heart size={24} />,
      link: '/dua'
    },
    {
      title: 'দান করুন',
      description: 'ইসলামিক দাতব্য প্রতিষ্ঠানে দান করুন।',
      icon: <HeartHandshake size={24} />,
      link: '/donate'
    }
  ];

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          হিদায়াহ - আপনার ডিজিটাল ইসলামিক কেন্দ্র
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          কুরআন, হাদিস, দোয়া, নামাজের সময় ও ইসলামিক জ্ঞানের জন্য আপনার একটি সম্পূর্ণ প্লাটফর্ম
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#features" className="btn btn-primary">
            বৈশিষ্ট্য দেখুন
          </a>
          <a href="#" className="btn btn-outline">
            অ্যাপ ডাউনলোড করুন
          </a>
        </div>
      </motion.div>

      {/* Daily Content Section */}
      <section className="mb-16">
        <SectionHeader 
          title="আজকের ইসলামিক কন্টেন্ট" 
          subtitle="প্রতিদিন নতুন আয়াত, হাদিস, এবং দোয়া পড়ুন"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DailyContent type="quran" />
          <DailyContent type="hadith" />
          <DailyContent type="dua" />
        </div>
      </section>

      {/* Prayer Times Section */}
      <section className="mb-16">
        <SectionHeader 
          title="নামাজের সময়সূচী" 
          subtitle="আপনার অবস্থান অনুযায়ী সঠিক নামাজের সময় জানুন"
        />
        
        <div className="max-w-md mx-auto">
          <PrayerTimesWidget />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mb-16">
        <SectionHeader 
          title="আমাদের বৈশিষ্ট্য" 
          subtitle="একটি মাত্র অ্যাপ্লিকেশনে সকল ইসলামিক রিসোর্স"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              link={feature.link}
              delay={index}
            />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-16">
        <div className="bg-primary-500 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            আপনার মোবাইলে হিদায়াহ নিয়ে যান
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            আমাদের অ্যান্ড্রয়েড এবং উইন্ডোজ অ্যাপ ডাউনলোড করুন এবং যেকোনো সময় ইসলামিক কন্টেন্ট অ্যাক্সেস করুন।
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="btn bg-white text-primary-600 hover:bg-gray-100">
              অ্যান্ড্রয়েড অ্যাপ ডাউনলোড করুন
            </a>
            <a href="#" className="btn bg-primary-600 text-white hover:bg-primary-700 border border-white">
              উইন্ডোজ অ্যাপ ডাউনলোড করুন
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
