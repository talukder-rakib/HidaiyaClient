import React, { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import { Mail, Phone, MessageCircle, Send, CheckCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate submission (e.g., API call or EmailJS)
    console.log('Form submitted:', formData);

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setSubmitted(false), 5000); // Hide message after 5s
  };

  return (
    <div className="container mx-auto">
      <SectionHeader
        title="যোগাযোগ করুন"
        subtitle="আমাদের সাথে যোগাযোগ করুন যেকোনো প্রশ্ন, মতামত বা পরামর্শের জন্য"
      />

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Contact Info Cards */}
          {[
            {
              icon: <Mail size={24} />,
              title: 'ইমেইল',
              detail: 'info@islamichub.com',
            },
            {
              icon: <Phone size={24} />,
              title: 'ফোন',
              detail: '+৮৮০ ১৭১২ ৩৪৫৬৭৮',
            },
            {
              icon: <MessageCircle size={24} />,
              title: 'সোশ্যাল মিডিয়া',
              detail: (
                <div className="flex space-x-3">
                  <a href="#" className="text-primary-500 hover:text-primary-600">
                    ফেসবুক
                  </a>
                  <a href="#" className="text-primary-500 hover:text-primary-600">
                    টুইটার
                  </a>
                </div>
              ),
            },
          ].map((item, idx) => (
            <div key={idx} className="card p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-500 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="card p-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
            যোগাযোগ ফর্ম
          </h3>

          {submitted && (
            <div className="mb-6 flex items-center text-green-600 dark:text-green-400">
              <CheckCircle size={20} className="mr-2" />
              আপনার মেসেজ সফলভাবে পাঠানো হয়েছে।
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  নাম
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input"
                  placeholder="আপনার নাম"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  ইমেইল
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input"
                  placeholder="আপনার ইমেইল"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                বিষয়
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="input"
                placeholder="আপনার মেসেজের বিষয়"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                মেসেজ
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="input"
                placeholder="আপনার মেসেজ লিখুন"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary flex items-center">
              <Send size={18} className="mr-2" />
              <span>পাঠিয়ে দিন</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
