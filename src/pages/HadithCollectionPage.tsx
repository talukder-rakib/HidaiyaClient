import React from 'react';
import { useParams } from 'react-router-dom';

const HadithCollectionPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">হাদিস গ্রন্থ #{id}</h1>
      <p className="text-gray-700 dark:text-gray-300">
        এই পৃষ্ঠায় হাদিস গ্রন্থ নম্বর {id} এর বিস্তারিত তথ্য দেখানো হবে।
      </p>
    </div>
  );
};

export default HadithCollectionPage;
