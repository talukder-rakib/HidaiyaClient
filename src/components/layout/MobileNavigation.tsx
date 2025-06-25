import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, BookText, Clock, Calculator } from 'lucide-react';

const MobileNavigation: React.FC = () => {
  const navItems = [
    { name: "হোম", path: "/", icon: <Home size={20} /> },
    { name: "কুরআন", path: "/quran", icon: <BookText size={20} /> },
    { name: "হাদিস", path: "/hadith", icon: <BookOpen size={20} /> },
    { name: "নামাজ", path: "/prayer-times", icon: <Clock size={20} /> },
    { name: "যাকাত", path: "/zakat-calculator", icon: <Calculator size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg md:hidden z-40">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center py-2 px-3 flex-1
              ${isActive
                ? 'text-primary-500'
                : 'text-gray-600 dark:text-gray-400'
              }
            `}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;