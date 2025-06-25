// pages/SurahDetailPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const SurahDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">সূরা {id}</h1>
      <p className="text-gray-700 dark:text-gray-300">
        সূরা নম্বর {id} এর বিস্তারিত তথ্য এখানে দেখানো হবে।
      </p>
    </div>
  );
};

export default SurahDetailPage;
