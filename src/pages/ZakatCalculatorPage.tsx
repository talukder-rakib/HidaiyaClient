import React, { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import jsPDF from 'jspdf';

const ZakatCalculatorPage: React.FC = () => {
  const [assets, setAssets] = useState({
    cash: 0,
    gold: 0,
    silver: 0,
    investments: 0,
    property: 0,
    businessInventory: 0,
    debtsReceivable: 0,
    debtsPayable: 0,
    expenses: 0,
  });

  const nisabValueGold = 87.48; // grams
  const goldPricePerGram = 9000; // BDT/gram
  const nisabValueBDT = nisabValueGold * goldPricePerGram;
  const zakatRate = 0.025;

  const handleInputChange = (field: keyof typeof assets, value: string) => {
    setAssets(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const totalWealth = 
    assets.cash + 
    assets.gold + 
    assets.silver + 
    assets.investments + 
    assets.property + 
    assets.businessInventory + 
    assets.debtsReceivable - 
    assets.debtsPayable - 
    assets.expenses;

  const isEligible = totalWealth >= nisabValueBDT;
  const zakatAmount = isEligible ? totalWealth * zakatRate : 0;

  const generatePDF = () => {
    const doc = new jsPDF();

    const logo = new Image();
    logo.src = '/logo.png'; // Make sure logo.png is inside /public

    logo.onload = () => {
      doc.addImage(logo, 'PNG', 10, 10, 30, 30);
      doc.setFontSize(18);
      doc.text('Zakat Calculation Receipt', 50, 25);
      doc.setFontSize(12);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 50, 35);
      doc.text('----------------------------------------', 20, 45);

      let y = 55;
      const data = [
        ['Cash', assets.cash],
        ['Gold', assets.gold],
        ['Silver', assets.silver],
        ['Investments', assets.investments],
        ['Property', assets.property],
        ['Business Inventory', assets.businessInventory],
        ['Debts Receivable', assets.debtsReceivable],
        ['Debts Payable', assets.debtsPayable],
        ['Basic Expenses', assets.expenses],
        ['Total Zakatable Wealth', totalWealth],
        ['Nisab Threshold', nisabValueBDT],
        ['Zakat Due', zakatAmount],
      ];

      data.forEach(([label, value]) => {
        doc.text(`${label}: ${Number(value).toLocaleString()} BDT`, 20, y);
        y += 10;
      });

      doc.text('----------------------------------------', 20, y + 5);
      doc.text('Thank you for using the Believer\'s Hour Zakat Calculator.', 20, y + 15);
      doc.save('zakat_receipt.pdf');
    };
  };

  return (
    <div className="container mx-auto">
      <SectionHeader 
        title="যাকাত ক্যালকুলেটর" 
        subtitle="আপনার যাকাত গণনা করুন সহজেই"
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
            যাকাতের মৌলিক তথ্য
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">বর্তমান নিসাব মূল্য</p>
              <p className="text-xl font-medium text-primary-600 dark:text-primary-400">
                {nisabValueBDT.toLocaleString()} টাকা
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                ({nisabValueGold} গ্রাম স্বর্ণ অনুযায়ী)
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">যাকাতের হার</p>
              <p className="text-xl font-medium text-primary-600 dark:text-primary-400">
                2.5%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                মোট সম্পদের 1/40 অংশ
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            যাকাত হিসাব করার জন্য, সমস্ত যাকাতযোগ্য সম্পদের মূল্য যোগ করুন এবং দেনা/খরচ বিয়োগ করুন।
            যদি অবশিষ্ট পরিমাণ নিসাব মূল্যের চেয়ে বেশি হয়, তাহলে ২.৫% যাকাত ফরজ।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="card">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  আপনার সম্পদ এন্ট্রি করুন
                </h3>
              </div>
              <div className="p-4 space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">সম্পদ</h4>
                  {['cash', 'gold', 'silver', 'investments', 'property', 'businessInventory', 'debtsReceivable'].map((field, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {({
                          cash: 'নগদ টাকা',
                          gold: 'স্বর্ণ (BDT)',
                          silver: 'রূপা (BDT)',
                          investments: 'বিনিয়োগ',
                          property: 'সম্পত্তি',
                          businessInventory: 'ব্যবসায়িক পণ্য',
                          debtsReceivable: 'পাওনা ঋণ',
                        } as any)[field]} (টাকা)
                      </label>
                      <input
                        type="number"
                        className="input"
                        value={assets[field as keyof typeof assets] || ''}
                        onChange={(e) => handleInputChange(field as keyof typeof assets, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">দেনা ও খরচ</h4>
                  {['debtsPayable', 'expenses'].map((field, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {({
                          debtsPayable: 'দেনা',
                          expenses: 'প্রয়োজনীয় খরচ',
                        } as any)[field]} (টাকা)
                      </label>
                      <input
                        type="number"
                        className="input"
                        value={assets[field as keyof typeof assets] || ''}
                        onChange={(e) => handleInputChange(field as keyof typeof assets, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  যাকাত হিসাব
                </h3>
              </div>
              <div className="p-4 space-y-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">মোট যাকাতযোগ্য সম্পদ</p>
                  <p className="text-2xl font-medium text-gray-900 dark:text-white">
                    {totalWealth.toLocaleString()} টাকা
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">নিসাব মান</p>
                  <p className="text-lg text-gray-800 dark:text-gray-200">
                    {nisabValueBDT.toLocaleString()} টাকা
                  </p>
                </div>
                <div className={`p-4 rounded-md ${isEligible ? 'bg-primary-50 dark:bg-primary-900' : 'bg-gray-50 dark:bg-gray-700'}`}>
                  <p className="text-sm font-medium mb-1">
                    {isEligible ? 'আপনার যাকাত ফরজ হয়েছে' : 'আপনি যাকাতের যোগ্য নন'}
                  </p>
                  {isEligible && (
                    <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                      {zakatAmount.toLocaleString()} টাকা
                    </p>
                  )}
                </div>

                {isEligible && (
                  <>
                    <button className="btn btn-primary w-full mb-2">
                      যাকাত দিন
                    </button>
                    <button onClick={generatePDF} className="btn btn-secondary w-full">
                      রসিদ (PDF) ডাউনলোড করুন
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculatorPage;
