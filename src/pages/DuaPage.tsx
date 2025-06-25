import React, { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';

// Expanded dua categories with more entries and updated counts
const duaCategories = [
  { id: 'morning', name: 'সকাল-সন্ধ্যার যিকর', count: 7 },
  { id: 'prayer', name: 'নামাজ সংক্রান্ত দোয়া', count: 2 },
  { id: 'protection', name: 'সুরক্ষার দোয়া', count: 2 },
  { id: 'travel', name: 'সফরের দোয়া', count: 2 },
  { id: 'food', name: 'খাবারের দোয়া', count: 2 },
  { id: 'home', name: 'বাসার দোয়া', count: 1 },
  { id: 'sleep', name: 'ঘুমের দোয়া', count: 2 },
  { id: 'forgiveness', name: 'মাফের দোয়া', count: 1 },
  { id: 'distress', name: 'কষ্টের সময়ের দোয়া', count: 1 },
];

// Expanded duaSamples array
const duaSamples = [
  // Morning
  {
    id: 1,
    category: 'morning',
    arabic:
      'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ',
    bengali:
      'আমরা সকালে উপনীত হয়েছি এবং সকল রাজত্ব আল্লাহর জন্য সকালে উপনীত হয়েছে। সমস্ত প্রশংসা আল্লাহর জন্য। আল্লাহ ছাড়া কোন সত্য উপাস্য নেই, তিনি একক, তাঁর কোন শরীক নেই। রাজত্ব তাঁরই এবং প্রশংসাও তাঁর। তিনি সকল বিষয়ের উপর ক্ষমতাবান।',
    reference: 'আবু দাউদ',
    transliteration:
      "আসবাহনা ওয়া আসবাহাল মুলকু লিল্লাহি, ওয়ালহামদু লিল্লাহি, লা-ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু, লাহুল মুলকু ওয়া লাহুল হামদু ওয়া হুয়া 'আলা কুল্লি শাইয়িন ক্বাদীর।",
  },
  {
    id: 7,
    category: 'morning',
    arabic:
      'اللَّهُمَّ أَنْتَ رَبِّى لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِى وَأَنَا عَبْدُكَ',
    bengali:
      'হে আল্লাহ, তুমি আমার পালনকর্তা, তোমার সিবা কোনো উপাস্য নেই। তুমি আমাকে সৃষ্টি করেছ এবং আমি তোমার বান্দা।',
    reference: 'সহিহ বুখারী',
    transliteration:
      "আল্লাহুম্মা আনতা রাব্বী লা ইলাহা ইল্লা আনতা, খালাকতানি ও আনা আব্দুকা।",
  },
  {
    id: 16,
    category: 'morning',
    arabic:
      'اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لا شَرِيكَ لَكَ',
    bengali:
      'হে আল্লাহ, আমি সকালে তোমার সাক্ষী দিচ্ছি এবং তোমার সিংহাসনের বাহক, ফেরেশতাগণ এবং সকল সৃষ্টি সাক্ষী হিসেবে নিচ্ছি যে, তুমি একমাত্র আল্লাহ, তোমার কোন অংশীদার নেই।',
    reference: 'সহিহ মুসলিম',
    transliteration:
      "আল্লাহুম্মা ইন্নি আসবাহত উশাহিদুকা ও উশাহিদু হামালাতা আর্শিকা ও মালাইকাতাকা ও জামিআ খলকিকা আন্নাকা অন্তাল্লাহু লা ইলাহা ইল্লা অন্তা ওয়াহদাকা লা শরীকা লাকা।",
  },
  {
    id: 17,
    category: 'morning',
    arabic:
      'اللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ',
    bengali:
      'আল্লাহ ছাড়া আর কোনো ইলাহ নেই, তিনি সর্বজীবিত ও সর্বচালক।',
    reference: 'সূরা আল-বাকারা: ২৫৫',
    transliteration:
      "আল্লাহু লা ইলাহা ইল্লা হুয়াল হাইয়ুল কাইয়্যুম।",
  },
  {
    id: 18,
    category: 'morning',
    arabic:
      'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    bengali:
      'আল্লাহর পরিশুদ্ধি এবং তার প্রশংসা।',
    reference: 'সহিহ মুসলিম',
    transliteration:
      "সুবহানাল্লাহি ওয়া বিহামদিহি।",
  },
  {
    id: 19,
    category: 'morning',
    arabic:
      'اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
    bengali:
      'হে আল্লাহ, তুমি আমার পালনকর্তা, তোমার সিবা কোনো উপাস্য নেই। তুমি আমাকে সৃষ্টি করেছ এবং আমি তোমার বান্দা, যতদূর সম্ভব আমি তোমার চুক্তি ও প্রতিশ্রুতি পালন করছি।',
    reference: 'সহিহ বুখারী',
    transliteration:
      "আল্লাহুম্মা অন্তা রাব্বী লা ইলাহা ইল্লা আন্তা, খালাকতানী ও আনা আব্দুকা, ও আনা আলা আহদিকা ও ওয়াদি'কা মা ইস্তাত'তু।",
  },

  // Protection
  {
    id: 2,
    category: 'protection',
    arabic:
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    bengali:
      'হে আল্লাহ! আমি আপনার কাছে আশ্রয় চাই দুশ্চিন্তা ও দুঃখ থেকে, অপারগতা ও অলসতা থেকে, কৃপণতা ও ভীরুতা থেকে, ঋণের বোঝা ও মানুষের প্রাধান্য থেকে।',
    reference: 'সহিহ বুখারী',
    transliteration:
      "আল্লাহুম্মা ইন্নী আ'উযু বিকা মিনাল হাম্মি ওয়াল হাযানি, ওয়াল 'আজযি ওয়াল কাসালি, ওয়াল বুখলি ওয়াল জুবনি, ওয়া দালা'ইদ্ দায়নি ওয়া গালাবাতির রিজাল।",
  },
  {
    id: 8,
    category: 'protection',
    arabic:
      'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    bengali:
      'আল্লাহর পরিপূর্ণ শব্দসমূহের কাছে আমি আশ্রয় চাই, যা সৃষ্টি থেকে সমস্ত মন্দ থেকে রক্ষা করে।',
    reference: 'সহিহ মুসলিম',
    transliteration:
      "আ’উযু বিকালিমাতিল্লাহিততাম্মাত মিন শার্রি মা খালাক।",
  },

  // Prayer
  {
    id: 3,
    category: 'prayer',
    arabic:
      'اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    bengali:
      'হে আল্লাহ! আমাকে তাওবা কবুলকারীদের মধ্যে অন্তর্ভুক্ত কর এবং আমাকে পরিশুদ্ধদের মধ্যে রাখ।',
    reference: 'সহিহ মুসলিম',
    transliteration:
      "আল্লাহুম্মা জ'আলনী মিনাত তাওয়াবীন, ও জ'আলনী মিনাল মুত্তাহিরীন।",
  },
  {
    id: 10,
    category: 'prayer',
    arabic:
      'رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ العَلِيمُ',
    bengali:
      'হে আমাদের পালনকর্তা! আমাদের থেকে কবুল কর, নিশ্চয় তুমি সর্বশ্রোতা, সর্বজ্ঞ।',
    reference: 'সূরা আল-বাকারা: ১২৬',
    transliteration:
      "রাব্বানা তাকাব্বাল মিননা ইন্নাকা আন্তাস সামি’উল আলিম।",
  },

  // Travel
  {
    id: 4,
    category: 'travel',
    arabic:
      'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ',
    bengali:
      'পরিশুদ্ধ তিনি যিনি এইকে আমাদের জন্য আয়ত্ত করেছেন, আমরা এটা সক্ষম ছিলাম না।',
    reference: 'সূরা জুমরাহ: ৩৩',
    transliteration:
      "সুবহানাল্লাযি সাখ্‌খারা লানা হাজা ও মা কুন্না লাহু মুকরিনীন।",
  },
  {
    id: 9,
    category: 'travel',
    arabic:
      'اللّهُ أَكْبَرُ، اللّهُ أَكْبَرُ، اللّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ',
    bengali:
      'আল্লাহ সবচেয়ে মহান, আল্লাহ সবচেয়ে মহান, আল্লাহ সবচেয়ে মহান। পরিশুদ্ধ তিনি যিনি এইকে আমাদের জন্য আয়ত্ত করেছেন, আমরা এটা সক্ষম ছিলাম না।',
    reference: 'সহিহ মুসলিম',
    transliteration:
      "আল্লাহু আকবারু, আল্লাহু আকবারু, আল্লাহু আকবারু, সুবহানাল্লাযি সাখ্‌খারা লানা হাজা ও মা কুন্না লাহু মুকরিনীন।",
  },

  // Food
  {
    id: 5,
    category: 'food',
    arabic:
      'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
    bengali:
      'হে আল্লাহ, যা তুমি আমাদের দান করেছ তাতে বরকত দাও এবং আমাদেরকে আগুনের শাস্তি থেকে রক্ষা কর।',
    reference: 'সহিহ মুসলিম',
    transliteration:
      "আল্লাহুম্মা বারিক লানা ফিমা রাজার্তা ও কিনা আজাবান্নার।",
  },
  {
    id: 11,
    category: 'food',
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    bengali:
      'সমস্ত প্রশংসা আল্লাহর যিনি আমাদের খাওয়ান ও পান করান এবং মুসলিম বানান।',
    reference: 'সহিহ মুসলিম',
    transliteration:
      "আলহামদুলিল্লাহিল্লাযি আট'আমানা ওয়া সাকানা ওয়া জ'আলানা মুসলিমীন।",
  },

  // Home
  {
    id: 6,
    category: 'home',
    arabic:
      'بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا',
    bengali:
      'আল্লাহর নামে আমরা প্রবেশ করলাম এবং আল্লাহর নামে আমরা বের হলাম।',
    reference: 'সহিহ বুখারী',
    transliteration:
      "বিসমিল্লাহি ওয়ালজনা ও বিসমিল্লাহি খরজনা।",
  },

  // Sleep
  {
    id: 12,
    category: 'sleep',
    arabic:
      'اللّهُ لاَ إِلَهَ إِلّا هُوَ الْحَيُّ الْقَيُّومُ',
    bengali:
      'আল্লাহ ছাড়া কোনো উপাস্য নেই, তিনি জীবিত ও শাশ্বত।',
    reference: 'সূরা আল-বাকারা: ২৫৫',
    transliteration:
      "আল্লাহু লা ইলাহা ইল্লা হুয়াল হাইয়ুল কাইয়্যুম।",
  },
  {
    id: 13,
    category: 'sleep',
    arabic:
      'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    bengali:
      'হে আল্লাহ, তোমার নামে আমি মরি এবং বাঁচি।',
    reference: 'সহিহ মুসলিম',
    transliteration:
      "বিসমিকা আল্লাহুম্মা আমুতো ও আহইয়া।",
  },

  // Forgiveness
  {
    id: 14,
    category: 'forgiveness',
    arabic:
      'رَبِّ اغْفِرْ لِي وَارْحَمْنِي',
    bengali:
      'হে পালনকর্তা, আমাকে ক্ষমা কর এবং আমাকে করুণা কর।',
    reference: 'সহিহ বুখারী',
    transliteration:
      "রব্বি গফির লী ওয়ারহামনী।",
  },

  // Distress
  {
    id: 15,
    category: 'distress',
    arabic:
      'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    bengali:
      'আল্লাহ ছাড়া অন্য কোনো উপাস্য নেই। তুমি পরিশুদ্ধ। নিশ্চয় আমি অত্যাচারী ছিলাম।',
    reference: 'সহিহ বুখারী',
    transliteration:
      "লা ইলাহা ইল্লা আন্তা সুবহানাকা ইননী কুন্তু মিনাল জলিমীন।",
  },
];

const DuaPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering duas based on category & search
  const filteredDuas = duaSamples.filter((dua) => {
    const matchesCategory = selectedCategory ? dua.category === selectedCategory : true;
    const matchesSearch =
      dua.bengali.includes(searchTerm) ||
      dua.arabic.includes(searchTerm) ||
      dua.transliteration.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Share handler
  const handleShare = (dua: typeof duaSamples[0]) => {
    if (navigator.share) {
      navigator
        .share({
          title: 'দোয়া',
          text: `${dua.bengali}\n\nউৎস: ${dua.reference}`,
        })
        .catch(console.error);
    } else {
      alert('শেয়ার করার সুবিধা আপনার ব্রাউজারে উপলব্ধ নয়।');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <SectionHeader
        title="দোয়া ও যিকর সংগ্রহ"
        subtitle="দৈনন্দিন জীবনের বিভিন্ন সময়ের জন্য কুরআন ও হাদিস থেকে সংগৃহীত দোয়া"
      />

      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <input
          type="text"
          placeholder="দোয়া খুঁজুন"
          className="input pl-10 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="card sticky top-24 bg-white dark:bg-gray-900 rounded shadow p-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              দোয়ার প্রকারভেদ
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedCategory(null)}
                  aria-pressed={selectedCategory === null}
                  className={`w-full flex justify-between py-2 px-3 rounded-md ${
                    selectedCategory === null
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                  } focus:outline focus:outline-2 focus:outline-primary-500`}
                >
                  <span>সকল দোয়া</span>
                  <span>{duaCategories.reduce((sum, cat) => sum + cat.count, 0)}</span>
                </button>
              </li>
              {duaCategories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    aria-pressed={selectedCategory === category.id}
                    className={`w-full flex justify-between py-2 px-3 rounded-md ${
                      selectedCategory === category.id
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                    } focus:outline focus:outline-2 focus:outline-primary-500`}
                  >
                    <span>{category.name}</span>
                    <span>{category.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-6">
            {filteredDuas.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">
                কোন দোয়া পাওয়া যায়নি।
              </p>
            ) : (
              filteredDuas.map((dua) => (
                <div key={dua.id} className="card p-6 bg-white dark:bg-gray-800 rounded shadow">
                  <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <p className="arabic text-right text-xl md:text-2xl mb-2">{dua.arabic}</p>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{dua.transliteration}</p>

                  <p className="text-gray-800 dark:text-gray-200 mb-3">{dua.bengali}</p>

                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>উৎস: {dua.reference}</p>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      className="btn btn-outline text-sm"
                      onClick={() => handleShare(dua)}
                    >
                      শেয়ার করুন
                    </button>
                    <button className="btn btn-primary text-sm">সংরক্ষণ করুন</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuaPage;
