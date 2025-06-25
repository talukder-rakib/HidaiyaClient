import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type Direction = 'ltr' | 'rtl';

interface DirectionContextType {
  direction: Direction;
  toggleDirection: () => void;
}

const DirectionContext = createContext<DirectionContextType | undefined>(undefined);

export const DirectionProvider = ({ children }: { children: ReactNode }) => {
  const [direction, setDirection] = useState<Direction>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('direction');
      if (saved === 'rtl' || saved === 'ltr') return saved;
    }
    return 'ltr';
  });

  useEffect(() => {
    localStorage.setItem('direction', direction);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', direction);
    }
  }, [direction]);

  const toggleDirection = () => {
    setDirection((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'));
  };

  return (
    <DirectionContext.Provider value={{ direction, toggleDirection }}>
      {children}
    </DirectionContext.Provider>
  );
};

export const useDirection = (): DirectionContextType => {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error('❌ useDirection must be used within a <DirectionProvider>');
  }
  return context;
};
